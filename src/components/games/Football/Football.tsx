import { useState, useRef } from "react";
import type { MouseEvent } from "react";
import "./Football.scss";

export const Football = () => {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const fieldRef = useRef<HTMLDivElement>(null);

  const handleFieldClick = (e: MouseEvent<HTMLDivElement>) => {
    if (!fieldRef.current) return;

    const fieldRect = fieldRef.current.getBoundingClientRect();

    const clickX = e.clientX - fieldRect.left;
    const clickY = e.clientY - fieldRect.top;

    const percentX = (clickX / fieldRect.width) * 100;
    const percentY = (clickY / fieldRect.height) * 100;

    setPosition({ x: percentX, y: percentY });
  };

  return (
    <div className="widget-card football">
      <h2 className="widget-card__title">Interactive Football</h2>
      <p className="widget-card__subtitle">Click the field to move the ball</p>

      <div
        className="football__field"
        ref={fieldRef}
        onClick={handleFieldClick}
      >
        <div className="football__field-center"></div>
        <div
          className="football__ball"
          style={{
            left: `${position.x}%`,
            top: `${position.y}%`,
          }}
        >
          ⚽
        </div>
      </div>
    </div>
  );
};
