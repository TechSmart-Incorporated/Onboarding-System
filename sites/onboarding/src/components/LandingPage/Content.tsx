import { Link } from 'react-router-dom'

function Content() {
  return (
    <main className="landing-main">
      <section className="hero-section" aria-label="Hero">
        <div className="hero-content">
          <h1>Grow your Business with 1 Click Cart</h1>
          <Link className="hero-cta" to="/forms">
            Get Started
          </Link>
        </div>
      </section>
    </main>
  )
}

export default Content
