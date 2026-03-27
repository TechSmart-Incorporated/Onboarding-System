import { useState, useEffect } from 'react'
import logoMain from '../../assets/logo-main.svg'
import './navbar.css'

const navLinks = [
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Features', href: '#features' },
  { label: 'The App', href: '#the-app' },
  { label: 'For Business', href: '#for-business' },
  { label: 'Deliver', href: '#deliver' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <div className="navbar-inner">
        {/* Logo */}
        <a href="/" className="navbar-logo">
          <img src={logoMain} alt="" className="navbar-logo-img" />
          1ClickCart
        </a>

        {/* Desktop links */}
        <ul className="navbar-links">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a href={link.href} className="navbar-link">
                {link.label}
              </a>
            </li>
          ))}
          <li className="navbar-cta">
            <a href="https://store.1clickcart.com" target="_blank" rel="noopener noreferrer" className="navbar-btn">Shop as Guest</a>
          </li>
        </ul>

        {/* Hamburger */}
        <button
          className="navbar-hamburger"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span className={`bar ${menuOpen ? 'open' : ''}`} />
          <span className={`bar ${menuOpen ? 'open' : ''}`} />
          <span className={`bar ${menuOpen ? 'open' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="navbar-mobile">
          <ul className="navbar-mobile-links">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="navbar-link"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="navbar-mobile-cta">
            <a href="https://store.1clickcart.com" target="_blank" rel="noopener noreferrer" className="navbar-btn w-full text-center">Shop as Guest</a>
          </div>
        </div>
      )}
    </nav>
  )
}
