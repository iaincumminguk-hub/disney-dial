import { useState } from 'react'
import Dial from './components/Dial'
import PointControls from './components/PointControls'
import HistoryLog from './components/HistoryLog'
import BackgroundDecor from './components/BackgroundDecor'
import ThemeToggle from './components/ThemeToggle'
import FairyIcon from './components/FairyIcon'
import { useLocalStorageState } from './hooks/useLocalStorageState'
import { useTheme } from './hooks/useTheme'
import { clamp, MAX_POINTS, MIN_POINTS } from './utils/gauge'

const STORAGE_KEY = 'disney-dial-state-v1'
const DEFAULT_STATE = { points: 0, history: [] }
const MAX_HISTORY_ENTRIES = 200

function makeEntry({ delta, reason, resultingPoints }) {
  return {
    id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
    delta,
    reason,
    points: resultingPoints,
    timestamp: new Date().toISOString(),
  }
}

function App() {
  const [state, setState] = useLocalStorageState(STORAGE_KEY, DEFAULT_STATE)
  const [reason, setReason] = useState('')
  const { theme, toggleTheme } = useTheme()
  const { points, history } = state

  function handleApplyDelta(delta) {
    const next = clamp(points + delta, MIN_POINTS, MAX_POINTS)
    const actualDelta = next - points
    if (actualDelta === 0) return

    const entry = makeEntry({ delta: actualDelta, reason: reason.trim(), resultingPoints: next })
    setState({
      points: next,
      history: [entry, ...history].slice(0, MAX_HISTORY_ENTRIES),
    })
    setReason('')
  }

  function handleReset() {
    if (points === 0) return
    const confirmed = window.confirm('Reset points to 0? This cannot be undone.')
    if (!confirmed) return

    const entry = makeEntry({ delta: -points, reason: 'Reset to 0', resultingPoints: 0 })
    setState({
      points: 0,
      history: [entry, ...history].slice(0, MAX_HISTORY_ENTRIES),
    })
  }

  return (
    <div className="relative min-h-svh bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <BackgroundDecor />
      <div className="relative z-10 mx-auto max-w-5xl px-4 py-8">
        <header className="relative text-center mb-8">
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
          <FairyIcon className="fairy-float mx-auto h-14 w-14 sm:h-16 sm:w-16" />
          <h1 className="font-script text-4xl sm:text-5xl leading-tight text-indigo-600 dark:text-indigo-300">
            Is Ethan going to Disneyland?
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Every choice moves the needle.
          </p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="space-y-8">
            <Dial points={points} />
            <PointControls
              points={points}
              reason={reason}
              onReasonChange={setReason}
              onApplyDelta={handleApplyDelta}
              onReset={handleReset}
            />
          </div>
          <HistoryLog history={history} />
        </main>
      </div>
    </div>
  )
}

export default App
