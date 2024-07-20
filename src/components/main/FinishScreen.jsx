/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useMemo } from "react";

function FinishScreen({ points, possiblePoints, highScore, dispatch }) {
  const { percentage, emoji } = useMemo(() => {
    const calculatedPercentage = Math.round((points / possiblePoints) * 100);
    var emoji;
    if (calculatedPercentage === 100) emoji = "🏅🫰";
    if (calculatedPercentage >= 80 && calculatedPercentage < 100) emoji = "💪";
    if (calculatedPercentage >= 60 && calculatedPercentage < 80) emoji = "👍";
    if (calculatedPercentage >= 40 && calculatedPercentage < 60) emoji = "🤔";
    if (calculatedPercentage < 40) emoji = "😬";
    return { percentage: calculatedPercentage, emoji: emoji };
  }, [points, possiblePoints]);
  return (
    <>
      <p className="result">
        <span>{emoji}</span> You scored {points} out of {possiblePoints} points
        ({percentage}%)
      </p>
      <p className="highscore">(Highscore: {highScore} points)</p>
      <button
        className="btn btn-ui"
        onClick={() => {
          dispatch({ type: "restart" });
        }}
      >
        Restart Quiz
      </button>
    </>
  );
}

export default FinishScreen;
