export const MIN_POINTS = -50
export const MAX_POINTS = 50

export function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

// Color stops running from "not going" (red) to "going" (green).
const COLOR_STOPS = [
  { value: -50, color: [239, 68, 68] }, // red-500
  { value: -25, color: [249, 115, 22] }, // orange-500
  { value: 0, color: [250, 204, 21] }, // yellow-400
  { value: 25, color: [132, 204, 22] }, // lime-500
  { value: 50, color: [34, 197, 94] }, // green-500
]

function lerp(a, b, t) {
  return a + (b - a) * t
}

export function valueToColor(value) {
  const v = clamp(value, MIN_POINTS, MAX_POINTS)
  for (let i = 0; i < COLOR_STOPS.length - 1; i++) {
    const a = COLOR_STOPS[i]
    const b = COLOR_STOPS[i + 1]
    if (v >= a.value && v <= b.value) {
      const t = (v - a.value) / (b.value - a.value)
      const rgb = a.color.map((c, idx) => Math.round(lerp(c, b.color[idx], t)))
      return `rgb(${rgb.join(', ')})`
    }
  }
  return `rgb(${COLOR_STOPS[COLOR_STOPS.length - 1].color.join(', ')})`
}

// Rotation in degrees away from straight-up (0deg), matching the needle's
// resting orientation. -90 = full left, 0 = straight up, 90 = full right.
export function valueToRotation(value) {
  const v = clamp(value, MIN_POINTS, MAX_POINTS)
  return (v / MAX_POINTS) * 90
}

// Point on a circle for a given rotation-from-vertical angle, used for tick marks.
export function polarFromVertical(cx, cy, r, rotationDeg) {
  const rad = (rotationDeg * Math.PI) / 180
  return {
    x: cx + r * Math.sin(rad),
    y: cy - r * Math.cos(rad),
  }
}

export function formatTimestamp(isoString) {
  const date = new Date(isoString)
  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(date)
}
