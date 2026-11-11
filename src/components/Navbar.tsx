import { motion } from 'framer-motion';

export interface NavItem {
  id: string;
  label: string;
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'hero', label: 'Overview' },
  { id: 'systems', label: 'Systems' },
  { id: 'experience', label: 'Experience' },
  { id: 'arsenal', label: 'Arsenal' },
  { id: 'contact', label: 'Contact' },
];

interface NavbarProps {
  activeSection: string;
  onNavigate: (id: string) => void;
}

export function Navbar({ activeSection, onNavigate }: NavbarProps) {
  return (
    <header className="fixed top-4 left-0 right-0 z-40 flex justify-center px-4 pointer-events-none">
      <motion.nav
        initial={{ y: -20, opacity: 0, filter: 'blur(6px)' }}
        animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        aria-label="Primary navigation"
        className="pointer-events-auto obsidian-glass flex items-center gap-1 rounded-full p-1.5"
      >
        <button
          type="button"
          onClick={() => onNavigate('hero')}
          className="hidden sm:flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-xs font-medium tracking-tight text-white hover:bg-white/[0.06] transition-colors"
          aria-label="Scroll to top"
        >
          <span className="inline-block h-2 w-2 rotate-45 border border-white bg-white/80" />
          <span>KK</span>
        </button>

        <div className="hidden sm:block h-4 w-px bg-white/10 mx-0.5" />

        <div className="flex items-center gap-0.5 sm:gap-1">
          {NAV_ITEMS.map((item) => {
            const active = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                className={`relative rounded-full px-2.5 sm:px-3.5 py-1.5 text-xs font-medium transition-colors ${
                  active ? 'text-black' : 'text-zinc-400 hover:text-white'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="active-pill"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    className="absolute inset-0 rounded-full bg-white"
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            );
          })}
        </div>
      </motion.nav>
    </header>
  );
}
