import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
import { ANIME_FRAMES } from '../data/portfolioData';

const SMOOTH_OUT = [0.22, 1, 0.36, 1] as const;

export function AnimeSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (activeIndex === null) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveIndex(null);
      } else if (e.key === 'ArrowRight') {
        setActiveIndex((prev) =>
          prev === null ? null : (prev + 1) % ANIME_FRAMES.length
        );
      } else if (e.key === 'ArrowLeft') {
        setActiveIndex((prev) =>
          prev === null
            ? null
            : (prev - 1 + ANIME_FRAMES.length) % ANIME_FRAMES.length
        );
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [activeIndex]);

  const activeFrame = activeIndex !== null ? ANIME_FRAMES[activeIndex] : null;

  return (
    <section id="anime" className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-zinc-500">
              Off-Clock
            </div>
            <h2 className="mt-2.5 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Anime
            </h2>
          </div>

          <div className="inline-flex items-center gap-2 self-start rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 font-mono text-xs text-zinc-400">
            <span className="h-1.5 w-1.5 rounded-full bg-white/75" />
            <span>Favorite · Attack on Titan</span>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
          {ANIME_FRAMES.map((frame, idx) => (
            <motion.button
              key={frame.id}
              type="button"
              onClick={() => setActiveIndex(idx)}
              initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.4,
                delay: idx * 0.05,
                ease: SMOOTH_OUT,
              }}
              aria-label={`View ${frame.series} — ${frame.title}`}
              className="obsidian-card group relative aspect-video w-full overflow-hidden rounded-3xl text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
            >
              <img
                src={frame.src}
                alt={`${frame.series} — ${frame.title}`}
                loading="lazy"
                className={`h-full w-full object-cover transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] grayscale group-hover:grayscale-0 group-hover:scale-[1.03] group-hover:brightness-100 group-hover:contrast-100 ${
                  frame.brightEdge
                    ? 'brightness-[0.72] contrast-[1.12]'
                    : 'brightness-[0.86] contrast-[1.08]'
                }`}
              />

              {/* Dark scrim keeping white typography legible and edges grounded on #000 */}
              <div
                className={`pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/15 transition-opacity duration-300 ${
                  frame.brightEdge ? 'opacity-95 group-hover:opacity-75' : 'opacity-90 group-hover:opacity-70'
                }`}
              />
              {frame.brightEdge && (
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent transition-opacity duration-300 group-hover:opacity-30" />
              )}

              <div className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-black/65 text-zinc-300 opacity-80 backdrop-blur-md transition-all duration-200 group-hover:border-white/35 group-hover:text-white group-hover:opacity-100">
                <Maximize2 className="h-3.5 w-3.5" />
              </div>

              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                <div className="font-mono text-[11px] uppercase tracking-wider text-zinc-400">
                  {frame.series}
                </div>
                <h3 className="mt-1 text-lg font-semibold tracking-tight text-white">
                  {frame.title}
                </h3>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeFrame && activeIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setActiveIndex(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-8 backdrop-blur-xl"
            role="dialog"
            aria-modal="true"
            aria-label={`${activeFrame.series} — ${activeFrame.title}`}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, filter: 'blur(6px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.96, filter: 'blur(6px)' }}
              transition={{ duration: 0.25, ease: SMOOTH_OUT }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-white/15 bg-black shadow-2xl"
            >
              <div className="relative aspect-video w-full bg-black">
                <img
                  src={activeFrame.src}
                  alt={`${activeFrame.series} — ${activeFrame.title}`}
                  className="h-full w-full object-contain"
                />

                <button
                  type="button"
                  onClick={() => setActiveIndex(null)}
                  aria-label="Close preview"
                  className="tactile-btn absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/75 text-zinc-200 backdrop-blur-md hover:border-white/40 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setActiveIndex(
                      (activeIndex - 1 + ANIME_FRAMES.length) % ANIME_FRAMES.length
                    )
                  }
                  aria-label="Previous wallpaper"
                  className="tactile-btn absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/75 text-zinc-200 backdrop-blur-md hover:border-white/40 hover:text-white"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setActiveIndex((activeIndex + 1) % ANIME_FRAMES.length)
                  }
                  aria-label="Next wallpaper"
                  className="tactile-btn absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/75 text-zinc-200 backdrop-blur-md hover:border-white/40 hover:text-white"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-6 py-4">
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">
                    {activeFrame.series}
                  </div>
                  <div className="mt-0.5 text-sm font-semibold text-white">
                    {activeFrame.title}
                  </div>
                </div>

                <div className="font-mono text-xs text-zinc-400">
                  {activeIndex + 1} / {ANIME_FRAMES.length}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
