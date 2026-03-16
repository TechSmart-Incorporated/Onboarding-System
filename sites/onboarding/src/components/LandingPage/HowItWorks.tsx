const steps = [
  {
    num: '01',
    title: 'Submit Your Info',
    desc: 'Fill out the onboarding form with your business details — name, location, hours, and branding.',
  },
  {
    num: '02',
    title: 'We Review & Approve',
    desc: 'Our team validates your application and provisions your merchant account on the platform.',
  },
  {
    num: '03',
    title: 'Configure Your Store',
    desc: 'Set up products, pricing, fulfillment options, and customize your storefront branding.',
  },
  {
    num: '04',
    title: 'Start Selling',
    desc: 'Your store goes live. Accept orders, process payments via MMG, and grow your customer base.',
  },
]

function HowItWorks() {
  return (
    <section className="py-20" aria-label="How it works">
      {/* Header */}
      <div className="text-center mb-12">
        <p
          data-reveal data-delay="0" data-delay-mobile="0"
          className="reveal m-0 mb-3 text-brand text-[11px] font-semibold tracking-[2px] uppercase"
        >
          How It Works
        </p>
        <h2
          data-reveal data-delay="100" data-delay-mobile="50"
          className="reveal m-0 text-white font-bold text-[clamp(1.6rem,3.5vw,2.25rem)] tracking-[-0.8px]"
        >
          From Registration to Revenue
        </h2>
      </div>

      {/* Steps */}
      <div className="mx-auto relative" style={{ maxWidth: '600px' }}>
        {/* Vertical connecting line */}
        <div
          className="absolute"
          style={{
            left: '21px',
            top: '44px',
            bottom: '44px',
            width: '1.5px',
            background: 'rgba(20,184,153,0.2)',
          }}
        />

        {steps.map(({ num, title, desc }, i) => (
          <div
            key={num}
            data-reveal
            data-delay={String(i * 100)}
            data-delay-mobile={String(i * 50)}
            className="reveal-left flex gap-5"
            style={{ marginBottom: i < steps.length - 1 ? '40px' : 0 }}
          >
            {/* Number badge */}
            <div
              className="shrink-0 flex items-center justify-center text-brand text-[13px] font-semibold"
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '10px',
                background: 'rgba(20,184,153,0.08)',
                border: '0.5px solid rgba(20,184,153,0.25)',
                position: 'relative',
                zIndex: 1,
              }}
            >
              {num}
            </div>

            {/* Text */}
            <div style={{ paddingTop: '10px' }}>
              <p className="m-0 mb-[6px] text-white text-[16px] font-medium">{title}</p>
              <p className="m-0 text-[14px] leading-[1.7]" style={{ color: 'rgba(255,255,255,0.45)' }}>
                {desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default HowItWorks
