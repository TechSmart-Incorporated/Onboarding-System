import axios from 'axios'
import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { type BusinessFormData, useBusinessForm } from '../../context/BusinessFormContext'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import './Review.css'

const libraries: ('places')[] = ['places']
const defaultCenter = { lat: 6.8013, lng: -58.1551 }
const mapContainerStyle = {
  width: '100%',
  height: '100%',
}
const dayLabels = [
  { index: 0, label: 'Sunday' },
  { index: 1, label: 'Monday' },
  { index: 2, label: 'Tuesday' },
  { index: 3, label: 'Wednesday' },
  { index: 4, label: 'Thursday' },
  { index: 5, label: 'Friday' },
  { index: 6, label: 'Saturday' },
]

function createSubmissionPayload(businessForm: BusinessFormData) {
  return {
    name: businessForm.name,
    email: businessForm.email,
    slug: businessForm.slug,
    minimum: businessForm.minimum,
    tax_type: businessForm.tax_type,
    tax: businessForm.tax,
    delivery_price: businessForm.delivery_price,
    service_fee: businessForm.service_fee,
    schedule: JSON.stringify(businessForm.schedule),
    enabled: Number(businessForm.enabled),
    location: businessForm.location ? JSON.stringify(businessForm.location) : '',
    timezone: businessForm.timezone,
    address: businessForm.address,
    phone: businessForm.phone,
    header: businessForm.header,
    logo: businessForm.logo,
    description: businessForm.description,
  }
}

function Review() {
  const navigate = useNavigate()
  const { businessForm, resetBusinessForm } = useBusinessForm()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  const submissionEndpoint = import.meta.env.VITE_N8N_SUBMISSION_ENDPOINT
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: apiKey ?? '',
    libraries,
  })

  const mapCenter = businessForm.location ?? defaultCenter
  const payload = createSubmissionPayload(businessForm)

  const handleSubmit = async () => {
    if (!submissionEndpoint) {
      toast.error('Missing VITE_N8N_SUBMISSION_ENDPOINT environment variable.')
      return
    }

    setIsSubmitting(true)

    try {
      await axios.post(submissionEndpoint, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      })

      toast.success('Confirmation email sent')
      resetBusinessForm()
      navigate('/')
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          typeof error.response?.data === 'string'
            ? error.response.data
            : JSON.stringify(error.response?.data ?? error.message, null, 2),
        )
      } else {
        toast.error(error instanceof Error ? error.message : 'Submission failed.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="review-card" aria-label="Submission Review">
      <h1 className="review-title">Submission Review</h1>

      <div className="review-body">
        <div className="review-field">
          <label htmlFor="review-name">Business Name</label>
          <Input id="review-name" disabled value={businessForm.name} />
        </div>

        <div className="review-field">
          <label htmlFor="review-slug">URL Preference (Slug)</label>
          <div className="review-slug-shell">
            <span className="review-slug-prefix">https://oneclickcart/</span>
            <Input
              id="review-slug"
              className="review-slug-input"
              disabled
              value={businessForm.slug}
            />
          </div>
        </div>

        <div className="review-field">
          <label htmlFor="review-description">Description</label>
          <Textarea
            id="review-description"
            disabled
            value={businessForm.description}
          />
        </div>

        <div className="review-field">
          <label>Opening Days</label>
          <div className="review-days-grid">
            {dayLabels.map((day) => {
              const enabled = businessForm.schedule[day.index]?.enabled ?? false
              return (
                <span
                  key={day.label}
                  className={`review-day-option ${enabled ? 'review-day-option--enabled' : 'review-day-option--disabled'}`}
                >
                  {day.label}
                </span>
              )
            })}
          </div>
        </div>

        <div className="review-field">
          <label>Business Logo</label>
          <div className="review-image-card">
            {businessForm.logo ? (
              <img alt="Business logo" src={businessForm.logo} />
            ) : (
              <span>Submit logo...</span>
            )}
          </div>
        </div>

        <div className="review-field">
          <label>Business Banner</label>
          <div className="review-image-card review-image-card--banner">
            {businessForm.header ? (
              <img alt="Business banner" src={businessForm.header} />
            ) : (
              <span>Submit banner...</span>
            )}
          </div>
        </div>

        <div className="review-field">
          <label htmlFor="review-address">Address</label>
          <Input id="review-address" disabled value={businessForm.address} />
        </div>

        <div className="review-field">
          <label>Location</label>
          <div className="review-map-shell">
            {apiKey && isLoaded && businessForm.location ? (
              <GoogleMap
                center={mapCenter}
                mapContainerStyle={mapContainerStyle}
                options={{
                  clickableIcons: false,
                  disableDefaultUI: true,
                  fullscreenControl: false,
                  gestureHandling: 'none',
                  keyboardShortcuts: false,
                  mapTypeControl: false,
                  streetViewControl: false,
                  zoomControl: false,
                }}
                zoom={15}
              >
                <MarkerF position={mapCenter} />
              </GoogleMap>
            ) : (
              <div className="review-map-empty">
                {businessForm.location
                  ? 'Map preview unavailable'
                  : 'No location selected'}
              </div>
            )}
          </div>
        </div>

        <div className="review-field">
          <label htmlFor="review-email">Email</label>
          <Input id="review-email" disabled type="email" value={businessForm.email} />
        </div>

        <div className="review-field">
          <label htmlFor="review-phone">Business Number</label>
          <Input id="review-phone" disabled type="tel" value={businessForm.phone} />
        </div>
      </div>

      <div className="review-actions">
        <Button
          variant="secondary"
          size="lg"
          onClick={() => navigate('/forms/contact')}
        >
          Back
        </Button>
        <Button size="lg" disabled={isSubmitting} onClick={handleSubmit}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
      </div>
    </section>
  )
}

export default Review
