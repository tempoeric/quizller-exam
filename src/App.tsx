import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { Homepage } from "pages/Homepage";
import { QuizPage } from "pages/Quiz";
import "./global.scss";

function App() {
  const [quizStarted, setQuizStarted] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Homepage onStartQuiz={() => setQuizStarted(true)} />}
        />
        <Route
          path="/quiz"
          element={
            quizStarted ? (
              <QuizPage onFinishQuiz={() => setQuizStarted(false)} />
            ) : (
              <Navigate to="/" />
            )
          }
        />{" "}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
