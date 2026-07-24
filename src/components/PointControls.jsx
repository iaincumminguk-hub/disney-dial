import { clamp, MAX_POINTS, MIN_POINTS } from '../utils/gauge'

const NEGATIVE_BUTTONS = [
  { delta: -10, style: 'bg-red-600 hover:bg-red-700 focus-visible:outline-red-600' },
  { delta: -5, style: 'bg-red-500 hover:bg-red-600 focus-visible:outline-red-500' },
  { delta: -1, style: 'bg-red-400 hover:bg-red-500 focus-visible:outline-red-400' },
]

const POSITIVE_BUTTONS = [
  { delta: 1, style: 'bg-green-400 hover:bg-green-500 focus-visible:outline-green-400' },
  { delta: 5, style: 'bg-green-500 hover:bg-green-600 focus-visible:outline-green-500' },
  { delta: 10, style: 'bg-green-600 hover:bg-green-700 focus-visible:outline-green-600' },
]

function PointButton({ delta, style, disabled, onClick }) {
  const label = delta > 0 ? `+${delta}` : `${delta}`
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onClick(delta)}
      className={`flex-1 rounded-xl px-3 py-3 text-sm sm:text-base font-bold text-white shadow-sm transition
        active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
        disabled:opacity-30 disabled:cursor-not-allowed disabled:active:scale-100 ${style}`}
    >
      {label}
    </button>
  )
}

export default function PointControls({ points, reason, onReasonChange, onApplyDelta, onReset }) {
  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      <div>
        <label htmlFor="reason" className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">
          What happened?
        </label>
        <input
          id="reason"
          type="text"
          value={reason}
          onChange={(e) => onReasonChange(e.target.value)}
          placeholder="e.g. Cleaned room, Hit sibling..."
          className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800
            px-3 py-2 text-slate-900 dark:text-slate-100 placeholder:text-slate-400
            focus:outline-none focus:ring-2 focus:ring-indigo-400"
          maxLength={120}
        />
      </div>

      <div className="flex items-stretch gap-2">
        <div className="flex flex-1 gap-2">
          {NEGATIVE_BUTTONS.map(({ delta, style }) => (
            <PointButton
              key={delta}
              delta={delta}
              style={style}
              disabled={clamp(points + delta, MIN_POINTS, MAX_POINTS) === points}
              onClick={onApplyDelta}
            />
          ))}
        </div>
        <div className="w-px bg-slate-200 dark:bg-slate-700" />
        <div className="flex flex-1 gap-2">
          {POSITIVE_BUTTONS.map(({ delta, style }) => (
            <PointButton
              key={delta}
              delta={delta}
              style={style}
              disabled={clamp(points + delta, MIN_POINTS, MAX_POINTS) === points}
              onClick={onApplyDelta}
            />
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={onReset}
        className="w-full rounded-lg border border-slate-300 dark:border-slate-600 py-2 text-sm font-medium
          text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
      >
        Reset to 0
      </button>
    </div>
  )
}
