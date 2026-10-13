import { useState, useMemo } from 'react';
import {
  Search,
  X,
  ArrowRight,
  GitBranch,
  ExternalLink,
  Check,
  Circle,
  Layers,
  XCircle,
} from 'lucide-react';
import { projects, type Project } from '@/data/portfolio';

interface ProjectsProps {
  navigate: (path: string) => void;
}

const NEON_BLUE = '#00e5ff';

export function Projects({ navigate }: ProjectsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTech, setActiveTech] = useState<string | null>(null);

  const allTechs = useMemo(() => {
    const techs = new Set<string>();

    projects.forEach((project) =>
      project.techStack.forEach((tech) => techs.add(tech)),
    );

    return Array.from(techs).sort();
  }, []);

  const filteredProjects = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return projects.filter((project) => {
      const matchesSearch =
        project.name.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.tagline.toLowerCase().includes(query) ||
        project.techStack.some((tech) => tech.toLowerCase().includes(query));

      const matchesTech =
        !activeTech || project.techStack.includes(activeTech);

      return matchesSearch && matchesTech;
    });
  }, [searchQuery, activeTech]);

  const clearFilters = () => {
    setSearchQuery('');
    setActiveTech(null);
  };

  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-slate-50 py-20 text-slate-900 transition-colors duration-300 dark:bg-[#070b12] dark:text-white sm:py-24 lg:py-28"
    >
      {/* Ambient neon glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-[#00bfff]/[0.09] blur-[130px] dark:bg-[#00e5ff]/[0.06]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-[#00bfff]/[0.07] blur-[140px] dark:bg-[#00bfff]/[0.05]"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="reveal mb-12">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#00bfff]/30 bg-[#00bfff]/[0.07] px-4 py-2 dark:border-[#00e5ff]/25 dark:bg-[#00e5ff]/[0.06]">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#00bfff] shadow-[0_0_10px_rgba(0,191,255,0.7)] dark:bg-[#00e5ff]" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#008db8] dark:text-[#00e5ff]">
              Projects / Portfolio
            </span>
          </div>

          <h2 className="mb-5 max-w-4xl font-display text-3xl font-semibold leading-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
            Three projects,
            <span className="block text-[#008db8] dark:text-[#00e5ff] dark:[text-shadow:0_0_25px_rgba(0,229,255,0.2)]">
              real engineering challenges.
            </span>
          </h2>

          <p className="max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
            Explore the problem, architecture, technology stack, implemented
            features, and technical decisions behind each project.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <StatCard value={projects.length} label="Projects" />
            <StatCard value={allTechs.length} label="Technologies" />
            <StatCard value={filteredProjects.length} label="Matching projects" />
          </div>
        </div>

        {/* Search and technology filters */}
        <div className="reveal mb-8 space-y-5">
          <div className="relative max-w-xl">
            <Search
              size={18}
              aria-hidden="true"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#008db8] dark:text-[#00e5ff]/70"
            />

            <input
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search projects, descriptions, technologies..."
              aria-label="Search projects"
              className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-11 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-[#00bfff]/70 focus:ring-2 focus:ring-[#00bfff]/10 dark:border-[#00e5ff]/20 dark:bg-[#0b1420] dark:text-white dark:placeholder:text-slate-500 dark:focus:border-[#00e5ff]/70 dark:focus:ring-[#00e5ff]/10"
            />

            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-500 transition-colors hover:text-[#008db8] dark:hover:text-[#00e5ff]"
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {allTechs.map((tech) => {
              const isActive = activeTech === tech;

              return (
                <button
                  key={tech}
                  type="button"
                  onClick={() => setActiveTech(isActive ? null : tech)}
                  aria-pressed={isActive}
                  className={`rounded-lg border px-3 py-2 font-mono text-[10px] transition-all duration-200 sm:text-xs ${
                    isActive
                      ? 'border-[#00bfff]/70 bg-[#00bfff]/[0.12] text-[#007fa5] shadow-[0_0_14px_rgba(0,191,255,0.10)] dark:border-[#00e5ff]/70 dark:bg-[#00e5ff]/15 dark:text-[#00e5ff] dark:shadow-[0_0_14px_rgba(0,229,255,0.1)]'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-[#00bfff]/50 hover:text-[#008db8] dark:border-white/[0.08] dark:bg-[#0b1420] dark:text-slate-400 dark:hover:border-[#00e5ff]/40 dark:hover:text-[#00e5ff]'
                  }`}
                >
                  {tech}
                </button>
              );
            })}

            {(searchQuery || activeTech) && (
              <button
                type="button"
                onClick={clearFilters}
                className="flex items-center gap-1.5 rounded-lg border border-red-400/30 px-3 py-2 font-mono text-[10px] text-red-600 transition-colors hover:border-red-400/60 hover:bg-red-400/[0.06] dark:border-red-400/20 dark:text-red-300 dark:hover:border-red-400/50 sm:text-xs"
              >
                <XCircle size={13} />
                Clear filters
              </button>
            )}
          </div>
        </div>

        {/* Project cards */}
        {filteredProjects.length === 0 ? (
          <div className="reveal rounded-2xl border border-dashed border-[#00bfff]/30 bg-white/70 px-5 py-20 text-center dark:border-[#00e5ff]/20 dark:bg-[#0b1420]/60">
            <Layers
              size={38}
              className="mx-auto mb-4 text-[#008db8]/60 dark:text-[#00e5ff]/50"
            />
            <p className="mb-2 text-sm text-slate-700 dark:text-slate-300">
              No projects match your filters.
            </p>
            <p className="mb-5 text-xs text-slate-500">
              Try another search term or technology.
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="font-mono text-xs text-[#008db8] underline-offset-4 hover:underline dark:text-[#00e5ff]"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.slug}
                project={project}
                navigate={navigate}
                index={index}
              />
            ))}
          </div>
        )}

        {/* Project comparison */}
        {projects.length >= 2 && <ProjectComparison />}
      </div>
    </section>
  );
}

