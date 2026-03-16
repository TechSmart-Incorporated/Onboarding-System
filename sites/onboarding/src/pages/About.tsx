import { useEffect, useRef } from 'react'
import { FiCheck, FiZap, FiShield, FiGlobe } from 'react-icons/fi'
import Footer from '../components/LandingPage/Footer'
import Navbar from '../components/LandingPage/Navbar'

const features = [
  'Sell products online',
  'Manage orders and customer checkout',
  'Process payments via MMG',
  'Support delivery and pickup operations',
  'Handle core store operations in one place',
]

const values = [
  {
    icon: FiZap,
    title: 'Speed',
    desc: 'Get your store up and running fast. Our streamlined onboarding takes minutes, not weeks.',
  },
  {
    icon: FiShield,
    title: 'Trust',
    desc: "Built on Ordering.co's proven commerce engine with enterprise-grade security and reliability.",
  },
  {
    icon: FiGlobe,
    title: 'Local Focus',
    desc: "Purpose-built for Guyana's market with MMG payments, localized delivery, and dedicated support.",
  },
]

function About() {
  const pageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = pageRef.current
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
    <div ref={pageRef} className="relative flex flex-col min-h-screen bg-navy text-white">
      {/* Glows */}
      <div
        className="glow absolute top-0 left-1/2 -translate-x-1/2 w-[90vw] h-[110vh] pointer-events-none z-0"
        style={{ background: 'radial-gradient(circle, rgba(20,184,153,0.10), transparent 60%)' }}
      />
      <div
        className="glow absolute bottom-0 right-0 w-[70vw] h-[70vh] pointer-events-none z-0"
        style={{ background: 'radial-gradient(circle, rgba(20,100,184,0.07), transparent 65%)' }}
      />

      <Navbar />

      {/* ── Hero ── */}
      <section
        className="relative z-[2] w-[min(960px,calc(100%-2rem))] mx-auto pt-28 pb-16"
        aria-label="About hero"
      >
        <p
          data-reveal data-delay="0" data-delay-mobile="0"
          className="reveal m-0 mb-3 text-brand text-[11px] font-semibold tracking-[2px] uppercase"
        >
          About 1ClickCart
        </p>
        <h1
          data-reveal data-delay="80" data-delay-mobile="40"
          className="reveal m-0 text-white font-bold leading-[1.1]"
          style={{ fontSize: 'clamp(2rem,4vw,2.625rem)', letterSpacing: '-1px', maxWidth: '600px' }}
        >
          Powering Digital Commerce<br />Across Guyana
        </h1>
        <p
          data-reveal data-delay="160" data-delay-mobile="80"
          className="reveal mt-5 mb-0 text-[15px] leading-[1.8]"
          style={{ color: 'rgba(255,255,255,0.55)', maxWidth: '600px' }}
        >
          1ClickCart is a digital commerce platform built to help businesses across Guyana launch
          and run online stores. Developed and operated by TechSmart Inc, we're building a scalable
          commerce ecosystem that gives small and medium-sized businesses access to the same digital
          selling tools used by global platforms.
        </p>
      </section>

      {/* ── How It Works ── */}
      <section
        className="relative z-[2] w-full py-[60px]"
        style={{
          background: 'rgba(255,255,255,0.02)',
          borderTop: '0.5px solid rgba(255,255,255,0.06)',
          borderBottom: '0.5px solid rgba(255,255,255,0.06)',
        }}
        aria-label="How it works"
      >
        <div
          className="w-[min(960px,calc(100%-2rem))] mx-auto"
          style={{ maxWidth: '700px' }}
        >
          <h2
            data-reveal data-delay="0" data-delay-mobile="0"
            className="reveal m-0 mb-4 text-white font-semibold"
            style={{ fontSize: '28px' }}
          >
            How It Works
          </h2>
          <p
            data-reveal data-delay="80" data-delay-mobile="40"
            className="reveal m-0 text-[15px] leading-[1.8]"
            style={{ color: 'rgba(255,255,255,0.5)' }}
          >
            1ClickCart uses Ordering.co as the commerce engine, then adds localized platform services
            for merchant onboarding, account provisioning, payment setup, and administrative support —
            giving you a turnkey solution tailored to the Guyanese market.
          </p>
        </div>
      </section>

      {/* ── What the Platform Helps Merchants Do ── */}
      <section
        className="relative z-[2] w-[min(960px,calc(100%-2rem))] mx-auto py-16"
        aria-label="Platform features"
      >
        <h2
          data-reveal data-delay="0" data-delay-mobile="0"
          className="reveal m-0 mb-8 text-white font-semibold"
          style={{ fontSize: '28px' }}
        >
          What the Platform Helps Merchants Do
        </h2>
        <div
          className="grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1"
          style={{ gap: '12px' }}
        >
          {features.map((feature, i) => (
            <div
              key={feature}
              data-reveal
              data-delay={String(i * 80)}
              data-delay-mobile={String(i * 40)}
              className="reveal flex items-start gap-3 rounded-[12px]"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '0.5px solid rgba(255,255,255,0.08)',
                padding: '20px',
              }}
            >
              <FiCheck
                className="shrink-0 mt-[2px]"
                style={{ color: '#14b899', fontSize: '16px' }}
              />
              <span className="text-white text-[14px] leading-[1.6]">{feature}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Our Values ── */}
      <section
        className="relative z-[2] w-[min(960px,calc(100%-2rem))] mx-auto pb-16"
        aria-label="Our values"
      >
        <h2
          data-reveal data-delay="0" data-delay-mobile="0"
          className="reveal m-0 mb-8 text-white font-semibold"
          style={{ fontSize: '28px' }}
        >
          Our Values
        </h2>
        <div
          className="grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1"
          style={{ gap: '16px' }}
        >
          {values.map(({ icon: Icon, title, desc }, i) => (
            <div
              key={title}
              data-reveal
              data-delay={String(i * 80)}
              data-delay-mobile={String(i * 40)}
              className="reveal rounded-[14px]"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '0.5px solid rgba(255,255,255,0.08)',
                padding: '28px',
              }}
            >
              <div
                className="inline-flex items-center justify-center mb-4 text-brand text-[1.1rem]"
                style={{
                  width: '40px', height: '40px',
                  background: 'rgba(20,184,153,0.10)',
                  borderRadius: '10px',
                }}
              >
                <Icon />
              </div>
              <p className="m-0 mb-2 text-white text-[16px] font-medium">{title}</p>
              <p className="m-0 text-[13px] leading-[1.7]" style={{ color: 'rgba(255,255,255,0.45)' }}>
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Vision / Long-term Goal ── */}
      <section
        className="relative z-[2] w-[min(960px,calc(100%-2rem))] mx-auto pb-20 flex justify-center"
        aria-label="Our vision"
      >
        <div
          data-reveal data-delay="0" data-delay-mobile="0"
          className="reveal w-full flex flex-col items-center text-center rounded-[16px]"
          style={{
            maxWidth: '600px',
            background: 'rgba(255,255,255,0.03)',
            border: '0.5px solid rgba(255,255,255,0.08)',
            padding: '48px',
          }}
        >
          <p className="m-0 mb-3 text-brand text-[11px] font-semibold tracking-[2px] uppercase">
            Our Vision
          </p>
          <h2 className="m-0 mb-4 text-white font-semibold" style={{ fontSize: '28px' }}>
            Long-term Goal
          </h2>
          <p className="m-0 text-[15px] leading-[1.8]" style={{ color: 'rgba(255,255,255,0.5)' }}>
            To deliver a scalable commerce ecosystem for Guyana, giving small and medium-sized
            businesses easier access to digital selling tools similar to what global platforms provide.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default About
