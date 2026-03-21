import { useEffect, useRef } from 'react'
import { MdStorefront, MdLocationOn, MdAccountBalanceWallet, MdSchedule, MdStar, MdCardGiftcard } from 'react-icons/md'
import type { IconType } from 'react-icons'
import { useScrollReveal } from '../hooks/useScrollReveal'
import './features.css'

const features: { icon: IconType; iconBg: string; iconColor: string; title: string; desc: string }[] = [
  {
    icon: MdStorefront,
    iconBg: '#e8f5f0',
    iconColor: '#14b899',
    title: 'Multi-Store Marketplace',
    desc: 'Order from multiple businesses in one session — food from one spot, groceries from another, all in a single checkout.',
  },
  {
    icon: MdLocationOn,
    iconBg: '#fef6e4',
    iconColor: '#f0a500',
    title: 'Real-Time Tracking',
    desc: 'Follow your driver on the map in real-time. Know exactly when your order arrives — no more guessing.',
  },
  {
    icon: MdAccountBalanceWallet,
    iconBg: '#fdecea',
    iconColor: '#e53935',
    title: 'Cash on Delivery',
    desc: 'Not everyone has a card. Pay with cash, card on delivery, or online — whatever works best for you.',
  },
  {
    icon: MdSchedule,
    iconBg: '#e8f5f0',
    iconColor: '#14b899',
    title: 'Schedule Orders',
    desc: 'Pre-order for later today, tomorrow, or next week. Plan your meals and deliveries around your schedule.',
  },
  {
    icon: MdStar,
    iconBg: '#fef6e4',
    iconColor: '#f0a500',
    title: 'Ratings & Reviews',
    desc: 'Read real reviews from other customers. Rate your orders and help the best businesses stand out.',
  },
  {
    icon: MdCardGiftcard,
    iconBg: '#fdecea',
    iconColor: '#e53935',
    title: 'Loyalty Rewards',
    desc: 'Earn points on every order. Redeem for discounts, free delivery, and exclusive deals from your favourite shops.',
  },
]

export default function Features() {
  const sectionRef = useScrollReveal()
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = gridRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll<HTMLElement>('.features-card').forEach((card, i) => {
            card.style.transitionDelay = `${i * 0.08}s`
            card.classList.add('features-card--visible')
          })
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="features-section" id="features" ref={sectionRef}>
      <div className="features-inner">

        <div className="features-header">
          <span className="features-eyebrow reveal">
            <span className="features-eyebrow-line" />
            Why 1ClickCart
            <span className="features-eyebrow-line" />
          </span>
          <h2 className="features-heading reveal">
            Built for Guyana.<br />Powered by technology.
          </h2>
          <p className="features-subtext reveal">
            Every feature designed with Guyanese consumers and businesses in
            mind - from cash on delivery to local payment methods.
          </p>
        </div>

        <div className="features-grid" ref={gridRef}>
          {features.map((f) => {
            const Icon = f.icon
            return (
              <div key={f.title} className="features-card">
                <div className="features-icon-wrap" style={{ background: f.iconBg }}>
                  <Icon size={24} color={f.iconColor} />
                </div>
                <h3 className="features-card-title">{f.title}</h3>
                <p className="features-card-desc">{f.desc}</p>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
