import { useState, useEffect } from "react";
import { isCol } from "./isCol";

export default function ColorBox({ children, color, ...props }) {
  const [isValid, setIsValid] = useState(false);
  const [displayColor, setDisplayColor] = useState();

  useEffect(() => {
    if (isCol(color)) {
      setDisplayColor(color);
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [color]);

  return (
    <>
      <style jsx>{`
        div {
          border: 1px solid black;
          height: 1.5em;
          width: 3em;
          background-color: var(--color, transparent);
        }
        input {
          font-family: inherit;
          font-size: inhert;
        }
        div,
        input {
          box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.34);
        }
      `}</style>
      <span>{children}</span>
      <input type="text" {...props} value={color} />
      {isValid === true && <div style={{ "--color": displayColor }} />}
    </>
  );
}
