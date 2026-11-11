import { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { ArrowUpRight, Check, Copy, Github, Terminal } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';
import { GravityLetters } from './GravityLetters';
import { MagneticButton } from './MagneticButton';
import { sound } from '../utils/sound';

interface HeroProps {
  onExploreSystems: () => void;
}

const SMOOTH_OUT = [0.22, 1, 0.36, 1] as const;

export function Hero({ onExploreSystems }: HeroProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedInstall, setCopiedInstall] = useState(false);

  const fireMonochromeBurst = () => {
    confetti({
      particleCount: 36,
      spread: 58,
      origin: { y: 0.65 },
      colors: ['#ffffff', '#e4e4e7', '#a1a1aa', '#52525b'],
      disableForReducedMotion: true,
    });
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      sound.chime();
      fireMonochromeBurst();
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2200);
    } catch {
      window.location.href = `mailto:${PROFILE.email}`;
    }
  };

  const handleCopyInstall = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.installCmd);
      sound.tap();
      setCopiedInstall(true);
      setTimeout(() => setCopiedInstall(false), 1800);
    } catch {
      // ignore clipboard errors
    }
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="mx-auto w-full max-w-6xl">
        {/* Kinetic Title */}
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl leading-[1.06]">
          <GravityLetters text={PROFILE.name} />
        </h1>

        <motion.div
          initial={{ y: 14, opacity: 0, filter: 'blur(4px)' }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.45, delay: 0.16, ease: SMOOTH_OUT }}
          className="mt-4 font-mono text-sm sm:text-base text-zinc-300"
        >
          <span>{PROFILE.role}</span>
        </motion.div>

        <motion.p
          initial={{ y: 14, opacity: 0, filter: 'blur(4px)' }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.45, delay: 0.24, ease: SMOOTH_OUT }}
          className="mt-5 max-w-2xl text-base sm:text-lg leading-relaxed text-zinc-400"
        >
          {PROFILE.headline}
        </motion.p>

        {/* Action Bar */}
        <motion.div
          initial={{ y: 14, opacity: 0, filter: 'blur(4px)' }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.45, delay: 0.32, ease: SMOOTH_OUT }}
          className="mt-9 flex flex-wrap items-center gap-3"
        >
          <MagneticButton
            onClick={onExploreSystems}
            className="group inline-flex h-11 items-center gap-2.5 rounded-full bg-white px-5 text-sm font-semibold text-black hover:bg-zinc-200 transition-colors"
          >
            <span>Explore Systems</span>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black/10 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </MagneticButton>

          <MagneticButton
            href={PROFILE.github}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex h-11 items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 text-sm font-medium text-zinc-200 hover:border-white/30 hover:bg-white/[0.08] hover:text-white transition-colors"
          >
            <Github className="h-4 w-4" />
            <span>GitHub</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-zinc-400 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
          </MagneticButton>

          <MagneticButton
            onClick={handleCopyEmail}
            className="inline-flex h-11 items-center gap-2 rounded-full border border-white/12 bg-black px-5 font-mono text-xs font-medium text-zinc-300 hover:border-white/25 hover:text-white transition-colors"
          >
            {copiedEmail ? (
              <>
                <Check className="h-3.5 w-3.5 text-white" />
                <span className="text-white">Copied {PROFILE.email}</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 text-zinc-400" />
                <span>{PROFILE.email}</span>
              </>
            )}
          </MagneticButton>
        </motion.div>

        {/* Flagship Package Quick-Copy */}
        <motion.div
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.45, delay: 0.4, ease: SMOOTH_OUT }}
          className="mt-6 flex flex-wrap items-center gap-3"
        >
          <button
            type="button"
            onClick={handleCopyInstall}
            className="tactile-btn inline-flex items-center gap-2.5 rounded-xl border border-white/10 bg-[#08080b] px-3.5 py-2 font-mono text-xs text-zinc-300 hover:border-white/25 hover:text-white"
          >
            <Terminal className="h-3.5 w-3.5 text-zinc-500" />
            <span className="text-zinc-500">$</span>
            <span>{PROFILE.installCmd}</span>
            <span className="ml-1 border-l border-white/10 pl-2 text-[11px] text-zinc-500">
              {copiedInstall ? 'copied' : 'copy'}
            </span>
          </button>
        </motion.div>

        {/* Telemetry Strip */}
        <motion.div
          initial={{ y: 18, opacity: 0, filter: 'blur(4px)' }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.5, delay: 0.46, ease: SMOOTH_OUT }}
          className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-4"
        >
          {PROFILE.stats.map((stat) => (
            <div
              key={stat.label}
              className="obsidian-card rounded-2xl p-4 sm:p-5"
            >
              <div className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">
                {stat.label}
              </div>
              <div className="mt-2 font-mono text-lg sm:text-xl font-semibold text-white">
                {stat.value}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
