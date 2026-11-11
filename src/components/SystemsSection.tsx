import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowUpRight,
  ChevronDown,
  Globe,
  Layers,
  Maximize2,
  Package,
  X,
} from 'lucide-react';
import { PROJECTS, type ProjectCategory, type ProjectItem } from '../data/portfolioData';

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
  onPreview,
}: {
  project: ProjectItem;
  index: number;
  onPreview: (project: ProjectItem) => void;
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
      className="obsidian-card group flex flex-col justify-between overflow-hidden rounded-3xl"
    >
      <div>
        <button
          type="button"
          onClick={() => onPreview(project)}
          aria-label={`Preview ${project.name}`}
          className="relative block aspect-video w-full overflow-hidden border-b border-white/[0.08] bg-black text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
        >
          <img
            src={project.image}
            alt={`${project.name} preview`}
            loading="lazy"
            className={`h-full w-full object-cover object-top transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] grayscale group-hover:grayscale-0 group-hover:scale-[1.03] group-hover:brightness-100 group-hover:contrast-100 ${
              project.brightPreview
                ? 'brightness-[0.74] contrast-[1.1]'
                : 'brightness-[0.88] contrast-[1.06]'
            }`}
          />

          <div
            className={`pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent transition-opacity duration-300 ${
              project.brightPreview
                ? 'opacity-90 group-hover:opacity-45'
                : 'opacity-80 group-hover:opacity-40'
            }`}
          />

          <span className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full border border-white/15 bg-black/70 text-zinc-300 opacity-0 backdrop-blur-md transition-all duration-200 group-hover:border-white/35 group-hover:text-white group-hover:opacity-100">
            <Maximize2 className="h-3 w-3" />
          </span>
        </button>

        <div className="p-6 pb-0">
          <div className="flex items-start justify-between gap-3">
            <span className="font-mono text-[11px] tracking-wider text-zinc-500">
              {project.kicker}
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-0.5 font-mono text-[11px] text-zinc-300">
              <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
              {project.language}
            </span>
          </div>

          <h3 className="mt-3.5 text-xl font-bold tracking-tight text-white">
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
      </div>

      <div className="p-6 pt-5">
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/[0.07] pt-4">
          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
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
              className="tactile-btn group/btn inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black px-3.5 py-1.5 font-mono text-[11px] font-medium text-zinc-200 hover:border-white/35 hover:text-white transition-colors"
            >
              <span>Source</span>
              <ArrowUpRight className="h-3 w-3 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function SystemsSection() {
  const [filter, setFilter] = useState<FilterTab>('all');
  const [previewProject, setPreviewProject] = useState<ProjectItem | null>(null);

  useEffect(() => {
    if (!previewProject) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPreviewProject(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [previewProject]);

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
                  onClick={() => setFilter(tab.id)}
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
            <ProjectCard
              key={project.id}
              project={project}
              index={idx}
              onPreview={setPreviewProject}
            />
          ))}
        </div>
      </div>

      {/* Project Visual Preview Lightbox */}
      <AnimatePresence>
        {previewProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setPreviewProject(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-8 backdrop-blur-xl"
            role="dialog"
            aria-modal="true"
            aria-label={`${previewProject.name} preview`}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, filter: 'blur(6px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.96, filter: 'blur(6px)' }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-white/15 bg-black shadow-2xl"
            >
              <div className="relative aspect-video w-full bg-black">
                <img
                  src={previewProject.image}
                  alt={`${previewProject.name} preview`}
                  className="h-full w-full object-contain"
                />
                <button
                  type="button"
                  onClick={() => setPreviewProject(null)}
                  aria-label="Close preview"
                  className="tactile-btn absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/75 text-zinc-200 backdrop-blur-md hover:border-white/40 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-6 py-4">
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">
                    {previewProject.kicker}
                  </div>
                  <div className="mt-0.5 text-sm font-semibold text-white">
                    {previewProject.name}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {previewProject.liveUrl && (
                    <a
                      href={previewProject.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="tactile-btn inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white px-3.5 py-1.5 font-mono text-xs font-semibold text-black hover:bg-zinc-200 transition-colors"
                    >
                      <span>Live</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  )}
                  <a
                    href={previewProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="tactile-btn inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 font-mono text-xs text-white hover:border-white/35 transition-colors"
                  >
                    <span>Source</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
