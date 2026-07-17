import SectionTitle from '../common/SectionTitle.jsx';
import WorkCard from './WorkCard.jsx';
import Overlay from './Overlay.jsx';
import { works } from '../../data/works.js';

export default function Work() {
  return (
    <section className="work section-content" id="work">
      <Overlay />
      <SectionTitle heading="Works" tagline="I build the real value." />
      <div className="text-left description">
        <div className="workList-grid1">
          {works.map((w) => (
            <WorkCard key={w.id} {...w} />
          ))}
        </div>
      </div>
    </section>
  );
}
