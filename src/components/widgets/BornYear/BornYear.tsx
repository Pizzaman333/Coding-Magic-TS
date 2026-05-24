import { useState } from "react";
import "./BornYear.scss";

export const BornYear = () => {
  const [year, setYear] = useState<string>("");
  const [result, setResult] = useState<string | null>(null);

  const checkLeapYear = (e: React.FormEvent) => {
    e.preventDefault();
    const yearNumber = parseInt(year, 10);

    if (isNaN(yearNumber)) {
      setResult("Please enter a valid year.");
      return;
    }

    const isLeap =
      (yearNumber % 4 === 0 && yearNumber % 100 !== 0) ||
      yearNumber % 400 === 0;
    setResult(
      isLeap
        ? "You were born in a leap year!"
        : "You were born in a standard year.",
    );
  };

  return (
    <div className="widget-card born-year">
      <h2 className="widget-card__title">Birth Year</h2>
      <form onSubmit={checkLeapYear} className="born-year__form">
        <input
          type="number"
          placeholder="Enter your birth year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="form-input"
        />
        <button type="submit" className="form-button">
          ↵
        </button>
      </form>
      {result && <p className="born-year__result">{result}</p>}
    </div>
  );
};
