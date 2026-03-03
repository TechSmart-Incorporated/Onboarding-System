import { useEffect, useRef, useState } from 'react'
import {
  Autocomplete,
  GoogleMap,
  MarkerF,
  useJsApiLoader,
} from '@react-google-maps/api'

import { useBusinessForm } from '../../context/BusinessFormContext'
import { Input } from '../ui/input'
import './Section3.css'

const libraries: ('places')[] = ['places']
const defaultCenter = { lat: 6.8013, lng: -58.1551 }
const mapContainerStyle = {
  width: '100%',
  height: '100%',
}
const guyanaBounds = {
  north: 8.56,
  south: 1.16,
  east: -56.48,
  west: -61.4,
}

function LocationPicker() {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  const { businessForm, setBusinessForm } = useBusinessForm()
  const [searchValue, setSearchValue] = useState(businessForm.address)
  const [errorMessage, setErrorMessage] = useState('')
  const mapRef = useRef<google.maps.Map | null>(null)
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null)
  const geocoderRef = useRef<google.maps.Geocoder | null>(null)

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: apiKey ?? '',
    libraries,
  })

  const selectedLocation = businessForm.location ?? defaultCenter

  useEffect(() => {
    setSearchValue(businessForm.address)
  }, [businessForm.address])

  useEffect(() => {
    if (isLoaded && !geocoderRef.current) {
      geocoderRef.current = new google.maps.Geocoder()
    }
  }, [isLoaded])

  const updateLocation = (
    location: google.maps.LatLngLiteral,
    formattedAddress: string,
  ) => {
    // Persist the selected latitude and longitude in form context.
    // `businessForm.location.lat` and `businessForm.location.lng` are the output values.
    // Persist the formatted address in form context.
    // `businessForm.address` is the output address string.
    setBusinessForm((current) => ({
      ...current,
      location,
      address: formattedAddress,
    }))
    setSearchValue(formattedAddress)
    setErrorMessage('')
  }

  const reverseGeocode = async (location: google.maps.LatLngLiteral) => {
    const geocoder = geocoderRef.current

    if (!geocoder) {
      updateLocation(location, businessForm.address)
      return
    }

    const response = await geocoder.geocode({ location })
    const nextAddress = response.results[0]?.formatted_address ?? ''
    updateLocation(location, nextAddress)
  }

  const handleMapClick = async (event: google.maps.MapMouseEvent) => {
    const latLng = event.latLng

    if (!latLng) {
      return
    }

    const nextLocation = {
      lat: latLng.lat(),
      lng: latLng.lng(),
    }

    try {
      await reverseGeocode(nextLocation)
    } catch {
      setErrorMessage('Unable to resolve an address for that point right now.')
      updateLocation(nextLocation, businessForm.address)
    }
  }

  const handlePlaceChanged = () => {
    const place = autocompleteRef.current?.getPlace()
    const geometryLocation = place?.geometry?.location

    if (!geometryLocation) {
      setErrorMessage('Select a suggested address to update the map.')
      return
    }

    const nextLocation = {
      lat: geometryLocation.lat(),
      lng: geometryLocation.lng(),
    }
    const formattedAddress = place?.formatted_address ?? place?.name ?? ''

    updateLocation(nextLocation, formattedAddress)
    mapRef.current?.panTo(nextLocation)
    mapRef.current?.setZoom(15)
  }

  if (!apiKey) {
    return (
      <div className="location-picker-state">
        Add `VITE_GOOGLE_MAPS_API_KEY` to load the location picker.
      </div>
    )
  }

  if (loadError) {
    return (
      <div className="location-picker-state">
        Google Maps failed to load. Check the API key and Places API access.
      </div>
    )
  }

  if (!isLoaded) {
    return <div className="location-picker-state">Loading map…</div>
  }

  return (
    <div className="location-picker">
      <div className="location-picker-group">
        <label htmlFor="business-location-search">Address</label>
        <Autocomplete
          options={{
            bounds: guyanaBounds,
            componentRestrictions: { country: 'gy' },
            fields: ['formatted_address', 'geometry', 'name'],
            strictBounds: false,
          }}
          onLoad={(autocomplete: google.maps.places.Autocomplete) => {
            autocompleteRef.current = autocomplete
          }}
          onPlaceChanged={handlePlaceChanged}
        >
          <Input
            id="business-location-search"
            className="location-address-input"
            placeholder="Search address or place"
            value={searchValue}
            onChange={(event) => {
              // Keep the autocomplete text box as its own input state.
              setSearchValue(event.target.value)
              setErrorMessage('')
            }}
          />
        </Autocomplete>
      </div>

      <div className="location-picker-group">
        <label>Location</label>
        <div className="location-map-shell">
          <GoogleMap
            center={selectedLocation}
            mapContainerStyle={mapContainerStyle}
            options={{
              clickableIcons: false,
              disableDefaultUI: true,
              fullscreenControl: true,
              mapTypeControl: false,
              streetViewControl: false,
              zoomControl: true,
            }}
            zoom={businessForm.location ? 15 : 11}
            onClick={handleMapClick}
            onLoad={(map: google.maps.Map) => {
              mapRef.current = map
            }}
          >
            <MarkerF position={selectedLocation} />
          </GoogleMap>
        </div>
      </div>

      {errorMessage ? <p className="location-picker-error">{errorMessage}</p> : null}
    </div>
  )
}

export default LocationPicker
