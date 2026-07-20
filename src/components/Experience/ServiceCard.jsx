// One experience/company card. Uses a logo image, or an <i> icon when the
// company has no image (Freelancing). `white` adds the light-text class.
export default function ServiceCard({
  name,
  serviceClass,
  logoClass,
  logo,
  icon,
  alt,
  blurb,
  white,
}) {
  const logoClassName = ['company-logo', logoClass, 'mb-20']
    .filter(Boolean)
    .join(' ');
  return (
    <div className={['service', serviceClass].filter(Boolean).join(' ')}>
      <div className="service-element">
        <div className={logoClassName}>
          {logo ? (
            <img src={logo} alt={alt} loading="lazy" />
          ) : (
            <i className={`service-icon mb-20 ${icon}`}></i>
          )}
        </div>
      </div>
      <div className="service-info">
        <h2
          className={['mb-20', white ? 'white' : ''].filter(Boolean).join(' ')}
        >
          {name}
        </h2>
        <p className={white ? 'white' : ''}>{blurb}</p>
      </div>
    </div>
  );
}
