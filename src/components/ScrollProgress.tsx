import { useScrollProgress } from '@/hooks';

export function ScrollProgress() {
  const progress = useScrollProgress();
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-0.5 bg-transparent pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-cobalt-500 to-cobalt-300 transition-[width] duration-75"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
