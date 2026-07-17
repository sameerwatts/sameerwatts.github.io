import SectionTitle from '../common/SectionTitle.jsx';
import ServiceCard from './ServiceCard.jsx';
import { companies } from '../../data/experience.js';

export default function Experience() {
  return (
    <section className="experience bg-color-sky-light section-content" id="experience">
      <SectionTitle heading="Experience" tagline="Batman would be jealous.." />
      <div className="text-left description">
        <div className="serviceList">
          {companies.map((c) => (
            <ServiceCard key={c.name} {...c} />
          ))}
        </div>
      </div>
    </section>
  );
}
