import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowUpRight,
  ChevronDown,
  Globe,
  Layers,
  Package,
} from 'lucide-react';
import { PROJECTS, type ProjectCategory, type ProjectItem } from '../data/portfolioData';
import { sound } from '../utils/sound';

type FilterTab = 'all' | ProjectCategory;

const FILTER_TABS: { id: FilterTab; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'ai-systems', label: 'AI & Rust' },
  { id: 'mcp', label: 'MCP' },
  { id: 'fullstack', label: 'Full-Stack' },
  { id: 'reference', label: 'DSA' },
];

function ProjectCard({
  project,
  index,
}: {
  project: ProjectItem;
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.4,
        delay: Math.min(index * 0.04, 0.24),
        ease: [0.22, 1, 0.36, 1],
      }}
      className="obsidian-card group flex flex-col justify-between rounded-3xl p-6"
    >
      <div>
        <div className="flex items-start justify-between gap-3">
          <span className="font-mono text-[11px] tracking-wider text-zinc-500">
            {project.kicker}
          </span>

          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-0.5 font-mono text-[11px] text-zinc-300">
            <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
            {project.language}
          </span>
        </div>

        <h3 className="mt-4 text-xl font-bold tracking-tight text-white">
          {project.name}
        </h3>
        <p className="mt-2.5 text-sm leading-relaxed text-zinc-400">
          {project.summary}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-lg border border-white/[0.07] bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] text-zinc-300"
            >
              {tech}
            </span>
          ))}
        </div>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-4 rounded-2xl border border-white/10 bg-black/70 p-4">
                <div className="mb-2 flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-zinc-500">
                  <Layers className="h-3.5 w-3.5" />
                  <span>Architecture</span>
                </div>
                <ul className="space-y-2">
                  {project.architecture.map((line) => (
                    <li
                      key={line}
                      className="flex items-start gap-2 text-xs leading-relaxed text-zinc-300"
                    >
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-zinc-400" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-white/[0.07] pt-4">
        <button
          type="button"
          onClick={() => {
            sound.tick();
            setExpanded((prev) => !prev);
          }}
          className="tactile-btn inline-flex items-center gap-1.5 rounded-lg px-2 py-1 font-mono text-xs text-zinc-400 hover:bg-white/[0.06] hover:text-white transition-colors"
        >
          <span>{expanded ? 'Hide Spec' : 'Architecture'}</span>
          <ChevronDown
            className={`h-3.5 w-3.5 transition-transform duration-200 ${
              expanded ? 'rotate-180' : ''
            }`}
          />
        </button>

        <div className="flex items-center gap-2">
          {project.packageUrl && project.packageBadge && (
            <a
              href={project.packageUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => sound.tap()}
              className="tactile-btn inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/[0.04] px-3 py-1.5 font-mono text-[11px] text-zinc-200 hover:border-white/30 hover:text-white transition-colors"
            >
              <Package className="h-3 w-3" />
              <span>PyPI</span>
            </a>
          )}

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => sound.tap()}
              className="tactile-btn group/btn inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 font-mono text-[11px] font-medium text-white hover:bg-white hover:text-black transition-colors"
            >
              <Globe className="h-3 w-3" />
              <span>Live</span>
              <ArrowUpRight className="h-3 w-3 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </a>
          )}

          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => sound.tap()}
            className="tactile-btn group/btn inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black px-3.5 py-1.5 font-mono text-[11px] font-medium text-zinc-200 hover:border-white/35 hover:text-white transition-colors"
          >
            <span>Source</span>
            <ArrowUpRight className="h-3 w-3 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export function SystemsSection() {
  const [filter, setFilter] = useState<FilterTab>('all');

  const filteredProjects = useMemo(() => {
    if (filter === 'all') return PROJECTS;
    return PROJECTS.filter((p) => p.category === filter);
  }, [filter]);

  return (
    <section id="systems" className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-zinc-500">
              Projects
            </div>
            <h2 className="mt-2.5 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Selected Systems
            </h2>
          </div>

          <div className="obsidian-glass inline-flex flex-wrap gap-1 rounded-2xl p-1 self-start">
            {FILTER_TABS.map((tab) => {
              const active = filter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    sound.tap();
                    setFilter(tab.id);
                  }}
                  className={`relative rounded-xl px-3.5 py-1.5 font-mono text-xs transition-colors ${
                    active ? 'text-black font-semibold' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="project-filter-pill"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      className="absolute inset-0 rounded-xl bg-white"
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, idx) => (
            <ProjectCard key={project.id} project={project} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
