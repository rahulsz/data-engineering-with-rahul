import { CURRICULUM } from "@/config/site-config";
import RevealContent from "@/components/motion/RevealContent";
import Link from "next/link";

export default function CurriculumOverviewPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4 text-zinc-900 dark:text-zinc-100">Curriculum Overview</h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">Master the modern data engineering stack over our comprehensive 15-week journey.</p>
      </div>

      <div className="space-y-8">
        {CURRICULUM.map((phase, idx) => (
          <RevealContent key={phase.phase} delay={idx * 0.1}>
            <div className="bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: phase.color === 'violet' ? '#8b5cf6' : phase.color === 'blue' ? '#3b82f6' : phase.color === 'emerald' ? '#10b981' : phase.color === 'amber' ? '#f59e0b' : phase.color === 'rose' ? '#f43f5e' : '#6366f1' }} />
                  <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-white dark:to-zinc-400">
                    Phase {phase.phase} — {phase.label}
                  </h2>
                </div>

                <div className="pl-6 border-l-2 border-zinc-100 dark:border-zinc-800 space-y-4">
                  {phase.weeks.map(week => (
                    <div key={week.week} className="flex gap-4">
                      <div className="font-mono text-sm text-zinc-400 pt-1">Week {week.week.toString().padStart(2, '0')}</div>
                      <div className="font-medium text-zinc-800 dark:text-zinc-200">{week.title}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  {phase.weeks.find(w => w.status === 'available') ? (
                    <Link 
                      href={`/curriculum/${phase.slug}/${phase.weeks.find(w => w.status === 'available')!.slug}`}
                      className="inline-flex items-center gap-2 font-semibold text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors cursor-pointer"
                    >
                      Start Phase &rarr;
                    </Link>
                  ) : (
                    <span className="text-zinc-400 font-medium italic">Content coming soon</span>
                  )}
                </div>
              </div>
            </div>
          </RevealContent>
        ))}
      </div>
    </div>
  );
}
