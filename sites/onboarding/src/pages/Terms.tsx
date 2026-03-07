import Navbar from '../components/LandingPage/Navbar'
import './InfoPages.css'

function Terms() {
  return (
    <div className="info-page">
      <Navbar variant="page" />

      <main className="info-main">
        <h1>Terms of Service</h1>
        <p>
          These terms describe the basic rules for using the 1ClickCart merchant onboarding experience and related
          platform services.
        </p>

        <section className="info-section">
          <h2>Use of the onboarding system</h2>
          <ul>
            <li>You agree to provide accurate and complete business information.</li>
            <li>You are responsible for keeping submitted contact details current.</li>
            <li>Incomplete or invalid submissions may delay review or provisioning.</li>
          </ul>
        </section>

        <section className="info-section">
          <h2>Review and account activation</h2>
          <ul>
            <li>All submissions are reviewed before merchant account provisioning.</li>
            <li>Approval is based on platform requirements and data completeness.</li>
            <li>Account access is provided only after successful approval and setup.</li>
          </ul>
        </section>

        <section className="info-section">
          <h2>Merchant responsibilities</h2>
          <ul>
            <li>Maintain accurate store configuration, pricing, and operating details.</li>
            <li>Use platform services in compliance with applicable laws and regulations.</li>
            <li>Respond to support requests when additional verification is required.</li>
          </ul>
        </section>

        <p className="info-note">
          Note: This page provides a high-level service summary for onboarding. Formal legal terms can be published as the
          platform expands.
        </p>
      </main>
    </div>
  )
}

export default Terms
