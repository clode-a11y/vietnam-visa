'use client'

import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

interface Apartment {
  id: string
  titleRu: string
  titleEn: string
  titleVi: string
  priceUsd: number
  rooms: number
  area: number
  lat: number | null
  lng: number | null
  isAvailable: boolean
  district: {
    nameRu: string
    nameEn: string
    nameVi: string
  }
  images: { url: string; isCover: boolean }[]
}

interface ApartmentMapProps {
  apartments: Apartment[]
  locale: string
  onApartmentClick?: (id: string) => void
  selectedApartmentId?: string | null
  center?: [number, number]
  zoom?: number
}

export default function ApartmentMap({
  apartments,
  locale,
  onApartmentClick,
  selectedApartmentId,
  center = [12.2388, 109.1967], // Nha Trang center
  zoom = 13,
}: ApartmentMapProps) {
  const mapRef = useRef<L.Map | null>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const markersRef = useRef<L.Marker[]>([])

  const getTitle = (apt: Apartment) => {
    if (locale === 'vi') return apt.titleVi
    if (locale === 'en') return apt.titleEn
    return apt.titleRu
  }

  const getDistrictName = (apt: Apartment) => {
    if (locale === 'vi') return apt.district.nameVi
    if (locale === 'en') return apt.district.nameEn
    return apt.district.nameRu
  }

  const getRoomsLabel = (rooms: number) => {
    if (rooms === 0) {
      if (locale === 'vi') return 'Studio'
      if (locale === 'en') return 'Studio'
      return 'Студия'
    }
    if (locale === 'vi') return `${rooms} phòng`
    if (locale === 'en') return `${rooms} room${rooms > 1 ? 's' : ''}`
    return `${rooms} комн.`
  }

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return

    // Initialize map
    mapRef.current = L.map(mapContainerRef.current).setView(center, zoom)

    // Add tile layer (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(mapRef.current)

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [])

  // Update markers when apartments change
  useEffect(() => {
    if (!mapRef.current) return

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove())
    markersRef.current = []

    // Add markers for apartments with coordinates
    apartments.forEach(apt => {
      if (apt.lat && apt.lng) {
        const isSelected = selectedApartmentId === apt.id
        const coverImage = apt.images.find(img => img.isCover)?.url || apt.images[0]?.url

        // Custom icon
        const icon = L.divIcon({
          className: 'custom-marker',
          html: `
            <div class="marker-pin ${isSelected ? 'selected' : ''} ${!apt.isAvailable ? 'unavailable' : ''}">
              <span class="marker-price">$${apt.priceUsd}</span>
            </div>
          `,
          iconSize: [80, 40],
          iconAnchor: [40, 40],
        })

        const marker = L.marker([apt.lat, apt.lng], { icon })
          .addTo(mapRef.current!)

        // Popup content
        const popupContent = `
          <div class="apartment-popup">
            ${coverImage ? `<img src="${coverImage}" alt="${getTitle(apt)}" class="popup-image" />` : ''}
            <div class="popup-content">
              <h3 class="popup-title">${getTitle(apt)}</h3>
              <p class="popup-district">${getDistrictName(apt)}</p>
              <div class="popup-details">
                <span>${getRoomsLabel(apt.rooms)}</span>
                <span>•</span>
                <span>${apt.area} м²</span>
              </div>
              <p class="popup-price">$${apt.priceUsd}/мес</p>
              ${!apt.isAvailable ? '<span class="popup-unavailable">Занята</span>' : ''}
            </div>
          </div>
        `

        marker.bindPopup(popupContent, {
          maxWidth: 280,
          className: 'apartment-popup-container',
        })

        marker.on('click', () => {
          if (onApartmentClick) {
            onApartmentClick(apt.id)
          }
        })

        markersRef.current.push(marker)
      }
    })

    // Fit bounds if we have markers
    if (markersRef.current.length > 0) {
      const group = L.featureGroup(markersRef.current)
      mapRef.current.fitBounds(group.getBounds().pad(0.1))
    }
  }, [apartments, selectedApartmentId, locale])

  return (
    <>
      <style jsx global>{`
        .custom-marker {
          background: transparent;
          border: none;
        }

        .marker-pin {
          background: linear-gradient(135deg, #3b82f6 0%, #0ea5e9 100%);
          color: white;
          padding: 6px 12px;
          border-radius: 20px;
          font-weight: 600;
          font-size: 13px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
          white-space: nowrap;
          display: inline-block;
        }

        .marker-pin:hover {
          transform: scale(1.1);
          box-shadow: 0 4px 12px rgba(0,0,0,0.4);
        }

        .marker-pin.selected {
          background: linear-gradient(135deg, #2563eb 0%, #0284c7 100%);
          transform: scale(1.15);
          box-shadow: 0 4px 16px rgba(37, 99, 235, 0.5);
        }

        .marker-pin.unavailable {
          background: linear-gradient(135deg, #6b7280 0%, #9ca3af 100%);
        }

        .apartment-popup-container .leaflet-popup-content-wrapper {
          padding: 0;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        }

        .apartment-popup-container .leaflet-popup-content {
          margin: 0;
          width: 260px !important;
        }

        .apartment-popup-container .leaflet-popup-tip {
          background: white;
        }

        .apartment-popup {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .popup-image {
          width: 100%;
          height: 140px;
          object-fit: cover;
        }

        .popup-content {
          padding: 12px;
        }

        .popup-title {
          font-size: 15px;
          font-weight: 600;
          color: #1f2937;
          margin: 0 0 4px 0;
          line-height: 1.3;
        }

        .popup-district {
          font-size: 13px;
          color: #6b7280;
          margin: 0 0 8px 0;
        }

        .popup-details {
          font-size: 13px;
          color: #4b5563;
          display: flex;
          gap: 6px;
          margin-bottom: 8px;
        }

        .popup-price {
          font-size: 16px;
          font-weight: 700;
          color: #3b82f6;
          margin: 0;
        }

        .popup-unavailable {
          display: inline-block;
          background: #fee2e2;
          color: #dc2626;
          font-size: 11px;
          font-weight: 500;
          padding: 2px 8px;
          border-radius: 10px;
          margin-top: 6px;
        }

        /* Dark mode support */
        .dark .apartment-popup-container .leaflet-popup-content-wrapper {
          background: #1e293b;
        }

        .dark .apartment-popup-container .leaflet-popup-tip {
          background: #1e293b;
        }

        .dark .popup-title {
          color: #f1f5f9;
        }

        .dark .popup-district {
          color: #94a3b8;
        }

        .dark .popup-details {
          color: #cbd5e1;
        }
      `}</style>
      <div ref={mapContainerRef} className="w-full h-full rounded-2xl" />
    </>
  )
}
