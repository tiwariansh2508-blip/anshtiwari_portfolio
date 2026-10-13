import { ArrowLeft, Terminal } from 'lucide-react';

interface NotFoundProps {
  navigate: (path: string) => void;
  onOpenTerminal: () => void;
}

export function NotFound({ navigate, onOpenTerminal }: NotFoundProps) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-20">
      <div className="max-w-md w-full text-center">
        {/* Code block decoration */}
        <div className="inline-block mb-8 rounded-xl border dark:border-ink-800 border-warm-200 dark:bg-ink-900/50 bg-warm-50 px-6 py-4 text-left font-mono text-sm">
          <span className="dark:text-ink-500 text-ink-400">// </span>
          <span className="dark:text-error text-error">Error</span>
          <br />
          <span className="dark:text-ink-500 text-ink-400">status</span>
          <span className="dark:text-ink-300 text-ink-600">: </span>
          <span className="dark:text-cobalt-400 text-cobalt-600">404</span>
          <br />
          <span className="dark:text-ink-500 text-ink-400">message</span>
          <span className="dark:text-ink-300 text-ink-600">: </span>
          <span className="dark:text-ink-200 text-ink-700">"Page not found"</span>
          <br />
          <span className="dark:text-ink-500 text-ink-400">path</span>
          <span className="dark:text-ink-300 text-ink-600">: </span>
          <span className="dark:text-ink-200 text-ink-700">"{window.location.pathname}"</span>
        </div>

        <h1 className="font-display text-display-xl font-bold dark:text-ink-50 text-ink-900 mb-3">
          404
        </h1>
        <p className="font-display text-lg dark:text-ink-300 text-ink-600 mb-2">
          This page doesn't exist.
        </p>
        <p className="text-sm dark:text-ink-400 text-ink-500 mb-8">
          The URL you requested wasn't found. Check the address or navigate home.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-cobalt-500 text-white text-sm font-medium hover:bg-cobalt-600 transition-colors"
          >
            <ArrowLeft size={14} /> Go Home
          </button>
          <button
            onClick={() => navigate('/projects')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg dark:bg-ink-800 bg-warm-200 dark:text-ink-100 text-ink-800 text-sm font-medium dark:hover:bg-ink-700 hover:bg-warm-300 transition-colors"
          >
            View Projects
          </button>
          <button
            onClick={onOpenTerminal}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg dark:text-ink-300 text-ink-600 text-sm font-medium dark:hover:bg-ink-800 hover:bg-warm-100 transition-colors"
          >
            <Terminal size={14} /> Open Terminal
          </button>
        </div>
      </div>
    </div>
  );
}
