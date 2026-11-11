import { useState } from 'react';
import confetti from 'canvas-confetti';
import { ArrowUpRight, Check, Copy, Mail } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';
import { MagneticButton } from './MagneticButton';
import { sound } from '../utils/sound';

const SOCIAL_LINKS = [
  { label: 'GitHub', href: PROFILE.github },
  { label: 'LinkedIn', href: PROFILE.linkedin },
  { label: 'LeetCode', href: PROFILE.leetcode },
  { label: 'Codeforces', href: PROFILE.codeforces },
  { label: 'PyPI · lmem', href: PROFILE.pypiLmem },
];

export function Footer() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      sound.chime();
      confetti({
        particleCount: 34,
        spread: 60,
        origin: { y: 0.85 },
        colors: ['#ffffff', '#d4d4d8', '#a1a1aa', '#52525b'],
        disableForReducedMotion: true,
      });
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${PROFILE.email}`;
    }
  };

  return (
    <footer id="contact" className="relative border-t border-white/[0.08] py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <div className="obsidian-card rounded-3xl p-8 sm:p-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-zinc-500">
                Contact
              </div>
              <h2 className="mt-2.5 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Get in touch
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-400">
                Reach out for Software Engineering, Backend, or AI Systems roles.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <MagneticButton
                href={`mailto:${PROFILE.email}`}
                className="group inline-flex h-11 items-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-black hover:bg-zinc-200 transition-colors"
              >
                <Mail className="h-4 w-4" />
                <span>Send Email</span>
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </MagneticButton>

              <MagneticButton
                onClick={handleCopy}
                className="inline-flex h-11 items-center gap-2 rounded-full border border-white/15 bg-black px-5 font-mono text-xs text-zinc-200 hover:border-white/35 hover:text-white transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-white" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5 text-zinc-400" />
                    <span>{PROFILE.email}</span>
                  </>
                )}
              </MagneticButton>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-4 border-t border-white/[0.08] pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-4">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sound.tap()}
                  className="group inline-flex items-center gap-1 font-mono text-xs text-zinc-400 hover:text-white transition-colors"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              ))}
            </div>

            <span className="font-mono text-xs text-zinc-500">
              Krishna Kanth Pathi
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
