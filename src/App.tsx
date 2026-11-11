import { useEffect, useState } from 'react';
import { DitherCanvas } from './components/DitherCanvas';
import { Navbar, NAV_ITEMS } from './components/Navbar';
import { Hero } from './components/Hero';
import { SystemsSection } from './components/SystemsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ArsenalSection } from './components/ArsenalSection';
import { Footer } from './components/Footer';

export function App() {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const marker = window.scrollY + 240;
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (!el) continue;
        const top = el.offsetTop;
        const height = el.offsetHeight;
        if (marker >= top && marker < top + height) {
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
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-zinc-100">
      <div className="pointer-events-none fixed inset-0 z-0 amoled-grid opacity-55" />
      <DitherCanvas opacity={0.22} />

      <Navbar activeSection={activeSection} onNavigate={navigateTo} />

      <main className="relative z-10">
        <Hero onExploreSystems={() => navigateTo('systems')} />
        <SystemsSection />
        <ExperienceSection />
        <ArsenalSection />
      </main>

      <Footer />
    </div>
  );
}

export default App;
