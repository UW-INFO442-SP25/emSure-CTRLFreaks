import React, { useState } from 'react';
import { PrimaryButton, PrimaryLightButton, StaticOptionButton, SecondaryButton } from '../../components/buttons';



export function QuizResults(props) {
  const { quizScore } = props;
  const { shuffledQuestions } = props;
  const { incorrectAnswers } = props;
  const { handleRestartQuiz } = props;

  const incorrectAnswerCards = incorrectAnswers.map(incorrectAnswer => {
    return (
      <div className="incorrect-answer-card" key={incorrectAnswer.questionIndex}>
        <h3>{incorrectAnswer.question}</h3>

        <div className="answer-summary">

          <div className="your-answer">
            <p className="left-answer">Your Answer:</p>
            <p className="right-answer">{incorrectAnswer.userAnswer}</p>
          </div>

          <div className="correct-answer">
            <p className="left-answer">Correct Answer:</p>
            <p className="right-answer">{incorrectAnswer.correctAnswer}</p>
          </div>

        </div>

      </div>

    );
  });

  return (
    <div className="results-body">
      <div className="results-top">
        <div className="completed">
          <img src="../imgs/turtle-on-back.png" className="results-turtle" alt="happy turtle on its back" />
          <h1>Completed!</h1>
        </div>

        <div className="score">
          <h3>Your Score</h3>
          <div className="out-of-score">
            <h2>{quizScore.correct}</h2>
            <h3>out of</h3>
            <h2>{shuffledQuestions.length}</h2>
          </div>

        </div>
      </div>

      <div className='results-bottom'>
        <div className="missed-questions">
          <h2>Questions you missed</h2>
          <div className="incorrect-answers">
            {incorrectAnswerCards}
          </div>
        </div>

        <div className="results-buttons">
          < SecondaryButton
          text="Learn More"
          />

          < PrimaryButton
          text="Retake Quiz"
          onClick={handleRestartQuiz}
          />
        </div>
      </div>

    </div>
  )
}