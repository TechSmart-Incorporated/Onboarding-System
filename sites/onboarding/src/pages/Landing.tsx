import Content from '../components/LandingPage/Content'
import Footer from '../components/LandingPage/Footer'
import Navbar from '../components/LandingPage/Navbar'

function Landing() {
  return (
    <div className="relative flex flex-col min-h-screen bg-navy">
      {/* Teal radial glow — top center */}
      <div
        className="glow absolute top-0 left-1/2 -translate-x-1/2 w-[90vw] h-[110vh] pointer-events-none z-0"
        style={{ background: 'radial-gradient(circle, rgba(20,184,153,0.13), transparent 60%)' }}
      />
      <div
        className="glow absolute bottom-0 right-0 w-[70vw] h-[70vh] pointer-events-none z-0"
        style={{ background: 'radial-gradient(circle, rgba(20,100,184,0.08), transparent 65%)' }}
      />

      <Navbar />

      <Content />

      <Footer />
    </div>
  )
}

export default Landing
