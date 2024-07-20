/* eslint-disable react/prop-types */
function Progress({ index, numQuestions, points, possiblePoints, answer }) {
  return (
    <div className="progress">
      <progress value={index + Number(answer !== null)} max={numQuestions} />
      <p>
        Quesiton <strong>{index + 1}</strong> / {numQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {possiblePoints}
      </p>
    </div>
  );
}

export default Progress;
