// One work card plus its (currently always-rendered, hidden-by-CSS) popup detail.
// Thumbs with a `label` use the two-row image+caption layout. Phase 2 adds the
// open/close behaviour to `.work-trigger` and the `.hide-popup` button.
export default function WorkCard({ title, containerClass, thumb, paragraphs, link }) {
  const containerClassName = ['work-img-container', containerClass].filter(Boolean).join(' ');
  return (
    <div className="work">
      <div className="work-trigger">
        <div className={containerClassName}>
          {thumb.label ? (
            <>
              <div>
                <img
                  src={thumb.src}
                  alt={thumb.alt}
                  {...(thumb.width ? { width: thumb.width } : {})}
                  {...(thumb.height ? { height: thumb.height } : {})}
                />
              </div>
              <div>{thumb.label}</div>
            </>
          ) : (
            <img src={thumb.src} alt={thumb.alt} />
          )}
        </div>

        <div className="work-detail">
          <div className="work-detail-heading mb-60">
            <div>
              <h3 className="m-0">{title}</h3>
            </div>
            <button className="hide-popup fs-28">&times;</button>
          </div>
          <div className="desc">
            <div className="work-desc">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="vertical-separator"></div>
            <div className="horizontal-separator"></div>
            <div className="team">
              <a href={link.href} target="_blank">
                <img
                  src={link.img.src}
                  width={link.img.width}
                  height={link.img.height}
                  alt={link.img.alt}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
