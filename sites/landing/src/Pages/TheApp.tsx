import { useEffect, useRef } from 'react'
import { MdCheckCircle } from 'react-icons/md'
import completedOrder from '../assets/completedOrder.svg'
import confirmOrder from '../assets/confirmOrder.svg'
import './the-app.css'

const bullets = [
  'Browse 50+ businesses near you',
  'Real-time order tracking with live driver map',
  'One-tap reorder from your favourites',
  'Push notifications for order updates & deals',
  'Secure payments — cash, card, or wallet',
]

export default function TheApp() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll<HTMLElement>('.app-animate').forEach((node, i) => {
            node.style.transitionDelay = `${i * 0.1}s`
            node.classList.add('app-animate--visible')
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
    <section className="app-section" id="the-app" ref={sectionRef}>
      <div className="app-inner">

        {/* Left */}
        <div className="app-left app-animate">
          <span className="app-eyebrow">
            <span className="app-eyebrow-line" />
            The App
          </span>

          <h2 className="app-heading">
            Your local shops,<br />
            <span className="app-heading-accent">in your pocket.</span>
          </h2>

          <p className="app-subtext">
            The 1ClickCart app brings every store, restaurant and service in
            Guyana to your fingertips. Native iOS & Android — fast, beautiful,
            and built for you.
          </p>

          <ul className="app-bullets">
            {bullets.map((b) => (
              <li key={b} className="app-bullet">
                <MdCheckCircle size={20} className="app-bullet-icon" />
                {b}
              </li>
            ))}
          </ul>

          <div className="app-actions">
            <a href="https://n8n.1clickcart.com/form/622a823b-e223-4e87-b509-c6bb3d6750c5" target="_blank" rel="noopener noreferrer" className="app-btn-primary">Get Early Access</a>
            <a href="https://store.1clickcart.com" target="_blank" rel="noopener noreferrer" className="app-btn-outline">Order on Web Now</a>
          </div>
        </div>

        {/* Right — phone images */}
        <div className="app-right">
          <div className="app-phone-peek-wrapper">
            <img src={completedOrder} alt="Completed order screen" className="app-phone app-phone--back" />
          </div>
          <img src={confirmOrder} alt="Confirm order screen" className="app-phone app-phone--front app-animate" />
        </div>

      </div>
    </section>
  )
}
