import { motion } from 'framer-motion';

interface GravityLettersProps {
  text: string;
  className?: string;
  delayOffset?: number;
}

const SMOOTH_OUT = [0.22, 1, 0.36, 1] as const;

export function GravityLetters({ text, className = '', delayOffset = 0 }: GravityLettersProps) {
  const words = text.split(' ');
  let globalIndex = 0;

  return (
    <span className={`inline-flex flex-wrap ${className}`} aria-label={text}>
      {words.map((word, wIdx) => (
        <span key={`${word}-${wIdx}`} className="inline-flex whitespace-nowrap mr-[0.28em] last:mr-0">
          {word.split('').map((char, cIdx) => {
            const idx = globalIndex++;
            return (
              <motion.span
                key={`${char}-${cIdx}`}
                aria-hidden="true"
                initial={{ y: 20, opacity: 0, filter: 'blur(6px)' }}
                animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                transition={{
                  duration: 0.5,
                  delay: delayOffset + idx * 0.022,
                  ease: SMOOTH_OUT,
                }}
                whileHover={{
                  y: -4,
                  transition: { type: 'spring', stiffness: 450, damping: 18 },
                }}
                className="inline-block cursor-default select-none"
              >
                {char}
              </motion.span>
            );
          })}
        </span>
      ))}
    </span>
  );
}
