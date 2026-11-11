import { useEffect, useState } from 'react';
import { PROFILE, PROJECTS } from '../data/portfolioData';

export interface GitHubRepoMeta {
  id: number;
  name: string;
  html_url: string;
  homepage: string | null;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  updated_at: string;
  pushed_at: string;
  topics?: string[];
}

interface CacheEnvelope {
  fetchedAt: number;
  repos: GitHubRepoMeta[];
}

const CACHE_KEY = 'kk_github_repos_v1';
const CACHE_TTL_MS = 15 * 60 * 1000;

const FALLBACK_REPOS: GitHubRepoMeta[] = PROJECTS.map((p, idx) => ({
  id: idx + 1,
  name: p.repoName,
  html_url: p.githubUrl,
  homepage: p.liveUrl ?? null,
  description: p.summary,
  language: p.language,
  stargazers_count: p.starsFallback,
  forks_count: 0,
  fork: false,
  updated_at: '2026-11-11T00:00:00Z',
  pushed_at: '2026-11-11T00:00:00Z',
}));

export function useGitHubRepos() {
  const [repos, setRepos] = useState<GitHubRepoMeta[]>(() => {
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CacheEnvelope;
        if (Array.isArray(parsed.repos) && parsed.repos.length > 0) {
          return parsed.repos;
        }
      }
    } catch {
      // ignore storage access issues
    }
    return FALLBACK_REPOS;
  });

  const [syncedLive, setSyncedLive] = useState(false);

  useEffect(() => {
    let active = true;

    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CacheEnvelope;
        if (Date.now() - parsed.fetchedAt < CACHE_TTL_MS && parsed.repos.length > 0) {
          setSyncedLive(true);
          return;
        }
      }
    } catch {
      // ignore cache read failures
    }

    const controller = new AbortController();

    fetch(
      `https://api.github.com/users/${PROFILE.handle}/repos?sort=updated&per_page=100`,
      {
        headers: { Accept: 'application/vnd.github+json' },
        signal: controller.signal,
      }
    )
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<GitHubRepoMeta[]>;
      })
      .then((data) => {
        if (!active || !Array.isArray(data)) return;
        const clean = data.filter(
          (r) => r && r.name && r.name !== PROFILE.handle && r.name !== 'krishnakanth'
        );
        if (clean.length > 0) {
          setRepos(clean);
          setSyncedLive(true);
          try {
            const payload: CacheEnvelope = { fetchedAt: Date.now(), repos: clean };
            localStorage.setItem(CACHE_KEY, JSON.stringify(payload));
          } catch {
            // ignore storage quota errors
          }
        }
      })
      .catch(() => {
        // gracefully keep verified fallback catalog
      });

    return () => {
      active = false;
      controller.abort();
    };
  }, []);

  const repoMap = new Map<string, GitHubRepoMeta>();
  for (const r of repos) {
    repoMap.set(r.name.toLowerCase(), r);
  }

  return { repos, repoMap, syncedLive };
}
