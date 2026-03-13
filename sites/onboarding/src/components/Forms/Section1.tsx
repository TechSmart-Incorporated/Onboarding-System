import { useState } from 'react'
import { customAlphabet } from 'nanoid'
import { useNavigate } from 'react-router-dom'

import { useBusinessForm } from '../../context/BusinessFormContext'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import './Section1.css'

const steps = ['Business Identity', 'Branding', 'Location', 'Contact']
const dayLabels = [
  { index: 0, label: 'Sunday' },
  { index: 1, label: 'Monday' },
  { index: 2, label: 'Tuesday' },
  { index: 3, label: 'Wednesday' },
  { index: 4, label: 'Thursday' },
  { index: 5, label: 'Friday' },
  { index: 6, label: 'Saturday' },
]
const createSlugSuffix = customAlphabet('0123456789', 5)

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
}

function buildSlug(value: string) {
  const baseSlug = slugify(value)

  if (!baseSlug) {
    return ''
  }

  return `${baseSlug}_${createSlugSuffix()}`
}

function Section1() {
  const navigate = useNavigate()
  const { businessForm, setBusinessForm } = useBusinessForm()
  const [submitAttempted, setSubmitAttempted] = useState(false)
  const hasOpeningDaySelected = businessForm.schedule.some((day) => day.enabled)
  const canContinue =
    businessForm.name.trim().length > 0 &&
    businessForm.slug.trim().length > 0 &&
    businessForm.description.trim().length > 0 &&
    hasOpeningDaySelected

  const updateField = <K extends keyof typeof businessForm>(
    field: K,
    value: (typeof businessForm)[K],
  ) => {
    setBusinessForm((current) => ({
      ...current,
      [field]: value,
    }))
  }

  const handleNameChange = (value: string) => {
    setBusinessForm((current) => ({
      ...current,
      name: value,
      slug: buildSlug(value),
    }))
  }

  const toggleScheduleDay = (dayIndex: number) => {
    setBusinessForm((current) => ({
      ...current,
      schedule: current.schedule.map((day, index) =>
        index === dayIndex ? { ...day, enabled: !day.enabled } : day,
      ),
    }))
  }

  const handleNext = () => {
    setSubmitAttempted(true)

    if (!canContinue) {
      return
    }

    navigate('/forms/branding')
  }

  return (
    <section className="form-step-card" aria-label="Business Identity">
      <div className="form-step-tabs" aria-label="Form progress">
        {steps.map((step, index) => (
          <div key={step} className="form-step-tab">
            <span className={index === 0 ? 'is-active' : ''}>{step}</span>
          </div>
        ))}
      </div>

      <div className="form-step-body">
        <div className="form-field">
          <label htmlFor="business-name">Business Name</label>
          <Input
            id="business-name"
            required
            placeholder="Enter business name"
            value={businessForm.name}
            onChange={(event) => handleNameChange(event.target.value)}
          />
          {submitAttempted && !businessForm.name.trim() ? (
            <p className="form-field-error">Business name is required.</p>
          ) : null}
        </div>

        <div className="form-field">
          <label htmlFor="business-slug">URL Preference (Slug)</label>
          <Input
            id="business-slug"
            className="slug-display-input"
            placeholder="/business_name_12345"
            disabled
            value={businessForm.slug ? `/${businessForm.slug}` : ''}
          />
        </div>

        <div className="form-field">
          <label htmlFor="business-description">Description</label>
          <Textarea
            id="business-description"
            required
            placeholder="Enter a short business description"
            value={businessForm.description}
            onChange={(event) => updateField('description', event.target.value)}
          />
          {submitAttempted && !businessForm.description.trim() ? (
            <p className="form-field-error">Description is required.</p>
          ) : null}
        </div>

        <div className="form-field">
          <label>Opening Days</label>
          <div className="opening-days-grid">
            {dayLabels.map((day) => (
              <button
                key={day.label}
                type="button"
                className={`opening-day-btn${businessForm.schedule[day.index]?.enabled ? ' is-selected' : ''}`}
                onClick={() => toggleScheduleDay(day.index)}
              >
                {day.label}
              </button>
            ))}
          </div>
          {submitAttempted && !hasOpeningDaySelected ? (
            <p className="form-field-error">Select at least one opening day.</p>
          ) : null}
        </div>
      </div>

      <div className="form-step-actions">
        <Button variant="secondary" size="lg" onClick={() => navigate('/')}>
          Back
        </Button>
        <Button size="lg" onClick={handleNext}>
          Next
        </Button>
      </div>
    </section>
  )
}

export default Section1
