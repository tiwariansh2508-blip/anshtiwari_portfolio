import { useEffect, useState } from 'react';
import { Menu, X, Terminal, Command } from 'lucide-react';
import { navItems, personalInfo } from '@/data/portfolio';
import { useScrollSpy } from '@/hooks';

interface NavbarProps {
  navigate: (path: string) => void;
  currentPath: string;
  onOpenTerminal: () => void;
  onOpenPalette: () => void;
  toggleTheme: () => void;
  theme: 'dark' | 'light';
}

export function Navbar({
  navigate,
  currentPath,
  onOpenTerminal,
  onOpenPalette,
  toggleTheme,
  theme,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const sectionIds = navItems.map((item) => item.id);
  const activeSection = useScrollSpy(sectionIds);
  const darkMode = theme === 'dark';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [currentPath]);

  const handleNav = (path: string) => {
    navigate(path);
    setMobileOpen(false);
  };

  const isActive = (path: string) =>
    currentPath === path ||
    (path === '/' && currentPath === '/' && activeSection === 'home');

  const headerClass = scrolled
    ? darkMode
      ? 'border-b border-[#00e5ff]/20 bg-[#070b12]/90 shadow-[0_4px_30px_rgba(0,229,255,0.06)] backdrop-blur-xl'
      : 'border-b border-sky-200 bg-white/90 shadow-sm backdrop-blur-xl'
    : 'bg-transparent';

  const inactiveNavClass = darkMode
    ? 'text-slate-300 hover:text-[#00e5ff]'
    : 'text-slate-600 hover:text-sky-600';

  const utilityClass = darkMode
    ? 'text-slate-300 hover:bg-[#00e5ff]/10 hover:text-[#00e5ff]'
    : 'text-slate-600 hover:bg-sky-50 hover:text-sky-600';

  return (
    <>
      <header
        className={
          'fixed inset-x-0 top-0 z-50 transition-all duration-300 ' +
          headerClass
        }
      >
        <nav className="mx-auto flex h-16 max-w-8xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <button
            onClick={() => handleNav('/')}
            className="group flex items-center gap-2.5"
            aria-label="Go to home"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#00e5ff] font-display text-sm font-bold text-[#070b12] transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_22px_rgba(0,229,255,0.65)]">
              A
            </span>

            <span
              className={
                'hidden font-display text-sm font-semibold tracking-tight transition-colors sm:block ' +
                (darkMode
                  ? 'text-slate-100 group-hover:text-[#00e5ff]'
                  : 'text-slate-800 group-hover:text-sky-600')
              }
            >
              Ansh Tiwari
            </span>
          </button>

          {/* Desktop navigation */}
          <div className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => {
              const active = isActive(item.path);

              return (
                <button
                  key={item.path}
                  onClick={() => handleNav(item.path)}
                  aria-current={active ? 'page' : undefined}
                  className={
                    'relative rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 ' +
                    (active
                      ? darkMode
                        ? 'text-[#00e5ff]'
                        : 'text-sky-600'
                      : inactiveNavClass)
                  }
                >
                  {item.label}

                  {active && (
                    <span className="absolute bottom-0 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-[#00e5ff] shadow-[0_0_10px_rgba(0,229,255,0.8)]" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Utility buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenPalette}
              className={
                'hidden items-center gap-1.5 rounded-md border px-2.5 py-1.5 font-mono text-xs transition-all duration-200 sm:flex ' +
                (darkMode
                  ? 'border-slate-700 bg-[#0c1420]/80 text-slate-400 hover:border-[#00e5ff]/50 hover:text-[#00e5ff]'
                  : 'border-slate-200 bg-slate-100 text-slate-500 hover:border-sky-300 hover:text-sky-600')
              }
              aria-label="Open command palette"
            >
              <Command size={12} />
              <span>K</span>
            </button>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className={
                'flex h-9 w-9 items-center justify-center rounded-md transition-all duration-200 ' +
                utilityClass
              }
              aria-label={
                'Switch to ' + (darkMode ? 'light' : 'dark') + ' theme'
              }
            >
              {darkMode ? (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                </svg>
              ) : (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                </svg>
              )}
            </button>

            {/* Developer terminal */}
            <button
              onClick={onOpenTerminal}
              className={
                'flex h-9 w-9 items-center justify-center rounded-md transition-all duration-200 ' +
                utilityClass
              }
              aria-label="Open terminal"
            >
              <Terminal size={18} />
            </button>

            {/* Mobile menu */}
            <button
              onClick={() => setMobileOpen((open) => !open)}
              className={
                'flex h-9 w-9 items-center justify-center rounded-md transition-colors lg:hidden ' +
                utilityClass
              }
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile navigation */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            type="button"
            className={
              'absolute inset-0 h-full w-full backdrop-blur-sm ' +
              (darkMode ? 'bg-[#03060b]/80' : 'bg-slate-900/30')
            }
            onClick={() => setMobileOpen(false)}
            aria-label="Close navigation menu"
          />

          <div
            id="mobile-navigation"
            className={
              'absolute bottom-0 right-0 top-16 w-72 overflow-y-auto border-l p-4 animate-slide-in ' +
              (darkMode
                ? 'border-[#00e5ff]/20 bg-[#080e18]'
                : 'border-sky-200 bg-white')
            }
          >
            <nav
              className="flex flex-col gap-1"
              aria-label="Mobile navigation"
            >
              {navItems.map((item) => {
                const active = isActive(item.path);

                return (
                  <button
                    key={item.path}
                    onClick={() => handleNav(item.path)}
                    aria-current={active ? 'page' : undefined}
                    className={
                      'rounded-lg border px-4 py-3 text-left text-sm font-medium transition-all duration-200 ' +
                      (active
                        ? darkMode
                          ? 'border-[#00e5ff]/20 bg-[#00e5ff]/10 text-[#00e5ff]'
                          : 'border-sky-200 bg-sky-50 text-sky-700'
                        : darkMode
                          ? 'border-transparent text-slate-300 hover:bg-[#00e5ff]/5 hover:text-[#00e5ff]'
                          : 'border-transparent text-slate-700 hover:bg-sky-50 hover:text-sky-600')
                    }
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>

            <div
              className={
                'mt-4 border-t pt-4 ' +
                (darkMode ? 'border-slate-800' : 'border-slate-200')
              }
            >
              <button
                onClick={() => {
                  onOpenTerminal();
                  setMobileOpen(false);
                }}
                className={
                  'flex w-full items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition-colors ' +
                  inactiveNavClass
                }
              >
                <Terminal size={16} />
                Developer Terminal
              </button>

              <button
                onClick={() => {
                  onOpenPalette();
                  setMobileOpen(false);
                }}
                className={
                  'flex w-full items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition-colors ' +
                  inactiveNavClass
                }
              >
                <Command size={16} />
                Command Palette
              </button>

              <a
                href={'mailto:' + personalInfo.email}
                className={
                  'block break-words rounded-lg px-4 py-3 text-sm font-medium transition-colors ' +
                  (darkMode
                    ? 'text-slate-400 hover:text-[#00e5ff]'
                    : 'text-slate-600 hover:text-sky-600')
                }
              >
                {personalInfo.email}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}