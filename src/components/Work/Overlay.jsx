// Dimming overlay behind an open work popup. Visible when a popup is open, and
// clicking it closes the popup (a mouse convenience — the × button and the
// Escape key are the keyboard-accessible ways to close). When hidden it has
// pointer-events:none in CSS, so it can't intercept clicks.
export default function Overlay({ show, onClose }) {
  return (
    <div className={`overlay${show ? ' show' : ''}`} onClick={onClose}></div>
  );
}
