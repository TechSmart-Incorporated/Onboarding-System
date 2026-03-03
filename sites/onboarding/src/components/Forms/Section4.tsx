import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useBusinessForm } from '../../context/BusinessFormContext'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import './Section4.css'

const steps = ['Business Identity', 'Branding', 'Location', 'Contact']
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function formatBusinessPhone(value: string) {
  const digitsOnly = value.replace(/\D/g, '').slice(0, 10)

  if (digitsOnly.length <= 3) {
    return digitsOnly
  }

  if (digitsOnly.length <= 6) {
    return `${digitsOnly.slice(0, 3)} ${digitsOnly.slice(3)}`
  }

  return `${digitsOnly.slice(0, 3)} ${digitsOnly.slice(3, 6)} ${digitsOnly.slice(6)}`
}

function Section4() {
  const navigate = useNavigate()
  const { businessForm, setBusinessForm } = useBusinessForm()
  const [submitAttempted, setSubmitAttempted] = useState(false)
  const phoneDigits = businessForm.phone.replace(/\D/g, '')
  const canContinue =
    emailPattern.test(businessForm.email.trim()) && phoneDigits.length === 10

  const updateField = (field: 'email' | 'phone', value: string) => {
    setBusinessForm((current) => ({
      ...current,
      [field]: value,
    }))
  }

  const handlePhoneChange = (value: string) => {
    updateField('phone', formatBusinessPhone(value))
  }

  const handleReview = () => {
    setSubmitAttempted(true)

    if (!canContinue) {
      return
    }

    navigate('/forms/review')
  }

  return (
    <section className="contact-step-card" aria-label="Contact">
      <div className="contact-step-tabs" aria-label="Form progress">
        {steps.map((step, index) => (
          <div
            key={step}
            className={`contact-step-tab ${index <= 2 ? 'is-complete' : index === 3 ? 'is-active' : ''}`}
          >
            <span>{step}</span>
          </div>
        ))}
      </div>

      <div className="contact-step-body">
        <div className="contact-field">
          <label htmlFor="business-email">Email</label>
          <Input
            id="business-email"
            className="contact-input"
            type="email"
            required
            placeholder="softwareengineer@techsmartgy.com"
            value={businessForm.email}
            onChange={(event) => updateField('email', event.target.value)}
          />
          {submitAttempted && !businessForm.email.trim() ? (
            <p className="contact-field-error">Email is required.</p>
          ) : null}
          {submitAttempted &&
          businessForm.email.trim() &&
          !emailPattern.test(businessForm.email.trim()) ? (
            <p className="contact-field-error">Enter a valid email address.</p>
          ) : null}
        </div>

        <div className="contact-field">
          <label htmlFor="business-phone">Business Number</label>
          <Input
            id="business-phone"
            className="contact-input"
            type="tel"
            required
            placeholder="592 718 2733"
            value={businessForm.phone}
            onChange={(event) => handlePhoneChange(event.target.value)}
          />
          {submitAttempted && !businessForm.phone.trim() ? (
            <p className="contact-field-error">Business number is required.</p>
          ) : null}
          {submitAttempted &&
          businessForm.phone.trim() &&
          phoneDigits.length !== 10 ? (
            <p className="contact-field-error">
              Enter a valid 10-digit business number.
            </p>
          ) : null}
        </div>
      </div>

      <div className="contact-step-actions">
        <Button
          variant="secondary"
          size="lg"
          onClick={() => navigate('/forms/location')}
        >
          Back
        </Button>
        <Button size="lg" onClick={handleReview}>
          Review
        </Button>
      </div>
    </section>
  )
}

export default Section4
