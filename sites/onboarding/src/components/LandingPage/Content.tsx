import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { FiShoppingCart, FiPackage, FiCreditCard, FiTruck, FiSettings, FiGlobe, FiArrowRight } from 'react-icons/fi'
import HowItWorks from './HowItWorks'

const features = [
  { icon: FiShoppingCart, title: 'Online Storefront', desc: 'Launch a fully branded store in minutes. Showcase your products with beautiful layouts.' },
  { icon: FiPackage,      title: 'Order Management', desc: 'Track, manage, and fulfill orders from a single dashboard. Never miss a sale.' },
  { icon: FiCreditCard,   title: 'Payment Processing', desc: 'Accept local and international payments securely with built-in checkout.' },
  { icon: FiTruck,        title: 'Delivery & Pickup', desc: 'Offer flexible fulfillment — delivery, curbside pickup, or in-store collection.' },
  { icon: FiSettings,     title: 'Store Operations', desc: 'Set hours, manage inventory, configure pricing — all from one control center.' },
  { icon: FiGlobe,        title: 'Reach All of Guyana', desc: 'Connect with customers nationwide. Your store is open 24/7, anywhere.' },
]

const stats = [
  { value: '100+', label: 'Merchants Ready' },
  { value: '24/7', label: 'Platform Uptime' },
  { value: '0%', label: 'Setup Fees' },
]

