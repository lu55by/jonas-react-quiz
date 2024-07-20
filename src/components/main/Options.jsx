/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
function Options({ question, dispatch, answer }) {
  const isAnswered = answer !== null;
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          key={option}
          className={`btn btn-option ${
            // Show Current Answer
            answer === index ? "answer" : ""
          } ${
            // Show Correct and Wrong Answer
            isAnswered
              ? index === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          disabled={isAnswered && index !== question.correctOption}
          onClick={() => dispatch({ type: "answered", payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
