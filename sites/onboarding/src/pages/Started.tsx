import { Link } from 'react-router-dom'
import Navbar from '../components/LandingPage/Navbar'
import './InfoPages.css'

const onboardingSteps = [
  'Submit your business information through the onboarding form.',
  'The system validates and structures your data for platform compatibility.',
  'You receive an automated confirmation email that your submission was received.',
  'The platform team reviews your application and may request clarification if needed.',
  'After approval, your merchant account is provisioned in platform systems.',
  'You receive account access instructions by email.',
  'You configure your store: products, prices, hours, fulfillment options, and branding.',
  'After setup verification, your store is activated to accept customer orders.',
]

function Started() {
  return (
    <div className="info-page">
      <Navbar variant="page" />

      <main className="info-main">
        <h1>Get Started</h1>
        <p>
          The onboarding process is designed to move merchants from registration to an active store through a clear,
          structured workflow.
        </p>

        <section className="info-section">
          <h2>Onboarding process</h2>
          <ol>
            {onboardingSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>

        <section className="info-section">
          <h2>Prepare before applying</h2>
          <ul>
            <li>Business name and contact details</li>
            <li>Business location and operating hours</li>
            <li>Payment and operational preferences</li>
            <li>Basic store setup details needed for initial provisioning</li>
          </ul>
          <Link className="info-cta" to="/forms">
            Begin Onboarding Form
          </Link>
        </section>
      </main>
    </div>
  )
}

export default Started
