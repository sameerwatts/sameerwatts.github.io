// One skill row. Static in Phase 1 (bar stays at its CSS default width); Phase 2
// drives `.progress-bar` width from `percent` via useInView.
export default function ProgressBox({ name, percent }) {
  return (
    <div className="progress-box">
      <h5>
        {name} <span className="pull-right">{percent}</span>
      </h5>
      <div className="progress">
        <div className="progress-bar"></div>
      </div>
    </div>
  );
}
