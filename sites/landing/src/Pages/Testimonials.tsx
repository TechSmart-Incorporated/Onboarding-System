import { useEffect, useRef } from 'react'
import { BsStarFill, BsStarHalf } from 'react-icons/bs'
import './testimonials.css'

const reviews = [
  {
    stars: 5,
    quote: '"Finally something that works properly for Guyana. I ordered my lunch and groceries in the same cart. Amazing."',
    name: 'Ravin P.',
    role: 'Customer, Georgetown',
  },
  {
    stars: 5,
    quote: '"We got more orders in the first week than we expected in a month. The dashboard is easy and the support team is great."',
    name: 'Shanta M.',
    role: 'Restaurant Owner',
  },
  {
    stars: 4.5,
    quote: '"I deliver on my scooter after work. Flexible hours, fast payouts. This is exactly what Guyana needed."',
    name: 'Kevin D.',
    role: 'Delivery Partner',
  },
]

function Stars({ count }: { count: number }) {
  return (
    <div className="tmn-stars">
      {[1, 2, 3, 4, 5].map((i) => (
        count >= i
          ? <BsStarFill key={i} size={16} />
          : count >= i - 0.5
            ? <BsStarHalf key={i} size={16} />
            : <BsStarFill key={i} size={16} className="tmn-star-empty" />
      ))}
    </div>
  )
}

export default function Testimonials() {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = gridRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll<HTMLElement>('.tmn-card').forEach((card, i) => {
            card.style.transitionDelay = `${i * 0.12}s`
            card.classList.add('tmn-card--visible')
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
    <section className="tmn-section">
      <div className="tmn-inner">

        <div className="tmn-header">
          <span className="tmn-eyebrow">
            <span className="tmn-eyebrow-line" />
            What People Say
            <span className="tmn-eyebrow-line" />
          </span>
          <h2 className="tmn-heading">Loved by Guyanese</h2>
          <p className="tmn-subtext">
            Early users and businesses already seeing the difference 1ClickCart makes.
          </p>
        </div>

        <div className="tmn-grid" ref={gridRef}>
          {reviews.map((r) => (
            <div key={r.name} className="tmn-card">
              <Stars count={r.stars} />
              <p className="tmn-quote">{r.quote}</p>
              <div className="tmn-author">
                <div className="tmn-avatar">{r.name[0]}</div>
                <div>
                  <span className="tmn-name">{r.name}</span>
                  <span className="tmn-role">{r.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
