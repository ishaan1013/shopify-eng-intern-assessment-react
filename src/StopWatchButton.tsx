import React from "react"

export default function StopWatchButton({
  variant,
  onClick,
  disabled,
}: {
  variant: "start" | "stop" | "lap" | "reset"
  onClick: () => void
  disabled?: boolean
}) {
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
          disabled={disabled}
          onClick={onClick}
        >
          Reset
        </button>
      )
  }
}
