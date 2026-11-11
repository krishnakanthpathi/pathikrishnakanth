import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Terminal } from 'lucide-react';
import { EXPERIENCE } from '../data/portfolioData';

export function ExperienceSection() {
  return (
    <section id="experience" className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <div className="font-mono text-xs uppercase tracking-widest text-zinc-500">
          Experience
        </div>
        <h2 className="mt-2.5 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Work & Education
        </h2>

        <div className="relative mt-10 space-y-5 before:absolute before:left-[23px] before:top-4 before:bottom-4 before:w-px before:bg-white/10 sm:before:left-[27px]">
          {EXPERIENCE.map((item, idx) => {
            const Icon =
              item.type === 'work'
                ? Briefcase
                : item.type === 'internship'
                ? Terminal
                : GraduationCap;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.42,
                  delay: idx * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative pl-14 sm:pl-16"
              >
                {/* Node Marker */}
                <div className="absolute left-0 top-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-black text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12)] sm:h-14 sm:w-14">
                  <Icon className="h-5 w-5" />
                </div>

                <div className="obsidian-card rounded-3xl p-6 sm:p-7">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="rounded-md border border-white/12 bg-white/[0.04] px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-zinc-300">
                          {item.type === 'work'
                            ? 'Full-Time'
                            : item.type === 'internship'
                            ? 'Internship'
                            : 'Education'}
                        </span>
                        <span className="font-mono text-xs text-zinc-500">
                          {item.location}
                        </span>
                      </div>
                      <h3 className="mt-2 text-lg sm:text-xl font-bold text-white">
                        {item.role}
                      </h3>
                      <p className="mt-0.5 font-mono text-sm text-zinc-300">
                        {item.company}
                      </p>
                    </div>

                    <div className="font-mono text-xs text-zinc-400 sm:text-right shrink-0">
                      {item.period}
                    </div>
                  </div>

                  <ul className="mt-4 space-y-2">
                    {item.highlights.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-2.5 text-sm leading-relaxed text-zinc-400"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-500" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {item.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-lg border border-white/[0.07] bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] text-zinc-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
