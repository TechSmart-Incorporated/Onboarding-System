import phoneMockup from '../assets/Phone.png'
import { MdLocalShipping } from 'react-icons/md'
import { BsCheckLg } from 'react-icons/bs'
import './hero.css'

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-content">

        {/* Left column */}
        <div className="hero-left">
          <span className="hero-badge">
            <span className="hero-badge-dot" />
            Launching Soon in Guyana
          </span>

          <h1 className="hero-heading">
            Everything<br />
            Delivered.<br />
            <span className="hero-accent">One Click.</span>
          </h1>

          <p className="hero-subtext">
            Order food, groceries, pharmacy, and more from local
            businesses across Guyana — delivered fast to your
            doorstep. Your favourite shops, one app.
          </p>

          <div className="hero-actions">
            <a href="https://store.1clickcart.com" target="_blank" rel="noopener noreferrer" className="hero-btn-primary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              Start Ordering
            </a>
            <a href="https://n8n.1clickcart.com/form/622a823b-e223-4e87-b509-c6bb3d6750c5" target="_blank" rel="noopener noreferrer" className="hero-btn-outline">Get Early App Access</a>
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-value">50+</span>
              <span className="hero-stat-label">Local Businesses</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-value">24/7</span>
              <span className="hero-stat-label">Ordering Available</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-value">30 min</span>
              <span className="hero-stat-label">Avg Delivery</span>
            </div>
          </div>
        </div>

        {/* Right column — phone mockup */}
        <div className="hero-right">
          <div className="hero-phone-wrapper">
            <a href="https://store.1clickcart.com" target="_blank" rel="noopener noreferrer" className="hero-phone-float">
              <img src={phoneMockup} alt="App mockup" className="hero-phone" loading="lazy" />
            </a>

            {/* Top-right notification */}
            <div className="hero-notif hero-notif--top">
              <div className="hero-notif-icon">
                <MdLocalShipping size={22} color="#14b899" />
              </div>
              <div className="hero-notif-text">
                <span className="hero-notif-title">Driver on the way</span>
                <span className="hero-notif-sub">Arriving in 8 min</span>
              </div>
            </div>

            {/* Bottom-left notification */}
            <div className="hero-notif hero-notif--bottom">
              <div className="hero-notif-icon">
                <BsCheckLg size={20} color="#14b899" />
              </div>
              <div className="hero-notif-text">
                <span className="hero-notif-title">Order Confirmed</span>
                <span className="hero-notif-sub">Preparing your order</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
