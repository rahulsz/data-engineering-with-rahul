import { InfoIcon, TriangleAlert, Lightbulb, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/cn";

interface CalloutProps {
  type: "info" | "warning" | "tip" | "danger";
  title?: string;
  children: React.ReactNode;
}

const config = {
  info: {
    icon: InfoIcon,
    styles: "border-blue-500 bg-[#16202D] text-blue-400",
  },
  warning: {
    icon: TriangleAlert,
    styles: "border-amber-500 bg-[#211A16] text-amber-500",
  },
  tip: {
    icon: Lightbulb,
    styles: "border-[#F97316] bg-[#1a1f26] text-zinc-300",
  },
  danger: {
    icon: ShieldAlert,
    styles: "border-rose-500 bg-[#251619] text-rose-500",
  },
};

export default function Callout({ type, title, children }: CalloutProps) {
  const { icon: Icon, styles } = config[type];

  return (
    <aside className={cn("my-8 rounded-r-xl border-l-[3px] p-6", styles)}>
      <div className="flex items-start gap-4">
        <Icon className={cn("mt-0.5 h-5 w-5 shrink-0", type === "tip" ? "text-[#F97316]" : "")} />
        <div className="flex-1">
          {title && <h5 className={cn("mb-2 font-bold text-[15px] leading-none", type === "tip" ? "text-white" : "")}>{title}</h5>}
          <div className="prose-sm text-[#9CA3AF] max-w-none prose-p:leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </aside>
  );
}
