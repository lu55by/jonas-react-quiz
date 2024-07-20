/* eslint-disable react/prop-types */
function NextQuestionButton({ dispatch, index, numQuestions }) {
  const isFinished = index === numQuestions - 1;
  return (
    <button
      className="btn btn-ui"
      onClick={() =>
        dispatch({ type: !isFinished ? "nextQuestion" : "finish" })
      }
    >
      {!isFinished ? "Next" : "Finish"}
    </button>
  );
}

export default NextQuestionButton;
