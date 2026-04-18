import type { Metadata } from "next";
import { Geist, Geist_Mono, Syne, IBM_Plex_Mono, DM_Sans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import AppShell from "@/components/layout/AppShell";
import { SITE_CONFIG } from "@/config/site-config";
import Script from "next/script";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["700", "800"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: SITE_CONFIG.name,
  description: SITE_CONFIG.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body className={`${geistSans.variable} ${geistMono.variable} ${syne.variable} ${ibmPlexMono.variable} ${dmSans.variable} font-sans antialiased`}>
          <AppShell>
            {children}
            <Toaster 
              theme="dark" 
              position="bottom-right"
              toastOptions={{
                style: {
                  background: '#0B111A',
                  border: '1px solid #253141',
                  color: '#fff',
                  fontFamily: 'var(--font-geist-sans)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
                },
                classNames: {
                  toast: 'rounded-xl',
                  title: 'text-[14px] font-bold text-white',
                  description: 'text-[12px] text-[#9CA3AF]',
                  success: 'border-l-4 border-l-[#22c55e]',
                  error: 'border-l-4 border-l-[#ef4444]',
                  info: 'border-l-4 border-l-[#3b82f6]',
                }
              }}
            />
          </AppShell>
        </body>
      </html>
    </ClerkProvider>
  );
}
