import Navbar from '../Navbar/Navbar.jsx';

// Home/hero section. Navbar stays inside `.page-wrapper` exactly as in the old
// markup: `.nav-wrapper` is position:fixed with no `top`, so its resolved
// position depends on its static DOM location — keep it first here.
export default function Home() {
  return (
    <section className="home" id="home">
      <div className="page-wrapper">
        <Navbar />
        <div className="header lh-1-27">
          <div className="header-text-first fs-lg-70 fs-md-50 fs-30 fw-900">
            S<span>a</span>mir
          </div>
          <div className="header-text-last fs-lg-70 fs-md-50 fs-30 fw-900">
            W<span>a</span>tts
          </div>
        </div>
        <div className="profile fs-lg-24 fs-md-20 fs-18">Front-end Developer</div>
        <div className="underLine"></div>
      </div>
    </section>
  );
}
