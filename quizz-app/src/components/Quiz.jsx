import React, { useState } from "react";
import Question from "./Question"; // Importeer het Question-component om een enkele vraag weer te geven.

// Het Quiz-component ontvangt twee props:
// 1. `questions`: Een array met alle quizvragen.
// 2. `onFinishQuiz`: Een functie die wordt aangeroepen wanneer de quiz is voltooid, met de eindscore als argument.
const Quiz = ({ questions, onFinishQuiz }) => {
  // State om de huidige vraag bij te houden (index van de `questions` array).
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // State om de huidige score bij te houden (aantal correcte antwoorden).
  const [score, setScore] = useState(0);

  // Functie die wordt aangeroepen wanneer een gebruiker een antwoord selecteert.
  const handleAnswer = (isCorrect) => {
    // Als het antwoord correct is, verhoog de score met 1.
    if (isCorrect) setScore((prev) => prev + 1);

    // Controleer of er meer vragen zijn.
    if (currentQuestionIndex + 1 < questions.length) {
      // Als er meer vragen zijn, ga door naar de volgende vraag.
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // Als dit de laatste vraag was, beëindig de quiz.
      // Roep `onFinishQuiz` aan met de uiteindelijke score.
      onFinishQuiz(score + (isCorrect ? 1 : 0));
    }
  };

  return (
    <div>
    
      {/* Render de huidige vraag door het Question-component aan te roepen. */}
      <Question
        question={questions[currentQuestionIndex]} // Geef de huidige vraag door.
        onAnswer={handleAnswer} // Geef de functie door om een antwoord te verwerken.
      />
    </div>
  );
};

export default Quiz;

// Uitleg van het component:
// Dit component beheert de quizlogica, zoals het bijhouden van de score en het navigeren door de vragen.
//
// Belangrijke aspecten:
// 1. **State management:**
//    - `currentQuestionIndex`: Houdt bij welke vraag momenteel wordt weergegeven. Wordt geüpdatet bij elk antwoord.
//    - `score`: Houdt de score bij (aantal correcte antwoorden).
//
// 2. **handleAnswer-functie:**
//    - Wordt aangeroepen door het Question-component wanneer een gebruiker een antwoord selecteert.
//    - Verhoogt de score als het antwoord correct is.
//    - Controleert of er meer vragen zijn en gaat verder of beëindigt de quiz.
//
// 3. **Eindigen van de quiz:**
//    - Als alle vragen zijn beantwoord, roept de `onFinishQuiz`-functie de oudercomponent aan met de eindscore.
//    - De score wordt berekend door de huidige score op te tellen met 1 als het laatste antwoord correct was.
//
// 4. **Reusability:**
//    - Dit component is flexibel en kan worden gebruikt voor elk aantal vragen, zolang ze de juiste structuur hebben.
//    - De oudercomponent bepaalt wat er gebeurt wanneer de quiz eindigt via de `onFinishQuiz`-functie.
//
// Dit component is een voorbeeld van hoe state en componenten kunnen samenwerken om interactieve functionaliteit te creëren.

