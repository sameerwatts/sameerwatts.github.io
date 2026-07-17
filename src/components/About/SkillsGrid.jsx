import ProgressBox from './ProgressBox.jsx';
import { frontend, languages } from '../../data/skills.js';

// Two-column skills grid, driven by the skills data.
export default function SkillsGrid() {
  return (
    <div className="skills-grid">
      <div className="frontend">
        <h4 className="mb-20">Frontend Technologies</h4>
        {frontend.map((s) => (
          <ProgressBox key={s.name} name={s.name} percent={s.percent} />
        ))}
      </div>
      <div className="programming-language">
        <h4 className="mb-20">Programming Languages</h4>
        {languages.map((s) => (
          <ProgressBox key={s.name} name={s.name} percent={s.percent} />
        ))}
      </div>
    </div>
  );
}
