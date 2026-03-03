import { type ChangeEvent, useRef, useState } from 'react'
import { FiPlus } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

import { useBusinessForm } from '../../context/BusinessFormContext'
import {
  deleteBrandAsset,
  getStoredBrandAsset,
  uploadBrandAsset,
  type CloudinaryAssetKind,
  type CloudinaryUploadResponse,
} from '../../lib/cloudinary'
import { Button } from '../ui/button'
import './Section2.css'

const steps = ['Business Identity', 'Branding', 'Location', 'Contact']
const MAX_UPLOAD_SIZE_BYTES = 5 * 1024 * 1024
const ACCEPTED_FILE_TYPES = ['image/png', 'image/jpeg']

type AssetState = {
  previewUrl: string
  publicId: string
  uploadResponse: CloudinaryUploadResponse | null
  isUploading: boolean
  error: string
}

const createInitialAssetState = (
  previewUrl = '',
  publicId = '',
  uploadResponse: CloudinaryUploadResponse | null = null,
): AssetState => ({
  previewUrl,
  publicId,
  uploadResponse,
  isUploading: false,
  error: '',
})

type BrandingAssetCardProps = {
  label: string
  placeholder: string
  value: string
  assetState: AssetState
  onUpload: (file: File) => Promise<void>
  onDelete: () => void
}

function BrandingAssetCard({
  label,
  placeholder,
  value,
  assetState,
  onUpload,
  onDelete,
}: BrandingAssetCardProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    await onUpload(file)
    event.target.value = ''
  }

  return (
    <div className="branding-upload-group">
      <label>{label}</label>
      <div
        className={`branding-upload-card ${value ? 'has-preview' : 'is-empty'}`}
      >
        <input
          ref={fileInputRef}
          hidden
          accept="image/*"
          type="file"
          onChange={handleFileChange}
        />

        {!value ? (
          <button
            className={`branding-upload-placeholder ${
              assetState.isUploading ? 'is-loading' : ''
            }`}
            type="button"
            aria-label={placeholder}
            onClick={() => fileInputRef.current?.click()}
          >
            {assetState.isUploading ? 'Uploading asset...' : <FiPlus />}
          </button>
        ) : (
          <div className="branding-upload-preview">
            <div className="branding-upload-preview-frame">
              <img alt={label} src={assetState.previewUrl || value} />
            </div>
            <div className="branding-upload-actions">
              <Button
                className="branding-delete-button"
                size="sm"
                variant="secondary"
                onClick={onDelete}
              >
                Delete
              </Button>
            </div>
          </div>
        )}
        {assetState.error ? (
          <p className="branding-upload-error">{assetState.error}</p>
        ) : null}
      </div>
    </div>
  )
}

function Section2() {
  const navigate = useNavigate()
  const { businessForm, setBusinessForm } = useBusinessForm()
  const [submitAttempted, setSubmitAttempted] = useState(false)
  const [logoAsset, setLogoAsset] = useState<AssetState>(() => {
    const storedAsset = getStoredBrandAsset('logo')

    return createInitialAssetState(
      storedAsset?.secureUrl ?? businessForm.logo,
      storedAsset?.publicId ?? '',
      storedAsset
        ? {
            secureUrl: storedAsset.secureUrl,
            publicId: storedAsset.publicId,
          }
        : null,
    )
  })
  const [bannerAsset, setBannerAsset] = useState<AssetState>(() => {
    const storedAsset = getStoredBrandAsset('banner')

    return createInitialAssetState(
      storedAsset?.secureUrl ?? businessForm.header,
      storedAsset?.publicId ?? '',
      storedAsset
        ? {
            secureUrl: storedAsset.secureUrl,
            publicId: storedAsset.publicId,
          }
        : null,
    )
  })
  const canContinue =
    businessForm.logo.trim().length > 0 &&
    businessForm.header.trim().length > 0 &&
    !logoAsset.isUploading &&
    !bannerAsset.isUploading &&
    !logoAsset.error &&
    !bannerAsset.error

  const handleUpload = async (
    field: 'logo' | 'header',
    kind: CloudinaryAssetKind,
    file: File,
  ) => {
    const objectUrl = URL.createObjectURL(file)
    const setAssetState = field === 'logo' ? setLogoAsset : setBannerAsset

    if (file.size > MAX_UPLOAD_SIZE_BYTES) {
      setAssetState((current) => ({
        ...current,
        isUploading: false,
        error: 'File size exceeds the 5MB limit.',
      }))
      return
    }

    if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
      setAssetState((current) => ({
        ...current,
        isUploading: false,
        error: 'Only PNG, JPG, and JPEG files are allowed.',
      }))
      return
    }

    setAssetState((current) => ({
      ...current,
      previewUrl: objectUrl,
      isUploading: true,
      error: '',
    }))

    try {
      const result = await uploadBrandAsset(file, kind)

      setBusinessForm((current) => ({
        ...current,
        [field]: result.secureUrl,
      }))

      setAssetState({
        previewUrl: result.secureUrl,
        publicId: result.publicId,
        uploadResponse: result,
        isUploading: false,
        error: '',
      })
    } catch (error) {
      setAssetState((current) => ({
        ...current,
        isUploading: false,
        error:
          error instanceof Error
            ? error.message
            : 'Unable to upload asset right now.',
      }))
    }
  }

  const handleDelete = async (field: 'logo' | 'header') => {
    const setAssetState = field === 'logo' ? setLogoAsset : setBannerAsset
    const kind = field === 'logo' ? 'logo' : 'banner'

    deleteBrandAsset(kind)
    setBusinessForm((current) => ({
      ...current,
      [field]: '',
    }))

    setAssetState(createInitialAssetState())
  }

  const handleNext = () => {
    setSubmitAttempted(true)

    if (!canContinue) {
      return
    }

    navigate('/forms/location')
  }

  return (
    <section className="branding-step-card" aria-label="Branding">
      <div className="branding-step-tabs" aria-label="Form progress">
        {steps.map((step, index) => (
          <div
            key={step}
            className={`branding-step-tab ${
              index === 0 ? 'is-complete' : index === 1 ? 'is-active' : ''
            }`}
          >
            <span>{step}</span>
          </div>
        ))}
      </div>

      <div className="branding-step-body">
        <BrandingAssetCard
          label="Business Logo"
          placeholder="Submit logo..."
          value={businessForm.logo}
          assetState={logoAsset}
          onUpload={(file) => handleUpload('logo', 'logo', file)}
          onDelete={() => handleDelete('logo')}
        />
        {submitAttempted && !businessForm.logo.trim() ? (
          <p className="branding-upload-error">Business logo is required.</p>
        ) : null}
        <p className="branding-upload-note">
          Recommended size: square image with a 1:1 ratio. Accepted formats:
          PNG, JPG, JPEG. Max file size: 5MB.
        </p>

        <BrandingAssetCard
          label="Business Banner"
          placeholder="Submit Banner..."
          value={businessForm.header}
          assetState={bannerAsset}
          onUpload={(file) => handleUpload('header', 'banner', file)}
          onDelete={() => handleDelete('header')}
        />
        {submitAttempted && !businessForm.header.trim() ? (
          <p className="branding-upload-error">Business banner is required.</p>
        ) : null}
        <p className="branding-upload-note">
          Recommended size: wide image with a 2:1 ratio. Accepted formats:
          PNG, JPG, JPEG. Max file size: 5MB.
        </p>
      </div>

      <div className="branding-step-actions">
        <Button
          variant="secondary"
          size="lg"
          onClick={() => navigate('/forms')}
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

export default Section2
