import { useEffect, useRef, useState } from 'react';
import { DitherCanvas } from './components/DitherCanvas';
import { Navbar, NAV_ITEMS } from './components/Navbar';
import { Hero } from './components/Hero';
import { SystemsSection } from './components/SystemsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ArsenalSection } from './components/ArsenalSection';
import { AnimeSection } from './components/AnimeSection';
import { Footer } from './components/Footer';

export function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const lockUntilRef = useRef<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      if (Date.now() < lockUntilRef.current) return;

      const atBottom =
        window.innerHeight + Math.ceil(window.scrollY) >=
        document.documentElement.scrollHeight - 40;
      if (atBottom) {
        setActiveSection('contact');
        return;
      }

      const marker = window.scrollY + 220;
      for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
        const item = NAV_ITEMS[i];
        const el = document.getElementById(item.id);
        if (!el) continue;
        if (marker >= el.offsetTop) {
          setActiveSection(item.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateTo = (id: string) => {
    setActiveSection(id);
    lockUntilRef.current = Date.now() + 750;

    if (id === 'contact') {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
      return;
    }

    const el = document.getElementById(id);
    if (el) {
      const top = Math.max(0, el.getBoundingClientRect().top + window.scrollY - 16);
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen overflow-x-clip bg-black text-zinc-100">
      <div className="pointer-events-none fixed inset-0 z-0 amoled-grid opacity-55" />
      <DitherCanvas opacity={0.22} />

      <Navbar activeSection={activeSection} onNavigate={navigateTo} />

      <main className="relative z-10">
        <Hero onExploreSystems={() => navigateTo('systems')} />
        <SystemsSection />
        <ExperienceSection />
        <ArsenalSection />
        <AnimeSection />
      </main>

      <Footer />
    </div>
  );
}

export default App;
