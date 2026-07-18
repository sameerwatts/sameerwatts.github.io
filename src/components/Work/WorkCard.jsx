// One work card plus its popup detail. Clicking the trigger opens this card's
// popup; the × closes it (stopPropagation so the close click doesn't re-open via
// the trigger — mirrors the old showWorkPopup / hidePopupHandler pair).
export default function WorkCard({
  title,
  containerClass,
  thumb,
  paragraphs,
  link,
  isOpen,
  onOpen,
  onClose,
}) {
  const containerClassName = ['work-img-container', containerClass].filter(Boolean).join(' ');
  return (
    <div className="work">
      <div className="work-trigger" onClick={onOpen}>
        <div className={containerClassName}>
          {thumb.label ? (
            <>
              <div>
                <img
                  src={thumb.src}
                  alt={thumb.alt}
                  loading="lazy"
                  {...(thumb.width ? { width: thumb.width } : {})}
                  {...(thumb.height ? { height: thumb.height } : {})}
                />
              </div>
              <div>{thumb.label}</div>
            </>
          ) : (
            <img src={thumb.src} alt={thumb.alt} loading="lazy" />
          )}
        </div>

        <div className={`work-detail${isOpen ? ' show' : ''}`}>
          <div className="work-detail-heading mb-60">
            <div>
              <h3 className="m-0">{title}</h3>
            </div>
            <button
              className="hide-popup fs-28"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
            >
              &times;
            </button>
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
              <a href={link.href} target="_blank" rel="noopener noreferrer">
                <img
                  src={link.img.src}
                  width={link.img.width}
                  height={link.img.height}
                  alt={link.img.alt}
                  loading="lazy"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