function Content() {
  const mainRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const container = mainRef.current
    if (!container) return
    const isMobile = window.innerWidth < 768
    const els = container.querySelectorAll<HTMLElement>('[data-reveal]')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const el = entry.target as HTMLElement
          const delay = isMobile
            ? Number(el.dataset.delayMobile ?? '0')
            : Number(el.dataset.delay ?? '0')
          el.style.transitionDelay = `${delay}ms`
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
    <main ref={mainRef} className="relative z-[2] w-[min(1100px,calc(100%-2.5rem))] mx-auto flex-1">

      {/* ── Hero ── */}
      <section className="flex items-center justify-center min-h-[82vh] pt-20 pb-8" aria-label="Hero">
        <div className="flex flex-col items-center max-w-[52rem] mx-auto px-4 text-center">

          {/* Badge — fade only */}
          <div
            data-reveal data-delay="0" data-delay-mobile="0"
            className="reveal-fade inline-flex items-center gap-2 mb-7 px-4 py-[0.45rem] rounded-full border border-brand/35 bg-brand/10 text-white/80 text-[0.82rem] font-medium"
          >
            <span className="w-[7px] h-[7px] rounded-full bg-green-500 shrink-0 animate-pulse-dot" />
            NEW - Guyana's digital commerce platform is live
          </div>

          {/* Headline */}
          <h1
            data-reveal data-delay="100" data-delay-mobile="50"
            className="reveal m-0 text-white font-bold leading-[1.08] tracking-[-0.04em] text-balance text-[clamp(2.4rem,5.5vw,3.25rem)]"
            style={{ transition: 'opacity 0.7s ease, transform 0.7s ease' }}
          >
            Grow your Business<br />
            with <span className="text-brand">1ClickCart</span>
          </h1>

          {/* Subtitle */}
          <p
            data-reveal data-delay="200" data-delay-mobile="100"
            className="reveal mt-5 mb-0 text-white/45 text-[1.05rem] leading-[1.65] max-w-[38rem] text-balance"
          >
            The all-in-one digital commerce platform built for Guyanese merchants.
            Set up your store in minutes and reach customers across the country.
          </p>

          {/* CTAs */}
          <div
            data-reveal data-delay="300" data-delay-mobile="150"
            className="reveal flex items-center gap-[0.85rem] mt-9 flex-wrap justify-center max-sm:flex-col max-sm:w-full"
          >
            <Link
              to="/onboard"
              className="inline-flex items-center gap-2 justify-center px-[1.6rem] py-[0.8rem] rounded-[10px] bg-brand text-white border border-brand text-[0.95rem] font-semibold no-underline hover:bg-[#12a688] hover:border-[#12a688] transition-colors duration-[180ms] max-sm:w-full max-sm:max-w-[18rem]"
            >
              Get Started Free <FiArrowRight />
            </Link>
            <Link
              to="/started"
              className="inline-flex items-center justify-center px-[1.6rem] py-[0.8rem] rounded-[10px] bg-white/[0.05] text-white/80 border border-white/[0.12] text-[0.95rem] font-semibold no-underline hover:bg-white/[0.09] hover:text-white hover:border-white/20 transition-colors duration-[180ms] max-sm:w-full max-sm:max-w-[18rem]"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section
        className="grid grid-cols-3 max-sm:grid-cols-1 border border-white/[0.06] rounded-[12px] bg-white/[0.02] mb-12"
        aria-label="Platform stats"
      >
        {stats.map((stat, i) => (
          <div
            key={i}
            data-reveal
            data-delay={String(i * 100)}
            data-delay-mobile={String(i * 50)}
            className={`reveal flex flex-col items-center justify-center gap-[0.35rem] py-7 max-sm:py-5 px-4${i > 0 ? ' border-l max-sm:border-l-0 max-sm:border-t border-white/[0.06]' : ''}`}
          >
            <span className="text-brand text-[2.1rem] font-bold leading-none tracking-[-0.03em]">
              {stat.value}
            </span>
            <span className="text-white/45 text-[0.85rem] font-medium">{stat.label}</span>
          </div>
        ))}
      </section>

      {/* ── Platform Features ── */}
      <section className="py-20" aria-label="Platform features">
        {/* Header */}
        <div className="text-center mb-12">
          <p
            data-reveal data-delay="0" data-delay-mobile="0"
            className="reveal m-0 mb-3 text-brand text-[11px] font-semibold tracking-[2px] uppercase"
          >
            Platform Features
          </p>
          <h2
            data-reveal data-delay="100" data-delay-mobile="50"
            className="reveal m-0 text-white font-bold text-[clamp(1.6rem,3.5vw,2.25rem)] tracking-[-0.8px]"
          >
            Everything You Need to Sell Online
          </h2>
          <p
            data-reveal data-delay="200" data-delay-mobile="100"
            className="reveal mt-3 mb-0 text-white/45 text-[15px]"
          >
            One platform. Every tool. Built for Guyanese businesses.
          </p>
        </div>

        {/* Cards */}
        <div
          className="grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 mx-auto"
          style={{ gap: '16px', maxWidth: '900px' }}
        >
          {features.map(({ icon: Icon, title, desc }, i) => (
            <div
              key={title}
              data-reveal
              data-delay={String(i * 80)}
              data-delay-mobile={String(i * 40)}
              className="reveal rounded-[14px]"
              style={{
                padding: '28px',
                background: 'rgba(255,255,255,0.03)',
                border: '0.5px solid rgba(255,255,255,0.08)',
                transition: 'opacity 0.5s ease, transform 0.5s ease, background 0.2s ease, border 0.2s ease',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement
                el.style.background = 'rgba(20,184,153,0.04)'
                el.style.border = '0.5px solid rgba(20,184,153,0.25)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement
                el.style.background = 'rgba(255,255,255,0.03)'
                el.style.border = '0.5px solid rgba(255,255,255,0.08)'
              }}
            >
              <div
                className="inline-flex items-center justify-center mb-4 text-brand text-[1.1rem]"
                style={{
                  width: '40px', height: '40px',
                  background: 'rgba(20,184,153,0.12)',
                  borderRadius: '10px',
                }}
              >
                <Icon />
              </div>
              <p className="m-0 mb-[6px] text-white text-[15px] font-medium">{title}</p>
              <p className="m-0 text-[13px] leading-[1.6]" style={{ color: 'rgba(255,255,255,0.45)' }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <HowItWorks />

      {/* ── CTA Banner ── */}
      <section className="py-20" aria-label="Call to action">
        <div
          data-reveal data-delay="0" data-delay-mobile="0"
          className="reveal mx-auto flex flex-col items-center text-center px-8 py-16 rounded-[20px]"
          style={{
            maxWidth: '760px',
            background: 'rgba(255,255,255,0.03)',
            border: '0.5px solid rgba(255,255,255,0.08)',
          }}
        >
          <h2 className="m-0 text-white font-bold text-[clamp(1.6rem,3.5vw,2.1rem)] tracking-[-0.8px]">
            Ready to Launch Your Store?
          </h2>
          <p className="mt-4 mb-0 text-white/50 text-[1rem] leading-[1.65] max-w-[36rem]">
            Join merchants across Guyana who are already selling online with 1ClickCart. It's free to get started.
          </p>
          <Link
            to="/forms"
            className="mt-8 inline-flex items-center gap-2 px-7 py-[0.8rem] rounded-full bg-brand text-white text-[0.95rem] font-semibold no-underline hover:bg-[#12a688] transition-colors duration-200"
          >
            Begin Onboarding <FiArrowRight />
          </Link>
        </div>
      </section>

    </main>
  )
}

export default Content
