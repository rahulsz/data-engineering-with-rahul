import { CURRICULUM } from "@/config/site-config";
import RevealContent from "@/components/motion/RevealContent";
import Link from "next/link";
import { Compass, Database, GitBranch, BarChart3, Rocket, ChevronRight, BookOpen, Terminal } from "lucide-react";

const phaseIcons = [Compass, Database, GitBranch, BarChart3, Rocket];

export default function CurriculumOverviewPage() {
  return (
    <div className="min-h-screen bg-[#0F151B] text-[#E5E7EB] font-sans selection:bg-[#F97316]/30">
      <main className="max-w-5xl mx-auto py-12 px-8 lg:px-12">
        <div className="mb-12 border-b border-[#253141] pb-10">
          <div className="flex items-center gap-2 mb-3">
            <Terminal className="w-5 h-5 text-[#F97316]" />
            <span className="font-mono text-[11px] tracking-[0.2em] text-[#F97316] uppercase font-bold">
              Archipelago Syllabus
            </span>
          </div>
          <h1 className="text-4xl lg:text-[40px] font-bold tracking-tight mb-4 text-white">
            Curriculum Overview
          </h1>
          <p className="text-lg text-[#9CA3AF] max-w-2xl">
            Master the modern data engineering stack over our comprehensive 16-week journey.
          </p>
        </div>

        <div className="space-y-8">
          {CURRICULUM.map((phase, idx) => {
            const Icon = phaseIcons[idx] || Compass;
            const hasAvailable = phase.weeks.some(w => w.status === 'available');
            const statusTag = hasAvailable ? "[ AVAILABLE ]" : "[ ENCRYPTED ]";
            
            return (
              <RevealContent key={phase.phase} delay={idx * 0.1}>
                <div className="bg-[#19222E] border border-[#253141] hover:border-[#38bdf8]/50 rounded-xl overflow-hidden transition-all duration-300">
                  <div className="p-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-[#212C3A] border border-[#374151] flex items-center justify-center shrink-0 shadow-inner">
                          <Icon className="w-6 h-6 text-[#38bdf8]" />
                        </div>
                        <div>
                          <div className="text-[10px] font-mono font-bold tracking-widest text-[#9CA3AF] uppercase mb-1">
                            Phase {phase.phase}
                          </div>
                          <h2 className="text-2xl font-bold tracking-tight text-white">
                            {phase.label}
                          </h2>
                        </div>
                      </div>
                      <div className={`text-[11px] font-mono font-bold tracking-widest px-3 py-1.5 rounded border ${hasAvailable ? 'text-[#22c55e] border-[#22c55e]/30 bg-[#22c55e]/10' : 'text-[#ef4444] border-[#ef4444]/30 bg-[#ef4444]/10'}`}>
                        {statusTag}
                      </div>
                    </div>

                    <div className="pl-6 border-l-2 border-[#253141] space-y-5 ml-6">
                      {phase.weeks.map(week => (
                        <div key={week.week} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 group">
                          <div className="font-mono text-xs text-[#556070] font-bold tracking-wider shrink-0 w-20">
                            WK_{week.week.toString().padStart(2, '0')}
                          </div>
                          <div className={`font-semibold text-[15px] ${week.status === 'available' ? 'text-[#E5E7EB] group-hover:text-white' : 'text-[#6B7280]'}`}>
                            {week.title}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 pt-8 border-t border-[#253141] flex justify-end">
                      {hasAvailable ? (
                        <Link 
                          href={`/curriculum/${phase.slug}/${phase.weeks.find(w => w.status === 'available')!.slug}`}
                          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold text-[#0B111A] bg-[#F97316] hover:bg-[#fb923c] transition-all cursor-pointer group shadow-[0_0_15px_rgba(249,115,22,0.15)] hover:shadow-[0_0_25px_rgba(249,115,22,0.3)]"
                        >
                          Initialize Phase
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      ) : (
                        <span className="inline-flex items-center px-6 py-2.5 rounded-lg border border-[#374151] font-mono text-[11px] font-bold text-[#6B7280] tracking-widest uppercase bg-[#111823]">
                          Access Restricted
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </RevealContent>
            );
          })}
        </div>
      </main>
    </div>
  );
}
