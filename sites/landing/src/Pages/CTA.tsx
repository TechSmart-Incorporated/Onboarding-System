import { MdShoppingCart, MdStorefront } from 'react-icons/md'
import './cta.css'

export default function CTA() {
  return (
    <section className="cta-section">
      <div className="cta-inner">

        <h2 className="cta-heading">
          Get the app<br />
          <span className="cta-heading-accent">before everyone else.</span>
        </h2>

        <p className="cta-subtext">
          Sign up for early access to the 1ClickCart native app for iOS and Android. Be the
          first to experience lightning-fast ordering across Guyana.
        </p>

        <div className="cta-actions">
          <a href="https://store.1clickcart.com" target="_blank" rel="noopener noreferrer" className="cta-btn-primary">
            <MdShoppingCart size={20} />
            Start Ordering Now
          </a>
          <a href="https://business.1clickcart.com" target="_blank" rel="noopener noreferrer" className="cta-btn-outline">
            <MdStorefront size={20} />
            Register Your Business
          </a>
        </div>

        <p className="cta-byline">Proudly built for Guyana by TechSmart Inc.</p>

      </div>
    </section>
  )
}
