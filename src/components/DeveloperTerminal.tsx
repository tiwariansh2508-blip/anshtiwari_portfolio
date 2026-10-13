
import { useState, useRef, useEffect, useCallback } from 'react';
import {
  X,
  Terminal as TerminalIcon,
  ChevronRight,
  Minus,
  Maximize2,
} from 'lucide-react';
import {
  personalInfo,
  skills,
  projects,
  experiences,
  educationList,
  certifications,
  navItems,
} from '@/data/portfolio';

interface TerminalProps {
  open: boolean;
  onClose: () => void;
  navigate: (path: string) => void;
}

interface TerminalLine {
  type: 'command' | 'output' | 'error';
  content: string;
}

export function DeveloperTerminal({
  open,
  onClose,
  navigate,
}: TerminalProps) {
  const [lines, setLines] = useState<TerminalLine[]>([
    {
      type: 'output',
      content: 'Developer Terminal v1.0.0 — Ansh Manendra Tiwari',
    },
    {
      type: 'output',
      content: 'System initialized. Welcome to the portfolio terminal.',
    },
    {
      type: 'output',
      content: "Type 'help' to see available commands.",
    },
  ]);

  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const historyDraftRef = useRef('');

  useEffect(() => {
    if (!open) return;

    const frame = requestAnimationFrame(() => {
      inputRef.current?.focus();
    });

    return () => cancelAnimationFrame(frame);
  }, [open]);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [lines]);

  const addLine = useCallback(
    (type: TerminalLine['type'], content: string) => {
      setLines((previous) => [
        ...previous,
        { type, content },
      ]);
    },
    [],
  );

  const executeCommand = useCallback(
    (rawCommand: string) => {
      const trimmed = rawCommand.trim();
      if (!trimmed) return;

      addLine('command', `$ ${trimmed}`);

      const normalized = trimmed.toLowerCase();
      const [command, ...args] = normalized.split(/\s+/);

      switch (command) {
        case 'help':
          addLine('output', 'AVAILABLE COMMANDS');
          addLine('output', '────────────────────────────────────────');
          addLine('output', '  help           Show available commands');
          addLine('output', '  about          Display personal information');
          addLine('output', '  skills         List technical skills');
          addLine('output', '  projects       List portfolio projects');
          addLine('output', '  experience     Show work experience');
          addLine('output', '  education      Show education history');
          addLine('output', '  certifications List certifications');
          addLine('output', '  contact        Display contact information');
          addLine('output', '  resume         Open resume PDF');
          addLine('output', '  clear          Clear terminal output');
          addLine('output', '  go <page>      Navigate to a portfolio page');
          addLine('output', '');
          addLine('output', 'Example: go projects');
          break;

        case 'about':
          addLine('output', 'PERSONAL PROFILE');
          addLine('output', '────────────────────────────────────────');
          addLine('output', `Name:     ${personalInfo.name}`);
          addLine('output', `Role:     ${personalInfo.title}`);
          addLine('output', `Location: ${personalInfo.location}`);
          addLine('output', '');
          addLine('output', personalInfo.intro);
          break;

        case 'skills':
          addLine('output', `TECHNICAL SKILLS (${skills.length})`);
          addLine('output', '────────────────────────────────────────');

          skills.forEach((skill) => {
            addLine(
              'output',
              `  ${skill.name} — ${skill.category}`,
            );
          });
          break;

        case 'projects':
          addLine('output', `PORTFOLIO PROJECTS (${projects.length})`);
          addLine('output', '────────────────────────────────────────');

          projects.forEach((project, index) => {
            addLine('output', `${index + 1}. ${project.name}`);
            addLine('output', `   ${project.tagline}`);
            addLine(
              'output',
              `   Stack: ${project.techStack.join(', ')}`,
            );
            addLine(
              'output',
              `   Route: /projects/${project.slug}`,
            );
          });
          break;

        case 'experience':
          addLine('output', 'WORK EXPERIENCE');
          addLine('output', '────────────────────────────────────────');

          experiences.forEach((experience) => {
            addLine(
              'output',
              `${experience.role} — ${experience.company}`,
            );
            addLine(
              'output',
              `  ${experience.period}${experience.current ? ' (Current)' : ''}`,
            );

            experience.highlights.forEach((highlight) => {
              addLine('output', `  • ${highlight}`);
            });

            addLine('output', '');
          });
          break;

        case 'education':
          addLine('output', 'EDUCATION');
          addLine('output', '────────────────────────────────────────');

          educationList.forEach((education) => {
            addLine('output', education.degree);
            addLine('output', `  ${education.institution}`);
            addLine(
              'output',
              `  ${education.period}${education.current ? ' (In Progress)' : ''}`,
            );
            addLine('output', '');
          });
          break;

        case 'contact':
          addLine('output', 'CONTACT INFORMATION');
          addLine('output', '────────────────────────────────────────');
          addLine('output', `Email:    ${personalInfo.email}`);
          addLine('output', `Phone:    ${personalInfo.phone}`);
          addLine('output', `LinkedIn: ${personalInfo.linkedin}`);
          addLine('output', `Location: ${personalInfo.location}`);
          break;

        case 'resume': {
          addLine('output', 'Opening resume PDF...');

          const resumeWindow = window.open(
            '/resume.pdf',
            '_blank',
            'noopener,noreferrer',
          );

          if (!resumeWindow) {
            addLine(
              'error',
              'The browser may have blocked the new tab. Allow pop-ups and try again.',
            );
          }

          break;
        }

        case 'certifications':
          addLine('output', 'CERTIFICATIONS');
          addLine('output', '────────────────────────────────────────');

          certifications.forEach((certification) => {
            addLine(
              'output',
              `  ${certification.title} — ${certification.issuer} (${certification.date})`,
            );
          });
          break;

        case 'go': {
          const requestedPage = args.join(' ');

          if (!requestedPage) {
            addLine(
              'error',
              `Usage: go <page>. Available pages: ${navItems.map((item) => item.id).join(', ')}`,
            );
            break;
          }

          const navItem = navItems.find(
            (item) =>
              item.id.toLowerCase() === requestedPage ||
              item.label.toLowerCase() === requestedPage ||
              item.path.toLowerCase() === requestedPage,
          );

          if (navItem) {
            addLine('output', `Navigating to ${navItem.label}...`);
            navigate(navItem.path);
            onClose();
          } else {
            addLine(
              'error',
              `Page "${requestedPage}" not found.`,
            );
            addLine(
              'output',
              `Available pages: ${navItems.map((item) => item.id).join(', ')}`,
            );
          }

          break;
        }

        case 'clear':
          setLines([]);
          break;

        default:
          addLine(
            'error',
            `Command not found: ${command}. Type 'help' for available commands.`,
          );
      }
    },
    [addLine, navigate, onClose],
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const command = input.trim();

    if (!command) return;

    setHistory((previous) => [...previous, command]);
    setHistoryIndex(-1);
    historyDraftRef.current = '';
    executeCommand(command);
    setInput('');
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowUp') {
      event.preventDefault();

      if (history.length === 0) return;

      if (historyIndex === -1) {
        historyDraftRef.current = input;
      }

      const nextIndex =
        historyIndex === -1
          ? history.length - 1
          : Math.max(0, historyIndex - 1);

      setHistoryIndex(nextIndex);
      setInput(history[nextIndex]);
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();

      if (historyIndex === -1) return;

      const nextIndex = historyIndex + 1;

      if (nextIndex >= history.length) {
        setHistoryIndex(-1);
        setInput(historyDraftRef.current);
      } else {
        setHistoryIndex(nextIndex);
        setInput(history[nextIndex]);
      }
    } else if (event.key === 'Escape') {
      event.preventDefault();
      onClose();
    }
  };

  useEffect(() => {
    if (!open) return;

    const handleGlobalKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      }
    };

    document.addEventListener('keydown', handleGlobalKeyDown);

    return () => {
      document.removeEventListener('keydown', handleGlobalKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-5"
      role="dialog"
      aria-modal="true"
      aria-label="Developer Terminal"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close developer terminal"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-[#02050a]/85 backdrop-blur-md"
      />

      {/* Terminal window */}
      <div
        className="relative flex h-[540px] max-h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-xl border border-[#00bfff]/30 bg-[#060b12] shadow-[0_0_0_1px_rgba(0,191,255,0.05),0_25px_90px_rgba(0,0,0,0.65),0_0_35px_rgba(0,191,255,0.12)] animate-fade-up"
        onMouseDown={(event) => event.stopPropagation()}
      >
        {/* Window title bar */}
        <div className="flex items-center justify-between gap-3 border-b border-[#00bfff]/20 bg-[#0a111c] px-4 py-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex items-center gap-1.5" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            </div>

            <div className="h-4 w-px bg-[#00bfff]/20" />

            <TerminalIcon
              size={15}
              className="shrink-0 text-[#00e5ff]"
              aria-hidden="true"
            />

            <span className="truncate font-mono text-xs text-slate-300">
              ansh@portfolio:~
            </span>

            <span className="hidden rounded border border-[#00bfff]/20 bg-[#00bfff]/[0.07] px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-[#00bfff] sm:inline-flex">
              Terminal
            </span>
          </div>

          <div className="flex items-center gap-1">
            <span className="mr-2 hidden items-center gap-1.5 font-mono text-[9px] text-[#00bfff]/70 sm:flex">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#00e5ff]" />
              SESSION ACTIVE
            </span>

            <button
              type="button"
              onClick={onClose}
              className="flex h-7 w-7 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-red-500/10 hover:text-red-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00e5ff]"
              aria-label="Close terminal"
            >
              <X size={15} />
            </button>
          </div>
        </div>

        {/* Terminal output */}
        <div
          ref={outputRef}
          className="terminal-output min-h-0 flex-1 overflow-y-auto overscroll-contain p-4 font-mono text-xs leading-6 sm:p-5 sm:text-sm"
          onClick={() => inputRef.current?.focus()}
          aria-live="polite"
          aria-relevant="additions text"
        >
          <div className="mb-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] uppercase tracking-[0.18em] text-slate-500">
            <span className="text-[#00e5ff]">SYSTEM</span>
            <span className="text-slate-700">/</span>
            <span>PORTFOLIO CLI</span>
            <span className="text-slate-700">/</span>
            <span>V1.0.0</span>
          </div>

          {lines.map((line, index) => (
            <div
              key={`${index}-${line.type}`}
              className={`mb-0.5 whitespace-pre-wrap break-words ${
                line.type === 'command'
                  ? 'text-[#00e5ff]'
                  : line.type === 'error'
                    ? 'text-rose-400'
                    : 'text-slate-300'
              }`}
            >
              {line.type === 'output' && line.content !== '' && (
                <span className="mr-2 select-none text-[#00bfff]/50">
                  {'›'}
                </span>
              )}

              {line.content || '\u00A0'}
            </div>
          ))}

          <div className="h-2" />
        </div>

        {/* Input */}
        <form
          onSubmit={handleSubmit}
          className="border-t border-[#00bfff]/20 bg-[#080e17] px-4 py-3 sm:px-5"
        >
          <div className="mb-2 flex items-center justify-between gap-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-slate-500">
              Command Input
            </span>

            <span className="font-mono text-[10px] text-slate-600">
              ↑ ↓ HISTORY
            </span>
          </div>

          <div className="flex items-center gap-2">
            <ChevronRight
              size={17}
              className="shrink-0 text-[#00e5ff]"
              aria-hidden="true"
            />

            <span className="shrink-0 font-mono text-xs text-[#00bfff]">
              ~
            </span>

            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleKeyDown}
              className="min-w-0 flex-1 bg-transparent font-mono text-sm text-[#e4f7ff] outline-none placeholder:text-slate-600 focus-visible:ring-0"
              placeholder="Type a command... (try 'help')"
              aria-label="Terminal command input"
              autoComplete="off"
              autoCapitalize="none"
              spellCheck={false}
            />

            <button
              type="submit"
              disabled={!input.trim()}
              className="rounded-md border border-[#00bfff]/30 bg-[#00bfff]/[0.08] px-3 py-1.5 font-mono text-[10px] text-[#00e5ff] transition-all hover:border-[#00e5ff]/60 hover:bg-[#00bfff]/15 disabled:cursor-not-allowed disabled:opacity-30"
            >
              RUN ↵
            </button>
          </div>
        </form>

        {/* Status bar */}
        <div className="flex items-center justify-between gap-3 border-t border-[#00bfff]/10 bg-[#04080e] px-4 py-2">
          <div className="flex items-center gap-3 font-mono text-[9px] text-slate-600">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#00e5ff]" />
              READY
            </span>
            <span className="hidden sm:inline">UTF-8</span>
            <span className="hidden sm:inline">LOCAL SESSION</span>
          </div>

          <span className="font-mono text-[9px] text-[#00bfff]/60">
            ANSH PORTFOLIO CLI
          </span>
        </div>
      </div>
    </div>
  );
}
