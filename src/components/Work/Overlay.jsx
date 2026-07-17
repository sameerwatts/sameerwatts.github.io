// Dimming overlay behind an open work popup. Visible when a popup is open.
// (The old markup had no click-to-close on the overlay — only the × closes it.)
export default function Overlay({ show }) {
  return <div className={`overlay${show ? ' show' : ''}`}></div>;
}
