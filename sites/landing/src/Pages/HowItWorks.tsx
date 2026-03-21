import { useEffect, useRef } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { MdLocationPin, MdShoppingCart, MdPayment } from 'react-icons/md'
import type { IconType } from 'react-icons'
import './how-it-works.css'

const steps: { num: number; icon: IconType; title: string; desc: string }[] = [
  {
    num: 1,
    icon: MdLocationPin,
    title: 'Enter Your Location',
    desc: 'Type your address in Georgetown, Berbice, or anywhere in Guyana and see businesses that deliver to you.',
  },
  {
    num: 2,
    icon: MdShoppingCart,
    title: 'Browse & Add to Cart',
    desc: 'Pick from restaurants, grocery stores, pharmacies and more. Build your order with just a few taps.',
  },
  {
    num: 3,
    icon: MdPayment,
    title: 'Checkout & Track',
    desc: 'Pay with cash or card, then track your delivery in real-time until it arrives at your door.',
  },
]

export default function HowItWorks() {
  const sectionRef = useScrollReveal()
  const stepsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = stepsRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll<HTMLElement>('.hiw-step').forEach((step, i) => {
            step.style.transitionDelay = `${i * 0.15}s`
            step.classList.add('hiw-step--visible')
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
    <section className="hiw-section" id="how-it-works" ref={sectionRef}>
      <div className="hiw-inner">

        <div className="hiw-header">
          <span className="hiw-eyebrow reveal">
            <span className="hiw-eyebrow-line" />
            How It Works
            <span className="hiw-eyebrow-line" />
          </span>
          <h2 className="hiw-heading reveal">Order in 3 simple steps</h2>
          <p className="hiw-subtext reveal">
            No downloads required - start ordering from your browser right now.<br />
            The app is coming soon for an even faster experience.
          </p>
        </div>

        <div className="hiw-steps" ref={stepsRef}>
          {steps.map((step) => {
            const Icon = step.icon
            return (
              <div key={step.num} className="hiw-step">
                <div className="hiw-num">{step.num}</div>
                <div className="hiw-icon-wrap">
                  <Icon size={38} />
                </div>
                <h3 className="hiw-step-title">{step.title}</h3>
                <p className="hiw-step-desc">{step.desc}</p>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
