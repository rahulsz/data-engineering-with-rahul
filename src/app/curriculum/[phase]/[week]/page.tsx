import { notFound } from "next/navigation";
import { getAllSlugs, getNoteBySlug } from "@/data/mdx-utils";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import CodeBlock from "@/components/mdx/CodeBlock";
import Callout from "@/components/mdx/Callout";
import CompleteButton from "./_components/CompleteButton";
import { CURRICULUM } from "@/config/site-config";
import { Clock, Calendar } from "lucide-react";

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

  const allFlattenedWeeks = CURRICULUM.flatMap(p => 
    p.weeks.map(w => ({ ...w, phaseSlug: p.slug }))
  );
  
  const ctxIdx = allFlattenedWeeks.findIndex(w => w.slug === week);
  const prevWeek = ctxIdx > 0 ? allFlattenedWeeks[ctxIdx - 1] : null;
  const nextWeek = ctxIdx < allFlattenedWeeks.length - 1 ? allFlattenedWeeks[ctxIdx + 1] : null;

  return (
    <div className="max-w-4xl mx-auto py-10 px-6 lg:px-8 pb-32">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-4 text-sm font-medium text-brand-600 dark:text-brand-400">
            <Link href="/curriculum" className="hover:underline">Curriculum</Link>
            <span className="text-zinc-300 dark:text-zinc-700">/</span>
            <span>{note.phase}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 mb-6">
            {note.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>{note.estimatedMinutes || note.readingTime} min read</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>Updated {note.lastUpdated || "Recently"}</span>
            </div>
          </div>
        </div>
        
        <div className="shrink-0 flex self-start md:self-auto">
          <CompleteButton weekId={note.weekNumber} />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-10">
        {note.tags?.map((tag: string) => (
          <Badge key={tag} className="bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300 border-none">
            {tag}
          </Badge>
        ))}
      </div>

      <hr className="border-zinc-200 dark:border-zinc-800 mb-10" />

      <article className="prose prose-zinc dark:prose-invert prose-brand max-w-none prose-headings:scroll-mt-20 prose-a:text-brand-600 dark:prose-a:text-brand-400 hover:prose-a:text-brand-500">
        <MDXRemote
          source={note.content}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
            },
          }}
          components={{
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            CodeBlock: CodeBlock as any,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            Callout: Callout as any,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            pre: ({ children }: any) => <>{children}</>,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            code: (props: any) => {
              const { className, children } = props;
              const isInline = !className;
              if (isInline) {
                return <code className="px-1.5 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-brand-600 dark:text-brand-400 text-sm font-mono">{children}</code>;
              }
              const language = className?.replace("language-", "");
              return <CodeBlock language={language}>{children}</CodeBlock>;
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            h2: (props: any) => <h2 className="text-3xl font-bold mt-12 mb-6 border-b border-zinc-100 dark:border-zinc-800/50 pb-2" {...props} />
          }}
        />
      </article>

      <hr className="border-zinc-200 dark:border-zinc-800 my-16" />

      <div className="flex flex-col sm:flex-row justify-between gap-4">
        {prevWeek && prevWeek.status === 'available' ? (
          <Link href={`/curriculum/${prevWeek.phaseSlug}/${prevWeek.slug}`} className="flex-1 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-brand-500 dark:hover:border-brand-500 hover:bg-brand-50 dark:hover:bg-brand-900/10 transition-all group">
            <div className="text-sm text-zinc-500 dark:text-zinc-400 mb-2">&larr; Previous Week</div>
            <div className="font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">{prevWeek.title}</div>
          </Link>
        ) : <div className="flex-1" />}
        
        {nextWeek && nextWeek.status === 'available' ? (
          <Link href={`/curriculum/${nextWeek.phaseSlug}/${nextWeek.slug}`} className="flex-1 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-brand-500 dark:hover:border-brand-500 hover:bg-brand-50 dark:hover:bg-brand-900/10 transition-all group text-right">
            <div className="text-sm text-zinc-500 dark:text-zinc-400 mb-2">Next Week &rarr;</div>
            <div className="font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">{nextWeek.title}</div>
          </Link>
        ) : <div className="flex-1" />}
      </div>
    </div>
  );
}
