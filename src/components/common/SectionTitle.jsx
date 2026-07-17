// The "title" block (heading + tagline) reused at the top of each section.
export default function SectionTitle({ heading, tagline }) {
  return (
    <div className="text-lg-right text-left title">
      <h2 className="fs-30 m-0">{heading}</h2>
      <p>{tagline}</p>
    </div>
  );
}
