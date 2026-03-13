import { useEffect, useRef } from 'react'
import { Mail, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'

const platformLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Get Started', to: '/started' },
  { label: 'Terms of Service', to: '/terms' },
]

function Footer() {
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const container = footerRef.current
    if (!container) return
    const els = container.querySelectorAll<HTMLElement>('[data-reveal]')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const el = entry.target as HTMLElement
          el.classList.add('is-visible')
          observer.unobserve(el)
        })
      },
      { threshold: 0.15 },
    )

    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <footer ref={footerRef} className="bg-[#070d14] border-t border-white/[0.08]">
      <div
        data-reveal
        className="reveal w-[min(1100px,calc(100%-3rem))] mx-auto py-12"
      >
        <div className="flex flex-wrap gap-10 justify-between">
          {/* Brand */}
          <div className="max-w-[260px]">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-9 h-9 rounded-[0.45rem] bg-[#14b899] flex items-center justify-center font-bold text-[#0a1a1a] text-sm select-none">
                1C
              </div>
              <span className="text-white font-bold text-lg">1ClickCart</span>
            </div>
            <p className="m-0 text-white/50 text-sm leading-relaxed">
              Powering digital commerce for businesses across Guyana.
            </p>
          </div>

          {/* Columns */}
          <div className="flex gap-16 flex-wrap">
            {/* Platform */}
            <div>
              <p className="m-0 mb-4 text-white/35 text-xs font-semibold tracking-widest uppercase">
                Platform
              </p>
              <ul className="list-none m-0 p-0 space-y-3">
                {platformLinks.map(({ label, to }) => (
                  <li key={label}>
                    <Link
                      to={to}
                      className="text-white/60 text-sm no-underline hover:text-white transition-colors duration-150"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <p className="m-0 mb-4 text-white/35 text-xs font-semibold tracking-widest uppercase">
                Contact
              </p>
              <ul className="list-none m-0 p-0 space-y-3">
                <li>
                  <a
                    href="mailto:support@1clickcart.com"
                    className="flex items-center gap-2 text-white/60 text-sm no-underline hover:text-white transition-colors duration-150"
                  >
                    <Mail size={14} />
                    support@1clickcart.com
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:support@1clickcart.com"
                    className="flex items-center gap-2 text-white/60 text-sm no-underline hover:text-white transition-colors duration-150"
                  >
                    <Phone size={14} />
                    Contact Support
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/[0.08] flex flex-wrap justify-between items-center gap-4">
          <p className="m-0 text-white/35 text-sm">© 2025 1ClickCart. All rights reserved.</p>
          <span className="text-[#14b899] text-sm">
            Developed &amp; Maintained by TechSmart Inc
          </span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
