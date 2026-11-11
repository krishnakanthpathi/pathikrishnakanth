import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowUpRight,
  Copy,
  Hash,
  Search,
  Terminal,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';
import { PROFILE, PROJECTS } from '../data/portfolioData';
import { NAV_ITEMS } from './Navbar';
import { sound } from '../utils/sound';

interface PaletteAction {
  id: string;
  group: 'Navigation' | 'Projects' | 'Actions';
  label: string;
  hint: string;
  run: () => void;
}

interface CommandPaletteProps {
  isOpen: boolean;
  muted: boolean;
  onClose: () => void;
  onNavigate: (id: string) => void;
  onToggleMute: () => void;
}

export function CommandPalette({
  isOpen,
  muted,
  onClose,
  onNavigate,
  onToggleMute,
}: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const actions = useMemo<PaletteAction[]>(() => {
    const navActions: PaletteAction[] = NAV_ITEMS.map((item) => ({
      id: `nav-${item.id}`,
      group: 'Navigation',
      label: `Jump to ${item.label}`,
      hint: `#${item.id}`,
      run: () => {
        onNavigate(item.id);
        onClose();
      },
    }));

    const projectActions: PaletteAction[] = PROJECTS.map((p) => ({
      id: `proj-${p.id}`,
      group: 'Projects',
      label: `${p.name} — ${p.language}`,
      hint: p.liveUrl ? 'live + github' : 'github',
      run: () => {
        window.open(p.liveUrl ?? p.githubUrl, '_blank', 'noopener,noreferrer');
        onClose();
      },
    }));

    const utilityActions: PaletteAction[] = [
      {
        id: 'copy-email',
        group: 'Actions',
        label: `Copy Email (${PROFILE.email})`,
        hint: 'clipboard',
        run: () => {
          navigator.clipboard.writeText(PROFILE.email).catch(() => {});
          sound.chime();
          onClose();
        },
      },
      {
        id: 'copy-lmem',
        group: 'Actions',
        label: 'Copy LightMem Install (pip install lmem)',
        hint: 'pypi',
        run: () => {
          navigator.clipboard.writeText(PROFILE.installCmd).catch(() => {});
          sound.chime();
          onClose();
        },
      },
      {
        id: 'open-github',
        group: 'Actions',
        label: 'Open GitHub Profile (krishnakanthpathi)',
        hint: 'external',
        run: () => {
          window.open(PROFILE.github, '_blank', 'noopener,noreferrer');
          onClose();
        },
      },
      {
        id: 'open-leetcode',
        group: 'Actions',
        label: 'Open LeetCode Knight Profile',
        hint: 'external',
        run: () => {
          window.open(PROFILE.leetcode, '_blank', 'noopener,noreferrer');
          onClose();
        },
      },
      {
        id: 'toggle-audio',
        group: 'Actions',
        label: muted ? 'Unmute Tactile Audio' : 'Mute Tactile Audio',
        hint: 'web audio',
        run: () => {
          onToggleMute();
          onClose();
        },
      },
    ];

    return [...navActions, ...utilityActions, ...projectActions];
  }, [muted, onClose, onNavigate, onToggleMute]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return actions;
    return actions.filter(
      (a) =>
        a.label.toLowerCase().includes(q) ||
        a.group.toLowerCase().includes(q) ||
        a.hint.toLowerCase().includes(q)
    );
  }, [actions, query]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query, isOpen]);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setTimeout(() => inputRef.current?.focus(), 20);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        sound.tick();
        setSelectedIndex((prev) => (prev + 1) % Math.max(filtered.length, 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        sound.tick();
        setSelectedIndex(
          (prev) => (prev - 1 + Math.max(filtered.length, 1)) % Math.max(filtered.length, 1)
        );
      } else if (e.key === 'Enter' && filtered[selectedIndex]) {
        e.preventDefault();
        sound.tap();
        filtered[selectedIndex].run();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [filtered, isOpen, onClose, selectedIndex]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.16 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 px-4 pt-20 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.96, y: -10, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.96, y: -8, opacity: 0 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="obsidian-glass w-full max-w-xl overflow-hidden rounded-3xl"
          >
            {/* Input Bar */}
            <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3.5">
              <Search className="h-4 w-4 text-zinc-400" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search sections, GitHub projects, or commands..."
                className="w-full bg-transparent font-mono text-sm text-white placeholder:text-zinc-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close command palette"
                className="rounded-lg p-1 text-zinc-500 hover:bg-white/[0.08] hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Action List */}
            <div className="max-h-80 overflow-y-auto p-2">
              {filtered.length === 0 ? (
                <div className="py-10 text-center font-mono text-xs text-zinc-500">
                  No matching commands or repositories.
                </div>
              ) : (
                filtered.map((action, idx) => {
                  const selected = idx === selectedIndex;
                  return (
                    <button
                      key={action.id}
                      type="button"
                      onMouseEnter={() => setSelectedIndex(idx)}
                      onClick={() => {
                        sound.tap();
                        action.run();
                      }}
                      className={`flex w-full items-center justify-between rounded-2xl px-3.5 py-2.5 text-left transition-colors ${
                        selected
                          ? 'bg-white text-black'
                          : 'text-zinc-300 hover:bg-white/[0.06]'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {action.group === 'Navigation' ? (
                          <Hash className="h-3.5 w-3.5 shrink-0 opacity-70" />
                        ) : action.id === 'toggle-audio' ? (
                          muted ? (
                            <Volume2 className="h-3.5 w-3.5 shrink-0 opacity-70" />
                          ) : (
                            <VolumeX className="h-3.5 w-3.5 shrink-0 opacity-70" />
                          )
                        ) : action.id.startsWith('copy-') ? (
                          <Copy className="h-3.5 w-3.5 shrink-0 opacity-70" />
                        ) : action.group === 'Projects' ? (
                          <Terminal className="h-3.5 w-3.5 shrink-0 opacity-70" />
                        ) : (
                          <ArrowUpRight className="h-3.5 w-3.5 shrink-0 opacity-70" />
                        )}

                        <span className="truncate text-sm font-medium">
                          {action.label}
                        </span>
                      </div>

                      <span
                        className={`ml-3 shrink-0 font-mono text-[11px] ${
                          selected ? 'text-black/70' : 'text-zinc-500'
                        }`}
                      >
                        {action.hint}
                      </span>
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer Hints */}
            <div className="flex items-center justify-between border-t border-white/[0.08] px-4 py-2.5 font-mono text-[11px] text-zinc-500">
              <span>Arrows navigate · Enter executes</span>
              <span>Esc closes</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
