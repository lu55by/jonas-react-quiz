/* eslint-disable react/prop-types */
import { useEffect } from "react";

function Timer({ time, dispatch }) {
  const mins = Math.floor(time / 60);
  const seconds = time % 60;
  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: "setTimer" });
    }, 1000);
    return () => clearInterval(id);
  }, [dispatch]);
  return (
    <div className="timer">
      {mins < 10 && "0"}
      {mins}:{seconds < 10 && "0"}
      {seconds}
    </div>
  );
}

export default Timer;
