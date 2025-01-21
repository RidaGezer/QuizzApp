import React from "react";

const Question = ({ question, onAnswer }) => {
  return (
    <div>
      <h3 dangerouslySetInnerHTML={{ __html: question.text }} />
      <div>
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswer(option.isCorrect)}
            dangerouslySetInnerHTML={{ __html: option.text }}
          />
        ))}
      </div>
    </div>
  );
};

export default Question;
