import React from "react";

// Het Question-component ontvangt twee props:
// 1. `question`: Een object dat de vraag bevat, inclusief de vraagtekst en een array van opties.
// 2. `onAnswer`: Een functie die wordt aangeroepen wanneer een gebruiker een antwoord selecteert.
const Question = ({ question, onAnswer }) => {
  return (
    <div>
      {/* 
        Toon de vraagtekst. 
        `dangerouslySetInnerHTML` wordt gebruikt om HTML-inhoud in de vraagtekst te ondersteunen, 
        zoals speciale tekens of opmaak die vanuit een API wordt geleverd.
      */}
      <h3 
      className="question-header"
       dangerouslySetInnerHTML={{ __html: question.text }} />
      
      <div className="questioncontainer">
        {/* 
          Doorloop de lijst van opties (`question.options`) met de `map`-functie. 
          Elke optie wordt weergegeven als een knop. 
        */}
        {question.options.map((option, index) => (
          <button
          className="question-button"
            key={index} // Gebruik de index als sleutel omdat opties geen unieke ID hebben.
            // Wanneer een gebruiker op de knop klikt, wordt de `onAnswer`-functie aangeroepen.
            // Het `isCorrect`-attribuut van de optie wordt meegegeven om aan te geven of het antwoord juist is.
            onClick={() => onAnswer(option.isCorrect)}
            // Gebruik `dangerouslySetInnerHTML` om HTML-inhoud in de optie weer te geven. 
            // Dit kan nodig zijn als de tekst speciale tekens of opmaak bevat.
            dangerouslySetInnerHTML={{ __html: option.text }}
          />
        ))}
      </div>
    </div>
  );
};

export default Question;

// Uitleg van het component:
// Dit component toont een enkele vraag met meerdere antwoordopties. 
// Elke optie is een knop, en wanneer de gebruiker erop klikt, wordt de `onAnswer`-functie aangeroepen.
//
// Belangrijke aspecten:
// 1. **`dangerouslySetInnerHTML`**: 
//    - Wordt gebruikt om HTML-inhoud weer te geven zoals die is.
//    - Dit kan handig zijn als je data ontvangt van een API die HTML bevat (zoals speciale tekens).
//    - Let op: Dit kan een beveiligingsrisico zijn als de HTML niet goed wordt gevalideerd, 
//      omdat het gevoelig kan zijn voor cross-site scripting (XSS)-aanvallen.
// 2. **`onClick`**: 
//    - Wanneer een knop wordt ingedrukt, wordt `onAnswer` aangeroepen.
//    - Het `isCorrect`-attribuut van de optie wordt meegegeven om aan te geven of het juiste antwoord is gekozen.
// 3. **`key`**: 
//    - Nodig voor React om de lijst efficiënt te kunnen updaten.
//    - Hier wordt de index gebruikt als sleutel omdat opties geen unieke ID hebben, 
//      maar dit is alleen veilig zolang de opties niet dynamisch worden gewijzigd.
// 4. **Reusability**: 
//    - Dit component is generiek en kan worden gebruikt voor elke vraag met opties, 
//      zolang de juiste structuur voor de `question`-prop wordt aangehouden (met `text` en `options`).
//
// Dit ontwerp scheidt de vraaglogica van de presentatie en maakt het herbruikbaar in andere delen van de applicatie.
