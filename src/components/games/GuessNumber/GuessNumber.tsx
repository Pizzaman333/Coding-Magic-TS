import { useState, useEffect } from "react";
import "./GuessNumber.scss";

export const GuessNumber = () => {
  const [targetNumber, setTargetNumber] = useState(0);
  const [guess, setGuess] = useState("");
  const [feedback, setFeedback] = useState("Guess a number between 1 and 100");
  const [attempts, setAttempts] = useState(0);
  const [isWon, setIsWon] = useState(false);

  useEffect(() => {
    generateNewNumber();
  }, []);

  const generateNewNumber = () => {
    setTargetNumber(Math.floor(Math.random() * 100) + 1);
    setGuess("");
    setFeedback("Guess a number between 1 and 100");
    setAttempts(0);
    setIsWon(false);
  };

  const handleGuess = (e: React.FormEvent) => {
    e.preventDefault();
    if (isWon) return;

    const numGuess = parseInt(guess, 10);
    if (isNaN(numGuess) || numGuess < 1 || numGuess > 100) {
      setFeedback("Please enter a valid number between 1 and 100.");
      return;
    }

    setAttempts((prev) => prev + 1);

    if (numGuess === targetNumber) {
      setFeedback(`Correct! You guessed it in ${attempts + 1} attempts.`);
      setIsWon(true);
    } else if (numGuess < targetNumber) {
      setFeedback("Too low! Try again.");
    } else {
      setFeedback("Too high! Try again.");
    }
    setGuess("");
  };

  return (
    <div className="widget-card guess-number">
      <h2 className="widget-card__title">Guess the Number</h2>
      <p className="guess-number__feedback">{feedback}</p>

      {!isWon ? (
        <form onSubmit={handleGuess} className="guess-number__form">
          <input
            type="number"
            className="form-input"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            placeholder="Enter guess..."
            min="1"
            max="100"
          />
          <button type="submit" className="form-button">
            Guess
          </button>
        </form>
      ) : (
        <button
          className="form-button guess-number__reset"
          onClick={generateNewNumber}
        >
          Play Again
        </button>
      )}

      <p className="guess-number__attempts">Attempts: {attempts}</p>
    </div>
  );
};
