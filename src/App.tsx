import { useEffect, useState } from 'react';
import { DitherCanvas } from './components/DitherCanvas';
import { Navbar, NAV_ITEMS } from './components/Navbar';
import { Hero } from './components/Hero';
import { SystemsSection } from './components/SystemsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ArsenalSection } from './components/ArsenalSection';
import { Footer } from './components/Footer';
import { CommandPalette } from './components/CommandPalette';
import { useGitHubRepos } from './hooks/useGitHubRepos';
import { sound } from './utils/sound';

export function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [muted, setMuted] = useState(() => sound.isMuted());

  const { repos, repoMap, syncedLive } = useGitHubRepos();

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

  useEffect(() => {
    const onGlobalKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        sound.tap();
        setPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', onGlobalKey);
    return () => window.removeEventListener('keydown', onGlobalKey);
  }, []);

  const navigateTo = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleToggleMute = () => {
    const nextMuted = sound.toggleMute();
    setMuted(nextMuted);
  };

  return (
    <div className="relative min-h-screen bg-black text-zinc-100">
      <div className="pointer-events-none fixed inset-0 z-0 amoled-grid opacity-55" />
      <DitherCanvas opacity={0.22} />

      <Navbar
        activeSection={activeSection}
        muted={muted}
        onToggleMute={handleToggleMute}
        onNavigate={navigateTo}
        onOpenPalette={() => setPaletteOpen(true)}
      />

      <main className="relative z-10">
        <Hero
          repoCount={Math.max(repos.length, 47)}
          onExploreSystems={() => navigateTo('systems')}
          onOpenPalette={() => setPaletteOpen(true)}
        />
        <SystemsSection
          repos={repos}
          repoMap={repoMap}
          syncedLive={syncedLive}
        />
        <ExperienceSection />
        <ArsenalSection />
      </main>

      <Footer onOpenPalette={() => setPaletteOpen(true)} />

      <CommandPalette
        isOpen={paletteOpen}
        muted={muted}
        onClose={() => setPaletteOpen(false)}
        onNavigate={navigateTo}
        onToggleMute={handleToggleMute}
      />
    </div>
  );
}

export default App;
