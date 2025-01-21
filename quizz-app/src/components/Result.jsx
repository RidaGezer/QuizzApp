import React from "react";

const Results = ({ score, onRestart }) => {
  return (
    <div>
      <h2>Quiz Voltooid!</h2>
      <p>Je score is: {score}</p>
      <button onClick={onRestart}>Opnieuw proberen</button>
    </div>
  );
};

export default Results;
