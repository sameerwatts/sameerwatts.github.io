import { useEffect, useState } from 'react';
import SectionTitle from '../common/SectionTitle.jsx';
import WorkCard from './WorkCard.jsx';
import Overlay from './Overlay.jsx';
import { works } from '../../data/works.js';

export default function Work() {
  // Which work popup is open (id) or null. Only one open at a time.
  const [openWork, setOpenWork] = useState(null);

  // Close the open popup on Escape. Listener is only attached while a popup
  // is open, and removed when it closes or the component unmounts.
  useEffect(() => {
    if (openWork === null) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setOpenWork(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [openWork]);

  return (
    <section className="work section-content" id="work">
      <Overlay show={openWork !== null} onClose={() => setOpenWork(null)} />
      <SectionTitle heading="Works" tagline="I build the real value." />
      <div className="text-left description">
        <div className="workList-grid1">
          {works.map((w) => (
            <WorkCard
              key={w.id}
              {...w}
              isOpen={openWork === w.id}
              onOpen={() => setOpenWork(w.id)}
              onClose={() => setOpenWork(null)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
