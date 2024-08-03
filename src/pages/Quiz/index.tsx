import { FC, useEffect, useReducer, useState } from "react";
import axios from "axios";
import { State, Action } from "types";

import QuizBackgroundLight from "assets/img/ForgeExamLight.svg?react";
import QuizBackgroundDark from "assets/img/ForgeExamDark.svg?react";
import ForgeIcon from "assets/img/ForgeExamLogo.svg?react";

interface QuizPageProps {
  onFinishQuiz: () => void;
}

const initialState: State = {
  questions: [],
  loading: true,
  error: "",
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        questions: action.payload,
        error: "",
      };
    case "FETCH_ERROR":
      return {
        ...state,
        loading: false,
        questions: [],
        error: "Something went wrong!",
      };
    default:
      return state;
  }
};

export const QuizPage: FC<QuizPageProps> = ({ onFinishQuiz }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const { questions, loading, error } = state;

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;

  const isOddQuestion = (currentIndex + 1) % 2 !== 0;
  const isNextButtonDisabled = selectedAnswer === null;
  const backgroundColor = isOddQuestion
    ? "grayishBlue-primary"
    : "black-primary";
  const textColor = isOddQuestion ? "text-blue-primary" : "text-white";
  const buttonTextColorDisabled = isOddQuestion
    ? "text-gray-tertiary"
    : "text-gray-quadrary";
  const buttonTextColorEnabled = isOddQuestion ? "text-white" : "text-black";
  const borderColor = isOddQuestion ? "border-blue-primary" : "border-white";
  const buttonChoicesColor = isOddQuestion
    ? "bg-blue-primary"
    : "bg-gray-primary";
  const buttonNextColorDisabled = isOddQuestion
    ? "bg-grayishBlue-secondary"
    : "bg-grayishBlue-tertiary";
  const buttonNextColorEnabled = isOddQuestion
    ? "bg-blue-primary"
    : "bg-gray-secondary";

  const handleNextQuestion = () => {
    if (selectedAnswer) {
      const answerKey = Object.keys(currentQuestion.answers).find(
        (key) => currentQuestion.answers[key] === selectedAnswer,
      );

      if (answerKey) {
        const isCorrect =
          currentQuestion.correct_answers[`${answerKey}_correct`] === "true";

        if (isCorrect) {
          setScore((prevScore) => prevScore + 1);
        }
      }
    }

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
    } else {
      setQuizFinished(true);
    }
  };

  const handleAnswerClick = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleRestartQuiz = () => {
    setCurrentIndex(0);
    setScore(0);
    setQuizFinished(false);
    setSelectedAnswer(null);
    onFinishQuiz();
  };

  useEffect(() => {
    axios
      .get(`https://quizapi.io/api/v1/questions`, {
        params: {
          apiKey: import.meta.env.VITE_API_KEY,
          limit: 10,
          tags: "javascript",
        },
      })
      .then((response) => {
        dispatch({ type: "FETCH_SUCCESS", payload: response?.data });
      })
      .catch(() => {
        dispatch({ type: "FETCH_ERROR" });
      });
  }, []);

  if (loading) {
    return (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white/80 z-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin mx-auto"></div>
          <p className="text-xl mt-4 text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (quizFinished) {
    return (
      <>
        <div className="relative flex bg-blue-primary min-h-screen items-center">
          <QuizBackgroundDark className="absolute w-full -left-80" />
          <div className="flex-auto relative items-center text-white font-bebas">
            <div className="flex flex-col items-center justify-center flex-grow">
              <p className="text-[20rem] leading-[17rem] text-center">BRAVO!</p>
              <p className="text-[8rem] m-0 leading-none text-center mb-16">
                YOU HAVE SCORED
              </p>
            </div>
            <div className="absolute right-[15rem] bottom-0">
              <button
                className="font-sora text-2xl text-white py-2 px-4 rounded-full underline"
                onClick={handleRestartQuiz}
              >
                Wanna Play Again?
              </button>
            </div>
          </div>

          <div className="relative flex flex-grow">
            <div className="fixed top-0 w-[35rem] h-screen bg-gray-200 right-28 flex items-center justify-center">
              <p className="text-[15rem] text-blue-primary">
                {score}/{totalQuestions}
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div
      className={`bg-${backgroundColor} min-h-screen flex justify-center relative`}
    >
      {isOddQuestion ? (
        <QuizBackgroundLight className="absolute w-full -left-80" />
      ) : (
        <QuizBackgroundDark className="absolute w-full -left-80" />
      )}
      <div className="absolute top-4 right-4">
        <ForgeIcon className="w-28" />
      </div>
      <div className="text-center relative z-10">
        <h1 className={`font-bebas ${textColor} text-8xl mt-24 mb-4`}>
          Question {currentIndex + 1} / {totalQuestions}
        </h1>
        {currentQuestion && (
          <div className={textColor}>
            <h3 className="font-sora text-4xl mb-4">
              {currentQuestion.question}
            </h3>
            <div className="flex flex-col items-center space-y-4">
              {Object.entries(currentQuestion.answers || {})
                .filter(([, answer]) => answer !== null)
                .map(([key, answer], index) => (
                  <button
                    key={key}
                    className={`w-8/12 h-16 py-2 px-4 rounded relative border border-solid ${borderColor} ${
                      selectedAnswer === answer
                        ? `${buttonChoicesColor} ${buttonTextColorEnabled}`
                        : `bg-none ${textColor}`
                    }`}
                    onClick={() => handleAnswerClick(answer as string)}
                  >
                    <span
                      className={`absolute top-1/2 left-4 transform -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-full border border-solid ${
                        isOddQuestion ? "border-white" : "border-black"
                      } ${
                        selectedAnswer === answer
                          ? "bg-none"
                          : buttonNextColorEnabled
                      } text-white font-bold`}
                    >
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="ml-16">{answer}</span>
                  </button>
                ))}
            </div>
          </div>
        )}
        <button
          className={`mt-4 p-2 w-20 rounded ${
            isNextButtonDisabled
              ? `${buttonTextColorDisabled} ${buttonNextColorDisabled}`
              : `${buttonTextColorEnabled} ${buttonNextColorEnabled}`
          }`}
          onClick={handleNextQuestion}
          disabled={isNextButtonDisabled}
        >
          Next
        </button>
      </div>
    </div>
  );
};
