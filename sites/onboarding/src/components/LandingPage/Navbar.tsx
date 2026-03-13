import { useEffect, useState } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'
import { Link, useLocation } from 'react-router-dom'

const navigation = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Get Started', to: '/started' },
  { label: 'Terms', to: '/terms' },
]

function Navbar() {
  const [scrolled, setScrolled] = useState(() => window.innerWidth < 768)
  const [menuOpen, setMenuOpen] = useState(false)
  const [slid, setSlid] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.innerWidth < 768 || window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [pathname])

  // Slide down from above on mount
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setSlid(true))
    })
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: scrolled ? 'rgba(10,15,26,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '0.5px solid rgba(255,255,255,0.08)' : 'none',
        transform: slid ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 0.5s ease, background 0.3s ease, backdrop-filter 0.3s ease',
      }}
    >
      {/* Inner container */}
      <div
        className="flex items-center justify-between h-16 mx-auto"
        style={{ maxWidth: '1200px', padding: '0 32px' }}
      >
        {/* Logo */}
        <a
          href="https://1clickcart.com"
          className="inline-flex items-center gap-2 no-underline whitespace-nowrap shrink-0"
        >
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-[8px] bg-[#14b899] text-white text-[0.7rem] font-extrabold tracking-wider shrink-0">
            1C
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-white font-semibold text-base tracking-wide">1ClickCart</span>
            <span className="text-[#14b899] text-[0.65rem] font-semibold tracking-widest uppercase mt-[2px]">Business</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden min-[640px]:flex items-center gap-0.5 ml-auto" aria-label="Primary">
          {navigation.map(({ label, to }) => {
            const isActive = pathname === to
            return (
              <Link
                key={to}
                to={to}
                className="px-[0.9rem] py-[0.55rem] rounded-full text-[0.9rem] no-underline transition-colors duration-200"
                style={{
                  color: isActive ? '#ffffff' : 'rgba(255,255,255,0.6)',
                  fontWeight: isActive ? 500 : 400,
                }}
                onMouseEnter={(e) => {
                  if (!isActive) (e.currentTarget as HTMLAnchorElement).style.color = '#ffffff'
                }}
                onMouseLeave={(e) => {
                  if (!isActive) (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.6)'
                }}
              >
                {label}
              </Link>
            )
          })}
        </nav>

        {/* CTA */}
        <Link
          to="/forms"
          className="hidden min-[640px]:inline-flex items-center px-4 py-[0.55rem] rounded-full bg-[#14b899] text-white text-sm font-semibold no-underline hover:bg-[#12a688] transition-colors duration-200 shrink-0"
        >
          Start Selling
        </Link>

        {/* Mobile toggle */}
        <button
          type="button"
          className="min-[640px]:hidden ml-auto inline-flex items-center justify-center w-[2.6rem] h-[2.6rem] rounded-full cursor-pointer text-white text-lg"
          style={{ border: '0.5px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.06)' }}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((o) => !o)}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className="min-[640px]:hidden overflow-hidden transition-all duration-200"
        style={{ maxHeight: menuOpen ? '320px' : '0', opacity: menuOpen ? 1 : 0 }}
      >
        <nav
          className="flex flex-col px-4 pb-3"
          style={{ borderTop: '0.5px solid rgba(255,255,255,0.08)' }}
          aria-label="Mobile"
        >
          {navigation.map(({ label, to }) => {
            const isActive = pathname === to
            return (
              <Link
                key={to}
                to={to}
                className="px-4 py-[0.85rem] rounded-[10px] text-[0.95rem] no-underline"
                style={{
                  color: isActive ? '#ffffff' : 'rgba(255,255,255,0.6)',
                  fontWeight: isActive ? 500 : 400,
                }}
              >
                {label}
              </Link>
            )
          })}
          <Link
            to="/forms"
            className="mt-2 px-4 py-[0.75rem] rounded-full bg-[#14b899] text-white text-sm font-semibold no-underline text-center"
          >
            Start Selling
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
