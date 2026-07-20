import { useEffect, useRef } from 'react';

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

  const triggerRef = useRef(null);
  const dialogRef = useRef(null);

  // When the dialog opens: move focus into it and trap Tab within it. When it
  // closes (or unmounts): return focus to the trigger that opened it. Closed
  // dialogs also get `inert` (in the JSX below) so they aren't focusable or
  // reachable by assistive tech while hidden.
  useEffect(() => {
    if (!isOpen) return;
    const dialog = dialogRef.current;
    const trigger = triggerRef.current;
    if (!dialog) return;

    const focusablesIn = () =>
      dialog.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );

    // Move focus into the dialog (the × close button is first).
    focusablesIn()[0]?.focus();

    // Keep Tab / Shift+Tab cycling within the dialog.
    const onKeyDown = (e) => {
      if (e.key !== 'Tab') return;
      const items = focusablesIn();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    dialog.addEventListener('keydown', onKeyDown);

    return () => {
      dialog.removeEventListener('keydown', onKeyDown);
      trigger?.focus();
    };
  }, [isOpen]);

  return (
    <div className="work">
      <button
        ref={triggerRef}
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
        {/* Persistent "opens a detail view" cue — visible without hover, so the
            card reads as tappable on touch devices too. Decorative (the button's
            aria-label already announces "… — view details"). */}
        <span className="work-expand" aria-hidden="true">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 3 21 3 21 9" />
            <polyline points="9 21 3 21 3 15" />
            <line x1="21" y1="3" x2="14" y2="10" />
            <line x1="3" y1="21" x2="10" y2="14" />
          </svg>
        </span>
      </button>

      <div
        ref={dialogRef}
        id={dialogId}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        inert={!isOpen}
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
