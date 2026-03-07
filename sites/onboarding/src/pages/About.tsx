import Navbar from '../components/LandingPage/Navbar'
import './InfoPages.css'

function About() {
  return (
    <div className="info-page">
      <Navbar variant="page" />

      <main className="info-main">
        <h1>About 1ClickCart</h1>
        <p>
          1ClickCart is a digital commerce platform built to help businesses across Guyana launch and run online stores.
          It is developed and operated by TechSmart Inc.
        </p>

        <section className="info-section">
          <h2>What the platform helps merchants do</h2>
          <ul>
            <li>Sell products online</li>
            <li>Manage orders and customer checkout</li>
            <li>Process payments</li>
            <li>Support delivery and pickup operations</li>
            <li>Handle core store operations in one place</li>
          </ul>
        </section>

        <section className="info-section">
          <h2>How it works</h2>
          <p>
            1ClickCart uses Ordering.co as the commerce engine, then adds localized platform services for merchant onboarding,
            account provisioning, payment setup, and administrative support.
          </p>
        </section>

        <section className="info-section">
          <h2>Long-term goal</h2>
          <p>
            The goal is to deliver a scalable commerce ecosystem for Guyana, giving small and medium-sized businesses easier
            access to digital selling tools similar to what global platforms provide.
          </p>
        </section>
      </main>
    </div>
  )
}

export default About
