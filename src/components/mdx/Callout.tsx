import { Info, AlertTriangle, Lightbulb, AlertOctagon } from "lucide-react";
import { cn } from "@/lib/cn";

interface CalloutProps {
  type: "info" | "warning" | "tip" | "danger";
  title?: string;
  children: React.ReactNode;
}

const config = {
  info: {
    icon: Info,
    styles: "border-blue-500 bg-blue-50 dark:bg-blue-950/30 text-blue-900 dark:text-blue-200",
  },
  warning: {
    icon: AlertTriangle,
    styles: "border-amber-500 bg-amber-50 dark:bg-amber-950/30 text-amber-900 dark:text-amber-200",
  },
  tip: {
    icon: Lightbulb,
    styles: "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-200",
  },
  danger: {
    icon: AlertOctagon,
    styles: "border-rose-500 bg-rose-50 dark:bg-rose-950/30 text-rose-900 dark:text-rose-200",
  },
};

export default function Callout({ type, title, children }: CalloutProps) {
  const { icon: Icon, styles } = config[type];

  return (
    <aside className={cn("my-6 rounded-r-lg border-l-4 p-4", styles)}>
      <div className="flex items-start gap-4">
        <Icon className="mt-0.5 h-5 w-5 shrink-0" />
        <div className="flex-1">
          {title && <h5 className="mb-2 font-semibold leading-none tracking-tight">{title}</h5>}
          <div className="prose-sm dark:prose-invert max-w-none">
            {children}
          </div>
        </div>
      </div>
    </aside>
  );
}
