import {
  GraduationCap,
  Award,
  Trophy,
  ExternalLink,
  Download,
  Calendar,
  BookOpen,
} from 'lucide-react';

import {
  educationList,
  certifications,
  achievements,
  personalInfo,
} from '@/data/portfolio';

export function Education() {
  return (
    <section
      id="education"
      className="relative overflow-hidden bg-slate-50 py-20 text-slate-900 transition-colors duration-300 dark:bg-[#070b12] dark:text-white sm:py-24 lg:py-28"
    >
      {/* Ambient neon background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-[#00bfff]/[0.10] blur-[120px] dark:bg-[#00e5ff]/[0.06]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-[#00bfff]/[0.08] blur-[130px] dark:bg-[#00bfff]/[0.05]"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="reveal mb-12">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#00bfff]/30 bg-[#00bfff]/[0.07] px-4 py-2 dark:border-[#00e5ff]/25 dark:bg-[#00e5ff]/[0.06]">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#00bfff] shadow-[0_0_10px_rgba(0,191,255,0.7)] dark:bg-[#00e5ff]" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#008db8] dark:text-[#00e5ff]">
              Education &amp; Career
            </span>
          </div>

          <h2 className="mb-5 max-w-4xl font-display text-3xl font-semibold leading-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
            Learning, growing,
            <span className="block text-[#008db8] dark:text-[#00e5ff] dark:[text-shadow:0_0_25px_rgba(0,229,255,0.2)]">
              and achieving.
            </span>
          </h2>

          <p className="max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
            My academic journey, certifications, achievements, and professional
            resources — all in one place.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Left column: Education and certifications */}
          <div className="reveal min-w-0 lg:col-span-7">
            {/* Education */}
            <div className="mb-10">
              <h3 className="mb-7 flex items-center gap-3 font-display text-xl font-semibold text-slate-900 dark:text-white">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#00bfff]/30 bg-[#00bfff]/[0.08] dark:border-[#00e5ff]/25 dark:bg-[#00e5ff]/[0.07]">
                  <GraduationCap size={20} className="text-[#008db8] dark:text-[#00e5ff]" />
                </span>
                Education
              </h3>

              <div className="relative">
                {/* Timeline line */}
                {educationList.length > 1 && (
                  <div
                    aria-hidden="true"
                    className="absolute bottom-8 left-[17px] top-8 w-px bg-gradient-to-b from-[#00bfff]/60 via-[#00bfff]/20 to-transparent dark:from-[#00e5ff]/60 dark:via-[#00e5ff]/20"
                  />
                )}

                <div className="space-y-6">
                  {educationList.map((edu, i) => (
                    <article
                      key={`${edu.institution}-${edu.degree}-${i}`}
                      className="group relative pl-11"
                    >
                      {/* Timeline dot */}
                      <div className="absolute left-[10px] top-6 z-10 flex h-4 w-4 items-center justify-center rounded-full border border-[#00bfff]/60 bg-slate-50 dark:border-[#00e5ff]/50 dark:bg-[#070b12]">
                        <span
                          className={`h-2 w-2 rounded-full ${
                            edu.current
                              ? 'animate-pulse bg-[#00bfff] shadow-[0_0_10px_rgba(0,191,255,0.8)] dark:bg-[#00e5ff] dark:shadow-[0_0_10px_rgba(0,229,255,0.8)]'
                              : 'bg-slate-400 dark:bg-slate-600'
                          }`}
                        />
                      </div>

                      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm transition-all duration-300 hover:border-[#00bfff]/50 hover:shadow-[0_10px_35px_rgba(0,191,255,0.10)] dark:border-white/[0.08] dark:bg-[#0b1420]/85 dark:hover:border-[#00e5ff]/35 dark:hover:shadow-[0_10px_35px_rgba(0,229,255,0.05)] sm:p-6">
                        <div
                          aria-hidden="true"
                          className="absolute left-0 top-0 h-full w-0.5 bg-[#00bfff]/25 transition-colors group-hover:bg-[#00bfff]/80 dark:bg-[#00e5ff]/20 dark:group-hover:bg-[#00e5ff]/70"
                        />

                        <div className="mb-4 flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <h4 className="font-display text-base font-semibold leading-6 text-slate-900 transition-colors group-hover:text-[#008db8] dark:text-white dark:group-hover:text-[#00e5ff] sm:text-lg">
                              {edu.degree}
                            </h4>

                            <p className="mt-2 text-sm leading-6 text-[#008db8] dark:text-[#00e5ff]">
                              {edu.institution}
                            </p>
                          </div>

                          {edu.current && (
                            <span className="shrink-0 rounded-full border border-[#00bfff]/30 bg-[#00bfff]/[0.08] px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider text-[#008db8] dark:border-[#00e5ff]/25 dark:bg-[#00e5ff]/[0.08] dark:text-[#00e5ff] sm:text-[10px]">
                              In Progress
                            </span>
                          )}
                        </div>

                        <div className="mb-4 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                          <Calendar
                            size={14}
                            className="shrink-0 text-[#008db8] dark:text-[#00e5ff]/70"
                          />
                          <span>{edu.period}</span>
                        </div>

                        <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">
                          {edu.details}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h3 className="mb-5 flex items-center gap-3 font-display text-xl font-semibold text-slate-900 dark:text-white">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#00bfff]/30 bg-[#00bfff]/[0.08] dark:border-[#00e5ff]/25 dark:bg-[#00e5ff]/[0.07]">
                  <Award size={19} className="text-[#008db8] dark:text-[#00e5ff]" />
                </span>
                Certifications
              </h3>

              <div className="space-y-3">
                {certifications.map((cert, i) => (
                  <article
                    key={`${cert.title}-${cert.issuer}-${i}`}
                    className="reveal group flex items-start justify-between gap-3 rounded-xl border border-slate-200 bg-white/90 p-4 transition-all duration-300 hover:border-[#00bfff]/45 hover:bg-[#00bfff]/[0.025] dark:border-white/[0.08] dark:bg-[#0b1420]/80 dark:hover:border-[#00e5ff]/35 dark:hover:bg-[#0d1926]"
                    style={{ transitionDelay: `${i * 0.05}s` }}
                  >
                    <div className="flex min-w-0 items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#00bfff]/25 bg-[#00bfff]/[0.07] text-[#008db8] transition-colors group-hover:bg-[#00bfff]/[0.13] dark:border-[#00e5ff]/20 dark:bg-[#00e5ff]/[0.06] dark:text-[#00e5ff] dark:group-hover:bg-[#00e5ff]/[0.12]">
                        <Award size={17} />
                      </div>

                      <div className="min-w-0">
                        <h4 className="text-sm font-medium leading-6 text-slate-800 transition-colors group-hover:text-[#008db8] dark:text-slate-200 dark:group-hover:text-[#00e5ff]">
                          {cert.title}
                        </h4>

                        <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                          {cert.issuer}
                        </p>
                      </div>
                    </div>

                    <span className="shrink-0 rounded-md border border-slate-200 bg-slate-100 px-2 py-1 font-mono text-[10px] text-slate-500 dark:border-white/[0.07] dark:bg-white/[0.025] dark:text-slate-500">
                      {cert.date}
                    </span>
                  </article>
                ))}
              </div>
            </div>
          </div>

          {/* Right column: Achievements and resources */}
          <div className="min-w-0 space-y-8 lg:col-span-5">
            {/* Achievements */}
            <div className="reveal" style={{ transitionDelay: '0.1s' }}>
              <h3 className="mb-5 flex items-center gap-3 font-display text-xl font-semibold text-slate-900 dark:text-white">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#00bfff]/30 bg-[#00bfff]/[0.08] dark:border-[#00e5ff]/25 dark:bg-[#00e5ff]/[0.07]">
                  <Trophy size={19} className="text-[#008db8] dark:text-[#00e5ff]" />
                </span>
                Achievements
              </h3>

              <div className="space-y-3">
                {achievements.map((achievement, i) => (
                  <div
                    key={`${achievement}-${i}`}
                    className="group flex items-start gap-3 rounded-xl border border-slate-200 bg-white/90 p-4 transition-all duration-300 hover:border-[#00bfff]/45 hover:bg-[#00bfff]/[0.025] dark:border-white/[0.08] dark:bg-[#0b1420]/80 dark:hover:border-[#00e5ff]/35 dark:hover:bg-[#0d1926]"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#00bfff]/25 bg-[#00bfff]/[0.07] dark:border-[#00e5ff]/20 dark:bg-[#00e5ff]/[0.05]">
                      <Trophy
                        size={15}
                        className="text-[#008db8] transition-transform group-hover:scale-110 dark:text-[#00e5ff]"
                      />
                    </div>

                    <p className="pt-1 text-sm leading-6 text-slate-700 transition-colors group-hover:text-[#008db8] dark:text-slate-300 dark:group-hover:text-white">
                      {achievement}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Resume download */}
            <div className="reveal" style={{ transitionDelay: '0.2s' }}>
              <h3 className="mb-5 flex items-center gap-3 font-display text-xl font-semibold text-slate-900 dark:text-white">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#00bfff]/30 bg-[#00bfff]/[0.08] dark:border-[#00e5ff]/25 dark:bg-[#00e5ff]/[0.07]">
                  <Download size={18} className="text-[#008db8] dark:text-[#00e5ff]" />
                </span>
                Resume
              </h3>

              <div className="relative overflow-hidden rounded-2xl border border-[#00bfff]/30 bg-gradient-to-br from-[#00bfff]/[0.09] via-white to-slate-100 p-6 dark:border-[#00e5ff]/25 dark:from-[#00e5ff]/[0.08] dark:via-[#0b1420] dark:to-[#0b1420]">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#00bfff]/[0.12] blur-3xl dark:bg-[#00e5ff]/[0.08]"
                />

                <div className="relative z-10">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#00bfff]/30 bg-[#00bfff]/[0.08] dark:border-[#00e5ff]/25 dark:bg-[#00e5ff]/[0.07]">
                      <BookOpen size={22} className="text-[#008db8] dark:text-[#00e5ff]" />
                    </div>

                    <div>
                      <h4 className="font-display text-base font-semibold text-slate-900 dark:text-white">
                        Ansh Manendra Tiwari
                      </h4>
                      <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-[#008db8] dark:text-[#00e5ff]/80">
                        Resume / PDF
                      </p>
                    </div>
                  </div>

                  <p className="mb-6 text-sm leading-7 text-slate-600 dark:text-slate-400">
                    Download my resume for an overview of my education,
                    experience, technical skills, and achievements.
                  </p>

                  <a
                    href="/resume.pdf"
                    download
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#00bfff]/50 bg-[#00bfff]/[0.08] px-4 py-3 text-sm font-semibold text-[#007fa5] transition-all duration-300 hover:border-[#00bfff] hover:bg-[#00bfff]/[0.15] hover:shadow-[0_0_22px_rgba(0,191,255,0.15)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00bfff] dark:border-[#00e5ff]/50 dark:bg-[#00e5ff]/10 dark:text-[#00e5ff] dark:hover:border-[#00e5ff] dark:hover:bg-[#00e5ff]/15 dark:hover:shadow-[0_0_22px_rgba(0,229,255,0.12)]"
                  >
                    <Download size={16} />
                    Download Resume (PDF)
                  </a>
                </div>
              </div>
            </div>

            {/* Professional profiles */}
            <div className="reveal" style={{ transitionDelay: '0.3s' }}>
              <h3 className="mb-5 font-display text-xl font-semibold text-slate-900 dark:text-white">
                Professional Profiles
              </h3>

              <div className="space-y-3">
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white/90 p-4 transition-all duration-300 hover:border-[#00bfff]/45 hover:bg-[#00bfff]/[0.04] dark:border-white/[0.08] dark:bg-[#0b1420]/80 dark:hover:border-[#00e5ff]/40 dark:hover:bg-[#00e5ff]/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00bfff]"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#00bfff]/25 bg-[#00bfff]/[0.07] text-[#008db8] dark:border-[#00e5ff]/20 dark:bg-[#00e5ff]/[0.05] dark:text-[#00e5ff]">
                      <ExternalLink size={16} />
                    </div>
                    <span className="text-sm text-slate-700 transition-colors group-hover:text-[#008db8] dark:text-slate-300 dark:group-hover:text-[#00e5ff]">
                      LinkedIn
                    </span>
                  </div>

                  <ExternalLink
                    size={15}
                    className="text-slate-400 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#008db8] dark:text-slate-600 dark:group-hover:text-[#00e5ff]"
                  />
                </a>

                <a
                  href={`mailto:${personalInfo.email}`}
                  className="group flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white/90 p-4 transition-all duration-300 hover:border-[#00bfff]/45 hover:bg-[#00bfff]/[0.04] dark:border-white/[0.08] dark:bg-[#0b1420]/80 dark:hover:border-[#00e5ff]/40 dark:hover:bg-[#00e5ff]/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00bfff]"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#00bfff]/25 bg-[#00bfff]/[0.07] text-[#008db8] dark:border-[#00e5ff]/20 dark:bg-[#00e5ff]/[0.05] dark:text-[#00e5ff]">
                      <ExternalLink size={16} />
                    </div>
                    <span className="break-all text-sm text-slate-700 transition-colors group-hover:text-[#008db8] dark:text-slate-300 dark:group-hover:text-[#00e5ff]">
                      {personalInfo.email}
                    </span>
                  </div>

                  <ExternalLink
                    size={15}
                    className="shrink-0 text-slate-400 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#008db8] dark:text-slate-600 dark:group-hover:text-[#00e5ff]"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom accent */}
        <div className="mt-12 flex items-center justify-center gap-3">
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#00bfff]/50 dark:to-[#00e5ff]/40" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#00bfff] shadow-[0_0_10px_rgba(0,191,255,0.7)] dark:bg-[#00e5ff] dark:shadow-[0_0_10px_rgba(0,229,255,0.7)]" />
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500 dark:text-slate-600">
            Keep learning. Keep building.
          </span>
          <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#00bfff]/50 dark:to-[#00e5ff]/40" />
        </div>
      </div>
    </section>
  );
}
