import { useEffect, useRef } from 'react'
import { MdCheckBox, MdStorefront, MdArrowForward } from 'react-icons/md'
import './for-business.css'

const stats = [
  { value: '0%',     label: 'Commission Fees' },
  { value: '1,000+', label: 'Potential Customers' },
  { value: '24hrs',  label: 'Go Live Time' },
  { value: '100%',   label: 'Your Brand' },
]

const bullets = [
  'Custom online storefront with your brand',
  'Real-time order management dashboard',
  'Built-in delivery with driver tracking',
  'Promotions, coupons & loyalty campaigns',
  'Detailed analytics and sales reports',
]

export default function ForBusiness() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll<HTMLElement>('.biz-animate').forEach((node, i) => {
            node.style.transitionDelay = `${i * 0.1}s`
            node.classList.add('biz-animate--visible')
          })
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="biz-section" id="for-business" ref={sectionRef}>
      <div className="biz-inner">

        {/* Left — stat card */}
        <div className="biz-card biz-animate">
          <div className="biz-card-header">
            <MdStorefront size={52} className="biz-store-icon" />
            <h3 className="biz-card-title">Grow Your Business Online</h3>
            <p className="biz-card-sub">Join the fastest-growing marketplace in Guyana</p>
          </div>

          <div className="biz-stats">
            {stats.map((s) => (
              <div key={s.label} className="biz-stat">
                <span className="biz-stat-value">{s.value}</span>
                <span className="biz-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — copy */}
        <div className="biz-right biz-animate">
          <span className="biz-eyebrow">
            <span className="biz-eyebrow-line" />
            For Businesses
          </span>

          <h2 className="biz-heading">
            Sell more.<br />Zero commission.
          </h2>

          <p className="biz-subtext">
            Whether you run a restaurant, pharmacy, grocery shop, or retail store —
            1ClickCart gives you a branded online storefront, delivery logistics, and
            access to thousands of new customers across Guyana.
          </p>

          <ul className="biz-bullets">
            {bullets.map((b) => (
              <li key={b} className="biz-bullet">
                <span className="biz-bullet-icon"><MdCheckBox size={18} /></span>
                {b}
              </li>
            ))}
          </ul>

          <a href="https://business.1clickcart.com" target="_blank" rel="noopener noreferrer" className="biz-btn">
            Register Your Business <MdArrowForward size={18} />
          </a>
        </div>

      </div>
    </section>
  )
}
