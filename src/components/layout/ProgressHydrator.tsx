"use client";

import { useEffect, useRef } from "react";
import { useAuth } from "@clerk/nextjs";
import { useProgressStore } from "@/store/progressStore";
import { fetchUserProgress, syncUserProgress } from "@/app/actions/progressSync";

export default function ProgressHydrator() {
  const { isLoaded, isSignedIn, userId } = useAuth();
  const completedWeeks = useProgressStore((state) => state.completedWeeks);
  const hydrateFromServer = useProgressStore((state) => state.hydrateFromServer);
  
  // Track if we've done the initial load to avoid infinite loops when we sync back up
  const hasLoadedFromServer = useRef(false);

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;

    if (!hasLoadedFromServer.current) {
      async function loadCloudData() {
        try {
          const res = await fetchUserProgress();
          if (res.success && res.completedWeeks) {
            // Apply cloud state to local browser
            hydrateFromServer(res.completedWeeks);
          }
        } catch (e) {
          console.error("Hydration fault", e);
        } finally {
          hasLoadedFromServer.current = true;
        }
      }
      loadCloudData();
    }
  }, [isLoaded, isSignedIn, hydrateFromServer]);

  // 2. Continuous Sync: Whenever local completedWeeks changes, push to cloud
  useEffect(() => {
    if (!isSignedIn || !hasLoadedFromServer.current) return;
    
    // We debounce slightly to avoid slamming the DB if they click fast
    const timeout = setTimeout(() => {
      syncUserProgress(completedWeeks);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [completedWeeks, isSignedIn]);

  return null; // Invisible logical component
}
