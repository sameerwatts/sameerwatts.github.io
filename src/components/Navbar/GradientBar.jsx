import { useScrollProgress } from '../../hooks/useScrollProgress.js';

// Top gradient scroll-progress bar; width tracks scroll %.
export default function GradientBar() {
  const progress = useScrollProgress();
  return <div className="grad-bar" style={{ width: `${progress}%` }}></div>;
}
