import Navbar from './components/navigation/Navbar'
import Hero from './Pages/Hero'
import Carousel from './components/carousel/Carousel'
import HowItWorks from './Pages/HowItWorks'
import Features from './Pages/Features'
import TheApp from './Pages/TheApp'
import ForBusiness from './Pages/ForBusiness'
import Deliver from './Pages/Deliver'
import Testimonials from './Pages/Testimonials'
import CTA from './Pages/CTA'
import Footer from './components/footer/Footer'
import './App.css'

function App() {
  return (
    <div className="background">
      <div className="hero-wrapper">
        <Navbar />
        <Hero />
      </div>
      <Carousel />
      <HowItWorks />
      <Features />
      <TheApp />
      <ForBusiness />
      <Deliver />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  )
}

export default App
