
import {
  useState,
  useRef,
  useEffect,
  useMemo,
  useId,
} from 'react';
import {
  Search,
  ArrowRight,
  CornerDownLeft,
  ArrowUp,
  ArrowDown,
  Command,
  Mail,
  Linkedin,
  Download,
  Moon,
  Sun,
  X,
  Check,
  Copy,
} from 'lucide-react';
import { navItems, projects, personalInfo } from '@/data/portfolio';

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  navigate: (path: string) => void;
  toggleTheme: () => void;
  theme: 'dark' | 'light';
}

interface PaletteAction {
  id: string;
  label: string;
  category: string;
  icon: typeof Search;
  action: () => void | Promise<void>;
  keywords?: string;
}

export function CommandPalette({
  open,
  onClose,
  navigate,
  toggleTheme,
  theme,
}: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'error'>('idle');

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const dialogId = useId();
  const listId = `${dialogId}-list`;
  const inputId = `${dialogId}-input`;

  const close = () => onClose();

  const actions = useMemo<PaletteAction[]>(() => {
    const dismiss = () => onClose();

    return [
      ...navItems.map((item) => ({
        id: `nav-${item.id}`,
        label: `Go to ${item.label}`,
        category: 'Navigation',
        icon: ArrowRight,
        action: () => {
          navigate(item.path);
          dismiss();
        },
        keywords: item.label,
      })),

      ...projects.map((project) => ({
        id: `project-${project.slug}`,
        label: `Open case study: ${project.name}`,
        category: 'Projects',
        icon: ArrowRight,
        action: () => {
          navigate(`/projects/${project.slug}`);
          dismiss();
        },
        keywords: `${project.name} ${project.tagline} ${project.techStack.join(' ')}`,
      })),

      {
        id: 'skills',
        label: 'View Skills',
        category: 'Navigation',
        icon: ArrowRight,
        action: () => {
          navigate('/skills');
          dismiss();
        },
        keywords: 'technical skills technologies',
      },

      {
        id: 'download-resume',
        label: 'Download Resume',
        category: 'Actions',
        icon: Download,
        action: () => {
          window.open('/resume.pdf', '_blank', 'noopener,noreferrer');
          dismiss();
        },
        keywords: 'cv pdf print',
      },

      {
        id: 'open-linkedin',
        label: 'Open LinkedIn Profile',
        category: 'Links',
        icon: Linkedin,
        action: () => {
          window.open(personalInfo.linkedin, '_blank', 'noopener,noreferrer');
          dismiss();
        },
        keywords: 'professional social profile',
      },

      {
        id: 'copy-email',
        label: copyStatus === 'copied' ? 'Email Address Copied' : 'Copy Email Address',
        category: 'Actions',
        icon: copyStatus === 'copied' ? Check : Copy,
        action: async () => {
          try {
            await navigator.clipboard.writeText(personalInfo.email);
            setCopyStatus('copied');
          } catch {
            setCopyStatus('error');
          }
        },
        keywords: `email contact ${personalInfo.email}`,
      },

      {
        id: 'contact',
        label: 'View Contact Information',
        category: 'Navigation',
        icon: Mail,
        action: () => {
          navigate('/contact');
          dismiss();
        },
        keywords: 'contact message reach',
      },

      {
        id: 'toggle-theme',
        label: `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Theme`,
        category: 'Settings',
        icon: theme === 'dark' ? Sun : Moon,
        action: () => {
          toggleTheme();
          dismiss();
        },
        keywords: 'appearance colors mode',
      },
    ];
  }, [navigate, onClose, toggleTheme, theme, copyStatus]);

  const filteredActions = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) return actions;

    return actions.filter((action) =>
      [
        action.label,
        action.category,
        action.keywords ?? '',
      ].some((value) => value.toLowerCase().includes(normalizedQuery)),
    );
  }, [actions, query]);

  useEffect(() => {
    if (!open) return;

    setQuery('');
    setActiveIndex(0);
    setCopyStatus('idle');

    const frame = requestAnimationFrame(() => {
      inputRef.current?.focus();
    });

    return () => cancelAnimationFrame(frame);
  }, [open]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    if (!open || !listRef.current) return;

    const activeElement = listRef.current.querySelector<HTMLElement>(
      `[data-action-index="${activeIndex}"]`,
    );

    activeElement?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex, open]);

  useEffect(() => {
    if (!open) return;

    const handleGlobalKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        close();
      }
    };

    document.addEventListener('keydown', handleGlobalKeyDown);

    return () => {
      document.removeEventListener('keydown', handleGlobalKeyDown);
    };
  }, [open, onClose]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();

      setActiveIndex((previous) =>
        filteredActions.length === 0
          ? 0
          : (previous + 1) % filteredActions.length,
      );
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();

      setActiveIndex((previous) =>
        filteredActions.length === 0
          ? 0
          : (previous - 1 + filteredActions.length) % filteredActions.length,
      );
    } else if (event.key === 'Enter') {
      event.preventDefault();
      void filteredActions[activeIndex]?.action();
    }
  };

  if (!open) return null;

  let lastCategory = '';

  return (
    <div
      className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto px-4 pb-8 pt-[12vh] sm:pt-[15vh]"
      role="dialog"
      aria-modal="true"
      aria-labelledby={`${dialogId}-title`}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close command palette"
        onClick={close}
        className="absolute inset-0 cursor-default bg-[#02050a]/80 backdrop-blur-md"
      />

      {/* Palette */}
      <div
        className="relative w-full max-w-xl animate-fade-up overflow-hidden rounded-2xl border border-[#00bfff]/30 bg-[#080e17] shadow-[0_0_0_1px_rgba(0,191,255,0.06),0_20px_80px_rgba(0,0,0,0.65),0_0_35px_rgba(0,191,255,0.12)]"
        onMouseDown={(event) => event.stopPropagation()}
      >
        {/* Neon accent */}
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#00e5ff] to-transparent" />

        {/* Search input */}
        <div className="flex items-center gap-3 border-b border-[#00bfff]/15 px-4 py-4 sm:px-5">
          <Search
            size={19}
            className="shrink-0 text-[#00e5ff]"
            aria-hidden="true"
          />

          <div className="min-w-0 flex-1">
            <h2
              id={`${dialogId}-title`}
              className="sr-only"
            >
              Command Palette
            </h2>

            <label htmlFor={inputId} className="sr-only">
              Search commands, pages and projects
            </label>

            <input
              ref={inputRef}
              id={inputId}
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-500"
              placeholder="Search actions, pages, projects..."
              role="combobox"
              aria-autocomplete="list"
              aria-expanded="true"
              aria-controls={listId}
              aria-activedescendant={
                filteredActions[activeIndex]
                  ? `${listId}-${filteredActions[activeIndex].id}`
                  : undefined
              }
              autoComplete="off"
              spellCheck={false}
            />
          </div>

          <kbd className="hidden shrink-0 items-center rounded-md border border-[#00bfff]/20 bg-[#00bfff]/[0.06] px-2 py-1 font-mono text-[10px] text-[#79dfff] sm:flex">
            ESC
          </kbd>

          <button
            type="button"
            onClick={close}
            aria-label="Close palette"
            className="rounded-md p-1.5 text-slate-500 transition-colors hover:bg-[#00bfff]/10 hover:text-[#00e5ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00e5ff]"
          >
            <X size={17} />
          </button>
        </div>

        {/* Search status */}
        <div className="flex items-center justify-between border-b border-[#00bfff]/10 px-5 py-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
            {query ? 'Search Results' : 'Quick Actions'}
          </span>

          <span className="font-mono text-[10px] text-[#00bfff]/80">
            {filteredActions.length} {filteredActions.length === 1 ? 'COMMAND' : 'COMMANDS'}
          </span>
        </div>

        {/* Results */}
        {filteredActions.length === 0 ? (
          <div className="flex min-h-44 flex-col items-center justify-center px-5 py-10 text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl border border-[#00bfff]/20 bg-[#00bfff]/[0.06]">
              <Search size={21} className="text-[#00bfff]/70" />
            </div>

            <p className="text-sm font-medium text-slate-200">
              No matching commands
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Try another search term for "{query}".
            </p>
          </div>
        ) : (
          <div
            ref={listRef}
            id={listId}
            className="max-h-[48vh] overflow-y-auto p-2"
            role="listbox"
            aria-label="Available commands"
          >
            {filteredActions.map((action, index) => {
              const showCategory = action.category !== lastCategory;
              lastCategory = action.category;

              const Icon = action.icon;
              const isActive = activeIndex === index;

              return (
                <div key={action.id}>
                  {showCategory && (
                    <div className="px-3 pb-1 pt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[#00bfff]/65 first:pt-2">
                      {action.category}
                    </div>
                  )}

                  <button
                    id={`${listId}-${action.id}`}
                    data-action-index={index}
                    type="button"
                    onClick={() => void action.action()}
                    onMouseEnter={() => setActiveIndex(index)}
                    className={`group flex w-full items-center gap-3 rounded-lg border px-3 py-3 text-left text-sm transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00e5ff] ${
                      isActive
                        ? 'border-[#00bfff]/25 bg-[#00bfff]/[0.10] text-[#00e5ff] shadow-[inset_2px_0_0_#00e5ff]'
                        : 'border-transparent text-slate-300 hover:border-[#00bfff]/15 hover:bg-[#00bfff]/[0.05] hover:text-slate-100'
                    }`}
                    role="option"
                    aria-selected={isActive}
                  >
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-colors ${
                        isActive
                          ? 'border-[#00bfff]/30 bg-[#00bfff]/10 text-[#00e5ff]'
                          : 'border-slate-700/70 bg-slate-800/50 text-slate-400 group-hover:border-[#00bfff]/20 group-hover:text-[#00bfff]'
                      }`}
                    >
                      <Icon size={15} aria-hidden="true" />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block truncate">{action.label}</span>

                      {action.id === 'copy-email' && copyStatus === 'error' && (
                        <span className="mt-1 block text-xs text-amber-300">
                          Clipboard unavailable. Check browser permissions.
                        </span>
                      )}
                    </span>

                    {isActive && (
                      <span className="flex shrink-0 items-center gap-1.5 font-mono text-[10px] text-[#00bfff]">
                        <CornerDownLeft size={13} />
                        <span className="hidden sm:inline">ENTER</span>
                      </span>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* Footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#00bfff]/15 bg-[#050a11] px-4 py-3 sm:px-5">
          <div className="flex items-center gap-3 font-mono text-[10px] text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="flex items-center gap-0.5 rounded border border-slate-700 bg-slate-800/70 px-1 py-0.5">
                <ArrowUp size={10} />
                <ArrowDown size={10} />
              </span>
              Navigate
            </span>

            <span className="flex items-center gap-1.5">
              <kbd className="rounded border border-slate-700 bg-slate-800/70 px-1.5 py-0.5">
                ↵
              </kbd>
              Select
            </span>
          </div>

          <span className="flex items-center gap-1.5 font-mono text-[10px] text-slate-500">
            <Command size={12} className="text-[#00bfff]" />
            <span>COMMAND CENTER</span>
          </span>
        </div>
      </div>
    </div>
  );
}
