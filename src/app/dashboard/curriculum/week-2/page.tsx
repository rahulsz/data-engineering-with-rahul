import React from "react";
import Link from "next/link";
import {
  Search,
  Bell,
  Terminal,
  User,
  ChevronRight,
  CheckCircle2,
  Circle,
  Lock,
  ArrowLeft,
  Check,
  Lightbulb,
  BookOpen,
} from "lucide-react";

/* ── Lesson sidebar data ── */
const lessons = [
  { id: 1, title: "Intro to Collections", status: "complete" },
  { id: 2, title: "Python Data Structures", status: "active" },
  { id: 3, title: "Advanced Iteration", status: "locked" },
  { id: 4, title: "Week 2 Project: Data Parser", status: "locked" },
];

export default function Week2Page() {
  return (
    <div className="min-h-screen bg-[#0F151B] text-[#E5E7EB] font-sans flex flex-col selection:bg-[#F97316]/30">

      {/* ═══ TOP NAVBAR ═══ */}
      <header className="flex items-center justify-between px-6 lg:px-8 py-4 bg-[#0B111A] border-b border-[#1A232E] shrink-0 z-20 sticky top-0">
        <div className="flex items-center gap-3 overflow-hidden">
          <Link href="/dashboard" className="text-[16px] font-black text-[#F97316] tracking-tight shrink-0 hover:text-[#fb923c] transition-colors">
            The Monolith
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#4B5563] shrink-0" />
          <span className="text-[12px] font-mono text-[#6B7280] shrink-0">Phase 1</span>
          <ChevronRight className="w-3.5 h-3.5 text-[#4B5563] shrink-0" />
          <span className="text-[12px] font-mono text-[#6B7280] shrink-0">Week 2</span>
          <ChevronRight className="w-3.5 h-3.5 text-[#4B5563] shrink-0" />
          <span className="text-[13px] font-semibold text-white truncate">Python Data Structures</span>
        </div>

        <div className="flex items-center gap-5 shrink-0">
          <Search className="w-[18px] h-[18px] text-[#6B7280] cursor-pointer hover:text-white transition-colors" />
          <Bell className="w-[18px] h-[18px] text-[#6B7280] cursor-pointer hover:text-white transition-colors" />
          <Terminal className="w-[18px] h-[18px] text-[#6B7280] cursor-pointer hover:text-white transition-colors" />
          <div className="w-8 h-8 rounded-full bg-[#1A232E] border border-[#374151] flex items-center justify-center cursor-pointer hover:border-[#9CA3AF] transition-colors">
            <User className="w-4 h-4 text-[#E5E7EB]" />
          </div>
        </div>
      </header>

      {/* ═══ BODY AREA ═══ */}
      <div className="flex flex-1 overflow-hidden">

        {/* ── LEFT LESSON SIDEBAR ── */}
        <aside className="w-[260px] bg-[#0B111A] border-r border-[#1A232E] hidden lg:flex flex-col shrink-0 overflow-y-auto">
          <div className="px-6 pt-8 pb-4">
            <h2 className="text-[11px] font-mono font-bold tracking-[0.15em] text-[#6B7280] uppercase">Week 2 Content</h2>
          </div>

          <nav className="flex-1 px-3 pb-8 space-y-1">
            {lessons.map((lesson) => {
              const isActive = lesson.status === "active";
              const isComplete = lesson.status === "complete";
              const isLocked = lesson.status === "locked";

              return (
                <button
                  key={lesson.id}
                  className={`w-full flex items-start gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    isActive
                      ? "bg-[#2A1D16] text-[#F97316] font-semibold border-l-[3px] border-[#F97316]"
                      : isComplete
                      ? "text-[#9CA3AF] hover:bg-[#141B23] hover:text-white"
                      : "text-[#4B5563] cursor-default"
                  }`}
                >
                  <div className="mt-0.5 shrink-0">
                    {isComplete && <CheckCircle2 className="w-4 h-4 text-[#9CA3AF]" />}
                    {isActive && <Circle className="w-4 h-4 text-[#F97316] fill-[#F97316]" />}
                    {isLocked && <Lock className="w-4 h-4 text-[#4B5563]" />}
                  </div>
                  <span className="text-[13px] leading-snug">
                    {lesson.id}. {lesson.title}
                  </span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* ── MAIN CONTENT ── */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto px-8 lg:px-16 py-12 pb-32">

            {/* Module Badge */}
            <div className="inline-flex items-center gap-2 bg-[#22c55e]/10 text-[#22c55e] text-[11px] font-mono font-bold px-3 py-1.5 rounded-full border border-[#22c55e]/20 mb-8">
              <BookOpen className="w-3.5 h-3.5" />
              Module 2.2
            </div>

            {/* Title */}
            <h1 className="text-4xl lg:text-[44px] font-bold text-white tracking-tight leading-[1.1] mb-4">
              Python Data Structures
            </h1>
            <p className="text-[17px] text-[#9CA3AF] leading-relaxed mb-14">
              Mastering Lists, Dictionaries, Sets, and Tuples for optimal data manipulation.
            </p>

            {/* ── Body Text ── */}
            <div className="text-[16px] text-[#D1D5DB] leading-[1.85] space-y-10">

              <p>
                Understanding the core data structures in Python is critical for writing efficient and readable code.
                We will explore the four built-in structures, their performance implications, and when to use each.
              </p>

              {/* ── Section 1 ── */}
              <h2 className="text-[24px] font-bold text-[#F97316] tracking-tight !mb-4 !mt-14">
                Lists: Ordered and Mutable
              </h2>

              <p>
                Lists are the workhorse of Python data structures. They are dynamic arrays that can hold mixed data types.
              </p>

              {/* Code Block */}
              <div className="bg-[#0B111A] rounded-xl border border-[#1e293b]/60 p-6 font-mono text-[13px] leading-[1.9] overflow-x-auto">
                <div className="text-[#6B7280]"># List Comprehension example for performance</div>
                <div>
                  <span className="text-[#c084fc]">def</span>{" "}
                  <span className="text-[#38bdf8]">process_data</span>
                  <span className="text-[#D1D5DB]">(raw_data):</span>
                </div>
                <div className="pl-8 text-[#6B7280]"># Filtering and transforming in one pass</div>
                <div className="pl-8">
                  <span className="text-[#D1D5DB]">clean_data = [item.strip().lower() </span>
                  <span className="text-[#c084fc]">for</span>
                  <span className="text-[#D1D5DB]"> item </span>
                  <span className="text-[#c084fc]">in</span>
                  <span className="text-[#D1D5DB]"> raw_data </span>
                  <span className="text-[#c084fc]">if</span>
                  <span className="text-[#D1D5DB]"> item]</span>
                </div>
                <div className="pl-8">
                  <span className="text-[#c084fc]">return</span>
                  <span className="text-[#D1D5DB]"> clean_data</span>
                </div>
                <div className="mt-4">
                  <span className="text-[#D1D5DB]">data = [</span>
                  <span className="text-[#22c55e]">&quot; User1 &quot;</span>
                  <span className="text-[#D1D5DB]">, </span>
                  <span className="text-[#22c55e]">&quot;&quot;</span>
                  <span className="text-[#D1D5DB]">, </span>
                  <span className="text-[#22c55e]">&quot;USER2&quot;</span>
                  <span className="text-[#D1D5DB]">]</span>
                </div>
                <div>
                  <span className="text-[#38bdf8]">print</span>
                  <span className="text-[#D1D5DB]">(process_data(data))</span>
                  <span className="text-[#6B7280]"> # [&apos;user1&apos;, &apos;user2&apos;]</span>
                </div>
              </div>

              {/* Pro Tip Callout */}
              <div className="bg-[#1A1810] rounded-xl border border-[#F59E0B]/20 p-6 flex gap-4">
                <Lightbulb className="w-5 h-5 text-[#F59E0B] shrink-0 mt-1" />
                <div>
                  <h4 className="text-[15px] font-bold text-white mb-2">Pro Tip: Memory Allocation</h4>
                  <p className="text-[14px] text-[#D1D5DB] leading-relaxed">
                    Lists over-allocate memory to append items quickly. If you know the exact size of your data
                    beforehand and it won&apos;t change, consider using a Tuple to save memory.
                  </p>
                </div>
              </div>

              {/* ── Section 2 ── */}
              <h2 className="text-[24px] font-bold text-[#F97316] tracking-tight !mb-4 !mt-14">
                Dictionaries: Key-Value Mastery
              </h2>

              <p>
                Dictionaries provide fast lookups (O(1) average time complexity) using a hash map implementation.
                Since Python 3.7, dictionaries maintain insertion order.
              </p>

              {/* Code Block 2 */}
              <div className="bg-[#0B111A] rounded-xl border border-[#1e293b]/60 p-6 font-mono text-[13px] leading-[1.9] overflow-x-auto">
                <div className="text-[#6B7280]"># Dictionary merging (Python 3.9+)</div>
                <div>
                  <span className="text-[#D1D5DB]">defaults = {'{'}</span>
                  <span className="text-[#22c55e]">&quot;timeout&quot;</span>
                  <span className="text-[#D1D5DB]">: </span>
                  <span className="text-[#F97316]">30</span>
                  <span className="text-[#D1D5DB]">, </span>
                  <span className="text-[#22c55e]">&quot;retries&quot;</span>
                  <span className="text-[#D1D5DB]">: </span>
                  <span className="text-[#F97316]">3</span>
                  <span className="text-[#D1D5DB]">{'}'}</span>
                </div>
                <div>
                  <span className="text-[#D1D5DB]">user_config = {'{'}</span>
                  <span className="text-[#22c55e]">&quot;retries&quot;</span>
                  <span className="text-[#D1D5DB]">: </span>
                  <span className="text-[#F97316]">5</span>
                  <span className="text-[#D1D5DB]">, </span>
                  <span className="text-[#22c55e]">&quot;debug&quot;</span>
                  <span className="text-[#D1D5DB]">: </span>
                  <span className="text-[#c084fc]">True</span>
                  <span className="text-[#D1D5DB]">{'}'}</span>
                </div>
                <div className="mt-4 text-[#6B7280]"># The | operator merges, right side wins</div>
                <div>
                  <span className="text-[#D1D5DB]">final_config = defaults | user_config</span>
                </div>
                <div className="text-[#6B7280]"># {'{'}&apos;timeout&apos;: 30, &apos;retries&apos;: 5, &apos;debug&apos;: True{'}'}</div>
              </div>

              {/* ── Section 3 ── */}
              <h2 className="text-[24px] font-bold text-[#F97316] tracking-tight !mb-4 !mt-14">
                Sets: Unique & Unordered
              </h2>

              <p>
                Sets are optimized for membership testing and eliminating duplicate entries. They use hash tables
                internally, making <code className="text-[#38bdf8] bg-[#0B111A] px-1.5 py-0.5 rounded text-[14px]">in</code> operations
                blazingly fast compared to lists.
              </p>

              {/* Code Block 3 */}
              <div className="bg-[#0B111A] rounded-xl border border-[#1e293b]/60 p-6 font-mono text-[13px] leading-[1.9] overflow-x-auto">
                <div className="text-[#6B7280]"># Efficient deduplication pipeline</div>
                <div>
                  <span className="text-[#D1D5DB]">raw_events = [</span>
                  <span className="text-[#22c55e]">&quot;login&quot;</span>
                  <span className="text-[#D1D5DB]">, </span>
                  <span className="text-[#22c55e]">&quot;click&quot;</span>
                  <span className="text-[#D1D5DB]">, </span>
                  <span className="text-[#22c55e]">&quot;login&quot;</span>
                  <span className="text-[#D1D5DB]">, </span>
                  <span className="text-[#22c55e]">&quot;purchase&quot;</span>
                  <span className="text-[#D1D5DB]">, </span>
                  <span className="text-[#22c55e]">&quot;click&quot;</span>
                  <span className="text-[#D1D5DB]">]</span>
                </div>
                <div>
                  <span className="text-[#D1D5DB]">unique_events = </span>
                  <span className="text-[#38bdf8]">set</span>
                  <span className="text-[#D1D5DB]">(raw_events)</span>
                </div>
                <div className="text-[#6B7280]"># {'{'}&apos;login&apos;, &apos;click&apos;, &apos;purchase&apos;{'}'}</div>
                <div className="mt-4 text-[#6B7280]"># Set operations for data pipeline filtering</div>
                <div>
                  <span className="text-[#D1D5DB]">required = {'{'}</span>
                  <span className="text-[#22c55e]">&quot;login&quot;</span>
                  <span className="text-[#D1D5DB]">, </span>
                  <span className="text-[#22c55e]">&quot;purchase&quot;</span>
                  <span className="text-[#D1D5DB]">{'}'}</span>
                </div>
                <div>
                  <span className="text-[#D1D5DB]">missing = required - unique_events</span>
                </div>
                <div className="text-[#6B7280]"># set() — all required events captured!</div>
              </div>

              {/* Warning Callout */}
              <div className="bg-[#1A1015] rounded-xl border border-[#ef4444]/20 p-6 flex gap-4">
                <div className="text-xl shrink-0 mt-0.5">⚠️</div>
                <div>
                  <h4 className="text-[15px] font-bold text-white mb-2">Common Pitfall: Mutable Set Elements</h4>
                  <p className="text-[14px] text-[#D1D5DB] leading-relaxed">
                    Sets can only contain <strong className="text-white">hashable</strong> (immutable) objects.
                    You cannot add a list to a set — convert it to a tuple first.
                  </p>
                </div>
              </div>

              {/* ── Section 4 ── */}
              <h2 className="text-[24px] font-bold text-[#F97316] tracking-tight !mb-4 !mt-14">
                Tuples: Immutable Performance
              </h2>

              <p>
                Tuples are immutable sequences that are more memory-efficient than lists. They&apos;re ideal for
                representing fixed collections like coordinates, RGB colors, or database rows.
              </p>

              {/* Code Block 4 */}
              <div className="bg-[#0B111A] rounded-xl border border-[#1e293b]/60 p-6 font-mono text-[13px] leading-[1.9] overflow-x-auto">
                <div className="text-[#6B7280]"># Named tuples for readable data records</div>
                <div>
                  <span className="text-[#c084fc]">from</span>
                  <span className="text-[#D1D5DB]"> collections </span>
                  <span className="text-[#c084fc]">import</span>
                  <span className="text-[#D1D5DB]"> namedtuple</span>
                </div>
                <div className="mt-2">
                  <span className="text-[#D1D5DB]">Pipeline = </span>
                  <span className="text-[#38bdf8]">namedtuple</span>
                  <span className="text-[#D1D5DB]">(</span>
                  <span className="text-[#22c55e]">&quot;Pipeline&quot;</span>
                  <span className="text-[#D1D5DB]">, [</span>
                  <span className="text-[#22c55e]">&quot;name&quot;</span>
                  <span className="text-[#D1D5DB]">, </span>
                  <span className="text-[#22c55e]">&quot;source&quot;</span>
                  <span className="text-[#D1D5DB]">, </span>
                  <span className="text-[#22c55e]">&quot;status&quot;</span>
                  <span className="text-[#D1D5DB]">])</span>
                </div>
                <div className="mt-2">
                  <span className="text-[#D1D5DB]">etl = Pipeline(</span>
                  <span className="text-[#22c55e]">&quot;daily_load&quot;</span>
                  <span className="text-[#D1D5DB]">, </span>
                  <span className="text-[#22c55e]">&quot;postgres&quot;</span>
                  <span className="text-[#D1D5DB]">, </span>
                  <span className="text-[#22c55e]">&quot;active&quot;</span>
                  <span className="text-[#D1D5DB]">)</span>
                </div>
                <div>
                  <span className="text-[#38bdf8]">print</span>
                  <span className="text-[#D1D5DB]">(etl.name)</span>
                  <span className="text-[#6B7280]"> # &apos;daily_load&apos;</span>
                </div>
              </div>

              {/* Key Takeaways */}
              <div className="bg-[#111820] rounded-xl border border-[#253141] p-8 !mt-16">
                <h3 className="text-[18px] font-bold text-white mb-6 flex items-center gap-3">
                  <span className="text-xl">📌</span> Key Takeaways
                </h3>
                <ul className="space-y-4">
                  {[
                    "Use Lists when you need ordered, mutable sequences with frequent appends.",
                    "Use Dictionaries for fast key-based lookups and configuration management.",
                    "Use Sets for membership testing, deduplication, and mathematical set operations.",
                    "Use Tuples for immutable records — they're faster and use less memory than lists.",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-[#22c55e] shrink-0 mt-1" />
                      <span className="text-[14px] text-[#D1D5DB] leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* ── BOTTOM NAV BAR ── */}
          <div className="sticky bottom-0 bg-[#0B111A]/95 backdrop-blur-md border-t border-[#1A232E] px-8 lg:px-16 py-5">
            <div className="max-w-3xl mx-auto flex items-center justify-between">
              <button className="flex items-center gap-2 text-[13px] font-medium text-[#9CA3AF] hover:text-white transition-colors">
                <ArrowLeft className="w-4 h-4" />
                Previous Lesson
              </button>
              <button className="flex items-center gap-2 px-6 py-3 bg-[#F97316] text-[#050505] font-bold text-[13px] rounded-lg hover:bg-[#fb923c] transition-colors shadow-lg shadow-[#F97316]/10">
                Mark as Complete
                <Check className="w-4 h-4" />
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
