import { formatTimestamp } from '../utils/gauge'

export default function HistoryLog({ history }) {
  return (
    <div className="w-full max-w-md mx-auto flex flex-col min-h-0">
      <h2 className="text-sm font-semibold text-slate-600 dark:text-slate-300 mb-2">
        History
      </h2>
      {history.length === 0 ? (
        <p className="text-sm text-slate-400 italic py-6 text-center border border-dashed border-slate-200 dark:border-slate-700 rounded-lg">
          No changes logged yet.
        </p>
      ) : (
        <ul className="flex-1 overflow-y-auto max-h-96 space-y-2 pr-1">
          {history.map((entry) => (
            <li
              key={entry.id}
              className="flex items-start gap-3 rounded-lg border border-slate-200 dark:border-slate-700
                bg-white dark:bg-slate-800 px-3 py-2"
            >
              <span
                className={`shrink-0 rounded-md px-2 py-1 text-xs font-bold text-white ${
                  entry.delta > 0 ? 'bg-green-500' : 'bg-red-500'
                }`}
              >
                {entry.delta > 0 ? `+${entry.delta}` : entry.delta}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-slate-800 dark:text-slate-100 truncate">
                  {entry.reason || <span className="italic text-slate-400">No reason given</span>}
                </p>
                <p className="text-xs text-slate-400">
                  {formatTimestamp(entry.timestamp)} · total {entry.points > 0 ? `+${entry.points}` : entry.points}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
