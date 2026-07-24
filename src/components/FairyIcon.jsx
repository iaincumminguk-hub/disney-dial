// Original, simple flat-icon fairy — generic shapes only (circles, an
// ellipse dress, sparkle stars), not a likeness of any specific character.
const SPARKLE = 'M0,-10 C1,-3 3,-1 10,0 C3,1 1,3 0,10 C-1,3 -3,1 -10,0 C-3,-1 -1,-3 0,-10 Z'

export default function FairyIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      {/* wings */}
      <g fill="#c7d2fe" opacity="0.9">
        <ellipse cx="38" cy="60" rx="23" ry="31" transform="rotate(-16 38 60)" />
        <ellipse cx="82" cy="60" rx="23" ry="31" transform="rotate(16 82 60)" />
      </g>

      {/* hair buns */}
      <circle cx="46" cy="29" r="7" fill="#fbbf24" />
      <circle cx="74" cy="29" r="7" fill="#fbbf24" />

      {/* head */}
      <circle cx="60" cy="35" r="15" fill="#ffd8b8" />

      {/* dress */}
      <path d="M45,49 Q60,44 75,49 L83,93 Q60,104 37,93 Z" fill="#34d399" />

      {/* wand */}
      <line x1="85" y1="72" x2="107" y2="42" stroke="#a16207" strokeWidth="4" strokeLinecap="round" />
      <g transform="translate(107,36) scale(1.7)" fill="#fbbf24">
        <path d={SPARKLE} />
      </g>

      {/* floating sparkle accents */}
      <g fill="#fbbf24">
        <g transform="translate(16,22) scale(0.55)">
          <path d={SPARKLE} />
        </g>
        <g transform="translate(102,96) scale(0.45)">
          <path d={SPARKLE} />
        </g>
      </g>
    </svg>
  )
}
