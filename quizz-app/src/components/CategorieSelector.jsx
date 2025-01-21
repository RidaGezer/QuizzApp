import React from "react";

// CategorieSelector component
const CategorieSelector = ({ categories, onSelectCategory }) => {
  return (
    <div>
      <h2>Kies een categorie:</h2> {/* Toon de titel "Kies een categorie" */}

      <ul>
        {/* Itereer over de lijst van categorieën */}
        {categories.map((category) => (
          <li key={category.id}> {/* Gebruik de ID van de categorie als key */}
            <button
              onClick={() => onSelectCategory(category)} // Roep de onSelectCategory functie aan met de geselecteerde categorie als argument
            >
              {category.name} {/* Toon de naam van de categorie */}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategorieSelector;
