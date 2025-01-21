import React, { useState } from "react";
import Question from "./Question";

const Quiz = ({ questions, onFinishQuiz }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) setScore((prev) => prev + 1);

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      onFinishQuiz(score + (isCorrect ? 1 : 0));
    }
  };

  return (
    <div>
      <h2>Vraag {currentQuestionIndex + 1} van {questions.length}</h2>
      <Question
        question={questions[currentQuestionIndex]}
        onAnswer={handleAnswer}
      />
    </div>
  );
};

export default Quiz;

