import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useBusinessForm } from '../../context/BusinessFormContext'
import { Button } from '../ui/button'
import LocationPicker from './LocationPicker'
import './Section3.css'

const steps = ['Business Identity', 'Branding', 'Location', 'Contact']

function Section3() {
  const navigate = useNavigate()
  const { businessForm } = useBusinessForm()
  const [submitAttempted, setSubmitAttempted] = useState(false)
  const canContinue =
    businessForm.location !== null && businessForm.address.trim().length > 0

  const handleNext = () => {
    setSubmitAttempted(true)

    if (!canContinue) {
      return
    }

    navigate('/forms/contact')
  }

  return (
    <section className="location-step-card" aria-label="Location">
      <div className="location-step-tabs" aria-label="Form progress">
        {steps.map((step, index) => (
          <div
            key={step}
            className={`location-step-tab ${
              index <= 1 ? 'is-complete' : index === 2 ? 'is-active' : ''
            }`}
          >
            <span>{step}</span>
          </div>
        ))}
      </div>

      <div className="location-step-body">
        <LocationPicker />
        {submitAttempted && !canContinue ? (
          <p className="location-picker-error">
            Address and map location are required.
          </p>
        ) : null}
      </div>

      <div className="location-step-actions">
        <Button
          variant="secondary"
          size="lg"
          onClick={() => navigate('/forms/branding')}
        >
          Back
        </Button>
        <Button size="lg" onClick={handleNext}>
          Next
        </Button>
      </div>
    </section>
  )
}

export default Section3
