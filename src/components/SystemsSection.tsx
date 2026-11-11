import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowUpRight,
  ChevronDown,
  GitFork,
  Globe,
  Layers,
  Package,
  Search,
  Star,
} from 'lucide-react';
import { PROJECTS, type ProjectCategory, type ProjectItem } from '../data/portfolioData';
import type { GitHubRepoMeta } from '../hooks/useGitHubRepos';
import { sound } from '../utils/sound';

type FilterTab = 'flagship' | ProjectCategory | 'github';

interface SystemsSectionProps {
  repos: GitHubRepoMeta[];
  repoMap: Map<string, GitHubRepoMeta>;
  syncedLive: boolean;
}

const FILTER_TABS: { id: FilterTab; label: string }[] = [
  { id: 'flagship', label: 'Flagship' },
  { id: 'rust-ai', label: 'Rust & AI' },
  { id: 'mcp', label: 'MCP & OS' },
  { id: 'fullstack', label: 'Full-Stack' },
  { id: 'github', label: 'All GitHub' },
];

function ProjectCard({
  project,
  liveRepo,
  index,
}: {
  project: ProjectItem;
  liveRepo?: GitHubRepoMeta;
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);

  const stars = liveRepo ? liveRepo.stargazers_count : project.starsFallback;
  const language = liveRepo?.language ?? project.language;
  const liveDemo = project.liveUrl || (liveRepo?.homepage ? liveRepo.homepage : undefined);

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
        {/* Card Header */}
        <div className="flex items-start justify-between gap-3">
          <span className="font-mono text-[11px] tracking-wider text-zinc-500">
            {project.kicker}
          </span>

          <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-400">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-0.5 text-zinc-300">
              <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
              {language}
            </span>
            {stars > 0 && (
              <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] px-2 py-0.5 text-zinc-300">
                <Star className="h-3 w-3" />
                {stars}
              </span>
            )}
          </div>
        </div>

        {/* Title & Summary */}
        <h3 className="mt-4 text-xl font-bold tracking-tight text-white">
          {project.name}
        </h3>
        <p className="mt-2.5 text-sm leading-relaxed text-zinc-400">
          {project.summary}
        </p>

        {/* Stack Chips */}
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

        {/* Rare UI Expandable Architecture Blueprint Drawer */}
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
                  <span>Architecture Notes</span>
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

      {/* Footer Controls */}
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

          {liveDemo && (
            <a
              href={liveDemo}
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

export function SystemsSection({ repos, repoMap, syncedLive }: SystemsSectionProps) {
  const [filter, setFilter] = useState<FilterTab>('flagship');
  const [search, setSearch] = useState('');
  const [langFilter, setLangFilter] = useState<string>('All');

  const filteredProjects = useMemo(() => {
    if (filter === 'flagship') return PROJECTS.filter((p) => p.featured);
    if (filter === 'rust-ai' || filter === 'mcp' || filter === 'fullstack') {
      return PROJECTS.filter((p) => p.category === filter);
    }
    return [];
  }, [filter]);

  const availableLanguages = useMemo(() => {
    const langs = new Set<string>();
    for (const r of repos) {
      if (r.language) langs.add(r.language);
    }
    return ['All', ...Array.from(langs).sort()];
  }, [repos]);

  const filteredGitHubRepos = useMemo(() => {
    const q = search.trim().toLowerCase();
    return repos.filter((r) => {
      if (langFilter !== 'All' && r.language !== langFilter) return false;
      if (!q) return true;
      return (
        r.name.toLowerCase().includes(q) ||
        (r.description ?? '').toLowerCase().includes(q) ||
        (r.language ?? '').toLowerCase().includes(q)
      );
    });
  }, [repos, search, langFilter]);

  return (
    <section id="systems" className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        {/* Section Heading */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-zinc-500">
              <span>Projects</span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-0.5 text-[10px] normal-case tracking-normal text-zinc-400">
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    syncedLive ? 'bg-white' : 'bg-zinc-500'
                  }`}
                />
                {syncedLive ? 'Live GitHub Sync' : 'GitHub Snapshot'}
              </span>
            </div>
            <h2 className="mt-2.5 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Selected Systems & Code
            </h2>
          </div>

          {/* Segmented Tab Bar */}
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

        {/* Curated Project Grid or Live GitHub Explorer */}
        {filter !== 'github' ? (
          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project, idx) => (
              <ProjectCard
                key={project.id}
                project={project}
                liveRepo={repoMap.get(project.repoName.toLowerCase())}
                index={idx}
              />
            ))}
          </div>
        ) : (
          <div className="mt-10">
            {/* Search & Language Filter Controls */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Filter repositories by name, language, description..."
                  className="w-full rounded-2xl border border-white/10 bg-[#08080b] py-2.5 pl-10 pr-4 font-mono text-xs text-white placeholder:text-zinc-500 focus:border-white/30 focus:outline-none"
                />
              </div>

              <div className="flex flex-wrap gap-1.5">
                {availableLanguages.map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => {
                      sound.tick();
                      setLangFilter(lang);
                    }}
                    className={`tactile-btn rounded-full border px-3 py-1 font-mono text-[11px] transition-colors ${
                      langFilter === lang
                        ? 'border-white bg-white text-black font-semibold'
                        : 'border-white/10 bg-white/[0.03] text-zinc-400 hover:border-white/25 hover:text-white'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            {/* Repository Directory Table/Grid */}
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {filteredGitHubRepos.map((repo) => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sound.tap()}
                  className="obsidian-card group flex flex-col justify-between rounded-2xl p-4"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate font-mono text-sm font-semibold text-white group-hover:underline">
                        {repo.name}
                      </span>
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-zinc-500 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
                    </div>
                    <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-zinc-400">
                      {repo.description || 'Source repository on github.com/krishnakanthpathi'}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between font-mono text-[11px] text-zinc-500">
                    <div className="flex items-center gap-3">
                      {repo.language && (
                        <span className="text-zinc-300">{repo.language}</span>
                      )}
                      {repo.stargazers_count > 0 && (
                        <span className="inline-flex items-center gap-1">
                          <Star className="h-3 w-3" />
                          {repo.stargazers_count}
                        </span>
                      )}
                      {repo.forks_count > 0 && (
                        <span className="inline-flex items-center gap-1">
                          <GitFork className="h-3 w-3" />
                          {repo.forks_count}
                        </span>
                      )}
                    </div>
                    {repo.homepage && (
                      <span className="rounded border border-white/10 bg-white/[0.04] px-1.5 py-0.5 text-[10px] text-zinc-300">
                        live
                      </span>
                    )}
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
