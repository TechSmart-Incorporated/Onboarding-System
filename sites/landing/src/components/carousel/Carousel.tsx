import { MdLocalPharmacy, MdLocalBar, MdLocalFlorist, MdRestaurant, MdShoppingCart, MdStorefront } from 'react-icons/md'
import { FaBoxOpen } from 'react-icons/fa'
import { GiMeat, GiCupcake } from 'react-icons/gi'
import type { IconType } from 'react-icons'
import './carousel.css'

const categories: { icon: IconType; label: string; color: string }[] = [
  { icon: MdLocalPharmacy,  label: 'Pharmacies',    color: '#3b82f6' },
  { icon: GiCupcake,        label: 'Bakeries',      color: '#f59e0b' },
  { icon: GiMeat,           label: 'Butchers',      color: '#ef4444' },
  { icon: MdLocalBar,       label: 'Bars & Lounges',color: '#8b5cf6' },
  { icon: MdStorefront,     label: 'Retail Shops',  color: '#14b899' },
  { icon: MdLocalFlorist,   label: 'Florists',      color: '#ec4899' },
  { icon: FaBoxOpen,        label: 'Parcels',       color: '#d97706' },
  { icon: MdRestaurant,     label: 'Restaurants',   color: '#f97316' },
  { icon: MdShoppingCart,   label: 'Groceries',     color: '#10b981' },
]

export default function Carousel() {
  const items = [...categories, ...categories]

  return (
    <section className="carousel-section">
      <p className="carousel-label">Serving businesses across Guyana</p>

      <div className="carousel-track-wrapper">
        <ul className="carousel-track">
          {items.map((cat, i) => {
            const Icon = cat.icon
            return (
              <li key={i} className="carousel-item">
                <Icon size={22} color={cat.color} className="carousel-icon" />
                <span className="carousel-text">{cat.label}</span>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
