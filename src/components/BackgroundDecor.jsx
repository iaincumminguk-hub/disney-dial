// Purely decorative, hand-drawn silhouette watermark — original simple
// shapes (circles for "ears", a drawn coaster track), not traced artwork.
export default function BackgroundDecor() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[520px] overflow-hidden opacity-[0.05] dark:opacity-[0.08]"
    >
      <svg
        viewBox="0 0 800 800"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full text-slate-900 dark:text-white"
      >
        {/* Mickey-ears silhouette, top-left */}
        <g fill="currentColor">
          <circle cx="90" cy="170" r="72" />
          <circle cx="24" cy="78" r="36" />
          <circle cx="156" cy="78" r="36" />
        </g>

        {/* Mickey-ears silhouette, bottom-right, larger */}
        <g fill="currentColor" transform="translate(660,650) scale(1.25)">
          <circle cx="0" cy="0" r="72" />
          <circle cx="-66" cy="-92" r="36" />
          <circle cx="66" cy="-92" r="36" />
        </g>

        {/* Roller coaster track silhouette */}
        <g
          fill="none"
          stroke="currentColor"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M -40 520 C 60 380, 160 380, 230 480 C 290 560, 340 560, 380 480 C 410 420, 460 420, 480 470 C 500 520, 560 540, 620 480 C 670 430, 740 430, 840 500" />
          {/* loop */}
          <circle cx="380" cy="470" r="46" />
          {/* support pylons */}
          <line x1="90" y1="470" x2="90" y2="600" />
          <line x1="250" y1="540" x2="250" y2="600" />
          <line x1="560" y1="530" x2="560" y2="600" />
          <line x1="700" y1="470" x2="700" y2="600" />
        </g>
      </svg>
    </div>
  )
}
