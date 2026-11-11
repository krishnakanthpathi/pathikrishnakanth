import { motion } from 'framer-motion';
import { ArrowUpRight, Award, Code2, Cpu, ShieldCheck } from 'lucide-react';
import { CREDENTIALS, STACK_DOMAINS } from '../data/portfolioData';
import { sound } from '../utils/sound';

export function ArsenalSection() {
  return (
    <section id="arsenal" className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl space-y-20">
        {/* Credentials & Competitive Programming */}
        <div>
          <div className="font-mono text-xs uppercase tracking-widest text-zinc-500">
            Achievements
          </div>
          <h2 className="mt-2.5 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Coding & Certifications
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CREDENTIALS.map((cred, idx) => {
              const Icon =
                cred.id === 'leetcode' || cred.id === 'codeforces'
                  ? Code2
                  : cred.id.startsWith('servicenow')
                  ? ShieldCheck
                  : cred.id === 'pypi-crates'
                  ? Cpu
                  : Award;

              const CardWrapper = cred.url ? 'a' : 'div';
              const linkProps = cred.url
                ? {
                    href: cred.url,
                    target: '_blank',
                    rel: 'noreferrer',
                    onClick: () => sound.tap(),
                  }
                : {};

              return (
                <motion.div
                  key={cred.id}
                  initial={{ opacity: 0, y: 14, filter: 'blur(4px)' }}
                  whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{
                    duration: 0.38,
                    delay: idx * 0.04,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <CardWrapper
                    {...linkProps}
                    className={`obsidian-card group flex h-full flex-col justify-between rounded-3xl p-6 ${
                      cred.url ? 'cursor-pointer' : ''
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">
                          {cred.label}
                        </span>
                        <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-zinc-200">
                          {cred.url ? (
                            <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          ) : (
                            <Icon className="h-4 w-4" />
                          )}
                        </div>
                      </div>

                      <h3 className="mt-4 font-mono text-xl font-bold text-white">
                        {cred.metric}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                        {cred.detail}
                      </p>
                    </div>

                    <div className="mt-5 border-t border-white/[0.06] pt-3 font-mono text-[11px] text-zinc-500">
                      {cred.issuer}
                    </div>
                  </CardWrapper>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Technical Stack Matrix */}
        <div>
          <div className="font-mono text-xs uppercase tracking-widest text-zinc-500">
            Stack
          </div>
          <h2 className="mt-2.5 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Tools & Technologies
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STACK_DOMAINS.map((domain, idx) => (
              <motion.div
                key={domain.title}
                initial={{ opacity: 0, y: 14, filter: 'blur(4px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.38,
                  delay: idx * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="obsidian-card rounded-3xl p-6"
              >
                <div className="font-mono text-xs text-zinc-500">
                  {domain.code}
                </div>
                <h3 className="mt-3 text-lg font-semibold text-white">
                  {domain.title}
                </h3>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {domain.items.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-lg border border-white/[0.08] bg-black px-2.5 py-1 font-mono text-xs text-zinc-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
