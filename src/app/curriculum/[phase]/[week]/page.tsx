import { notFound } from "next/navigation";
import { getAllSlugs, getNoteBySlug } from "@/data/mdx-utils";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import CodeBlock from "@/components/mdx/CodeBlock";
import Callout from "@/components/mdx/Callout";
import BottomNavPipeline from "./_components/BottomNavPipeline";
import { CURRICULUM } from "@/config/site-config";
import { Clock, CalendarDays, Tag, ChevronLeft, ChevronRight, BookOpen, Layers, Map, Brain, Code2, Factory, Target, Rocket, Wrench, CheckSquare, Lightbulb, type LucideIcon } from "lucide-react";

import LivePythonBlock from "@/components/mdx/LivePythonBlock";
import LiveSqlBlock from "@/components/mdx/LiveSqlBlock";
import SidebarHydrator from "@/components/layout/SidebarHydrator";
import RevealContent from "@/components/motion/RevealContent";
import Week0Layout from "@/components/mdx/week-0/Week0Layout";

import Week0CoreConcepts from "@/components/mdx/week-0/Week0CoreConcepts";
import Week0CaseStudy from "@/components/mdx/week-0/Week0CaseStudy";
import Week0Setup from "@/components/mdx/week-0/Week0Setup";
import Week0Capstone from "@/components/mdx/week-0/Week0Capstone";
import Week0Quiz from "@/components/mdx/week-0/Week0Quiz";

import MemoryInspector from "@/components/interactive/week-1/MemoryInspector";
import ConveyorSimulator from "@/components/interactive/week-1/ConveyorSimulator";
import FunctionFactory from "@/components/interactive/week-1/FunctionFactory";
import IOFlowVisualizer from "@/components/interactive/week-1/IOFlowVisualizer";
import InteractiveGitGraph from "@/components/interactive/week-1/InteractiveGitGraph";
import Week1Quiz from "@/components/mdx/week-1/Week1Quiz";

import CurriculumHero from "@/components/curriculum/CurriculumHero";
import CurriculumNavigation from "@/components/curriculum/CurriculumNavigation";
import CurriculumQuiz from "@/components/curriculum/CurriculumQuiz";
import CurriculumLab from "@/components/curriculum/CurriculumLab";
import CurriculumConceptMap from "@/components/curriculum/CurriculumConceptMap";
import CurriculumResources from "@/components/curriculum/CurriculumResources";

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs;
}

