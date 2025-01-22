import React from "react";

// Het Results-component ontvangt twee props:
// 1. `score`: Het eindresultaat van de quiz (aantal correcte antwoorden).
// 2. `onRestart`: Een functie die wordt aangeroepen wanneer de gebruiker de quiz opnieuw wil starten.
const Results = ({ score, onRestart }) => {
  return (
    <div>
      {/* Toon een titel die aangeeft dat de quiz is voltooid. */}
      <h2 className="h2-results" >Quiz Voltooid!</h2>
      
      {/* Toon de eindscore van de gebruiker. */}
      <p className="p-results" >{score}</p>


      {/* 
        Een knop waarmee de gebruiker de quiz opnieuw kan starten.
        Bij klikken roept het de `onRestart`-functie aan, die door de oudercomponent wordt geleverd.
      */}
      <a className="button-results" onClick={onRestart}>Try Again?</a>
    </div>
  );
};

export default Results;

// Uitleg van het component:
// Dit component dient als een afsluitend scherm dat wordt weergegeven wanneer de quiz is voltooid.
//
// Belangrijke aspecten:
// 1. **Props:**
//    - `score`: Wordt gebruikt om de eindscore van de gebruiker weer te geven.
//    - `onRestart`: Wordt doorgegeven vanuit de oudercomponent en bepaalt wat er gebeurt wanneer de gebruiker de quiz opnieuw wil starten.
//
// 2. **Herbruikbaarheid:**
//    - Dit component is eenvoudig en herbruikbaar. Het is ontworpen om te werken met elke quiztoepassing waarin een eindresultaat en een herstartoptie nodig zijn.
//
// 3. **Knopfunctionaliteit:**
//    - De knop roept de `onRestart`-functie aan wanneer erop wordt geklikt. 
//      Hiermee kan de oudercomponent de quiz opnieuw initialiseren, bijvoorbeeld door de huidige vraag terug te zetten naar de eerste en de score te resetten.
//
// 4. **Presentatielaag:**
//    - Het component is puur presentatiegericht. Het bevat geen logica voor het bijhouden van de score of het herstarten van de quiz; dat wordt beheerd door de oudercomponent.
//
// 5. **Simpliciteit:**
//    - Door dit scherm als een apart component te maken, blijft de code gestructureerd en onderhoudbaar.
//    - Het component maakt het gemakkelijk om de resultaten weer te geven en interactie te bieden zonder extra complexiteit.
