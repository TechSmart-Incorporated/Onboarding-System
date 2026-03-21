import { useEffect, useRef } from 'react'
import { MdDirectionsCar, MdTwoWheeler, MdDirectionsBike, MdDirectionsWalk, MdAttachMoney } from 'react-icons/md'
import type { IconType } from 'react-icons'
import './deliver.css'

const driverTypes: { icon: IconType; title: string; sub: string }[] = [
  { icon: MdDirectionsCar,   title: 'Taxi Drivers',          sub: 'Partner with taxi bases' },
  { icon: MdTwoWheeler,      title: 'Scooter Riders',        sub: 'Quick & nimble deliveries' },
  { icon: MdDirectionsBike,  title: 'Cyclists',              sub: 'Eco-friendly delivery' },
  { icon: MdDirectionsWalk,  title: 'Independent Walkers',   sub: 'Short-distance runs' },
]

export default function Deliver() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll<HTMLElement>('.del-animate').forEach((node, i) => {
            node.style.transitionDelay = `${i * 0.08}s`
            node.classList.add('del-animate--visible')
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
    <section className="del-section" id="deliver" ref={sectionRef}>
      <div className="del-inner">

        {/* Left */}
        <div className="del-left del-animate">
          <span className="del-eyebrow">
            <span className="del-eyebrow-line" />
            Deliver with Us
          </span>
          <h2 className="del-heading">Anyone Can Deliver.</h2>
          <p className="del-subtext">
            Got a car, scooter, bicycle, or just two feet? Earn money delivering
            for 1ClickCart. We partner with taxi drivers, independent contractors,
            ladies with scooters — anyone ready to hustle. Fully compliant with
            Guyana law.
          </p>
          <div className="del-actions">
            <a href="#" className="del-btn-primary">Apply to Deliver</a>
            <a href="#" className="del-btn-outline">Learn More</a>
          </div>
        </div>

        {/* Right */}
        <div className="del-right">
          <div className="del-grid">
            {driverTypes.map((d) => {
              const Icon = d.icon
              return (
                <div key={d.title} className="del-card del-animate">
                  <Icon size={36} className="del-card-icon" />
                  <span className="del-card-title">{d.title}</span>
                  <span className="del-card-sub">{d.sub}</span>
                </div>
              )
            })}
          </div>

          <div className="del-earn del-animate">
            <span className="del-earn-icon"><MdAttachMoney size={26} /></span>
            <div>
              <p className="del-earn-title">Earn on your schedule</p>
              <p className="del-earn-desc">
                Be your own boss. Accept deliveries when you want, get paid fast.
                Daily or weekly payouts available.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
