import React, { useEffect, useState } from "react"
import StopWatch, { getUnits } from "./StopWatch"
import StopWatchButton from "./StopWatchButton"
import StopWatchLaps from "./StopWatchLaps"

export default function App() {
  // State to store the current time in milliseconds, and whether the stopwatch is running.
  const [time, setTime] = useState(0)
  const [counting, setCounting] = useState(false)

  // State to store the lap times, and the millisecond timestamp of the last lap.
  const [laps, setLaps] = useState([])
  const [lastLap, setLastLap] = useState(0)

  // Get the time units from the current time.
  const timeUnits = getUnits(time)

  useEffect(() => {
    // If the stopwatch is counting, increment the time every 10 milliseconds.
    let interval: NodeJS.Timer
    if (counting) {
      interval = setInterval(() => setTime((prev) => prev + 1), 10)
    }

    // Cleanup function to clear the interval when the component unmounts.
    return () => clearInterval(interval)
  }, [counting, time])

  // Functions to control the stopwatch:

  const reset = () => {
    setTime(0)
    setLaps([])
    setLastLap(0)
    setCounting(false)
  }

  const lap = () => {
    // Add the current lap time to the laps array in position 0 to order backwards, displaying in "reversed" order.
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
            // If the stopwatch is counting, show the lap and stop buttons.
            <>
              <StopWatchButton onClick={lap} variant="lap" />
              <StopWatchButton onClick={stop} variant="stop" />
            </>
          ) : (
            // If the stopwatch is not counting, show the reset and start buttons.
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