export default async function NotePage({
  params,
}: {
  params: Promise<{ phase: string; week: string }>;
}) {
  const { phase, week } = await params;
  const note = await getNoteBySlug(phase, week);

  if (!note) {
    notFound();
  }

  // Parse H2s for Sidebar TOC dynamically
  const h2Matches = [...note.content.matchAll(/^##\s+(.*)/gm)];
  const headings = h2Matches.map(m => ({ 
    title: m[1], 
    id: String(m[1]).toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '') 
  }));

  const allFlattenedWeeks = CURRICULUM.flatMap(p => 
    p.weeks.map(w => ({ ...w, phaseSlug: p.slug }))
  );
  
  const ctxIdx = allFlattenedWeeks.findIndex(w => w.slug === week);
  const prevWeek = ctxIdx > 0 ? allFlattenedWeeks[ctxIdx - 1] : null;
  const nextWeek = ctxIdx < allFlattenedWeeks.length - 1 ? allFlattenedWeeks[ctxIdx + 1] : null;

  return (
    <div className={`mx-auto py-10 pb-32 ${note.weekNumber <= 1 ? 'max-w-7xl px-6 lg:px-10' : 'max-w-3xl px-8 lg:px-12'}`}>
      <SidebarHydrator headings={headings} />
      
      {note.weekNumber > 1 && (
        <>
          {/* Header Section */}
          <div className="flex flex-col gap-6 mb-10">
            {/* Module Pill */}
            <div className="flex items-center self-start gap-2 bg-[#211713] text-[#F97316] border border-[#F97316]/30 px-3 py-1.5 rounded-full text-xs font-bold tracking-wider">
              🎓 Module {note.weekNumber}.0
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-[42px] font-bold tracking-tight text-white leading-tight">
              {note.title}
            </h1>
            
            {/* Description */}
            <p className="text-[#9CA3AF] text-lg leading-relaxed">
              {note.description}
            </p>
          </div>

          {/* Divider */}
          <div className="h-px bg-[#1C2532] mb-12" />
        </>
      )}

      {/* Article */}
      <article className={note.weekNumber <= 1 ? 'w-full' : 'prose prose-zinc dark:prose-invert max-w-none prose-p:text-[#D1D5DB] prose-p:leading-relaxed prose-a:text-[#F97316] prose-strong:text-white pb-6'}>
        <MDXRemote
          source={note.content}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [
                () => (tree: any) => {
                  const visit = require('unist-util-visit').visit;
                  visit(tree, 'element', (node: any) => {
                    if (node.tagName === 'pre' && node.children?.[0]?.tagName === 'code') {
                      const codeNode = node.children[0];
                      let rawCode = '';
                      visit(codeNode, 'text', (textNode: any) => {
                        rawCode += textNode.value;
                      });
                      node.properties = node.properties || {};
                      node.properties.rawCode = rawCode;
                    }
                  });
                },
                rehypeHighlight as any
              ],
            },
          }}
          components={{
            Week0CoreConcepts, Week0CaseStudy, Week0Setup, Week0Capstone, Week0Quiz,
            MemoryInspector, ConveyorSimulator, FunctionFactory,
            IOFlowVisualizer, InteractiveGitGraph, Week1Quiz,
            CurriculumHero, CurriculumNavigation, CurriculumQuiz,
            CurriculumLab, CurriculumConceptMap, CurriculumResources,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            RevealContent: RevealContent as any,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            Week0Layout: Week0Layout as any,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            CodeBlock: CodeBlock as any,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            Callout: Callout as any,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            pre: ({ children, className, rawCode, ...props }: any) => {
              const childClassName = children?.props?.className || "";
              const isPython = childClassName.includes("language-python");
              const isSql = childClassName.includes("language-sql");
              
              if (isPython && rawCode) {
                return (
                  <LivePythonBlock code={rawCode}>
                    {children.props.children}
                  </LivePythonBlock>
                );
              }

              if (isSql && rawCode) {
                return (
                  <LiveSqlBlock code={rawCode}>
                    {children.props.children}
                  </LiveSqlBlock>
                );
              }

              return (
                <div className="my-8 overflow-hidden rounded-xl bg-[#0B111A] border border-[#1e293b]/50 relative">
                  <div className="overflow-x-auto p-6 pt-6 text-[13px] leading-loose text-zinc-300 font-mono">
                    <pre {...props} className={className}>
                      {children}
                    </pre>
                  </div>
                </div>
              );
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            code: (props: any) => {
              const { className, children } = props;
              const isInline = !className || !className.includes('hljs');
              if (isInline) {
                return <code className="px-1.5 py-0.5 rounded bg-[#141B23] text-[#F97316] border border-[#1e293b] text-sm font-mono">{children}</code>;
              }
              return <code className={className}>{children}</code>;
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            h2: (props: any) => {
              const text = typeof props.children === 'string' ? props.children : '';
              const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
              const lower = text.toLowerCase();
              const iconMap: [string[], LucideIcon][] = [
                [['overview', 'welcome'], Map],
                [['concept', 'key'], Brain],
                [['code', 'example', 'verify', 'environment'], Code2],
                [['real-world', 'application', 'context'], Factory],
                [['practice', 'exercise'], Target],
                [['setup', 'local', 'install'], Wrench],
                [['checklist', 'check'], CheckSquare],
                [['architecture', 'core'], Lightbulb],
                [['what is', 'data engineering'], Rocket],
              ];
              let HeadingIcon: LucideIcon = BookOpen;
              for (const [keywords, icon] of iconMap) {
                if (keywords.some(k => lower.includes(k))) { HeadingIcon = icon; break; }
              }
              return (
                <h2 id={id} className="flex items-center gap-3 text-[22px] font-bold mt-14 mb-6 text-[#F97316] tracking-tight scroll-mt-20">
                  <HeadingIcon className="w-5 h-5 text-[#F97316]/70 shrink-0" />
                  {props.children}
                </h2>
              );
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            h3: (props: any) => <h3 className="text-lg font-bold mt-10 mb-4 text-white" {...props} />,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            p: (props: any) => <p className="text-[#D1D5DB] leading-relaxed mb-6" {...props} />,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ul: (props: any) => <ul className="space-y-3 mb-6 list-disc list-outside ml-5 text-[#D1D5DB]" {...props} />,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ol: (props: any) => <ol className="space-y-3 mb-6 list-decimal list-outside ml-5 text-[#D1D5DB]" {...props} />,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            li: (props: any) => <li className="pl-2" {...props} />,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            blockquote: (props: any) => (
              <blockquote className="border-l-4 border-[#F97316]/50 bg-[#F97316]/5 pl-6 pr-4 py-4 my-8 rounded-r-lg text-[#D1D5DB] italic" {...props} />
            ),
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            table: (props: any) => (
              <div className="my-8 overflow-x-auto rounded-xl border border-[#253141]">
                <table className="w-full text-sm" {...props} />
              </div>
            ),
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            thead: (props: any) => <thead className="bg-[#19222E] text-left" {...props} />,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            th: (props: any) => <th className="px-5 py-3 text-[11px] font-mono font-bold tracking-widest uppercase text-[#9CA3AF] border-b border-[#253141]" {...props} />,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            td: (props: any) => <td className="px-5 py-3.5 text-[#D1D5DB] border-b border-[#1e293b]/50" {...props} />,
          }}
        />
      </article>

      {note.weekNumber !== 0 && (
        <>
          {/* Divider */}
          <div className="h-px bg-[#1C2532] my-12" />
          <BottomNavPipeline 
            weekId={note.weekNumber} 
            nextLesson={nextWeek}
            prevLesson={prevWeek}
          />
        </>
      )}
    </div>
  );
}
