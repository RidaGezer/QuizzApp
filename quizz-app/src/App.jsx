import React, { useState, useEffect } from "react";
import axios from "axios";
import Quiz from "./components/Quiz";
import Results from "./components/Result";
import "./app.css";

const App = () => {
  // State hooks voor het beheren van quizgegevens en UI-status
  const [questions, setQuestions] = useState([]); // Bevat de geladen vragen
  const [isQuizActive, setIsQuizActive] = useState(false); // Geeft aan of de quiz bezig is
  const [score, setScore] = useState(0); // Houdt de score van de gebruiker bij
  const [showResults, setShowResults] = useState(false); // Geeft aan of de resultaten getoond worden
  const [category, setCategory] = useState(9); // Standaardcategorie: Algemeen
  const [difficulty, setDifficulty] = useState("easy"); // Standaard moeilijkheidsgraad: makkelijk
  const [timer, setTimer] = useState(15); // Timer voor vragen (15 seconden per vraag)
  const [questionIndex, setQuestionIndex] = useState(0); // Huidige vraagindex
  const [selectedAnswers, setSelectedAnswers] = useState([]); // Houdt de geselecteerde antwoorden bij

  // Functie om vragen op te halen van de Open Trivia DB API
  const fetchQuestions = async (category, difficulty) => {
    try {
      const response = await axios.get("https://opentdb.com/api.php", {
        params: {
          amount: 10, // Aantal vragen om op te halen
          category,
          difficulty,
          type: "multiple", // Alleen meerkeuzevragen
        },
      });

      // Format de ontvangen data in een geschikt formaat voor de quiz
      const formattedQuestions = response.data.results.map((q) => ({
        text: q.question, // De vraagtekst
        options: shuffleArray([
          // Schud de opties en markeer correcte en foute antwoorden
          ...q.incorrect_answers.map((answer) => ({
            text: answer,
            isCorrect: false,
          })),
          { text: q.correct_answer, isCorrect: true },
        ]),
      }));

      setQuestions(formattedQuestions); // Update de vragen in de state
      setIsQuizActive(true); // Start de quiz
    } catch (error) {
      console.error("Error fetching questions:", error); // Log eventuele fouten
    }
  };

  // Functie om een array willekeurig te sorteren
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  // Behandel het einde van de quiz
  const handleFinishQuiz = (finalScore) => {
    setScore(finalScore); // Update de eindscore
    setIsQuizActive(false); // Beëindig de quiz
    setShowResults(true); // Toon de resultaten
  };

  // Update de geselecteerde categorie
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  // Update de geselecteerde moeilijkheidsgraad
  const handleDifficultyChange = (event) => {
    setDifficulty(event.target.value);
  };

  // Start een timer van 15 seconden voor elke vraag
  const startTimer = () => {
    setTimer(15); // Reset de timer
    const interval = setInterval(() => {
      setTimer((prevTime) => {
        if (prevTime === 1) {
          clearInterval(interval); // Stop de timer wanneer deze 0 bereikt
          handleNextQuestion(); // Ga naar de volgende vraag
          return 0;
        }
        return prevTime - 1; // Verminder de timer
      });
    }, 1000);
  };

  // Ga naar de volgende vraag of eindig de quiz
  const handleNextQuestion = () => {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex((prevIndex) => prevIndex + 1); // Volgende vraag
    } else {
      setShowResults(true); // Toon resultaten als de quiz voorbij is
    }
  };

  // Bewaar geselecteerde antwoorden
  const handleAnswerSelection = (answer) => {
    setSelectedAnswers((prevAnswers) => [...prevAnswers, answer]);
  };

  // Start de timer bij elke nieuwe vraag
  useEffect(() => {
    if (isQuizActive && questionIndex < questions.length) {
      startTimer();
    }
  }, [isQuizActive, questionIndex]);

  return (
    <div>
      {/* Toon de startpagina */}
      {!isQuizActive && !showResults && (
        <div className="parent">
          <div className="container1">
            <h1>Trivia</h1>
            <h2>Quiz</h2>
          </div>
          <div className="container2">
            <div>
            <div>
              {/* Categorie selectie */}
              <label htmlFor="category"></label>
              <select
                id="category"
                value={category}
                onChange={handleCategoryChange}
              >
                <option value={9}>Algemeen</option>
                <option value={18}>Science</option>
                <option value={21}>Sport</option>
              </select>
            </div>
            <div>
              {/* Moeilijkheidsgraad selectie */}
              <label htmlFor="difficulty"></label>
              <select
                id="difficulty"
                value={difficulty}
                onChange={handleDifficultyChange}
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
            </div>
            {/* Start de quiz */}
            <a
              className="StartButton"
              onClick={(e) => {
                e.preventDefault(); // Voorkomt standaard linkgedrag
                fetchQuestions(category, difficulty);
              }}
              href="#"
            >
              START
            </a>
          </div>
        </div>
      )}
      {/* Toon de quiz */}
      {isQuizActive && !showResults && (
        <div>
          <Quiz
            questions={questions}
            currentQuestion={questions[questionIndex]}
            onFinishQuiz={handleFinishQuiz}
            handleAnswerSelection={handleAnswerSelection}
          />
          <div className="timer" >Time Remaining: {timer}s</div> {/* Toon de timer */}
        </div>
      )}
      {/* Toon de resultaten */}
      {showResults && (
        <Results
          score={score}
          onRestart={() => setShowResults(false)}
          selectedAnswers={selectedAnswers}
        />
      )}
    </div>
  );
};

export default App;

// Uitleg:
// 1. **Structuur**: De app bevat drie hoofdschermen: startpagina, quiz, en resultaten.
// 2. **State**: Verschillende useState-hooks beheren de status van de app, zoals de vragen, timer, score, en voortgang.
// 3. **Logica**: Met functies zoals `fetchQuestions`, `handleNextQuestion`, en `startTimer` wordt de quiz beheerd.
// 4. **Herbruikbaarheid**: Componenten zoals Quiz en Results zijn herbruikbaar en scheiden presentatie van logica.
// 5. **Effecten**: useEffect wordt gebruikt om de timer te starten wanneer een nieuwe vraag verschijnt.
