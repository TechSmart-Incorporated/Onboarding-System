import { MdShoppingCart, MdStorefront } from 'react-icons/md'
import { useScrollReveal } from '../hooks/useScrollReveal'
import './cta.css'

export default function CTA() {
  const ref = useScrollReveal()

  return (
    <section className="cta-section" ref={ref}>
      <div className="cta-inner">

        <h2 className="cta-heading reveal">
          Get the app<br />
          <span className="cta-heading-accent">before everyone else.</span>
        </h2>

        <p className="cta-subtext reveal">
          Sign up for early access to the 1ClickCart native app for iOS and Android. Be the
          first to experience lightning-fast ordering across Guyana.
        </p>

        <div className="cta-actions reveal">
          <a href="https://store.1clickcart.com" target="_blank" rel="noopener noreferrer" className="cta-btn-primary">
            <MdShoppingCart size={20} />
            Start Ordering Now
          </a>
          <a href="https://business.1clickcart.com" target="_blank" rel="noopener noreferrer" className="cta-btn-outline">
            <MdStorefront size={20} />
            Register Your Business
          </a>
        </div>

        <p className="cta-byline reveal">Proudly built for Guyana by TechSmart Inc.</p>

      </div>
    </section>
  )
}
