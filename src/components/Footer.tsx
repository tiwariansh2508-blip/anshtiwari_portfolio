import {
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
} from 'lucide-react';
import { personalInfo, navItems } from '@/data/portfolio';

interface FooterProps {
  navigate: (path: string) => void;
}

export function Footer({ navigate }: FooterProps) {
  return (
    <footer className="relative mt-20 overflow-hidden border-t border-cyan-500/20 bg-white text-slate-900 transition-colors duration-300 dark:border-[#00e5ff]/20 dark:bg-[#070b12] dark:text-white">
      {/* Neon ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-0 h-64 w-64 rounded-full bg-cyan-400/[0.08] blur-[100px] dark:bg-[#00e5ff]/[0.06]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-sky-400/[0.08] blur-[110px] dark:bg-[#00bfff]/[0.06]"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <button
              type="button"
              onClick={() => navigate('/')}
              aria-label="Go to homepage"
              className="group mb-5 flex items-center gap-3 rounded-lg text-left outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 dark:focus-visible:ring-[#00e5ff]"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-500/50 bg-cyan-500/10 font-display text-lg font-bold text-cyan-700 shadow-[0_0_20px_rgba(0,229,255,0.08)] transition-all duration-300 group-hover:border-cyan-500 group-hover:shadow-[0_0_28px_rgba(0,229,255,0.2)] dark:border-[#00e5ff]/50 dark:bg-[#00e5ff]/10 dark:text-[#00e5ff] dark:shadow-[0_0_20px_rgba(0,229,255,0.12)] dark:group-hover:border-[#00e5ff] dark:group-hover:shadow-[0_0_28px_rgba(0,229,255,0.25)]">
                A
              </span>

              <span className="font-display text-lg font-semibold text-slate-900 transition-colors group-hover:text-cyan-700 dark:text-white dark:group-hover:text-[#00e5ff]">
                Ansh Manendra Tiwari
              </span>
            </button>

            <p className="max-w-md text-sm leading-7 text-slate-600 dark:text-slate-400">
              {personalInfo.headline}
            </p>

            <div className="mt-6 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
              <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(0,229,255,0.6)] dark:bg-[#00e5ff] dark:shadow-[0_0_10px_rgba(0,229,255,0.8)]" />
              <span>Building. Learning. Innovating.</span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="mb-5 flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700 dark:text-[#00e5ff]">
              <span className="h-px w-5 bg-cyan-500 dark:bg-[#00e5ff]" />
              Navigation
            </h4>

            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.path}>
                  <button
                    type="button"
                    onClick={() => navigate(item.path)}
                    className="group flex items-center gap-2 text-sm text-slate-600 transition-all duration-200 hover:translate-x-1 hover:text-cyan-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 dark:text-slate-400 dark:hover:text-[#00e5ff] dark:focus-visible:ring-[#00e5ff]"
                  >
                    <span className="h-1 w-1 rounded-full bg-slate-400 transition-colors group-hover:bg-cyan-500 group-hover:shadow-[0_0_8px_rgba(0,229,255,0.6)] dark:bg-slate-600 dark:group-hover:bg-[#00e5ff] dark:group-hover:shadow-[0_0_8px_rgba(0,229,255,0.8)]" />
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-5 flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700 dark:text-[#00e5ff]">
              <span className="h-px w-5 bg-cyan-500 dark:bg-[#00e5ff]" />
              Get in Touch
            </h4>

            <ul className="space-y-4">
              <li>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="group flex items-start gap-3 text-sm text-slate-600 transition-colors hover:text-cyan-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 dark:text-slate-400 dark:hover:text-[#00e5ff] dark:focus-visible:ring-[#00e5ff]"
                >
                  <Mail
                    size={16}
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-cyan-600/70 transition-colors group-hover:text-cyan-600 dark:text-[#00e5ff]/70 dark:group-hover:text-[#00e5ff]"
                  />
                  <span className="break-all">{personalInfo.email}</span>
                  <ArrowUpRight
                    size={13}
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 opacity-0 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                  />
                </a>
              </li>

              <li>
                <a
                  href={`tel:${personalInfo.phone}`}
                  className="group flex items-center gap-3 text-sm text-slate-600 transition-colors hover:text-cyan-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 dark:text-slate-400 dark:hover:text-[#00e5ff] dark:focus-visible:ring-[#00e5ff]"
                >
                  <Phone
                    size={16}
                    aria-hidden="true"
                    className="shrink-0 text-cyan-600/70 transition-colors group-hover:text-cyan-600 dark:text-[#00e5ff]/70 dark:group-hover:text-[#00e5ff]"
                  />
                  <span>{personalInfo.phone}</span>
                </a>
              </li>

              <li>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit LinkedIn profile (opens in a new tab)"
                  className="group flex items-center gap-3 text-sm text-slate-600 transition-colors hover:text-cyan-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 dark:text-slate-400 dark:hover:text-[#00e5ff] dark:focus-visible:ring-[#00e5ff]"
                >
                  <Linkedin
                    size={16}
                    aria-hidden="true"
                    className="shrink-0 text-cyan-600/70 transition-colors group-hover:text-cyan-600 dark:text-[#00e5ff]/70 dark:group-hover:text-[#00e5ff]"
                  />
                  <span>LinkedIn</span>
                  <ArrowUpRight
                    size={13}
                    aria-hidden="true"
                    className="opacity-0 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                  />
                </a>
              </li>

              <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
                <MapPin
                  size={16}
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-cyan-600/70 dark:text-[#00e5ff]/70"
                />
                <span>{personalInfo.location}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-5 border-t border-slate-200 pt-6 dark:border-white/[0.08] sm:flex-row">
          <p className="text-center font-mono text-[10px] leading-6 text-slate-500 sm:text-left sm:text-xs">
            © {new Date().getFullYear()} Ansh Manendra Tiwari.
            <span className="mt-1 block text-slate-500 sm:ml-1 sm:inline dark:text-slate-600">
              Built with React, TypeScript &amp; Tailwind CSS.
            </span>
          </p>

          <p className="flex items-center gap-2 font-mono text-[10px] text-slate-500 sm:text-xs">
            <span>Quick search</span>
            <kbd className="rounded-md border border-cyan-500/25 bg-cyan-500/[0.06] px-2 py-1 text-cyan-700 shadow-[0_0_10px_rgba(0,229,255,0.05)] dark:border-[#00e5ff]/25 dark:bg-[#00e5ff]/[0.06] dark:text-[#00e5ff] dark:shadow-[0_0_10px_rgba(0,229,255,0.05)]">
              Ctrl + K
            </kbd>
          </p>
        </div>
      </div>
    </footer>
  );
}
