import React from "react"

// React component that displays the time on the primary stopwatch.
// Time units passed in as props.
export default function StopWatch({
  m,
  s,
  ms,
}: {
  m: number
  s: number
  ms: number
}) {
  // Format the time units to display as a string.
  return (
    <div className="stopwatch-time mono">
      {m.toString().padStart(2, "0")}:{s.toString().padStart(2, "0")}.
      {ms.toString().padStart(2, "0")}
    </div>
  )
}

// Helper function to convert time in milliseconds to time units.
export function getUnits(time: number) {
  const m = Math.floor((time % 360000) / 6000)
  const s = Math.floor((time % 6000) / 100)
  const ms = time % 100
  return { m, s, ms }
}
