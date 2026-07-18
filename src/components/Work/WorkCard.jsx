// One work card plus its popup detail. The thumbnail is a real <button> that
// opens the popup; the × closes it. The popup is a sibling of the button (not
// nested inside it) because a <button> may not contain interactive content like
// the popup's close button and team link. `.work-detail` is position:fixed, so
// moving it out of the trigger doesn't change where it renders on screen.
export default function WorkCard({
  id,
  title,
  containerClass,
  thumb,
  paragraphs,
  link,
  isOpen,
  onOpen,
  onClose,
}) {
  const containerClassName = ['work-img-container', containerClass]
    .filter(Boolean)
    .join(' ');
  // Unique ids so the trigger can point aria-controls at its dialog, and the
  // dialog can point aria-labelledby at its own heading.
  const dialogId = `work-dialog-${id}`;
  const titleId = `work-dialog-title-${id}`;
  return (
    <div className="work">
      <button
        type="button"
        className="work-trigger"
        onClick={onOpen}
        aria-label={`${title} — view details`}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls={dialogId}
      >
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
      </button>

      <div
        id={dialogId}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={`work-detail${isOpen ? ' show' : ''}`}
      >
        <div className="work-detail-heading mb-60">
          <div>
            <h3 id={titleId} className="m-0">
              {title}
            </h3>
          </div>
          <button className="hide-popup fs-28" onClick={onClose}>
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
  );
}
