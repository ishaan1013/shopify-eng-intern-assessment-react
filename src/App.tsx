import React, { useEffect, useState } from "react"
import StopWatch, { getUnits } from "./StopWatch"
import StopWatchButton from "./StopWatchButton"
import StopWatchLaps from "./StopWatchLaps"

export default function App() {
  const [time, setTime] = useState(0)
  const [counting, setCounting] = useState(false)

  const [laps, setLaps] = useState([])
  const [lastLap, setLastLap] = useState(0)

  const timeUnits = getUnits(time)

  useEffect(() => {
    let interval: NodeJS.Timer
    if (counting) {
      interval = setInterval(() => setTime((prev) => prev + 1), 10)
    }
    return () => clearInterval(interval)
  }, [counting, time])

  const reset = () => {
    setTime(0)
    setLaps([])
    setLastLap(0)
    setCounting(false)
  }

  const lap = () => {
    setLaps((prev) => [time - lastLap, ...prev])
    setLastLap(time)
  }

  const stop = () => {
    setCounting(false)
  }

  const start = () => {
    setCounting(true)
  }

  return (
    <main>
      <div className="container">
        <StopWatch {...timeUnits} />

        <div className="stopwatch-buttons">
          {counting ? (
            <>
              <StopWatchButton onClick={lap} variant="lap" />
              <StopWatchButton onClick={stop} variant="stop" />
            </>
          ) : (
            <>
              <StopWatchButton
                variant="reset"
                disabled={time === 0}
                onClick={reset}
              />
              <StopWatchButton onClick={start} variant="start" />
            </>
          )}
        </div>

        <StopWatchLaps currentLap={time - lastLap} laps={laps} time={time} />
      </div>
    </main>
  )
}
