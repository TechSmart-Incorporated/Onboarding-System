import { useState } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'
import { Link } from 'react-router-dom'

type NavbarProps = {
  menuOpen?: boolean
  onToggleMenu?: () => void
  onNavigate?: () => void
  variant?: 'landing' | 'page'
}

const navigation = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Get Started', to: '/started' },
  { label: 'Terms of Service', to: '/terms' },
]

function Navbar({ menuOpen, onToggleMenu, onNavigate, variant = 'landing' }: NavbarProps) {
  const [internalMenuOpen, setInternalMenuOpen] = useState(false)
  const isControlled = typeof menuOpen === 'boolean' && typeof onToggleMenu === 'function'
  const resolvedMenuOpen = isControlled ? menuOpen : internalMenuOpen

  const handleToggleMenu = () => {
    if (isControlled) {
      onToggleMenu()
      return
    }

    setInternalMenuOpen((open) => !open)
  }

  const handleNavigate = () => {
    onNavigate?.()

    if (!isControlled) {
      setInternalMenuOpen(false)
    }
  }

  return (
    <header className={`site-header ${variant === 'page' ? 'site-header--page' : ''}`}>
      <div className="site-header__inner">
        <a className="brand" href="https://1clickcart.com" onClick={handleNavigate}>
          1 Click Cart
        </a>

        <nav className="site-nav site-nav--desktop" aria-label="Primary">
          {navigation.map((item) => (
            <Link key={item.label} to={item.to} onClick={handleNavigate}>
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="menu-toggle"
          aria-expanded={resolvedMenuOpen}
          aria-controls="mobile-navigation"
          aria-label={resolvedMenuOpen ? 'Close menu' : 'Open menu'}
          onClick={handleToggleMenu}
        >
          {resolvedMenuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      <div
        className={`mobile-nav ${resolvedMenuOpen ? 'mobile-nav--open' : ''}`}
        id="mobile-navigation"
      >
        <nav className="site-nav site-nav--mobile" aria-label="Mobile">
          {navigation.map((item) => (
            <Link key={item.label} to={item.to} onClick={handleNavigate}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Navbar
