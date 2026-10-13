import { useEffect } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { useRouter, useReveal, useKeyboardShortcut } from '@/hooks';
import { useState } from 'react';

import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ScrollProgress } from '@/components/ScrollProgress';
import { DeveloperTerminal } from '@/components/DeveloperTerminal';
import { CommandPalette } from '@/components/CommandPalette';
import { NotFound } from '@/components/NotFound';
import { PrintResume } from '@/components/PrintResume';

import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { SkillsExplorer } from '@/components/sections/SkillsExplorer';
import { Experience } from '@/components/sections/Experience';
import { Projects } from '@/components/sections/Projects';
import { CaseStudy } from '@/components/sections/CaseStudy';
import { Education } from '@/components/sections/Education';
import { Contact } from '@/components/sections/Contact';

import { projects } from '@/data/portfolio';

function AppContent() {
  const { theme, toggleTheme } = useTheme();
  const { route, navigate } = useRouter();
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);

  useReveal();

  useKeyboardShortcut('k', () => setPaletteOpen(true), { ctrlKey: true });
  useKeyboardShortcut('k', () => setPaletteOpen(true), { metaKey: true });

  // Re-run reveal observer on route change
  useEffect(() => {
    const timer = setTimeout(() => {
      const elements = document.querySelectorAll('.reveal:not(.visible)');
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
      );
      elements.forEach((el) => observer.observe(el));
      return () => observer.disconnect();
    }, 100);
    return () => clearTimeout(timer);
  }, [route.path]);

  const renderPage = () => {
    const { path } = route;

    // Print resume page — special layout, no chrome
    if (path === '/resume/print') {
      return <PrintResume />;
    }

    // Project case study routes
    if (path.startsWith('/projects/')) {
      const slug = path.replace('/projects/', '');
      const project = projects.find((p) => p.slug === slug);
      if (project) {
        return <CaseStudy project={project} navigate={navigate} />;
      }
      return <NotFound navigate={navigate} onOpenTerminal={() => setTerminalOpen(true)} />;
    }

    // Section pages — each renders just its section scrolled into focus
    switch (path) {
      case '/':
        return (
          <main>
            <Hero navigate={navigate} />
            <About navigate={navigate} />
            <SkillsExplorer navigate={navigate} />
            <Experience />
            <Projects navigate={navigate} />
            <Education />
            <Contact />
            <HowItWorks />
          </main>
        );
      case '/about':
        return (
          <main className="pt-16">
            <About navigate={navigate} />
          </main>
        );
      case '/skills':
        return (
          <main className="pt-16">
            <SkillsExplorer navigate={navigate} />
          </main>
        );
      case '/experience':
        return (
          <main className="pt-16">
            <Experience />
          </main>
        );
      case '/projects':
        return (
          <main className="pt-16">
            <Projects navigate={navigate} />
          </main>
        );
      case '/education':
        return (
          <main className="pt-16">
            <Education />
          </main>
        );
      case '/contact':
        return (
          <main className="pt-16">
            <Contact />
          </main>
        );
      default:
        return <NotFound navigate={navigate} onOpenTerminal={() => setTerminalOpen(true)} />;
    }
  };

  const showChrome = route.path !== '/resume/print';

  return (
    <>
      {showChrome && <ScrollProgress />}
      {showChrome && (
        <Navbar
          navigate={navigate}
          currentPath={route.path}
          onOpenTerminal={() => setTerminalOpen(true)}
          onOpenPalette={() => setPaletteOpen(true)}
          toggleTheme={toggleTheme}
          theme={theme}
        />
      )}

      {renderPage()}

      {showChrome && <Footer navigate={navigate} />}

      <DeveloperTerminal
        open={terminalOpen}
        onClose={() => setTerminalOpen(false)}
        navigate={navigate}
      />

      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        navigate={navigate}
        toggleTheme={toggleTheme}
        theme={theme}
      />
    </>
  );
}

function HowItWorks() {
  return (
    <section className="py-20 dark:bg-ink-950 bg-warm-50">
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        <div className="reveal mb-10">
          <p className="text-xs font-mono uppercase tracking-[0.2em] dark:text-cobalt-400 text-cobalt-600 mb-3">
            Meta
          </p>
          <h2 className="font-display text-display-lg font-semibold dark:text-ink-50 text-ink-900 mb-3 text-balance">
            How this portfolio works.
          </h2>
          <p className="text-sm dark:text-ink-400 text-ink-600 max-w-2xl">
            A brief look at the technology and design decisions behind this site.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 reveal">
          {[
            {
              label: 'Stack',
              value: 'React 18 + TypeScript + Vite + Tailwind CSS',
              detail: 'No framework router — a minimal custom hash-free router built with the History API.',
            },
            {
              label: 'Animations',
              value: 'CSS keyframes + IntersectionObserver',
              detail: 'Scroll-triggered reveals, SVG dash animations, and typed-text effect — no animation library dependency.',
            },
            {
              label: 'Data',
              value: 'Static TypeScript constants',
              detail: 'All portfolio content lives in a single typed data file derived from the actual resume. No CMS, no fake data.',
            },
            {
              label: 'Chess engine',
              value: 'Pure JavaScript game logic',
              detail: 'Complete chess rule set including castling, en passant, promotion, check and checkmate — no chess library used.',
            },
            {
              label: 'Architecture diagrams',
              value: 'Inline SVG + CSS',
              detail: 'System diagrams are rendered as interactive SVGs with clickable components and animated data-flow lines.',
            },
            {
              label: 'Terminal & palette',
              value: 'Custom React components',
              detail: 'The developer terminal and command palette are built from scratch with keyboard navigation and command history.',
            },
          ].map((item) => (
            <div
              key={item.label}
              className="p-5 rounded-xl border dark:border-ink-800 border-warm-200 dark:bg-ink-900/40 bg-warm-50"
            >
              <p className="text-xs font-mono dark:text-cobalt-400 text-cobalt-600 mb-1.5">{item.label}</p>
              <p className="text-sm font-medium dark:text-ink-100 text-ink-800 mb-2">{item.value}</p>
              <p className="text-xs dark:text-ink-400 text-ink-500 leading-relaxed">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AppContent;
