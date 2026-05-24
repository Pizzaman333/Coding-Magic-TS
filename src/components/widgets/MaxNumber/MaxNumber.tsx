import { useState } from "react";
import "./MaxNumber.scss";

export const MaxNumber = () => {
  const [numbers, setNumbers] = useState({ num1: "", num2: "", num3: "" });

  const getMaxNumber = (): string | number => {
    const n1 = parseFloat(numbers.num1);
    const n2 = parseFloat(numbers.num2);
    const n3 = parseFloat(numbers.num3);

    if (isNaN(n1) || isNaN(n2) || isNaN(n3)) return "-";
    return Math.max(n1, n2, n3);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumbers({ ...numbers, [e.target.name]: e.target.value });
  };

  return (
    <div className="widget-card max-number">
      <h2 className="widget-card__title">Find Max Number</h2>
      <div className="max-number__inputs">
        <input
          type="number"
          name="num1"
          value={numbers.num1}
          onChange={handleChange}
          className="form-input"
          placeholder="0"
        />
        <input
          type="number"
          name="num2"
          value={numbers.num2}
          onChange={handleChange}
          className="form-input"
          placeholder="0"
        />
        <input
          type="number"
          name="num3"
          value={numbers.num3}
          onChange={handleChange}
          className="form-input"
          placeholder="0"
        />
      </div>
      <p className="max-number__result">
        Max: <span>{getMaxNumber()}</span>
      </p>
    </div>
  );
};