function StatCard({ value, label }: { value: number; label: string }) {
  return (
    <div className="rounded-xl border border-[#00bfff]/25 bg-white/90 px-4 py-3 dark:border-[#00e5ff]/15 dark:bg-[#0b1420]">
      <p className="font-mono text-xl font-semibold text-[#008db8] dark:text-[#00e5ff]">
        {value.toString().padStart(2, '0')}
      </p>
      <p className="mt-1 text-xs text-slate-500">{label}</p>
    </div>
  );
}

function ProjectCard({
  project,
  navigate,
  index,
}: {
  project: Project;
  navigate: (path: string) => void;
  index: number;
}) {
  const implementedCount = project.features.filter(
    (feature) => feature.implemented,
  ).length;

  const featureCount = project.features.length;

  const implementationPercentage =
    featureCount > 0 ? (implementedCount / featureCount) * 100 : 0;

  return (
    <article
      className="reveal group relative overflow-hidden rounded-2xl border border-slate-200 bg-white/90 transition-all duration-300 hover:-translate-y-1 hover:border-[#00bfff]/45 hover:shadow-[0_12px_45px_rgba(0,191,255,0.09)] dark:border-white/[0.08] dark:bg-[#0b1420]/80 dark:hover:border-[#00e5ff]/35 dark:hover:shadow-[0_12px_45px_rgba(0,229,255,0.06)]"
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      {/* Top neon accent */}
      <div
        aria-hidden="true"
        className="absolute left-0 right-0 top-0 h-px opacity-60 transition-opacity group-hover:opacity-100"
        style={{
          background: `linear-gradient(90deg, transparent, ${NEON_BLUE}, transparent)`,
        }}
      />

      <div className="grid gap-0 lg:grid-cols-12">
        {/* Project overview */}
        <div
          className="flex flex-col justify-between border-b border-slate-200 p-6 dark:border-white/[0.07] lg:col-span-4 lg:border-b-0 lg:border-r"
          style={{
            background: `linear-gradient(135deg, ${project.accentColor}12, transparent 75%)`,
          }}
        >
          <div>
            <div className="mb-5 flex items-center justify-between gap-3">
              <span className="inline-flex items-center gap-2 rounded-lg border border-[#00bfff]/25 bg-[#00bfff]/[0.06] px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-[#008db8] dark:border-[#00e5ff]/20 dark:bg-[#00e5ff]/[0.06] dark:text-[#00e5ff]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#00bfff] dark:bg-[#00e5ff]" />
                Project {String(index + 1).padStart(2, '0')}
              </span>

              <span className="font-mono text-[10px] text-slate-400 dark:text-slate-600">
                {String(index + 1).padStart(2, '0')} /{' '}
                {String(projects.length).padStart(2, '0')}
              </span>
            </div>

            <h3 className="mb-3 font-display text-2xl font-bold text-slate-900 transition-colors group-hover:text-[#008db8] dark:text-white dark:group-hover:text-[#00e5ff]">
              {project.name}
            </h3>

            <p className="text-sm leading-7 text-slate-600 dark:text-slate-400">
              {project.tagline}
            </p>
          </div>

          {/* Implementation progress */}
          <div className="mt-8">
            <div className="mb-3 flex items-center justify-between gap-3">
              <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500">
                Implemented features
              </span>
              <span className="font-mono text-xs text-[#008db8] dark:text-[#00e5ff]">
                {implementedCount}/{featureCount}
              </span>
            </div>

            <div
              className="h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-white/[0.07]"
              role="progressbar"
              aria-label={`${project.name} implemented features`}
              aria-valuenow={implementedCount}
              aria-valuemin={0}
              aria-valuemax={featureCount}
            >
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${implementationPercentage}%`,
                  background: `linear-gradient(90deg, ${NEON_BLUE}, #0ea5e9)`,
                  boxShadow: '0 0 12px rgba(0,229,255,0.4)',
                }}
              />
            </div>

            {project.hasInteractiveDemo && (
              <span className="mt-4 inline-flex items-center gap-2 rounded-lg border border-[#00bfff]/25 bg-[#00bfff]/[0.06] px-2.5 py-2 font-mono text-[10px] text-[#008db8] dark:border-[#00e5ff]/15 dark:bg-[#00e5ff]/[0.05] dark:text-[#00e5ff]">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#00bfff] dark:bg-[#00e5ff]" />
                Interactive demo available
              </span>
            )}
          </div>
        </div>

        {/* Project details */}
        <div className="p-6 lg:col-span-8 lg:p-7">
          <p className="mb-5 text-sm leading-7 text-slate-700 dark:text-slate-300">
            {project.description}
          </p>

          {/* Technology stack */}
          <div className="mb-6">
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
              Technology stack
            </p>

            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-lg border border-[#00bfff]/25 bg-[#00bfff]/[0.04] px-2.5 py-1.5 font-mono text-[10px] text-slate-700 transition-colors hover:border-[#00bfff]/50 hover:text-[#008db8] dark:border-[#00e5ff]/15 dark:bg-[#00e5ff]/[0.04] dark:text-slate-300 dark:hover:border-[#00e5ff]/40 dark:hover:text-[#00e5ff]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Feature list */}
          <div className="mb-6">
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
              Key features
            </p>

            <div className="grid gap-x-5 gap-y-3 sm:grid-cols-2">
              {project.features.slice(0, 6).map((feature) => (
                <div
                  key={feature.name}
                  className="flex items-start gap-2.5 text-xs leading-5 text-slate-700 dark:text-slate-300"
                >
                  {feature.implemented ? (
                    <Check
                      size={14}
                      className="mt-0.5 shrink-0 text-[#008db8] dark:text-[#00e5ff]"
                    />
                  ) : (
                    <Circle
                      size={13}
                      className="mt-0.5 shrink-0 text-slate-400 dark:text-slate-600"
                    />
                  )}

                  <span>{feature.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Project links */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-slate-200 pt-5 dark:border-white/[0.07]">
            <button
              type="button"
              onClick={() => navigate(`/projects/${project.slug}`)}
              className="group/link inline-flex items-center gap-2 text-sm font-medium text-[#008db8] transition-colors hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00bfff] dark:text-[#00e5ff] dark:hover:text-white"
            >
              Read case study
              <ArrowRight
                size={15}
                className="transition-transform group-hover/link:translate-x-1"
              />
            </button>

            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-slate-600 transition-colors hover:text-[#008db8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00bfff] dark:text-slate-400 dark:hover:text-[#00e5ff]"
              >
                <GitBranch size={15} />
                Repository
                <ExternalLink size={11} />
              </a>
            )}

            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-slate-600 transition-colors hover:text-[#008db8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00bfff] dark:text-slate-400 dark:hover:text-[#00e5ff]"
              >
                <ExternalLink size={15} />
                Live demo
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

function ProjectComparison() {
  const [selectedA, setSelectedA] = useState(0);
  const [selectedB, setSelectedB] = useState(1);

  const projA = projects[selectedA];
  const projB = projects[selectedB];

  const comparisonRows = [
    {
      label: 'Purpose',
      getValue: (project: Project) => project.tagline,
    },
    {
      label: 'Architecture',
      getValue: (project: Project) =>
        project.architectureComponents
          .map((component) => component.label)
          .join(', '),
    },
    {
      label: 'Tech Stack',
      getValue: (project: Project) => project.techStack.join(', '),
    },
    {
      label: 'Implemented Features',
      getValue: (project: Project) =>
        `${project.features.filter((feature) => feature.implemented).length}/${project.features.length}`,
    },
    {
      label: 'Real-time',
      getValue: (project: Project) =>
        project.techStack.some((tech) => tech.includes('WebSocket'))
          ? 'WebSocket/STOMP'
          : 'No',
    },
    {
      label: 'Database',
      getValue: (project: Project) =>
        project.techStack.find((tech) =>
          ['PostgreSQL', 'MySQL'].includes(tech),
        ) || 'N/A',
    },
  ];

  return (
    <div className="reveal mt-20">
      <div className="mb-7">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#00bfff]/25 bg-[#00bfff]/[0.06] px-3 py-1.5 dark:border-[#00e5ff]/20 dark:bg-[#00e5ff]/[0.05]">
          <Layers size={13} className="text-[#008db8] dark:text-[#00e5ff]" />
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#008db8] dark:text-[#00e5ff]">
            Side-by-side analysis
          </span>
        </div>

        <h3 className="mb-3 font-display text-2xl font-semibold text-slate-900 dark:text-white sm:text-3xl">
          Compare projects
        </h3>

        <p className="max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-400">
          Compare purpose, architecture, technology stacks, and implemented
          features using the actual project data.
        </p>
      </div>

      {/* Project selectors */}
      <div className="mb-5 grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="project-compare-a"
            className="mb-2 block font-mono text-xs text-slate-500"
          >
            PROJECT A
          </label>

          <select
            id="project-compare-a"
            value={selectedA}
            onChange={(event) => setSelectedA(Number(event.target.value))}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-colors focus:border-[#00bfff]/70 focus:ring-2 focus:ring-[#00bfff]/10 dark:border-[#00e5ff]/20 dark:bg-[#0b1420] dark:text-white dark:focus:border-[#00e5ff]/70 dark:focus:ring-[#00e5ff]/10"
          >
            {projects.map((project, index) => (
              <option key={project.slug} value={index}>
                {project.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="project-compare-b"
            className="mb-2 block font-mono text-xs text-slate-500"
          >
            PROJECT B
          </label>

          <select
            id="project-compare-b"
            value={selectedB}
            onChange={(event) => setSelectedB(Number(event.target.value))}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-colors focus:border-[#00bfff]/70 focus:ring-2 focus:ring-[#00bfff]/10 dark:border-[#00e5ff]/20 dark:bg-[#0b1420] dark:text-white dark:focus:border-[#00e5ff]/70 dark:focus:ring-[#00e5ff]/10"
          >
            {projects.map((project, index) => (
              <option key={project.slug} value={index}>
                {project.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Comparison table */}
      <div className="overflow-hidden rounded-2xl border border-[#00bfff]/25 bg-white/90 dark:border-[#00e5ff]/15 dark:bg-[#0b1420]/90">
        <div className="grid grid-cols-3 border-b border-[#00bfff]/20 bg-[#00bfff]/[0.05] dark:border-[#00e5ff]/15 dark:bg-[#00e5ff]/[0.04]">
          <div className="px-3 py-4 font-mono text-[10px] uppercase tracking-wider text-slate-500 sm:px-5">
            Attribute
          </div>

          <div className="break-words border-l border-slate-200 px-3 py-4 text-xs font-semibold text-[#008db8] dark:border-white/[0.06] dark:text-[#00e5ff] sm:px-5 sm:text-sm">
            {projA.name}
          </div>

          <div className="break-words border-l border-slate-200 px-3 py-4 text-xs font-semibold text-[#008db8] dark:border-white/[0.06] dark:text-[#00e5ff] sm:px-5 sm:text-sm">
            {projB.name}
          </div>
        </div>

        {comparisonRows.map((row, index) => (
          <div
            key={row.label}
            className={`grid grid-cols-3 ${
              index % 2 === 0
                ? 'bg-slate-100/70 dark:bg-white/[0.015]'
                : ''
            }`}
          >
            <div className="border-b border-r border-slate-200 px-3 py-4 font-mono text-[10px] leading-5 text-slate-500 dark:border-white/[0.06] sm:px-5 sm:text-xs">
              {row.label}
            </div>

            <div className="break-words border-b border-r border-slate-200 px-3 py-4 text-[11px] leading-6 text-slate-700 dark:border-white/[0.06] dark:text-slate-300 sm:px-5 sm:text-xs">
              {row.getValue(projA)}
            </div>

            <div className="break-words border-b border-slate-200 px-3 py-4 text-[11px] leading-6 text-slate-700 dark:border-white/[0.06] dark:text-slate-300 sm:px-5 sm:text-xs">
              {row.getValue(projB)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
