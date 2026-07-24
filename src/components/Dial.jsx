import {
  MAX_POINTS,
  MIN_POINTS,
  polarFromVertical,
  valueToColor,
  valueToRotation,
} from '../utils/gauge'

const CX = 115
const CY = 100
const RADIUS = 82
const TICK_VALUES = [-10, -5, 0, 5, 10]

const ARC_PATH = `M ${CX - RADIUS},${CY} A ${RADIUS},${RADIUS} 0 0 1 ${CX + RADIUS},${CY}`

export default function Dial({ points }) {
  const rotation = valueToRotation(points)
  const color = valueToColor(points)

  return (
    <div className="relative w-full max-w-md mx-auto select-none">
      <svg viewBox="0 0 230 210" className="w-full h-auto overflow-visible">
        <defs>
          <linearGradient id="dialGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="25%" stopColor="#f97316" />
            <stop offset="50%" stopColor="#facc15" />
            <stop offset="75%" stopColor="#84cc16" />
            <stop offset="100%" stopColor="#22c55e" />
          </linearGradient>
        </defs>

        {/* Track */}
        <path
          d={ARC_PATH}
          fill="none"
          stroke="currentColor"
          className="text-slate-200 dark:text-slate-700"
          strokeWidth="16"
          strokeLinecap="round"
        />
        {/* Color-graduated arc */}
        <path
          d={ARC_PATH}
          fill="none"
          stroke="url(#dialGradient)"
          strokeWidth="16"
          strokeLinecap="round"
        />

        {/* Tick marks */}
        {TICK_VALUES.map((v) => {
          const rot = valueToRotation(v)
          const inner = polarFromVertical(CX, CY, RADIUS - 16, rot)
          const outer = polarFromVertical(CX, CY, RADIUS - 10, rot)
          return (
            <line
              key={v}
              x1={inner.x}
              y1={inner.y}
              x2={outer.x}
              y2={outer.y}
              stroke="currentColor"
              className="text-white/70"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          )
        })}

        {/* End labels — offset well clear of the arc on both axes */}
        <text x={CX - RADIUS} y={CY + 34} fontSize="10" fontWeight="700" className="fill-red-500">
          <tspan x={CX - RADIUS} dy="0">NOT GOING</tspan>
          <tspan x={CX - RADIUS} dy="13">TO DISNEY</tspan>
        </text>
        <text x={CX + RADIUS} y={CY + 34} fontSize="10" fontWeight="700" textAnchor="end" className="fill-green-600">
          <tspan x={CX + RADIUS} dy="0">GOING TO</tspan>
          <tspan x={CX + RADIUS} dy="13">DISNEY</tspan>
        </text>

        {/* Needle */}
        <g
          style={{
            transform: `rotate(${rotation}deg)`,
            transformOrigin: `${CX}px ${CY}px`,
            transition: 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        >
          <line
            x1={CX}
            y1={CY}
            x2={CX}
            y2={CY - 58}
            stroke="#1e293b"
            strokeWidth="6"
            strokeLinecap="round"
            className="dark:stroke-slate-100"
          />
        </g>
        <circle cx={CX} cy={CY} r="8" fill="#1e293b" stroke="white" strokeWidth="2" className="dark:fill-slate-100 dark:stroke-slate-900" />

        {/* Center readout */}
        <text
          x={CX}
          y={CY + 82}
          textAnchor="middle"
          fontSize="34"
          fontWeight="800"
          fill={color}
        >
          {points > 0 ? `+${points}` : points}
        </text>
        <text
          x={CX}
          y={CY + 98}
          textAnchor="middle"
          fontSize="9"
          letterSpacing="1.5"
          fontWeight="600"
          className="fill-slate-400 dark:fill-slate-500"
        >
          POINTS
        </text>
      </svg>
      <p className="text-center text-xs text-slate-400 dark:text-slate-500 mt-1">
        Scale: {MIN_POINTS} to {MAX_POINTS}
      </p>
    </div>
  )
}
