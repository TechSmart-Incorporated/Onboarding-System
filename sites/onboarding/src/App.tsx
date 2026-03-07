import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Forms from './pages/Forms'
import Section1 from './components/Forms/Section1'
import Section2 from './components/Forms/Section2'
import Section3 from './components/Forms/Section3'
import Section4 from './components/Forms/Section4'
import Review from './components/Forms/Review'
import Landing from './pages/Landing'
import About from './pages/About'
import Started from './pages/Started'
import Terms from './pages/Terms'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/about" element={<About />} />
      <Route path="/started" element={<Started />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/forms" element={<Forms />}>
        <Route index element={<Section1 />} />
        <Route path="branding" element={<Section2 />} />
        <Route path="location" element={<Section3 />} />
        <Route path="contact" element={<Section4 />} />
        <Route path="review" element={<Review />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
