import { Briefcase, MapPin, Calendar, ArrowUpRight } from 'lucide-react';
import { experiences } from '@/data/portfolio';

export function Experience() {
  return (
    <section
      id="experience"
      className="relative overflow-hidden bg-slate-50 py-20 text-slate-900 transition-colors duration-300 dark:bg-[#070b12] dark:text-white sm:py-24 lg:py-28"
    >
      {/* Ambient neon glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-[#00bfff]/[0.10] blur-[120px] dark:bg-[#00e5ff]/[0.06]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-10 h-96 w-96 rounded-full bg-[#00bfff]/[0.08] blur-[130px] dark:bg-[#00bfff]/[0.05]"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="reveal mb-12">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#00bfff]/30 bg-[#00bfff]/[0.07] px-4 py-2 dark:border-[#00e5ff]/25 dark:bg-[#00e5ff]/[0.06]">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#00bfff] shadow-[0_0_10px_rgba(0,191,255,0.7)] dark:bg-[#00e5ff]" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#008db8] dark:text-[#00e5ff]">
              Experience / Journey
            </span>
          </div>

          <h2 className="mb-5 font-display text-3xl font-semibold leading-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
            Where I'm
            <span className="block text-[#008db8] dark:text-[#00e5ff] dark:[text-shadow:0_0_25px_rgba(0,229,255,0.2)]">
              building my future.
            </span>
          </h2>

          <p className="max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
            My professional journey, technical contributions, and the
            technologies I work with.
          </p>
        </div>

        {/* Experience timeline */}
        <div className="relative space-y-6">
          {/* Timeline line */}
          {experiences.length > 1 && (
            <div
              aria-hidden="true"
              className="absolute bottom-10 left-[19px] top-10 hidden w-px bg-gradient-to-b from-[#00bfff]/60 via-[#00bfff]/20 to-transparent dark:from-[#00e5ff]/60 dark:via-[#00e5ff]/20 sm:block"
            />
          )}

          {experiences.map((exp, i) => (
            <article
              key={`${exp.company}-${exp.role}-${i}`}
              className="reveal group relative overflow-hidden rounded-2xl border border-slate-200 bg-white/90 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#00bfff]/50 hover:shadow-[0_12px_40px_rgba(0,191,255,0.10)] dark:border-white/[0.08] dark:bg-[#0b1420]/85 dark:hover:border-[#00e5ff]/35 dark:hover:shadow-[0_12px_40px_rgba(0,229,255,0.05)]"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              {/* Neon top accent */}
              <div
                aria-hidden="true"
                className="absolute left-0 right-0 top-0 h-px opacity-40 transition-opacity group-hover:opacity-100"
                style={{
                  background:
                    'linear-gradient(90deg, transparent, #00bfff, transparent)',
                }}
              />

              <div className="grid gap-0 lg:grid-cols-12">
                {/* Timeline and dates */}
                <div className="border-b border-slate-200 bg-[#00bfff]/[0.035] p-6 dark:border-white/[0.07] dark:bg-[#00e5ff]/[0.025] lg:col-span-3 lg:border-b-0 lg:border-r">
                  <div className="mb-5 flex items-center gap-3">
                    <span className="relative flex h-3 w-3 shrink-0">
                      {exp.current && (
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00bfff] opacity-50 dark:bg-[#00e5ff]" />
                      )}

                      <span
                        className={`relative inline-flex h-3 w-3 rounded-full ${
                          exp.current
                            ? 'bg-[#00bfff] shadow-[0_0_12px_rgba(0,191,255,0.7)] dark:bg-[#00e5ff] dark:shadow-[0_0_12px_rgba(0,229,255,0.7)]'
                            : 'border border-slate-400 bg-slate-300 dark:border-slate-500 dark:bg-slate-700'
                        }`}
                      />
                    </span>

                    <span
                      className={`rounded-md border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider ${
                        exp.current
                          ? 'border-[#00bfff]/30 bg-[#00bfff]/[0.08] text-[#008db8] dark:border-[#00e5ff]/25 dark:bg-[#00e5ff]/[0.08] dark:text-[#00e5ff]'
                          : 'border-slate-200 bg-slate-100 text-slate-500 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-slate-400'
                      }`}
                    >
                      {exp.current ? 'Current' : 'Past'}
                    </span>
                  </div>

                  <div className="mb-4 flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#00bfff]/25 bg-[#00bfff]/[0.07] dark:border-[#00e5ff]/15 dark:bg-[#00e5ff]/[0.05]">
                      <Calendar size={16} className="text-[#008db8] dark:text-[#00e5ff]" />
                    </div>

                    <div className="min-w-0">
                      <p className="mb-1 font-mono text-[10px] uppercase tracking-wider text-slate-500">
                        Duration
                      </p>
                      <p className="text-sm leading-6 text-slate-700 dark:text-slate-300">
                        {exp.period}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#00bfff]/25 bg-[#00bfff]/[0.07] dark:border-[#00e5ff]/15 dark:bg-[#00e5ff]/[0.05]">
                      <MapPin size={16} className="text-[#008db8] dark:text-[#00e5ff]" />
                    </div>

                    <div className="min-w-0">
                      <p className="mb-1 font-mono text-[10px] uppercase tracking-wider text-slate-500">
                        Location
                      </p>
                      <p className="text-sm text-slate-700 dark:text-slate-300">
                        Nagpur, India
                      </p>
                    </div>
                  </div>
                </div>

                {/* Experience details */}
                <div className="p-6 lg:col-span-9 lg:p-8">
                  <div className="mb-5 flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#00bfff]/30 bg-[#00bfff]/[0.08] text-[#008db8] shadow-[0_0_18px_rgba(0,191,255,0.07)] transition-all duration-300 group-hover:border-[#00bfff]/60 group-hover:shadow-[0_0_24px_rgba(0,191,255,0.15)] dark:border-[#00e5ff]/25 dark:bg-[#00e5ff]/[0.07] dark:text-[#00e5ff] dark:shadow-[0_0_18px_rgba(0,229,255,0.05)] dark:group-hover:border-[#00e5ff]/50 dark:group-hover:shadow-[0_0_24px_rgba(0,229,255,0.12)]">
                      <Briefcase size={21} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="font-display text-lg font-semibold text-slate-900 transition-colors group-hover:text-[#008db8] dark:text-white dark:group-hover:text-[#00e5ff] sm:text-xl">
                        {exp.role}
                      </h3>

                      <p className="mt-1 flex flex-wrap items-center gap-1.5 text-sm font-medium text-[#008db8] dark:text-[#00e5ff]">
                        {exp.company}
                        <ArrowUpRight
                          size={13}
                          className="opacity-50 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                        />
                      </p>
                    </div>
                  </div>

                  <p className="mb-6 text-sm leading-7 text-slate-700 dark:text-slate-300">
                    {exp.description}
                  </p>

                  {/* Highlights */}
                  {exp.highlights.length > 0 && (
                    <div className="mb-6">
                      <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
                        Key contributions
                      </p>

                      <ul className="space-y-3">
                        {exp.highlights.map((highlight, idx) => (
                          <li
                            key={`${idx}-${highlight}`}
                            className="group/item flex items-start gap-3 text-sm leading-6 text-slate-700 dark:text-slate-300"
                          >
                            <span className="mt-2 flex h-1.5 w-1.5 shrink-0 rounded-full bg-[#00bfff] shadow-[0_0_8px_rgba(0,191,255,0.45)] transition-transform group-hover/item:scale-125 dark:bg-[#00e5ff] dark:shadow-[0_0_8px_rgba(0,229,255,0.45)]" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Technologies */}
                  {exp.tech.length > 0 && (
                    <div className="border-t border-slate-200 pt-5 dark:border-white/[0.07]">
                      <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
                        Technologies &amp; tools
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {exp.tech.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-lg border border-[#00bfff]/25 bg-[#00bfff]/[0.05] px-2.5 py-1.5 font-mono text-[10px] text-slate-700 transition-all duration-200 hover:border-[#00bfff]/50 hover:bg-[#00bfff]/[0.10] hover:text-[#008db8] dark:border-[#00e5ff]/15 dark:bg-[#00e5ff]/[0.04] dark:text-slate-300 dark:hover:border-[#00e5ff]/45 dark:hover:bg-[#00e5ff]/[0.08] dark:hover:text-[#00e5ff]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Journey footer */}
        <div className="mt-8 flex items-center gap-3 rounded-xl border border-[#00bfff]/25 bg-[#00bfff]/[0.04] px-5 py-4 dark:border-[#00e5ff]/15 dark:bg-[#00e5ff]/[0.03]">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#00bfff]/25 bg-[#00bfff]/[0.08] dark:border-[#00e5ff]/20 dark:bg-[#00e5ff]/[0.06]">
            <Briefcase size={16} className="text-[#008db8] dark:text-[#00e5ff]" />
          </div>

          <p className="text-xs leading-6 text-slate-600 dark:text-slate-400 sm:text-sm">
            Every experience is an opportunity to learn, solve problems, and
            build better software.
          </p>
        </div>
      </div>
    </section>
  );
}
