import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom"
import StopWatch, { getUnits } from "./StopWatch"
import App from "./App"

/**
 * @jest-environment jsdom
 */

describe("StopWatch component", () => {
  test("renders correctly with given time units", () => {
    render(<StopWatch m={5} s={30} ms={50} />)
    const timeElement = screen.getByText("05:30.50")
    expect(timeElement).toBeInTheDocument()
  })

  test("renders correctly with single digit time units", () => {
    render(<StopWatch m={1} s={1} ms={1} />)
    const timeElement = screen.getByText("01:01.01")
    expect(timeElement).toBeInTheDocument()
  })

  test("resets correctly", () => {
    const { getByText } = render(<App />)
    const startButton = getByText("Start")
    fireEvent.click(startButton)

    setTimeout(() => {
      const stopButton = getByText("Stop")
      fireEvent.click(stopButton)

      const resetButton = getByText("Reset")
      fireEvent.click(resetButton)

      const timeElement = screen.getByText("00:00.00")
      expect(timeElement).toBeInTheDocument()
    }, 100)
  })

  test("records laps correctly", () => {
    const { getByText } = render(<App />)
    const startButton = getByText("Start")
    fireEvent.click(startButton)

    const lapButton = getByText("Lap")
    fireEvent.click(lapButton)
    fireEvent.click(lapButton)

    const laps = document.querySelectorAll(".lap")
    expect(laps.length).toBe(2)
  })
})

describe("getUnits function", () => {
  test("converts time correctly", () => {
    const time = 123456
    const units = getUnits(time)
    expect(units).toEqual({ m: 20, s: 34, ms: 56 })
  })

  test("handles zero correctly", () => {
    const time = 0
    const units = getUnits(time)
    expect(units).toEqual({ m: 0, s: 0, ms: 0 })
  })
})
