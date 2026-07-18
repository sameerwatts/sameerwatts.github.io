import SectionTitle from '../common/SectionTitle.jsx';
import SkillsGrid from './SkillsGrid.jsx';

export default function About() {
  return (
    <section className="about section-content" id="about">
      <SectionTitle heading="Intro" tagline="What i am all about." />
      <div className="text-left description">
        <div className="mb-60">
          <p className="lh-1-5">
            Frontend Developer with 8 years of experience in building Web applications,
            dashboard and static pages for multiple clients across various domains and geographies
          </p>
        </div>
        <SkillsGrid />
      </div>
    </section>
  );
}
