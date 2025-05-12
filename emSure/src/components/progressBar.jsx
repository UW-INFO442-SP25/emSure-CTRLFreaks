import React from 'react';

export const ProgressBar = ({ currentQuestion, totalQuestions }) => {
  const progress = (currentQuestion / totalQuestions) * 100;

  return (
    <div className="progress-bar-outer">
      <div
        className="progress-bar-inner"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};