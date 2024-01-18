import React from "react"

// React component with button variants used to control the stopwatch & laps.
// Takes button variant and attributes as props.
export default function StopWatchButton({
  variant,
  onClick,
  disabled,
}: {
  variant: "start" | "stop" | "lap" | "reset"
  onClick: () => void
  disabled?: boolean
}) {
  // Switch statement to determine which button variant to render.
  switch (variant) {
    case "start":
      return (
        <button onClick={onClick} className="button-green">
          Start
        </button>
      )
    case "stop":
      return (
        <button onClick={onClick} className="button-red">
          Stop
        </button>
      )
    case "lap":
      return (
        <button className="button-standard" onClick={onClick}>
          Lap
        </button>
      )
    case "reset":
      return (
        <button
          className="button-standard"
          // Disable the reset button if the stopwatch is in the initial state.
          disabled={disabled}
          onClick={onClick}
        >
          Reset
        </button>
      )
  }
}
