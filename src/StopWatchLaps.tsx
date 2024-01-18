import React from "react"
import { getUnits } from "./StopWatch"

export default function StopWatchLaps({
  time,
  currentLap,
  laps,
}: {
  time: number
  currentLap: number
  laps: number[]
}) {
  return (
    <div className="laps-container">
      {time === 0 ? null : (
        <div className="lap">
          <div>Lap {laps.length + 1}</div>
          <div className="mono">
            {getUnits(currentLap).m.toString().padStart(2, "0")}:
            {getUnits(currentLap).s.toString().padStart(2, "0")}.
            {getUnits(currentLap).ms.toString().padStart(2, "0")}
          </div>
        </div>
      )}
      {laps.map((lap, i) => (
        <div key={i} className="lap">
          <div>Lap {laps.length - i}</div>
          <div className="mono">
            {getUnits(lap).m.toString().padStart(2, "0")}:
            {getUnits(lap).s.toString().padStart(2, "0")}.
            {getUnits(lap).ms.toString().padStart(2, "0")}
          </div>
        </div>
      ))}
    </div>
  )
}
