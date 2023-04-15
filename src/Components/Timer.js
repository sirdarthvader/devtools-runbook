import React from "react";
import useTimer from "../hooks/useTimer";

export const Timer = () => {
  const { start, stop, seconds, isRunning } = useTimer(5);

  return (
    <>
      <h1>useTimer Hook</h1>
      <h2>{isRunning ? seconds : "No Timer Running"}</h2>
      <button onClick={start} disabled={isRunning}>
        Start Timer
      </button>
      <button onClick={stop} disabled={!isRunning}>
        Stop Timer
      </button>
    </>
  );
};
