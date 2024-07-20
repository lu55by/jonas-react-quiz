/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
import { useEffect, useMemo, useReducer } from "react";
import Header from "./header/Header";
import Main from "./main/Main";
import Loader from "./main/Loader";
import Error from "./main/Error";
import StartScreen from "./main/StartScreen";
import Question from "./main/Question";
import NextQuestionButton from "./main/NextQuestionButton";
import Progress from "./main/Progress";
import FinishScreen from "./main/FinishScreen";
import Footer from "./main/Footer";
import Timer from "./main/Timer";

const initialState = {
  questions: [],

  // loading, error, ready, active, finished
  status: "loading",

  // question index
  index: 0,

  answer: null,
  points: 0,
  highScore: 0,

  time: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataError":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
        time: state.questions.length * 30,
      };
    case "answered":
      const currentQuestion = state.questions.at(state.index);
      const isCorrect = currentQuestion.correctOption === action.payload;
      return {
        ...state,
        answer: action.payload,
        points: isCorrect
          ? state.points + currentQuestion.points
          : state.points,
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "finish":
      return {
        ...state,
        status: "finished",
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };
    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
        highScore: state.highScore,
      };
    case "setTimer":
      return {
        ...state,
        time: state.time - 1,
        status: state.time <= 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Invalid action type: " + action.type);
  }
};

function App() {
  const [
    { questions, status, index, answer, points, highScore, time },
    dispatch,
  ] = useReducer(reducer, initialState);

  const { numQuestions, possiblePoints } = useMemo(() => {
    return {
      numQuestions: questions.length,
      possiblePoints: questions.reduce(
        (acc, question) => acc + question.points,
        0
      ),
    };
  }, [questions]);

  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((resp) => resp.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataError" }));
  }, []);

  return (
    <>
      <div className="app">
        <Header />

        <Main>
          {status === "loading" && <Loader />}
          {status === "error" && <Error />}
          {status === "ready" && (
            <StartScreen questionsNum={numQuestions} dispatch={dispatch} />
          )}
          {status === "active" && (
            <>
              <Progress
                index={index}
                numQuestions={numQuestions}
                points={points}
                possiblePoints={possiblePoints}
                answer={answer}
              />
              <Question
                question={questions[index]}
                dispatch={dispatch}
                answer={answer}
              />
              <Footer>
                <Timer time={time} dispatch={dispatch} />
                {answer !== null && (
                  <NextQuestionButton
                    dispatch={dispatch}
                    index={index}
                    numQuestions={numQuestions}
                  />
                )}
              </Footer>
            </>
          )}
          {status === "finished" && (
            <FinishScreen
              points={points}
              possiblePoints={possiblePoints}
              highScore={highScore}
              dispatch={dispatch}
            />
          )}
        </Main>
      </div>
    </>
  );
}

export default App;
