import {
  ArrowUpRight,
  Server,
  Database,
  Code2,
  Wrench,
} from 'lucide-react';

import {
  personalInfo,
  skills,
  projects,
  experiences,
  educationList,
} from '@/data/portfolio';

interface AboutProps {
  navigate: (path: string) => void;
}

export function About({ navigate }: AboutProps) {
  const techCategories = [
    {
      label: 'Backend',
      icon: Server,
      items: ['Java', 'Spring Boot', 'Spring Security', 'REST APIs', 'JWT'],
    },
    {
      label: 'Frontend',
      icon: Code2,
      items: ['React', 'JavaScript', 'HTML5', 'CSS3'],
    },
    {
      label: 'Databases',
      icon: Database,
      items: ['PostgreSQL', 'PostGIS', 'MySQL'],
    },
    {
      label: 'Tools',
      icon: Wrench,
      items: ['Git', 'GitHub', 'Maven', 'Postman', 'IntelliJ IDEA'],
    },
  ];

  const quickLinks = [
    { label: 'View project case studies', path: '/projects' },
    { label: 'Explore skills network', path: '/skills' },
    { label: 'Read about experience', path: '/experience' },
  ];

  const panelClass =
    'overflow-hidden rounded-2xl border border-cyan-400/20 bg-white/90 shadow-[0_0_30px_rgba(0,229,255,0.05)] transition-all duration-300 hover:border-cyan-400/40 hover:shadow-[0_0_35px_rgba(0,229,255,0.10)] dark:bg-[#0b1220]/95';

  const mutedText = 'text-slate-600 dark:text-slate-400';

  const cardClass =
    'rounded-xl border border-slate-200 bg-slate-50 transition-all duration-300 hover:border-cyan-500/50 hover:bg-cyan-50/50 dark:border-white/10 dark:bg-[#0d1624] dark:hover:border-cyan-400/30 dark:hover:bg-[#101e2e]';

  return (
    <section
      id="about"
      className="relative overflow-hidden py-20 sm:py-24 lg:py-28"
    >
      {/* Background decoration */}
      <div
        className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-cyan-400/[0.08] blur-[100px] dark:bg-[#00e5ff]/[0.06]"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute -right-40 bottom-10 h-80 w-80 rounded-full bg-blue-400/[0.08] blur-[100px] dark:bg-[#007bff]/[0.06]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left: About content */}
          <div className="reveal lg:col-span-7">
            <p className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-cyan-700 dark:text-[#00e5ff]">
              <span className="h-px w-7 bg-cyan-500 dark:bg-[#00e5ff]" />
              About Me
            </p>

            <h2 className="mb-6 font-display text-display-lg font-semibold leading-tight text-slate-900 text-balance dark:text-white">
              A software engineer who treats{' '}
              <span className="text-cyan-700 [text-shadow:0_0_20px_rgba(0,229,255,0.12)] dark:text-[#00e5ff] dark:[text-shadow:0_0_24px_rgba(0,229,255,0.2)]">
                systems as craft.
              </span>
            </h2>

            <div className="max-w-2xl space-y-4 text-base leading-relaxed text-slate-700 dark:text-slate-300">
              <p>
                I'm{' '}
                <span className="font-semibold text-slate-950 dark:text-white">
                  {personalInfo.name}
                </span>
                , a software engineer based in{' '}
                <span className="font-medium text-cyan-700 dark:text-[#00e5ff]">
                  {personalInfo.location}
                </span>
                . I specialize in building backend systems with Java and
                Spring Boot, designing REST APIs, and working with relational
                databases — particularly PostgreSQL and PostGIS for geospatial
                features.
              </p>

              <p>
                My work spans the full stack: from JWT-authenticated backend
                endpoints and role-based authorization to React frontends and
                real-time WebSocket communication. I care about structured
                architecture, secure authentication, and database normalization.
              </p>

              <p>
                Currently interning as a web developer at{' '}
                <span className="font-semibold text-cyan-700 dark:text-[#00e5ff]">
                  Pranjal Technologies
                </span>
                , where I contribute to Helping Hand — a community assistance
                platform with real-time location features.
              </p>
            </div>

            {/* Technical focus indicators */}
            <div className="mt-8 flex flex-wrap gap-3">
              {[
                'Backend Engineering',
                'API Development',
                'Database Design',
              ].map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-2 rounded-full border border-cyan-500/25 bg-cyan-50 px-3 py-2 font-mono text-xs text-slate-700 transition-all duration-300 hover:border-cyan-500/60 hover:text-cyan-700 dark:border-[#00e5ff]/20 dark:bg-[#00e5ff]/[0.05] dark:text-slate-300 dark:hover:border-[#00e5ff]/50 dark:hover:text-[#00e5ff]"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(0,229,255,0.6)] dark:bg-[#00e5ff] dark:shadow-[0_0_8px_rgba(0,229,255,0.8)]" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Engineering dashboard */}
          <div
            className="reveal lg:col-span-5"
            style={{ transitionDelay: '0.15s' }}
          >
            <div className={panelClass}>
              {/* Dashboard header */}
              <div className="flex items-center justify-between border-b border-cyan-500/20 bg-slate-100 px-4 py-3 dark:border-[#00e5ff]/15 dark:bg-[#0b1421]">
                <span className="font-mono text-xs text-slate-600 dark:text-slate-400">
                  <span className="text-cyan-700 dark:text-[#00e5ff]">
                    //
                  </span>{' '}
                  engineering overview
                </span>

                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(0,229,255,0.5)] dark:bg-[#00e5ff] dark:shadow-[0_0_8px_rgba(0,229,255,0.7)]" />
                </div>
              </div>

              <div className="space-y-5 p-4 sm:p-5">
                {/* Current role */}
                <div
                  className={`${cardClass} flex items-start justify-between gap-3 p-3`}
                >
                  <div className="min-w-0">
                    <p className={`mb-1 font-mono text-xs ${mutedText}`}>
                      CURRENT ROLE
                    </p>

                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      {experiences[0]?.role ?? 'Software Developer'}
                    </p>

                    <p className={`mt-1 text-xs ${mutedText}`}>
                      {experiences[0]?.company ?? 'Professional Experience'}
                    </p>
                  </div>

                  <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-cyan-500/25 bg-cyan-50 px-2 py-1 font-mono text-xs text-cyan-800 dark:border-[#00e5ff]/20 dark:bg-[#00e5ff]/[0.06] dark:text-[#00e5ff]">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-500 dark:bg-[#00e5ff]" />
                    Active
                  </span>
                </div>

                {/* Tech stack */}
                <div>
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                    <p className="font-mono text-xs text-slate-600 dark:text-slate-400">
                      TECH STACK
                    </p>

                    <span className="font-mono text-[10px] text-cyan-700 dark:text-[#00e5ff]/80">
                      CORE TECHNOLOGIES
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {techCategories.map((cat) => {
                      const CategoryIcon = cat.icon;

                      return (
                        <div
                          key={cat.label}
                          className="rounded-xl border border-slate-200 bg-white p-3 transition-all duration-300 hover:border-cyan-500/40 hover:shadow-[0_0_16px_rgba(0,229,255,0.08)] dark:border-white/10 dark:bg-[#0d1624] dark:hover:border-[#00e5ff]/30 dark:hover:shadow-[0_0_16px_rgba(0,229,255,0.05)]"
                        >
                          <div className="mb-2 flex items-center gap-2">
                            <CategoryIcon
                              size={15}
                              className="shrink-0 text-cyan-700 dark:text-[#00e5ff]"
                              aria-hidden="true"
                            />

                            <span className="text-xs font-semibold text-slate-900 dark:text-slate-200">
                              {cat.label}
                            </span>
                          </div>

                          <div className="flex flex-wrap gap-x-2 gap-y-1.5">
                            {cat.items.map((item) => (
                              <span
                                key={item}
                                className="font-mono text-[10px] text-slate-600 transition-colors hover:text-cyan-700 dark:text-slate-400 dark:hover:text-[#00e5ff]"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Quick statistics */}
                <div>
                  <p className="mb-3 font-mono text-xs text-slate-600 dark:text-slate-400">
                    QUICK STATS
                  </p>

                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => navigate('/projects')}
                      className={`${cardClass} group p-3 text-center focus-visible:outline-cyan-500`}
                      aria-label={`View ${projects.length} projects`}
                    >
                      <p className="font-display text-2xl font-bold text-slate-900 transition-colors group-hover:text-cyan-700 dark:text-white dark:group-hover:text-[#00e5ff]">
                        {projects.length}
                      </p>

                      <p className="mt-1 font-mono text-[10px] text-slate-600 dark:text-slate-400">
                        Projects
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => navigate('/skills')}
                      className={`${cardClass} group p-3 text-center focus-visible:outline-cyan-500`}
                      aria-label={`Explore ${skills.length} skills`}
                    >
                      <p className="font-display text-2xl font-bold text-slate-900 transition-colors group-hover:text-cyan-700 dark:text-white dark:group-hover:text-[#00e5ff]">
                        {skills.length}
                      </p>

                      <p className="mt-1 font-mono text-[10px] text-slate-600 dark:text-slate-400">
                        Skills
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => navigate('/education')}
                      className={`${cardClass} group p-3 text-center focus-visible:outline-cyan-500`}
                      aria-label={`View ${educationList.length} education entries`}
                    >
                      <p className="font-display text-2xl font-bold text-slate-900 transition-colors group-hover:text-cyan-700 dark:text-white dark:group-hover:text-[#00e5ff]">
                        {educationList.length}
                      </p>

                      <p className="mt-1 font-mono text-[10px] text-slate-600 dark:text-slate-400">
                        Degrees
                      </p>
                    </button>
                  </div>
                </div>

                {/* Quick navigation */}
                <div>
                  <p className="mb-2 font-mono text-xs text-slate-600 dark:text-slate-400">
                    QUICK NAVIGATE
                  </p>

                  <div className="space-y-1">
                    {quickLinks.map((link) => (
                      <button
                        type="button"
                        key={link.path}
                        onClick={() => navigate(link.path)}
                        className="group flex w-full items-center justify-between rounded-lg border border-transparent px-3 py-3 text-left text-xs text-slate-700 transition-all duration-200 hover:border-cyan-500/20 hover:bg-cyan-50 hover:text-cyan-800 focus-visible:outline-cyan-500 dark:text-slate-300 dark:hover:border-[#00e5ff]/15 dark:hover:bg-[#00e5ff]/[0.04] dark:hover:text-[#00e5ff]"
                      >
                        <span>{link.label}</span>

                        <ArrowUpRight
                          size={14}
                          className="shrink-0 text-slate-500 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan-700 dark:group-hover:text-[#00e5ff]"
                          aria-hidden="true"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Dashboard footer */}
              <div className="flex items-center justify-between border-t border-cyan-500/20 bg-slate-100 px-4 py-3 dark:border-[#00e5ff]/10 dark:bg-[#080e18]">
                <span className="font-mono text-[10px] text-slate-600 dark:text-slate-500">
                  SYSTEM STATUS
                </span>

                <span className="flex items-center gap-2 font-mono text-[10px] font-medium text-cyan-800 dark:text-[#00e5ff]">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-500 dark:bg-[#00e5ff]" />
                  OPERATIONAL
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}