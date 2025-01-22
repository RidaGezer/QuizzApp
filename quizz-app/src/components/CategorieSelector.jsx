import React from "react";

// Het CategorieSelector-component ontvangt twee props: 
// 1. `categories`: Een array met categorieën (elke categorie bevat waarschijnlijk een `id` en `name`).
// 2. `onSelectCategory`: Een functie die wordt aangeroepen wanneer een categorie wordt geselecteerd.
const CategorieSelector = ({ categories, onSelectCategory }) => {
  return (
    <div>
      {/* Titel van de categorie-selector. Deze geeft de gebruiker aan om een categorie te kiezen. */}
      <h2>Kies een categorie:</h2> 

      <ul>
        {/* 
          Doorloop de lijst van categorieën met de `map`-functie.
          Voor elke categorie wordt een lijstitem (`<li>`) gemaakt.
        */}
        {categories.map((category) => (
          <li key={category.id}> 
            {/* 
              Het `key`-attribuut is nodig om React te helpen bij het efficiënt bijwerken van de lijst. 
              Hier gebruiken we de unieke ID van elke categorie als sleutel.
            */}
            <button
              // Wanneer de knop wordt ingedrukt, wordt de `onSelectCategory`-functie aangeroepen.
              // De geselecteerde categorie wordt meegegeven als argument.
              onClick={() => onSelectCategory(category)}
            >
              {/* Toon de naam van de categorie als knoptekst. */}
              {category.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategorieSelector;

// Uitleg van het component:
// Dit component toont een lijst met categorieën, elk weergegeven als een knop binnen een lijstitem.
// Wanneer een gebruiker op een knop klikt, roept het component de `onSelectCategory`-functie aan 
// die door de oudercomponent wordt geleverd, samen met de geselecteerde categorie als argument.
//
// Dit ontwerp maakt het component herbruikbaar: 
// - Het kan met elke lijst van categorieën werken, zolang die een `id` en `name` bevat.
// - De logica van wat er gebeurt wanneer een categorie wordt geselecteerd, wordt bepaald door de oudercomponent.
