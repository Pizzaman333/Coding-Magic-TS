import { useState } from "react";
import "./Calculator.scss";

export const Calculator = () => {
  const [num1, setNum1] = useState<string>("");
  const [num2, setNum2] = useState<string>("");
  const [result, setResult] = useState<number | string>("-");

  const calculate = (operator: "+" | "-" | "*" | "/") => {
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);

    if (isNaN(n1) || isNaN(n2)) {
      setResult("Error");
      return;
    }

    switch (operator) {
      case "+":
        setResult(n1 + n2);
        break;
      case "-":
        setResult(n1 - n2);
        break;
      case "*":
        setResult(n1 * n2);
        break;
      case "/":
        setResult(n2 === 0 ? "Div by 0" : n1 / n2);
        break;
    }
  };

  return (
    <div className="widget-card calculator">
      <h2 className="widget-card__title">Calculator</h2>

      <div className="calculator__inputs">
        <input
          type="number"
          value={num1}
          onChange={(e) => setNum1(e.target.value)}
          className="form-input"
          placeholder="Num 1"
        />
        <input
          type="number"
          value={num2}
          onChange={(e) => setNum2(e.target.value)}
          className="form-input"
          placeholder="Num 2"
        />
      </div>

      <div className="calculator__operators">
        <button className="op-btn" onClick={() => calculate("+")}>
          +
        </button>
        <button className="op-btn" onClick={() => calculate("-")}>
          -
        </button>
        <button className="op-btn" onClick={() => calculate("*")}>
          ×
        </button>
        <button className="op-btn" onClick={() => calculate("/")}>
          ÷
        </button>
      </div>

      <p className="calculator__result">
        Result: <span>{result}</span>
      </p>
    </div>
  );
};
