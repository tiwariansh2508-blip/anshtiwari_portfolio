import { useState, useMemo } from 'react';
import {
  Search,
  X,
  Code2,
  Server,
  Layout,
  Database,
  Radio,
  Wrench,
} from 'lucide-react';
import {
  skills,
  skillCategories,
  projects,
  type SkillCategory,
} from '@/data/portfolio';

interface SkillsExplorerProps {
  navigate: (path: string) => void;
}

const NEON_BLUE = '#00e5ff';

const iconMap: Record<string, typeof Code2> = {
  Code2,
  Server,
  Layout,
  Database,
  Radio,
  Wrench,
};

const categoryColors: Record<SkillCategory, string> = {
  Languages: '#00e5ff',
  'Java & Backend Engineering': '#00bfff',
  'Frontend Development': '#38bdf8',
  Databases: '#67e8f9',
  'APIs & Real-Time Systems': '#22d3ee',
  'Tools & Development Practices': '#0ea5e9',
};

export function SkillsExplorer({ navigate }: SkillsExplorerProps) {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] =
    useState<SkillCategory | 'All'>('All');

  const filteredSkills = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return skills.filter((skill) => {
      const matchesSearch =
        skill.name.toLowerCase().includes(query) ||
        skill.description.toLowerCase().includes(query) ||
        skill.relatedConcepts.some((concept) =>
          concept.toLowerCase().includes(query),
        );

      const matchesCategory =
        activeCategory === 'All' || skill.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const selected = skills.find((skill) => skill.name === selectedSkill);

  const relatedProjects = selected
    ? projects.filter((project) =>
        selected.relatedProjects.includes(project.slug),
      )
    : [];

  return (
    <section
      id="skills"
      className="relative overflow-hidden bg-slate-50 py-20 text-slate-900 transition-colors duration-300 dark:bg-[#070b12] dark:text-white sm:py-24 lg:py-28"
    >
      {/* Ambient neon background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-cyan-400/10 blur-[120px] dark:bg-[#00e5ff]/[0.08]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-10 h-96 w-96 rounded-full bg-sky-400/10 blur-[140px] dark:bg-[#00bfff]/[0.07]"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="reveal mb-12">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-500/25 bg-cyan-500/[0.06] px-4 py-2 dark:border-[#00e5ff]/25 dark:bg-[#00e5ff]/[0.06]">
            <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-500 dark:bg-[#00e5ff]" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-700 dark:text-[#00e5ff]">
              Skills & Technologies
            </span>
          </div>

          <h2 className="mb-5 max-w-4xl font-display text-3xl font-semibold leading-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
            Technologies I work with,
            <span className="block text-cyan-600 dark:text-[#00e5ff] dark:[text-shadow:0_0_25px_rgba(0,229,255,0.2)]">
              organized by domain.
            </span>
          </h2>

          <p className="max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
            Select any technology to explore its description, related projects,
            and concepts. No fabricated proficiency scores — just what I
            actually use.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <StatCard value={skills.length} label="Technologies" />
            <StatCard value={skillCategories.length} label="Domains" />
            <StatCard value={filteredSkills.length} label="Matching results" />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-12">
          {/* Skills list and filters */}
          <div className="reveal min-w-0 lg:col-span-7">
            {/* Search */}
            <div className="relative mb-5">
              <Search
                size={18}
                aria-hidden="true"
                className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-600/70 dark:text-[#00e5ff]/70"
              />

              <input
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search skills, concepts..."
                aria-label="Search skills"
                className="w-full rounded-xl border border-slate-300 bg-white py-3.5 pl-11 pr-11 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10 dark:border-[#00e5ff]/20 dark:bg-[#0b1420] dark:text-white dark:placeholder:text-slate-600 dark:focus:border-[#00e5ff]/70 dark:focus:ring-[#00e5ff]/10"
              />

              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-500 transition-colors hover:text-cyan-600 dark:hover:text-[#00e5ff]"
                  aria-label="Clear search"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Category filters */}
            <div className="mb-6 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setActiveCategory('All')}
                aria-pressed={activeCategory === 'All'}
                className={`rounded-lg border px-3 py-2 font-mono text-xs transition-all duration-200 ${
                  activeCategory === 'All'
                    ? 'border-cyan-500 bg-cyan-500/10 text-cyan-700 shadow-[0_0_15px_rgba(0,229,255,0.08)] dark:border-[#00e5ff] dark:bg-[#00e5ff]/15 dark:text-[#00e5ff] dark:shadow-[0_0_15px_rgba(0,229,255,0.12)]'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-cyan-500/40 hover:text-cyan-700 dark:border-white/[0.08] dark:bg-[#0b1420] dark:text-slate-400 dark:hover:border-[#00e5ff]/40 dark:hover:text-[#00e5ff]'
                }`}
              >
                All
              </button>

              {skillCategories.map((category) => {
                const Icon = iconMap[category.icon] || Code2;
                const isActive = activeCategory === category.name;

                return (
                  <button
                    key={category.name}
                    type="button"
                    onClick={() => setActiveCategory(category.name)}
                    aria-pressed={isActive}
                    className={`flex items-center gap-1.5 rounded-lg border px-3 py-2 font-mono text-xs transition-all duration-200 ${
                      isActive
                        ? 'border-cyan-500 bg-cyan-500/10 text-cyan-700 shadow-[0_0_15px_rgba(0,229,255,0.08)] dark:border-[#00e5ff] dark:bg-[#00e5ff]/15 dark:text-[#00e5ff] dark:shadow-[0_0_15px_rgba(0,229,255,0.12)]'
                        : 'border-slate-200 bg-white text-slate-600 hover:border-cyan-500/40 hover:text-cyan-700 dark:border-white/[0.08] dark:bg-[#0b1420] dark:text-slate-400 dark:hover:border-[#00e5ff]/40 dark:hover:text-[#00e5ff]'
                    }`}
                  >
                    <Icon size={13} />
                    {category.name}
                  </button>
                );
              })}
            </div>

            {/* Skills grid */}
            {filteredSkills.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-cyan-500/30 bg-white/70 px-5 py-16 text-center dark:border-[#00e5ff]/20 dark:bg-[#0b1420]/60">
                <Search
                  size={28}
                  aria-hidden="true"
                  className="mx-auto mb-4 text-cyan-600/50 dark:text-[#00e5ff]/50"
                />
                <p className="mb-2 text-sm text-slate-700 dark:text-slate-300">
                  No skills match your search.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('All');
                  }}
                  className="font-mono text-xs text-cyan-700 underline-offset-4 hover:underline dark:text-[#00e5ff]"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2">
                {filteredSkills.map((skill) => {
                  const isSelected = selectedSkill === skill.name;
                  const color = categoryColors[skill.category] || NEON_BLUE;

                  return (
                    <button
                      key={skill.name}
                      type="button"
                      onClick={() => setSelectedSkill(skill.name)}
                      aria-pressed={isSelected}
                      className={`group relative overflow-hidden rounded-xl border p-4 text-left transition-all duration-300 ${
                        isSelected
                          ? 'border-cyan-500/70 bg-cyan-500/[0.07] shadow-[0_0_22px_rgba(0,229,255,0.08)] dark:border-[#00e5ff]/70 dark:bg-[#00e5ff]/[0.09] dark:shadow-[0_0_22px_rgba(0,229,255,0.09)]'
                          : 'border-slate-200 bg-white hover:-translate-y-0.5 hover:border-cyan-500/40 hover:bg-cyan-50/50 dark:border-white/[0.08] dark:bg-[#0b1420]/80 dark:hover:border-[#00e5ff]/40 dark:hover:bg-[#0d1926]'
                      }`}
                    >
                      {isSelected && (
                        <span
                          aria-hidden="true"
                          className="absolute bottom-0 left-0 top-0 w-0.5 bg-cyan-500 dark:bg-[#00e5ff]"
                        />
                      )}

                      <div className="mb-3 flex items-center justify-between gap-3">
                        <span
                          className={`text-sm font-semibold transition-colors ${
                            isSelected
                              ? 'text-cyan-700 dark:text-[#00e5ff]'
                              : 'text-slate-800 group-hover:text-cyan-700 dark:text-slate-200 dark:group-hover:text-[#00e5ff]'
                          }`}
                        >
                          {skill.name}
                        </span>

                        <span
                          aria-hidden="true"
                          className="h-2.5 w-2.5 shrink-0 rounded-full"
                          style={{
                            backgroundColor: color,
                            boxShadow: `0 0 10px ${color}70`,
                          }}
                        />
                      </div>

                      <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-500">
                        {skill.category}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Skill details panel */}
          <div
            className="reveal min-w-0 lg:col-span-5"
            style={{ transitionDelay: '0.1s' }}
          >
            <div className="overflow-hidden rounded-2xl border border-cyan-500/20 bg-white/95 shadow-[0_0_35px_rgba(0,229,255,0.04)] dark:border-[#00e5ff]/20 dark:bg-[#0b1420]/90 dark:shadow-[0_0_35px_rgba(0,229,255,0.04)] lg:sticky lg:top-24">
              <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-white/[0.06]">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-500 dark:bg-[#00e5ff]" />
                  <span className="font-mono text-xs uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                    Technology Explorer
                  </span>
                </div>
                <span className="font-mono text-[10px] text-cyan-700/70 dark:text-[#00e5ff]/60">
                  SYS / 01
                </span>
              </div>

              {selected ? (
                <div className="space-y-6 p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-700/70 dark:text-[#00e5ff]/70">
                        Selected technology
                      </p>
                      <h3 className="font-display text-2xl font-semibold text-slate-900 dark:text-white">
                        {selected.name}
                      </h3>
                      <span className="mt-2 inline-block rounded-md border border-cyan-500/20 bg-cyan-500/[0.06] px-2 py-1 font-mono text-[10px] text-cyan-700 dark:border-[#00e5ff]/20 dark:bg-[#00e5ff]/[0.06] dark:text-[#00e5ff]">
                        {selected.category}
                      </span>
                    </div>

                    <span
                      aria-hidden="true"
                      className="mt-2 h-3 w-3 shrink-0 rounded-full"
                      style={{
                        backgroundColor:
                          categoryColors[selected.category] || NEON_BLUE,
                        boxShadow: `0 0 15px ${categoryColors[selected.category] || NEON_BLUE}`,
                      }}
                    />
                  </div>

                  <div>
                    <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500">
                      Overview
                    </p>
                    <p className="text-sm leading-7 text-slate-700 dark:text-slate-300">
                      {selected.description}
                    </p>
                  </div>

                  {/* Related concepts */}
                  <div>
                    <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500">
                      Related concepts
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {selected.relatedConcepts.map((concept) => (
                        <span
                          key={concept}
                          className="rounded-lg border border-cyan-500/15 bg-cyan-500/[0.05] px-2.5 py-1.5 font-mono text-[10px] text-slate-700 transition-colors hover:border-cyan-500/40 hover:text-cyan-700 dark:border-[#00e5ff]/15 dark:bg-[#00e5ff]/[0.05] dark:text-slate-300 dark:hover:border-[#00e5ff]/40 dark:hover:text-[#00e5ff]"
                        >
                          {concept}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Related projects */}
                  {relatedProjects.length > 0 && (
                    <div>
                      <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500">
                        Related projects
                      </p>

                      <div className="space-y-2">
                        {relatedProjects.map((project) => (
                          <button
                            key={project.slug}
                            type="button"
                            onClick={() =>
                              navigate(`/projects/${project.slug}`)
                            }
                            className="group flex w-full items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-left text-sm text-slate-700 transition-all hover:border-cyan-500/40 hover:bg-cyan-500/[0.04] dark:border-white/[0.07] dark:bg-[#070b12] dark:text-slate-300 dark:hover:border-[#00e5ff]/40 dark:hover:bg-[#00e5ff]/[0.04]"
                          >
                            <span>{project.name}</span>
                            <span className="shrink-0 font-mono text-[10px] text-cyan-700 transition-transform group-hover:translate-x-1 dark:text-[#00e5ff]">
                              Explore →
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Connection diagram */}
                  <div>
                    <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500">
                      Connection map
                    </p>
                    <div className="rounded-xl border border-cyan-500/10 bg-slate-50 p-2 dark:border-[#00e5ff]/10 dark:bg-[#070b12]/70">
                      <SkillNetworkDiagram
                        skillName={selected.name}
                        concepts={selected.relatedConcepts}
                        projects={relatedProjects.map((project) => project.name)}
                        color={
                          categoryColors[selected.category] || NEON_BLUE
                        }
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="px-6 py-14 text-center">
                  <div className="relative mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-2xl border border-cyan-500/25 bg-cyan-500/[0.05] dark:border-[#00e5ff]/25 dark:bg-[#00e5ff]/[0.05]">
                    <div className="absolute inset-0 animate-pulse rounded-2xl border border-cyan-500/10 dark:border-[#00e5ff]/10" />
                    <Code2
                      size={32}
                      aria-hidden="true"
                      className="text-cyan-600 dark:text-[#00e5ff]"
                      style={{
                        filter: 'drop-shadow(0 0 10px rgba(0,229,255,0.4))',
                      }}
                    />
                  </div>

                  <h3 className="mb-2 font-display text-lg font-semibold text-slate-900 dark:text-white">
                    Select a technology
                  </h3>
                  <p className="mx-auto max-w-xs text-sm leading-6 text-slate-600 dark:text-slate-400">
                    Choose any skill to explore its details, related concepts,
                    projects, and connections.
                  </p>

                  <div className="mt-6 flex items-center justify-center gap-2 font-mono text-[10px] uppercase tracking-widest text-cyan-700/60 dark:text-[#00e5ff]/60">
                    <span className="h-px w-6 bg-cyan-500/30 dark:bg-[#00e5ff]/30" />
                    Awaiting selection
                    <span className="h-px w-6 bg-cyan-500/30 dark:bg-[#00e5ff]/30" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCard({ value, label }: { value: number; label: string }) {
  return (
    <div className="rounded-lg border border-cyan-500/15 bg-white/80 px-4 py-3 dark:border-[#00e5ff]/15 dark:bg-[#0b1420]">
      <p className="font-mono text-xl font-semibold text-cyan-700 dark:text-[#00e5ff]">
        {value.toString().padStart(2, '0')}
      </p>
      <p className="mt-1 text-xs text-slate-500">{label}</p>
    </div>
  );
}

function SkillNetworkDiagram({
  skillName,
  concepts,
  projects,
  color,
}: {
  skillName: string;
  concepts: string[];
  projects: string[];
  color: string;
}) {
  const allNodes = [
    { label: skillName, isCenter: true },
    ...concepts.slice(0, 4).map((concept) => ({
      label: concept,
      isCenter: false,
    })),
    ...projects.slice(0, 2).map((project) => ({
      label: project,
      isCenter: false,
    })),
  ];

  const center = { x: 120, y: 100 };
  const radius = 70;
  const outerNodes = allNodes.slice(1);

  return (
    <svg
      viewBox="0 0 240 200"
      className="mx-auto w-full max-w-sm overflow-visible"
      role="img"
      aria-label={`Connection diagram for ${skillName}`}
    >
      <defs>
        <filter id="skill-network-neon-glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Connections */}
      {outerNodes.map((node, index) => {
        const angle =
          (index / Math.max(outerNodes.length, 1)) * Math.PI * 2 -
          Math.PI / 2;
        const x = center.x + Math.cos(angle) * radius;
        const y = center.y + Math.sin(angle) * radius;

        return (
          <line
            key={`line-${node.label}`}
            x1={center.x}
            y1={center.y}
            x2={x}
            y2={y}
            stroke={color}
            strokeWidth="1.2"
            strokeOpacity="0.4"
            strokeDasharray="4 4"
          >
            <animate
              attributeName="stroke-opacity"
              values="0.2;0.65;0.2"
              dur="3s"
              begin={`${index * 0.25}s`}
              repeatCount="indefinite"
            />
          </line>
        );
      })}

      {/* Center node */}
      <g filter="url(#skill-network-neon-glow)">
        <circle
          cx={center.x}
          cy={center.y}
          r="25"
          fill={color}
          fillOpacity="0.12"
        />
        <circle
          cx={center.x}
          cy={center.y}
          r="17"
          fill="#07121b"
          stroke={color}
          strokeWidth="1.5"
        />
        <text
          x={center.x}
          y={center.y + 3}
          textAnchor="middle"
          fill={color}
          fontSize="7"
          fontFamily="monospace"
          fontWeight="700"
        >
          {skillName.length > 8
            ? `${skillName.slice(0, 7)}…`
            : skillName}
        </text>
      </g>

      {/* Outer nodes */}
      {outerNodes.map((node, index) => {
        const angle =
          (index / Math.max(outerNodes.length, 1)) * Math.PI * 2 -
          Math.PI / 2;
        const x = center.x + Math.cos(angle) * radius;
        const y = center.y + Math.sin(angle) * radius;

        return (
          <g key={`node-${node.label}`}>
            <circle
              cx={x}
              cy={y}
              r="11"
              fill="#0b1420"
              stroke={color}
              strokeOpacity="0.8"
              strokeWidth="1.2"
            />
            <circle
              cx={x}
              cy={y}
              r="3"
              fill={color}
              fillOpacity="0.8"
            />
            <text
              x={x}
              y={y + 23}
              textAnchor="middle"
              fill="#a5b4c5"
              fontSize="6.5"
              fontFamily="monospace"
            >
              {node.label.length > 12
                ? `${node.label.slice(0, 11)}…`
                : node.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
