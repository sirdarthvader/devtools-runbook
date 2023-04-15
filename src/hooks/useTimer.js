/**
 * Create a custom hook called useTimer that provides the following API
 * 
 * const {start, stop, seconds, isRunning} = useTimer(TOTAL_TIME);
 * 
 * Show two buttons on the screen start & stop.
  One button to start the timer. When the timer is running then show remaining seconds on the screen.
  Another button to stop the timer. When the timer stops/reaches to 0 then it resets to total time and shows “No Timer Running” on the screen.
 */

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * @param {number} maxDuration
 * @returns {object} { start: function, stop: function, seconds: number, isRunning: boolean }
 *
 * This hook could be extended to have options like
 * autoStart, pause functionality, onUpdate, and much more
 */

const useTimer = (maxDuration) => {
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(maxDuration);
  const timerIdRef = useRef(null);

  const start = useCallback(() => {
    timerIdRef.current = setInterval(() => {
      setSeconds((state) => state - 1);
    }, 1000);
    setIsRunning(true);
  }, [setSeconds, setIsRunning]);

  const stop = useCallback(() => {
    clearInterval(timerIdRef.current);
    setIsRunning(false);
    setSeconds(maxDuration);
  }, [setIsRunning, setSeconds, maxDuration]);

  // reset the counter at 0
  useEffect(() => {
    if (seconds < 1) {
      stop();
    }
  }, [seconds, stop]);

  // cleanup
  useEffect(() => {
    return () => timerIdRef && clearInterval(timerIdRef.current);
  }, []);

  return {
    start,
    stop,
    seconds,
    isRunning,
  };
};

export default useTimer;
