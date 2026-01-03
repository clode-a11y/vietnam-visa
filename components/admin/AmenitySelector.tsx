'use client'

import { useState, useEffect } from 'react'

interface Amenity {
  id: string
  nameRu: string
  nameEn: string
  icon: string
  category: string
}

interface AmenitySelectorProps {
  apartmentId: string
  selectedAmenities: Amenity[]
  onAmenitiesChange: (amenities: Amenity[]) => void
}

const categoryLabels: Record<string, string> = {
  general: 'Общее',
  kitchen: 'Кухня',
  bathroom: 'Ванная',
  building: 'Здание',
  bedroom: 'Спальня',
  entertainment: 'Развлечения',
}

export default function AmenitySelector({
  apartmentId,
  selectedAmenities,
  onAmenitiesChange,
}: AmenitySelectorProps) {
  const [allAmenities, setAllAmenities] = useState<Amenity[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchAllAmenities()
  }, [])

  const fetchAllAmenities = async () => {
    try {
      const res = await fetch('/api/admin/amenities')
      if (res.ok) {
        const data = await res.json()
        setAllAmenities(data)
      }
    } catch (error) {
      console.error('Error fetching amenities:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleAmenity = async (amenity: Amenity) => {
    const isSelected = selectedAmenities.some(a => a.id === amenity.id)
    let newSelected: Amenity[]

    if (isSelected) {
      newSelected = selectedAmenities.filter(a => a.id !== amenity.id)
    } else {
      newSelected = [...selectedAmenities, amenity]
    }

    // Optimistic update
    onAmenitiesChange(newSelected)

    // Save to server
    setSaving(true)
    try {
      const res = await fetch(`/api/admin/apartments/${apartmentId}/amenities`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amenityIds: newSelected.map(a => a.id) }),
      })

      if (!res.ok) {
        // Revert on error
        onAmenitiesChange(selectedAmenities)
      }
    } catch (error) {
      console.error('Error updating amenities:', error)
      onAmenitiesChange(selectedAmenities)
    } finally {
      setSaving(false)
    }
  }

  const groupedAmenities = allAmenities.reduce((acc, amenity) => {
    if (!acc[amenity.category]) {
      acc[amenity.category] = []
    }
    acc[amenity.category].push(amenity)
    return acc
  }, {} as Record<string, Amenity[]>)

  if (loading) {
    return (
      <div className="text-gray-500 py-4">Загрузка удобств...</div>
    )
  }

  if (allAmenities.length === 0) {
    return (
      <div className="text-center py-8">
        <span className="text-4xl block mb-2">✨</span>
        <p className="text-gray-500">Удобства ещё не добавлены</p>
        <a
          href="/admin/amenities"
          className="text-blue-600 hover:underline text-sm"
        >
          Добавить удобства →
        </a>
      </div>
    )
  }

  return (
    <div className={`space-y-6 ${saving ? 'opacity-70 pointer-events-none' : ''}`}>
      {Object.entries(groupedAmenities).map(([category, amenities]) => (
        <div key={category}>
          <h4 className="text-sm font-medium text-gray-700 mb-3">
            {categoryLabels[category] || category}
          </h4>
          <div className="flex flex-wrap gap-2">
            {amenities.map((amenity) => {
              const isSelected = selectedAmenities.some(a => a.id === amenity.id)
              return (
                <button
                  key={amenity.id}
                  type="button"
                  onClick={() => toggleAmenity(amenity)}
                  className={`
                    inline-flex items-center gap-2 px-3 py-2 rounded-xl border-2 transition
                    ${isSelected
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }
                  `}
                >
                  <span>{amenity.icon}</span>
                  <span className="text-sm">{amenity.nameRu}</span>
                </button>
              )
            })}
          </div>
        </div>
      ))}

      {selectedAmenities.length > 0 && (
        <div className="pt-4 border-t">
          <p className="text-sm text-gray-500">
            Выбрано: {selectedAmenities.length} удобств
          </p>
        </div>
      )}
    </div>
  )
}
