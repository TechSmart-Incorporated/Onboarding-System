import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { FiCheck, FiArrowRight } from 'react-icons/fi'
import Footer from '../components/LandingPage/Footer'
import Navbar from '../components/LandingPage/Navbar'

const onboardingSteps = [
  'Submit your business information through the onboarding form.',
  'The system validates and structures your data for platform compatibility.',
  'You receive an automated confirmation email that your submission was received.',
  'The platform team reviews your application and may request clarification if needed.',
  'After approval, your merchant account is provisioned in platform systems.',
  'You receive account access instructions by email.',
  'You configure your store: products, prices, hours, fulfillment options, and branding.',
  'After setup verification, your store is activated to accept customer orders.',
]

const prepareItems = [
  'Business name and contact details',
  'Business location and operating hours',
  'Payment preferences (MMG and other accepted methods)',
  'Basic store setup details needed for initial provisioning',
]

function Started() {
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
        aria-label="Get started hero"
      >
        <p
          data-reveal data-delay="0" data-delay-mobile="0"
          className="reveal m-0 mb-3 text-brand text-[11px] font-semibold tracking-[2px] uppercase"
        >
          Get Started
        </p>
        <h1
          data-reveal data-delay="80" data-delay-mobile="40"
          className="reveal m-0 text-white font-bold leading-[1.1]"
          style={{ fontSize: 'clamp(2rem,4vw,2.625rem)', letterSpacing: '-1px', maxWidth: '600px' }}
        >
          Begin Your Journey
        </h1>
        <p
          data-reveal data-delay="160" data-delay-mobile="80"
          className="reveal mt-5 mb-0 text-[15px] leading-[1.8]"
          style={{ color: 'rgba(255,255,255,0.55)', maxWidth: '600px' }}
        >
          The onboarding process is designed to move merchants from registration to an active store
          through a clear, structured workflow.
        </p>
      </section>

      {/* ── Onboarding Process ── */}
      <section
        className="relative z-[2] w-[min(960px,calc(100%-2rem))] mx-auto pb-16"
        aria-label="Onboarding process"
      >
        <h2
          data-reveal data-delay="0" data-delay-mobile="0"
          className="reveal m-0 mb-8 text-white font-semibold"
          style={{ fontSize: '28px' }}
        >
          Onboarding Process
        </h2>
        <div style={{ maxWidth: '700px' }}>
          {onboardingSteps.map((step, i) => (
            <div
              key={i}
              data-reveal
              data-delay={String(i * 80)}
              data-delay-mobile={String(i * 40)}
              className="reveal flex items-start gap-4 rounded-[12px]"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '0.5px solid rgba(255,255,255,0.08)',
                padding: '18px 24px',
                marginBottom: i < onboardingSteps.length - 1 ? '10px' : 0,
                transition: 'opacity 0.6s ease, transform 0.6s ease, border 0.2s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.border = '0.5px solid rgba(20,184,153,0.25)'
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.border = '0.5px solid rgba(255,255,255,0.08)'
              }}
            >
              <div
                className="shrink-0 flex items-center justify-center font-semibold"
                style={{
                  width: '28px', height: '28px',
                  background: 'rgba(20,184,153,0.1)',
                  borderRadius: '6px',
                  color: '#14b899',
                  fontSize: '13px',
                }}
              >
                {i + 1}
              </div>
              <span className="text-[14px] leading-[1.6]" style={{ color: 'rgba(255,255,255,0.75)' }}>
                {step}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Prepare Before Applying ── */}
      <section
        className="relative z-[2] w-full py-[60px]"
        style={{
          background: 'rgba(255,255,255,0.02)',
          borderTop: '0.5px solid rgba(255,255,255,0.06)',
          borderBottom: '0.5px solid rgba(255,255,255,0.06)',
        }}
        aria-label="Prepare before applying"
      >
        <div className="w-[min(960px,calc(100%-2rem))] mx-auto">
          <h2
            data-reveal data-delay="0" data-delay-mobile="0"
            className="reveal m-0 mb-8 text-white font-semibold"
            style={{ fontSize: '28px' }}
          >
            Prepare Before Applying
          </h2>
          <div
            className="grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1"
            style={{ gap: '12px' }}
          >
            {prepareItems.map((item, i) => (
              <div
                key={item}
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
                <span className="text-white text-[14px] leading-[1.6]">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        className="relative z-[2] w-[min(960px,calc(100%-2rem))] mx-auto py-20 flex justify-center"
        aria-label="Call to action"
      >
        <div
          data-reveal data-delay="0" data-delay-mobile="0"
          className="reveal flex flex-col items-center text-center"
        >
          <p className="m-0 mb-3 text-brand text-[11px] font-semibold tracking-[2px] uppercase">
            Ready to Sell?
          </p>
          <h2
            className="m-0 mb-4 text-white font-bold"
            style={{ fontSize: 'clamp(1.6rem,3.5vw,2rem)', letterSpacing: '-0.5px' }}
          >
            Start building your store today
          </h2>
          <p
            className="m-0 mb-8 text-[15px] leading-[1.8] max-w-[38rem]"
            style={{ color: 'rgba(255,255,255,0.45)' }}
          >
            Click below to begin the onboarding wizard — it takes less than 5 minutes.
          </p>
          <Link
            to="/forms"
            className="inline-flex items-center gap-3 text-white font-semibold no-underline rounded-[12px] bg-brand hover:bg-[#12a688] transition-colors duration-200"
            style={{ padding: '16px 48px', fontSize: '16px' }}
          >
            Start Now <FiArrowRight />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Started
