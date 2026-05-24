import { useState } from "react";
import "./TimeCalculator.scss";

type InputType = "minutes" | "seconds";

export const TimeCalculator = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [inputType, setInputType] = useState<InputType>("minutes");

  const formattedTime = (): string => {
    const value = parseInt(inputValue, 10);
    if (isNaN(value) || value < 0) {
      return inputType === "minutes" ? "00:00" : "00:00:00";
    }

    if (inputType === "minutes") {
      const hoursStr = String(Math.floor(value / 60)).padStart(2, "0");
      const minutesStr = String(value % 60).padStart(2, "0");
      return `${hoursStr}:${minutesStr}`;
    } else {
      const hoursStr = String(Math.floor(value / 3600)).padStart(2, "0");
      const minutesStr = String(Math.floor((value % 3600) / 60)).padStart(
        2,
        "0",
      );
      const secondsStr = String(value % 60).padStart(2, "0");
      return `${hoursStr}:${minutesStr}:${secondsStr}`;
    }
  };

  return (
    <div className="widget-card time-calculator">
      <h2 className="widget-card__title">Time Calculator</h2>

      {/* Switch for type of input */}
      <div className="time-calculator__switch">
        <label
          className={`switch-label ${inputType === "minutes" ? "active" : ""}`}
        >
          <input
            type="radio"
            name="inputType"
            value="minutes"
            checked={inputType === "minutes"}
            onChange={() => {
              setInputType("minutes");
              setInputValue(""); 
            }}
          />
          Minutes
        </label>
        <label
          className={`switch-label ${inputType === "seconds" ? "active" : ""}`}
        >
          <input
            type="radio"
            name="inputType"
            value="seconds"
            checked={inputType === "seconds"}
            onChange={() => {
              setInputType("seconds");
              setInputValue("");
            }}
          />
          Seconds
        </label>
      </div>

      <input
        type="number"
        placeholder={`Enter ${inputType}...`}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="form-input time-calculator__input"
        min="0"
      />

      <div className="time-calculator__display">
        <span>{formattedTime()}</span>
      </div>
    </div>
  );
};
