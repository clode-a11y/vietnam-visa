// Calculate distance between two points using Haversine formula
export function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371 // Earth's radius in km
  const dLat = toRad(lat2 - lat1)
  const dLng = toRad(lng2 - lng1)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

function toRad(deg: number): number {
  return deg * (Math.PI / 180)
}

// Nha Trang beach coastline points (approximate)
const BEACH_POINTS: [number, number][] = [
  [12.210, 109.195], // South end
  [12.220, 109.196],
  [12.230, 109.197],
  [12.240, 109.198],
  [12.250, 109.199],
  [12.260, 109.200],
  [12.270, 109.201],
  [12.280, 109.202], // North end (near Hon Chong)
]

// Calculate distance to the nearest beach point
export function distanceToBeach(lat: number | null, lng: number | null): number | null {
  if (!lat || !lng) return null

  let minDistance = Infinity

  for (const [beachLat, beachLng] of BEACH_POINTS) {
    const distance = calculateDistance(lat, lng, beachLat, beachLng)
    if (distance < minDistance) {
      minDistance = distance
    }
  }

  return minDistance
}

// Format distance for display
export function formatDistance(km: number | null, locale: string): string {
  if (km === null) return ''

  if (km < 1) {
    const meters = Math.round(km * 1000)
    if (locale === 'ru') return `${meters} м`
    if (locale === 'vi') return `${meters} m`
    return `${meters} m`
  }

  const rounded = Math.round(km * 10) / 10
  if (locale === 'ru') return `${rounded} км`
  if (locale === 'vi') return `${rounded} km`
  return `${rounded} km`
}
