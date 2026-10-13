import { useEffect, useState } from 'react';
import { ArrowRight, Download, Mail, ChevronDown } from 'lucide-react';
import { personalInfo, techStrip } from '@/data/portfolio';

interface HeroProps {
  navigate: (path: string) => void;
}

const headlines = [
  'Building Reliable Software, One System at a Time.',
  'Java. Spring Boot. REST APIs. Full-Stack.',
  'Systems that are structured, secure, maintainable.',
];

export function Hero({ navigate }: HeroProps) {
  const [textIndex, setTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullText = headlines[textIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayText.length < fullText.length) {
      timeout = setTimeout(
        () => setDisplayText(fullText.slice(0, displayText.length + 1)),
        40,
      );
    } else if (!isDeleting && displayText.length === fullText.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2500);
    } else if (isDeleting && displayText.length > 0) {
      timeout = setTimeout(
        () => setDisplayText(fullText.slice(0, displayText.length - 1)),
        25,
      );
    } else if (isDeleting && displayText.length === 0) {
      setIsDeleting(false);
      setTextIndex((prev) => (prev + 1) % headlines.length);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, textIndex]);

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-slate-50 pb-16 pt-24 text-slate-900 transition-colors duration-300 dark:bg-[#070b12] dark:text-white sm:pb-12"
    >
      {/* Background grid */}
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern bg-[size:40px_40px] opacity-40 dark:opacity-50" />

      {/* Neon cyan background glow */}
      <div className="pointer-events-none absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-[#00bfff]/[0.09] blur-[120px] dark:bg-[#00e5ff]/10" />
      <div className="pointer-events-none absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-[#00bfff]/[0.08] blur-[100px] dark:bg-[#00bfff]/10" />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left: Content */}
          <div className="animate-fade-up space-y-6 lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00bfff]/30 bg-[#00bfff]/[0.06] px-3 py-1.5 font-mono text-xs dark:border-[#00e5ff]/25 dark:bg-[#00e5ff]/[0.06]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-pulse rounded-full bg-emerald-500 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="text-slate-700 dark:text-slate-300">
                Available for opportunities
              </span>
            </div>

            <div>
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-[#008db8] dark:text-[#00e5ff]">
                Software Engineer · Nagpur, India
              </p>

              <h1 className="font-display text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-6xl lg:text-7xl xl:text-8xl">
                ANSH
                <br />
                MANENDRA
                <br />
                <span className="text-[#008db8] drop-shadow-[0_0_18px_rgba(0,191,255,0.18)] dark:text-[#00e5ff] dark:drop-shadow-[0_0_18px_rgba(0,229,255,0.25)]">
                  TIWARI
                </span>
              </h1>
            </div>

            <div
              className="flex min-h-16 items-center"
              aria-live="polite"
              aria-atomic="true"
            >
              <p className="font-display text-lg text-slate-700 dark:text-slate-200 sm:text-xl">
                {displayText}
                <span className="ml-0.5 inline-block h-5 w-0.5 animate-type-cursor bg-[#00bfff] dark:bg-[#00e5ff]" />
              </p>
            </div>

            <p className="max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg">
              {personalInfo.intro}
            </p>

            {/* Tech strip */}
            <div className="flex flex-wrap gap-2">
              {techStrip.map((tech) => (
                <span
                  key={tech}
                  className="rounded border border-slate-200 bg-white/80 px-2.5 py-1 font-mono text-xs text-slate-600 transition-colors hover:border-[#00bfff] hover:text-[#008db8] dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-400 dark:hover:border-[#00e5ff] dark:hover:text-[#00e5ff]"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="button"
                onClick={() => navigate('/projects')}
                className="group inline-flex items-center gap-2 rounded-lg border border-[#00bfff] bg-[#00bfff] px-5 py-3 text-sm font-semibold text-[#041018] transition-all hover:border-[#00d5ff] hover:bg-[#70f1ff] hover:shadow-[0_0_24px_rgba(0,191,255,0.30)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00bfff] focus-visible:ring-offset-2 dark:border-[#00e5ff] dark:bg-[#00e5ff] dark:hover:shadow-[0_0_24px_rgba(0,229,255,0.4)]"
              >
                Explore My Work
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </button>

              <a
                href="/resume.pdf"
                download
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-800 transition-all hover:border-[#00bfff] hover:bg-[#00bfff]/[0.05] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-[#00e5ff] dark:hover:bg-slate-800"
              >
                <Download size={16} />
                Resume
              </a>

              <button
                type="button"
                onClick={() => navigate('/contact')}
                className="inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-medium text-slate-600 transition-all hover:bg-[#00bfff]/[0.06] hover:text-[#008db8] dark:text-slate-300 dark:hover:bg-[#00e5ff]/[0.05] dark:hover:text-[#00e5ff]"
              >
                <Mail size={16} />
                Contact
              </button>
            </div>
          </div>

          {/* Right: SVG illustration */}
          <div
            className="hidden animate-fade-in lg:col-span-5 lg:block"
            style={{ animationDelay: '0.3s' }}
          >
            <SystemIllustration />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        type="button"
        onClick={() => navigate('/about')}
        className="absolute bottom-5 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 rounded-md px-3 py-2 font-mono text-xs text-slate-500 transition-colors hover:text-[#008db8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00bfff] dark:text-slate-500 dark:hover:text-[#00e5ff]"
        aria-label="Scroll to about section"
      >
        <span>Scroll</span>
        <ChevronDown size={16} className="animate-scroll-bounce" />
      </button>
    </section>
  );
}

function SystemIllustration() {
  return (
    <svg
      viewBox="0 0 400 400"
      className="mx-auto w-full max-w-md"
      role="img"
      aria-label="Stylized software system illustration showing API connections, code, and database symbols"
    >
      <defs>
        <linearGradient id="grad-line" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00bfff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#00e5ff" stopOpacity="0.1" />
        </linearGradient>

        <linearGradient id="grad-box" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#101d2c" stopOpacity="1" />
          <stop offset="100%" stopColor="#0b111c" stopOpacity="1" />
        </linearGradient>
      </defs>

      {/* Code window */}
      <g transform="translate(20, 30)">
        <rect
          width="180"
          height="100"
          rx="8"
          fill="url(#grad-box)"
          stroke="#00e5ff"
          strokeOpacity="0.55"
          strokeWidth="1"
        />
        <rect width="180" height="24" rx="8" fill="#122131" />

        <circle cx="12" cy="12" r="3" fill="#dc2626" />
        <circle cx="24" cy="12" r="3" fill="#d97706" />
        <circle cx="36" cy="12" r="3" fill="#16a34a" />

        <text
          x="90"
          y="14"
          textAnchor="middle"
          fill="#00e5ff"
          fontSize="7"
          fontFamily="JetBrains Mono, monospace"
        >
          Backend.java
        </text>

        <text
          x="12"
          y="42"
          fill="#00e5ff"
          fontSize="8"
          fontFamily="JetBrains Mono, monospace"
        >
          @RestController
        </text>
        <text
          x="12"
          y="56"
          fill="#e9ebed"
          fontSize="8"
          fontFamily="JetBrains Mono, monospace"
        >
          {'public class API {'}
        </text>
        <text
          x="20"
          y="70"
          fill="#00bfff"
          fontSize="8"
          fontFamily="JetBrains Mono, monospace"
        >
          @GetMapping
        </text>
        <text
          x="20"
          y="84"
          fill="#aeb4bc"
          fontSize="8"
          fontFamily="JetBrains Mono, monospace"
        >
          handleRequest()
        </text>
        <text
          x="12"
          y="98"
          fill="#e9ebed"
          fontSize="8"
          fontFamily="JetBrains Mono, monospace"
        >
          {'}'}
        </text>
      </g>

      {/* Connection lines */}
      <path
        d="M 200 80 L 280 80"
        stroke="url(#grad-line)"
        strokeWidth="2"
        strokeDasharray="6 4"
        className="animate-dash-flow"
      />
      <path
        d="M 200 120 C 240 120 240 200 280 200"
        stroke="url(#grad-line)"
        strokeWidth="2"
        strokeDasharray="6 4"
        fill="none"
        className="animate-dash-flow"
      />
      <path
        d="M 280 120 L 200 120"
        stroke="url(#grad-line)"
        strokeWidth="1.5"
        strokeDasharray="4 4"
        opacity="0.5"
        className="animate-dash-flow"
      />

      {/* API node */}
      <g transform="translate(280, 60)">
        <rect
          width="100"
          height="60"
          rx="6"
          fill="url(#grad-box)"
          stroke="#00e5ff"
          strokeWidth="1.5"
          opacity="0.9"
        />
        <text
          x="50"
          y="25"
          textAnchor="middle"
          fill="#00e5ff"
          fontSize="9"
          fontFamily="JetBrains Mono, monospace"
          fontWeight="600"
        >
          REST API
        </text>
        <text
          x="50"
          y="42"
          textAnchor="middle"
          fill="#a5b4c7"
          fontSize="7"
          fontFamily="JetBrains Mono, monospace"
        >
          Spring Boot
        </text>
        <circle cx="88" cy="12" r="3" fill="#16a34a">
          <animate
            attributeName="opacity"
            values="1;0.3;1"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>
      </g>

      {/* Database cylinder */}
      <g transform="translate(280, 170)">
        <path
          d="M 5 10 L 5 50 C 5 55 25 58 50 58 C 75 58 95 55 95 50 L 95 10"
          fill="url(#grad-box)"
          stroke="#00e5ff"
          strokeWidth="1.5"
        />
        <ellipse
          cx="50"
          cy="10"
          rx="45"
          ry="10"
          fill="#101d2c"
          stroke="#00e5ff"
          strokeWidth="1.5"
        />
        <path
          d="M 5 25 C 5 30 25 33 50 33 C 75 33 95 30 95 25"
          fill="none"
          stroke="#244052"
          strokeWidth="1"
        />
        <path
          d="M 5 40 C 5 45 25 48 50 48 C 75 48 95 45 95 40"
          fill="none"
          stroke="#244052"
          strokeWidth="1"
        />
        <text
          x="50"
          y="75"
          textAnchor="middle"
          fill="#a5b4c7"
          fontSize="8"
          fontFamily="JetBrains Mono, monospace"
        >
          PostgreSQL
        </text>
      </g>

      {/* WebSocket node */}
      <g transform="translate(50, 220)">
        <rect
          width="120"
          height="50"
          rx="6"
          fill="url(#grad-box)"
          stroke="#00e5ff"
          strokeWidth="1"
          opacity="0.9"
        />
        <text
          x="60"
          y="22"
          textAnchor="middle"
          fill="#00e5ff"
          fontSize="8"
          fontFamily="JetBrains Mono, monospace"
          fontWeight="600"
        >
          WebSocket
        </text>
        <text
          x="60"
          y="36"
          textAnchor="middle"
          fill="#a5b4c7"
          fontSize="7"
          fontFamily="JetBrains Mono, monospace"
        >
          STOMP · Real-time
        </text>
      </g>

      {/* WebSocket to API connection */}
      <path
        d="M 170 245 C 220 245 240 90 280 90"
        stroke="url(#grad-line)"
        strokeWidth="1.5"
        strokeDasharray="5 3"
        fill="none"
        opacity="0.5"
        className="animate-dash-flow"
      />

      {/* Security shield */}
      <g transform="translate(200, 290)">
        <path
          d="M 30 0 L 55 10 L 55 35 C 55 50 30 60 30 60 C 30 60 5 50 5 35 L 5 10 Z"
          fill="url(#grad-box)"
          stroke="#00e5ff"
          strokeWidth="1.5"
        />
        <path
          d="M 20 28 L 28 36 L 42 20"
          fill="none"
          stroke="#00e5ff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <text
          x="30"
          y="78"
          textAnchor="middle"
          fill="#a5b4c7"
          fontSize="7"
          fontFamily="JetBrains Mono, monospace"
        >
          JWT Auth
        </text>
      </g>

      {/* Animated data packets */}
      <circle r="3" fill="#00e5ff">
        <animateMotion
          dur="3s"
          repeatCount="indefinite"
          path="M 200 80 L 280 80"
        />
      </circle>
      <circle r="2.5" fill="#00bfff">
        <animateMotion
          dur="4s"
          repeatCount="indefinite"
          path="M 200 120 C 240 120 240 200 280 200"
        />
      </circle>
    </svg>
  );
}
