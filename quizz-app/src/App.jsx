import React, { useState, useEffect } from "react";
import axios from "axios";
import Quiz from "./components/Quiz";
import Results from "./components/Result";

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [category, setCategory] = useState(9); // Default category (General Knowledge)
  const [difficulty, setDifficulty] = useState("easy"); // Default difficulty (easy)
  const [timer, setTimer] = useState(15); // 15 seconds timer
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]); // New state to track selected answers

  const fetchQuestions = async (category, difficulty) => {
    try {
      const response = await axios.get("https://opentdb.com/api.php", {
        params: {
          amount: 10,
          category,
          difficulty,
          type: "multiple",
        },
      });

      const formattedQuestions = response.data.results.map((q) => ({
        text: q.question,
        options: shuffleArray([
          ...q.incorrect_answers.map((answer) => ({
            text: answer,
            isCorrect: false,
          })),
          { text: q.correct_answer, isCorrect: true },
        ]),
      }));

      setQuestions(formattedQuestions);
      setIsQuizActive(true);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const handleFinishQuiz = (finalScore) => {
    setScore(finalScore);
    setIsQuizActive(false);
    setShowResults(true);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleDifficultyChange = (event) => {
    setDifficulty(event.target.value);
  };

  const startTimer = () => {
    setTimer(15); // Reset the timer to 15 seconds at the start of each question
    const interval = setInterval(() => {
      setTimer((prevTime) => {
        if (prevTime === 1) {
          clearInterval(interval); // Stop the timer when it reaches 0
          handleNextQuestion(); // Move to the next question after the time is up
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  const handleNextQuestion = () => {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setShowResults(true); // End the quiz if all questions are answered
    }
  };

  const handleAnswerSelection = (answer) => {
    setSelectedAnswers((prevAnswers) => [...prevAnswers, answer]); // Save selected answers
  };

  useEffect(() => {
    if (isQuizActive && questionIndex < questions.length) {
      startTimer();
    }
  }, [isQuizActive, questionIndex]);

  return (
    <div>
      {!isQuizActive && !showResults && (
        <div>
          <h1>Trivia Quiz App</h1>
          <div>
            <label htmlFor="category">Select Category:</label>
            <select id="category" value={category} onChange={handleCategoryChange}>
              <option value={9}>Algemeen</option>
              <option value={18}>Science</option>
              <option value={21}>Sport</option>
            </select>
          </div>
          <div>
            <label htmlFor="difficulty">Select Difficulty:</label>
            <select id="difficulty" value={difficulty} onChange={handleDifficultyChange}>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <button onClick={() => fetchQuestions(category, difficulty)}>Start Quiz</button>
        </div>
      )}
      {isQuizActive && !showResults && (
        <div>
          <Quiz
            questions={questions}
            currentQuestion={questions[questionIndex]}
            onFinishQuiz={handleFinishQuiz}
            handleAnswerSelection={handleAnswerSelection} // Pass the answer selection handler
          />
          <div>Time Remaining: {timer}s</div>
        </div>
      )}
      {showResults && <Results score={score} onRestart={() => setShowResults(false)} selectedAnswers={selectedAnswers} />}
    </div>
  );
};

export default App;

