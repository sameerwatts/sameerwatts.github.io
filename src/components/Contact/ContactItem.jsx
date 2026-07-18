// One contact row. Entries without `href` render as plain text (Phone).
export default function ContactItem({ label, text, href, external, download }) {
  return (
    <div className="contact mb-20">
      <h5>{label}</h5>
      {href ? (
        <a
          href={href}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          {...(download ? { download: true } : {})}
        >
          <p>{text}</p>
        </a>
      ) : (
        <p>{text}</p>
      )}
    </div>
  );
}
