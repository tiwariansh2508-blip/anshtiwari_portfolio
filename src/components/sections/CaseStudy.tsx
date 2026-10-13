import { useState } from 'react';
import { ArrowLeft, Check, Circle, GitBranch, ExternalLink, AlertCircle, Zap, Target, Server, Database, Shield, Radio, Code2, Cpu } from 'lucide-react';
import { projects, type Project } from '@/data/portfolio';
import { ChessBoard } from '@/components/ChessBoard';

interface CaseStudyProps {
  project: Project;
  navigate: (path: string) => void;
}

const typeIcons: Record<string, typeof Server> = {
  frontend: Code2,
  backend: Server,
  database: Database,
  security: Shield,
  realtime: Radio,
  service: Cpu,
};

const typeColors: Record<string, string> = {
  frontend: '#d97706',
  backend: '#3563ff',
  database: '#dc2626',
  security: '#8b5cf6',
  realtime: '#16a34a',
  service: '#0891b2',
};

export function CaseStudy({ project, navigate }: CaseStudyProps) {
  const [activeComponent, setActiveComponent] = useState<string | null>(null);

  return (
    <article className="pt-24 pb-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-mono dark:text-ink-500 text-ink-400 mb-6 reveal" aria-label="Breadcrumb">
          <button onClick={() => navigate('/projects')} className="hover:dark:text-cobalt-400 hover:text-cobalt-600 transition-colors">
            Projects
          </button>
          <span>/</span>
          <span className="dark:text-ink-300 text-ink-600">{project.name}</span>
        </nav>

        <button
          onClick={() => navigate('/projects')}
          className="inline-flex items-center gap-1.5 text-sm dark:text-ink-400 text-ink-500 hover:dark:text-cobalt-400 hover:text-cobalt-600 transition-colors mb-8 reveal"
        >
          <ArrowLeft size={14} /> Back to projects
        </button>

        {/* Header */}
        <header className="mb-12 reveal">
          <div className="flex items-center gap-3 mb-4">
            <span
              className="inline-block w-12 h-1 rounded-full"
              style={{ backgroundColor: project.accentColor }}
            />
            <span className="text-xs font-mono uppercase tracking-wider dark:text-ink-500 text-ink-400">
              Case Study
            </span>
          </div>
          <h1 className="font-display text-display-xl font-bold dark:text-ink-50 text-ink-900 mb-4 text-balance">
            {project.name}
          </h1>
          <p className="font-display text-lg dark:text-ink-300 text-ink-600 max-w-3xl leading-relaxed">
            {project.tagline}
          </p>

          <div className="flex flex-wrap gap-2 mt-6">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 text-xs font-mono rounded dark:bg-ink-800 bg-warm-200 dark:text-ink-300 text-ink-600"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 mt-6">
            {project.repoUrl ? (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm dark:text-ink-300 text-ink-600 hover:dark:text-cobalt-400 hover:text-cobalt-600 transition-colors"
              >
                <GitBranch size={14} /> Repository
              </a>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-sm dark:text-ink-600 text-ink-400">
                <GitBranch size={14} /> Repository link not yet available
              </span>
            )}
            {project.demoUrl ? (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm dark:text-ink-300 text-ink-600 hover:dark:text-cobalt-400 hover:text-cobalt-600 transition-colors"
              >
                <ExternalLink size={14} /> Live demo
              </a>
            ) : null}
          </div>
        </header>

        {/* Problem */}
        <section className="mb-12 reveal">
          <div className="flex items-center gap-2 mb-3">
            <Target size={18} className="dark:text-cobalt-400 text-cobalt-600" />
            <h2 className="font-display text-xl font-semibold dark:text-ink-50 text-ink-900">The Problem</h2>
          </div>
          <p className="text-base dark:text-ink-300 text-ink-600 leading-relaxed max-w-3xl">
            {project.problem}
          </p>
        </section>

        {/* Responsibilities */}
        <section className="mb-12 reveal">
          <h2 className="font-display text-xl font-semibold dark:text-ink-50 text-ink-900 mb-4">My Responsibilities</h2>
          <ul className="space-y-2 max-w-3xl">
            {project.responsibilities.map((resp, i) => (
              <li key={i} className="flex items-start gap-3 text-sm dark:text-ink-300 text-ink-600 leading-relaxed">
                <span className="font-mono text-xs dark:text-cobalt-400 text-cobalt-600 mt-0.5">{String(i + 1).padStart(2, '0')}</span>
                {resp}
              </li>
            ))}
          </ul>
        </section>

        {/* Architecture diagram */}
        <section className="mb-12 reveal">
          <div className="flex items-center gap-2 mb-3">
            <Zap size={18} className="dark:text-cobalt-400 text-cobalt-600" />
            <h2 className="font-display text-xl font-semibold dark:text-ink-50 text-ink-900">System Architecture</h2>
          </div>
          <p className="text-sm dark:text-ink-400 text-ink-500 mb-4">
            Click any component to see details. Lines show data flow between components.
          </p>

          <ArchitectureDiagram project={project} activeComponent={activeComponent} setActiveComponent={setActiveComponent} />

          {activeComponent && (
            <div className="mt-4 p-4 rounded-lg border dark:border-ink-800 border-warm-200 dark:bg-ink-900/50 bg-warm-50 animate-fade-in">
              {(() => {
                const comp = project.architectureComponents.find((c) => c.id === activeComponent);
                if (!comp) return null;
                const Icon = typeIcons[comp.type] || Server;
                const color = typeColors[comp.type] || '#3563ff';
                const incoming = project.architectureConnections.filter((c) => c.to === comp.id);
                const outgoing = project.architectureConnections.filter((c) => c.from === comp.id);
                return (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Icon size={16} style={{ color }} />
                      <span className="font-display text-sm font-semibold dark:text-ink-100 text-ink-800">{comp.label}</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded" style={{ backgroundColor: `${color}20`, color }}>
                        {comp.type}
                      </span>
                    </div>
                    {incoming.length > 0 && (
                      <p className="text-xs dark:text-ink-400 text-ink-500 mb-1">
                        <span className="font-mono">Receives from:</span>{' '}
                        {incoming.map((c) => project.architectureComponents.find((comp2) => comp2.id === c.from)?.label).join(', ')}
                      </p>
                    )}
                    {outgoing.length > 0 && (
                      <p className="text-xs dark:text-ink-400 text-ink-500">
                        <span className="font-mono">Sends to:</span>{' '}
                        {outgoing.map((c) => project.architectureComponents.find((comp2) => comp2.id === c.to)?.label).join(', ')}
                      </p>
                    )}
                  </div>
                );
              })()}
            </div>
          )}
        </section>

        {/* Interactive demo for chess */}
        {project.hasInteractiveDemo && (
          <section className="mb-12 reveal">
            <div className="flex items-center gap-2 mb-4">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-success animate-pulse-ring" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
              </span>
              <h2 className="font-display text-xl font-semibold dark:text-ink-50 text-ink-900">Interactive Demo</h2>
            </div>
            <p className="text-sm dark:text-ink-400 text-ink-500 mb-4">
              Try the chess engine below. Click a piece to see legal moves highlighted, then click a
              destination to move. The full rule set is implemented.
            </p>
            <ChessBoard />
          </section>
        )}

        {/* Features */}
        <section className="mb-12 reveal">
          <h2 className="font-display text-xl font-semibold dark:text-ink-50 text-ink-900 mb-4">Implemented Features</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {project.features.map((feature) => (
              <div
                key={feature.name}
                className={`flex items-center gap-2 p-3 rounded-lg border text-sm ${
                  feature.implemented
                    ? 'dark:border-ink-800 border-warm-200 dark:bg-ink-900/40 bg-warm-50 dark:text-ink-200 text-ink-700'
                    : 'dark:border-ink-800 border-warm-200 dark:bg-ink-900/20 bg-warm-100/30 dark:text-ink-500 text-ink-400'
                }`}
              >
                {feature.implemented ? (
                  <Check size={14} className="text-success flex-shrink-0" />
                ) : (
                  <Circle size={14} className="dark:text-ink-600 text-warm-400 flex-shrink-0" />
                )}
                {feature.name}
              </div>
            ))}
          </div>
        </section>

        {/* Challenges */}
        <section className="mb-12 reveal">
          <h2 className="font-display text-xl font-semibold dark:text-ink-50 text-ink-900 mb-4">Technical Challenges & Decisions</h2>
          <div className="space-y-4">
            {project.challenges.map((challenge, i) => (
              <div key={i} className="p-5 rounded-lg border dark:border-ink-800 border-warm-200 dark:bg-ink-900/40 bg-warm-50">
                <div className="flex items-start gap-3">
                  <AlertCircle size={16} className="dark:text-cobalt-400 text-cobalt-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-display text-base font-semibold dark:text-ink-100 text-ink-800 mb-1">
                      {challenge.title}
                    </h3>
                    <p className="text-sm dark:text-ink-300 text-ink-600 leading-relaxed">
                      {challenge.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Note about repo/demo */}
        {!project.repoUrl && (
          <div className="p-4 rounded-lg border dark:border-warm-700/30 border-warm-300 dark:bg-warm-700/10 bg-warm-100 flex items-start gap-3 reveal">
            <AlertCircle size={16} className="dark:text-warm-600 text-warm-600 mt-0.5 flex-shrink-0" />
            <p className="text-xs dark:text-ink-400 text-ink-500">
              Repository and demo links will be added when available. This case study reflects the
              actual implemented work based on the project description.
            </p>
          </div>
        )}
      </div>
    </article>
  );
}

function ArchitectureDiagram({
  project,
  activeComponent,
  setActiveComponent,
}: {
  project: Project;
  activeComponent: string | null;
  setActiveComponent: (id: string | null) => void;
}) {
  const width = 700;
  const height = 380;
  const compMap = new Map(project.architectureComponents.map((c) => [c.id, c]));

  return (
    <div className="rounded-xl border dark:border-ink-800 border-warm-200 dark:bg-ink-900/30 bg-warm-50 p-4 overflow-x-auto">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full min-w-[600px]" role="img" aria-label={`System architecture diagram for ${project.name}`}>
        <defs>
          <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="#4d545f" />
          </marker>
          <marker id="arrowhead-active" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill={project.accentColor} />
          </marker>
        </defs>

        {/* Connections */}
        {project.architectureConnections.map((conn, i) => {
          const from = compMap.get(conn.from);
          const to = compMap.get(conn.to);
          if (!from || !to) return null;
          const isActive = activeComponent === conn.from || activeComponent === conn.to;
          const midX = (from.x + to.x) / 2 + 50;
          const midY = (from.y + to.y) / 2 + 20;
          return (
            <g key={i}>
              <path
                d={`M ${from.x + 90} ${from.y + 25} Q ${midX} ${midY} ${to.x} ${to.y + 25}`}
                fill="none"
                stroke={isActive ? project.accentColor : '#3d434c'}
                strokeWidth={isActive ? 2 : 1.5}
                strokeDasharray={isActive ? '0' : '6 4'}
                markerEnd={isActive ? 'url(#arrowhead-active)' : 'url(#arrowhead)'}
                className={isActive ? '' : 'animate-dash-flow'}
                opacity={isActive ? 1 : 0.6}
              />
              <text
                x={midX}
                y={midY - 5}
                fill={isActive ? project.accentColor : '#636c79'}
                fontSize="9"
                fontFamily="JetBrains Mono, monospace"
                textAnchor="middle"
                opacity={isActive ? 1 : 0.7}
              >
                {conn.label}
              </text>
            </g>
          );
        })}

        {/* Components */}
        {project.architectureComponents.map((comp) => {
          const Icon = typeIcons[comp.type] || Server;
          const color = typeColors[comp.type] || '#3563ff';
          const isActive = activeComponent === comp.id;
          return (
            <g
              key={comp.id}
              transform={`translate(${comp.x}, ${comp.y})`}
              onClick={() => setActiveComponent(isActive ? null : comp.id)}
              className="cursor-pointer"
              role="button"
              aria-label={comp.label}
            >
              <rect
                width="90"
                height="50"
                rx="6"
                fill={isActive ? `${color}20` : '#1a1e24'}
                stroke={isActive ? color : '#3d434c'}
                strokeWidth={isActive ? 2 : 1}
                style={{ transition: 'all 0.2s' }}
              />
              <foreignObject x="8" y="6" width="20" height="20">
                <div style={{ color }}>
                  <Icon size={16} />
                </div>
              </foreignObject>
              <text
                x="45"
                y="32"
                fill={isActive ? '#e9ebed' : '#aeb4bc'}
                fontSize="8"
                fontFamily="JetBrains Mono, monospace"
                fontWeight="600"
                textAnchor="middle"
              >
                {comp.label.length > 16 ? comp.label.slice(0, 15) + '…' : comp.label}
              </text>
              <text
                x="45"
                y="44"
                fill={color}
                fontSize="6"
                fontFamily="JetBrains Mono, monospace"
                textAnchor="middle"
                opacity="0.7"
              >
                {comp.type}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
