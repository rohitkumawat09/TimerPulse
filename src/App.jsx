import React, { useState, useEffect } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import "./App.css";  // Import your CSS file

function App() {
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isAscending, setIsAscending] = useState(true);
  const [direction, setDirection] = useState("UP");

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setCount((prevCount) => {
          if (isAscending) {
            if (prevCount < 10) {
              return prevCount + 1;
            } else {
              setIsAscending(false);
              setDirection("DOWN");
              return prevCount;
            }
          } else {
            if (prevCount > 0) {
              return prevCount - 1;
            } else {
              setIsAscending(true);
              setDirection("UP");
              return prevCount;
            }
          }
        });
      }, 500);
    }

    return () => clearInterval(interval);
  }, [isRunning, isAscending]);

  const handleReset = () => {
    setIsRunning(false);
    setCount(0);
    setIsAscending(true);
    setDirection("UP");
  };

  return (
    <div className="app-container">
      <h2 className="title">Bidirectional Counter</h2>
      <p className="direction-text">
        Direction: {direction}{" "}
        {direction === "UP" ? (
          <FaArrowUp className="icon up" />
        ) : (
          <FaArrowDown className="icon down" />
        )}
      </p>
      <h1 className="count-display">{count}</h1>
      <div>
        <button
          onClick={() => setIsRunning((prev) => !prev)}
          className="btn start-stop"
        >
          {isRunning ? "Stop" : "Start"}
        </button>
        <button onClick={handleReset} className="btn reset">
          Reset
        </button>
      </div>
    </div>
  );
}

export default App;
