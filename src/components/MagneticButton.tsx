import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { sound } from '../utils/sound';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
  ariaLabel?: string;
  strength?: number;
}

export function MagneticButton({
  children,
  className = '',
  onClick,
  href,
  target,
  rel,
  ariaLabel,
  strength = 0.28,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 360, damping: 18 });
  const springY = useSpring(y, { stiffness: 360, damping: 18 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width / 2)) * strength;
    const dy = (e.clientY - (rect.top + rect.height / 2)) * strength;
    x.set(dx);
    y.set(dy);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handlePress = () => {
    sound.tap();
    onClick?.();
  };

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      {href ? (
        <a
          href={href}
          target={target}
          rel={rel}
          aria-label={ariaLabel}
          onClick={() => sound.tap()}
          className={`tactile-btn ${className}`}
        >
          {children}
        </a>
      ) : (
        <button
          type="button"
          aria-label={ariaLabel}
          onClick={handlePress}
          className={`tactile-btn ${className}`}
        >
          {children}
        </button>
      )}
    </motion.div>
  );
}
