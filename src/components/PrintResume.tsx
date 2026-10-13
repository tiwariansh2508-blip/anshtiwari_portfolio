
import {
  personalInfo,
  experiences,
  educationList,
  skills,
  certifications,
  achievements,
  projects,
} from '@/data/portfolio';
import { Mail, Phone, MapPin, Linkedin, Printer, Download } from 'lucide-react';

export function PrintResume() {
  const skillsByCategory = skills.reduce<Record<string, string[]>>(
    (acc, skill) => {
      if (!acc[skill.category]) acc[skill.category] = [];
      acc[skill.category].push(skill.name);
      return acc;
    },
    {},
  );

  return (
    <main className="print-page mx-auto min-h-screen max-w-4xl bg-[#070b12] p-4 font-sans text-slate-200 sm:p-8 print:min-h-0 print:bg-white print:p-0 print:text-black">
      {/* Screen-only actions */}
      <div className="no-print mb-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 rounded-lg border border-[#00e5ff]/50 bg-[#00bfff]/10 px-4 py-2.5 text-sm font-semibold text-[#00e5ff] transition-all hover:bg-[#00bfff]/20 hover:shadow-[0_0_18px_rgba(0,191,255,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00e5ff]"
        >
          <Printer size={16} />
          Print / Save as PDF
        </button>

        <a
          href="/resume.pdf"
          download
          className="inline-flex items-center gap-2 rounded-lg border border-slate-600 bg-slate-800 px-4 py-2.5 text-sm font-semibold text-slate-200 transition-colors hover:border-[#00bfff]/50 hover:text-[#00e5ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00e5ff]"
        >
          <Download size={16} />
          Download PDF
        </a>
      </div>

      {/* Resume header */}
      <header className="mb-6 border-b-2 border-[#00bfff] pb-5 print:border-[#111827]">
        <h1 className="mb-1 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl print:text-black">
          {personalInfo.name}
        </h1>

        <p className="mb-3 text-lg font-semibold text-[#00e5ff] print:text-black">
          {personalInfo.title}
        </p>

        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-300 print:text-gray-700">
          <span className="flex items-center gap-1.5">
            <Mail size={14} className="shrink-0 text-[#00bfff] print:text-black" />
            {personalInfo.email}
          </span>

          <span className="flex items-center gap-1.5">
            <Phone size={14} className="shrink-0 text-[#00bfff] print:text-black" />
            {personalInfo.phone}
          </span>

          <span className="flex items-center gap-1.5">
            <MapPin size={14} className="shrink-0 text-[#00bfff] print:text-black" />
            {personalInfo.location}
          </span>

          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[#00bfff] underline-offset-2 hover:text-[#00e5ff] hover:underline print:text-black"
          >
            <Linkedin size={14} className="shrink-0" />
            LinkedIn
          </a>
        </div>
      </header>

      {/* Summary */}
      <section className="resume-section mb-6">
        <h2 className="resume-heading mb-2 border-b border-[#00bfff]/30 pb-1 font-display text-base font-bold uppercase tracking-[0.16em] text-[#00e5ff] print:border-gray-300 print:text-black">
          Professional Summary
        </h2>

        <p className="text-sm leading-relaxed text-slate-300 print:text-gray-800">
          {personalInfo.intro}
        </p>
      </section>

      {/* Experience */}
      <section className="resume-section mb-6">
        <h2 className="resume-heading mb-3 border-b border-[#00bfff]/30 pb-1 font-display text-base font-bold uppercase tracking-[0.16em] text-[#00e5ff] print:border-gray-300 print:text-black">
          Experience
        </h2>

        {experiences.map((exp, i) => (
          <article key={`${exp.company}-${i}`} className="resume-item mb-4">
            <div className="mb-1 flex flex-col justify-between gap-1 sm:flex-row sm:items-start print:flex-row">
              <div>
                <h3 className="font-semibold text-white print:text-black">
                  {exp.role}
                </h3>

                <p className="text-sm font-medium text-[#00bfff] print:text-gray-700">
                  {exp.company}
                </p>
              </div>

              <span className="font-mono text-xs text-slate-400 print:text-gray-600">
                {exp.period}
              </span>
            </div>

            <ul className="mt-2 space-y-1">
              {exp.highlights.map((highlight, j) => (
                <li
                  key={`${i}-${j}`}
                  className="flex items-start gap-2 text-sm leading-relaxed text-slate-300 print:text-gray-800"
                >
                  <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#00bfff] print:bg-black" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>

            <div className="mt-2 flex flex-wrap gap-1.5">
              {exp.tech.map((tech) => (
                <span
                  key={tech}
                  className="rounded border border-[#00bfff]/20 bg-[#00bfff]/[0.07] px-2 py-0.5 font-mono text-[10px] text-[#9deeff] print:border-gray-300 print:bg-transparent print:text-gray-700"
                >
                  {tech}
                </span>
              ))}
            </div>
          </article>
        ))}
      </section>

      {/* Projects */}
      <section className="resume-section mb-6">
        <h2 className="resume-heading mb-3 border-b border-[#00bfff]/30 pb-1 font-display text-base font-bold uppercase tracking-[0.16em] text-[#00e5ff] print:border-gray-300 print:text-black">
          Projects
        </h2>

        {projects.map((project, i) => (
          <article
            key={`${project.name}-${i}`}
            className="resume-item mb-3"
          >
            <h3 className="font-semibold text-white print:text-black">
              {project.name}
            </h3>

            <p className="mb-1 text-sm leading-relaxed text-slate-300 print:text-gray-800">
              {project.tagline}
            </p>

            <p className="font-mono text-xs leading-relaxed text-slate-400 print:text-gray-600">
              {project.techStack.join(' · ')}
            </p>
          </article>
        ))}
      </section>

      {/* Skills */}
      <section className="resume-section mb-6">
        <h2 className="resume-heading mb-3 border-b border-[#00bfff]/30 pb-1 font-display text-base font-bold uppercase tracking-[0.16em] text-[#00e5ff] print:border-gray-300 print:text-black">
          Technical Skills
        </h2>

        <div className="space-y-2">
          {Object.entries(skillsByCategory).map(([category, skillNames]) => (
            <div
              key={category}
              className="flex flex-col gap-1 text-sm sm:flex-row sm:gap-3 print:flex-row"
            >
              <span className="shrink-0 font-semibold text-white sm:w-48 print:text-black">
                {category}:
              </span>

              <span className="text-slate-300 print:text-gray-800">
                {skillNames.join(', ')}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="resume-section mb-6">
        <h2 className="resume-heading mb-3 border-b border-[#00bfff]/30 pb-1 font-display text-base font-bold uppercase tracking-[0.16em] text-[#00e5ff] print:border-gray-300 print:text-black">
          Education
        </h2>

        {educationList.map((edu, i) => (
          <article
            key={`${edu.institution}-${i}`}
            className="resume-item mb-3 flex flex-col justify-between gap-1 sm:flex-row print:flex-row"
          >
            <div>
              <h3 className="font-semibold text-white print:text-black">
                {edu.degree}
              </h3>

              <p className="text-sm text-slate-300 print:text-gray-700">
                {edu.institution}
              </p>

              <p className="mt-0.5 text-xs text-slate-400 print:text-gray-600">
                {edu.details}
              </p>
            </div>

            <span className="shrink-0 font-mono text-xs text-slate-400 print:text-gray-600">
              {edu.period}
            </span>
          </article>
        ))}
      </section>

      {/* Certifications */}
      <section className="resume-section mb-6">
        <h2 className="resume-heading mb-3 border-b border-[#00bfff]/30 pb-1 font-display text-base font-bold uppercase tracking-[0.16em] text-[#00e5ff] print:border-gray-300 print:text-black">
          Certifications
        </h2>

        {certifications.map((cert, i) => (
          <div
            key={`${cert.title}-${i}`}
            className="resume-item mb-2 flex flex-col justify-between gap-1 text-sm sm:flex-row print:flex-row"
          >
            <span className="text-slate-300 print:text-gray-800">
              <span className="font-medium text-white print:text-black">
                {cert.title}
              </span>
              {' — '}
              {cert.issuer}
            </span>

            <span className="shrink-0 font-mono text-xs text-slate-400 print:text-gray-600">
              {cert.date}
            </span>
          </div>
        ))}
      </section>

      {/* Achievements */}
      <section className="resume-section">
        <h2 className="resume-heading mb-3 border-b border-[#00bfff]/30 pb-1 font-display text-base font-bold uppercase tracking-[0.16em] text-[#00e5ff] print:border-gray-300 print:text-black">
          Activities & Achievements
        </h2>

        <ul className="space-y-1.5">
          {achievements.map((achievement, i) => (
            <li
              key={`${i}-${achievement}`}
              className="flex items-start gap-2 text-sm leading-relaxed text-slate-300 print:text-gray-800"
            >
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#00bfff] print:bg-black" />
              <span>{achievement}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
