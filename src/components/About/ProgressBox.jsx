import { useInView } from '../../hooks/useInView.js';

// One skill row. The bar grows to `percent` when it scrolls into view and
// resets to 0 when it leaves (matches the old scrollAnimation behaviour).
export default function ProgressBox({ name, percent }) {
  const [ref, inView] = useInView();
  return (
    <div className="progress-box">
      <h5>
        {name} <span className="pull-right">{percent}</span>
      </h5>
      <div className="progress">
        <div
          ref={ref}
          className={`progress-bar${inView ? ' active' : ''}`}
          style={{ width: inView ? percent : '0px' }}
        ></div>
      </div>
    </div>
  );
}
