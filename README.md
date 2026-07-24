# Disney Dial

A behavior tracker with a dial/gauge visual — points move a needle between
"Not Going to Disney" (red) and "Going to Disney" (green).

## Features

- Semicircular gauge with a red → orange → yellow → green graduated arc and a
  smoothly animated needle.
- Point scale from -10 to +10, 0 at center.
- Adjust points by ±1, ±5, ±10.
- Log a reason for each change, with a timestamp.
- Scrollable history of recent changes.
- "Reset to 0" with a confirmation prompt.
- State (points + history) persists to `localStorage`, so it survives
  refreshes and browser restarts.
- Responsive layout for mobile and desktop.

## Development

```bash
npm install
npm run dev
```

Then open the printed local URL in your browser.

## Build

```bash
npm run build
npm run preview
```

## Tech

React + Vite + Tailwind CSS v4.
