import { useEffect, useRef } from 'react'
import Footer from '../components/LandingPage/Footer'
import Navbar from '../components/LandingPage/Navbar'

const termsSections = [
  {
    title: 'Use of the Onboarding System',
    items: [
      'You agree to provide accurate and complete business information.',
      'You are responsible for keeping submitted contact details current.',
      'Incomplete or invalid submissions may delay review or provisioning.',
    ],
  },
  {
    title: 'Review and Account Activation',
    items: [
      'All submissions are reviewed before merchant account provisioning.',
      'Approval is based on platform requirements and data completeness.',
      'Account access is provided only after successful approval and setup.',
    ],
  },
  {
    title: 'Merchant Responsibilities',
    items: [
      'Maintain accurate store configuration, pricing, and operating details.',
      'Use platform services in compliance with applicable laws and regulations.',
      'Respond to support requests when additional verification is required.',
    ],
  },
]

function Terms() {
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
        className="relative z-[2] w-[min(960px,calc(100%-2rem))] mx-auto pt-28 pb-12"
        aria-label="Terms hero"
      >
        <p
          data-reveal data-delay="0" data-delay-mobile="0"
          className="reveal m-0 mb-3 text-brand text-[11px] font-semibold tracking-[2px] uppercase"
        >
          Legal
        </p>
        <h1
          data-reveal data-delay="80" data-delay-mobile="40"
          className="reveal m-0 text-white font-bold leading-[1.1]"
          style={{ fontSize: 'clamp(2rem,4vw,2.625rem)', letterSpacing: '-1px', maxWidth: '600px' }}
        >
          Terms of Service
        </h1>
        <p
          data-reveal data-delay="160" data-delay-mobile="80"
          className="reveal mt-5 mb-0 text-[15px] leading-[1.8]"
          style={{ color: 'rgba(255,255,255,0.55)', maxWidth: '600px' }}
        >
          These terms describe the basic rules for using the 1ClickCart merchant onboarding
          experience and related platform services.
        </p>
      </section>

      {/* ── Terms Cards ── */}
      <section
        className="relative z-[2] w-[min(960px,calc(100%-2rem))] mx-auto pb-6"
        aria-label="Terms sections"
      >
        <div style={{ maxWidth: '700px' }}>
          {termsSections.map(({ title, items }, i) => (
            <div
              key={title}
              data-reveal
              data-delay={String(i * 100)}
              data-delay-mobile={String(i * 50)}
              className="reveal rounded-[14px]"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '0.5px solid rgba(255,255,255,0.08)',
                padding: '28px 32px',
                marginBottom: '16px',
              }}
            >
              <h2
                className="m-0 text-white font-semibold"
                style={{ fontSize: '16px', marginBottom: '16px' }}
              >
                {title}
              </h2>
              <div className="flex flex-col" style={{ gap: '10px' }}>
                {items.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span
                      className="shrink-0 mt-[5px]"
                      style={{ color: '#14b899', fontSize: '8px', lineHeight: 1 }}
                    >
                      ■
                    </span>
                    <span
                      className="text-[14px] leading-[1.8]"
                      style={{ color: 'rgba(255,255,255,0.65)' }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Note block */}
          <div
            data-reveal data-delay="300" data-delay-mobile="150"
            className="reveal"
            style={{
              borderLeft: '3px solid #14b899',
              background: 'rgba(20,184,153,0.05)',
              borderRadius: '0 10px 10px 0',
              padding: '16px 20px',
            }}
          >
            <p className="m-0 text-[13px] leading-[1.7]">
              <span style={{ color: '#14b899', fontWeight: 600 }}>Note: </span>
              <span style={{ color: 'rgba(255,255,255,0.5)' }}>
                This page provides a high-level service summary for onboarding. Formal legal terms
                can be published as the platform expands.
              </span>
            </p>
          </div>
        </div>
      </section>

      <div className="pb-16" />

      <Footer />
    </div>
  )
}

export default Terms
