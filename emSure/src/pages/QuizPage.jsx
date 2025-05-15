import React, { useState } from 'react';
import { PrimaryButton, PrimaryLightButton, StaticOptionButton, SecondaryButton } from '../components/buttons';
import { ProgressBar } from '../components/progressBar'
import data from '../data/quiz-questions.json';


export default function QuizPage(props) {
  const [shuffledQuestions, setShuffledQuestions] = useState(() =>
    [...data].sort(() => Math.random() - 0.5).slice(0, 5)
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showSelectWarning, setShowSelectWarning] = useState(false);
  const [quizScore, setQuizScore] = useState({ correct: 0, total: shuffledQuestions.length });
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);
  const [quizReadyToComplete, setQuizReadyToComplete] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);


  const currentQuestion = shuffledQuestions[currentQuestionIndex];
  const getTurtleImage = () => {
    if (showFeedback && isCorrect === true) {
      return "/imgs/happy-turtle.png";
    } else if (showFeedback && isCorrect === false) {
      return "/imgs/sad-turtle.png";
    } else {
      return "/imgs/neutral-turtle.png";
    }
  };


  const handleAnswerSelect = (option) => {
    setSelected(selected === option ? null : option);
    setShowSelectWarning(false);
  };


  const optionButtons = currentQuestion.options.map((option, index) => {
    const showWarning = showSelectWarning && selected === null;
    console.log(currentQuestionIndex)

    return (
      <StaticOptionButton
        key={index}
        text={option}
        isSelected={selected === option}
        showWarningStyle={showWarning}
        onClick={showFeedback ? null : () => handleAnswerSelect(option)}
      />
    );
  });


  const handleNextQuestion  = () =>
  {
    setIsCorrect(null);
    setShowFeedback(false);
    setSelected(null);
    setShowSelectWarning(false);

    setCurrentQuestionIndex(prevIndex => prevIndex + 1);

    console.log("next page")
    console.log(incorrectAnswers)
  }

  const handleSubmitQuestion = () =>
  {
    const correct = selected === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    setShowFeedback(true)

    if (currentQuestionIndex === shuffledQuestions.length - 1) {
      setQuizReadyToComplete(true);
      console.log("last question")
    }

    if (correct) {
      setQuizScore(prev => ({ ...prev, correct: prev.correct + 1 }));
    } else {
      setIncorrectAnswers(prev => [
        ...prev,
        {
          questionIndex: currentQuestionIndex,
          question: currentQuestion.question,
          userAnswer: selected,
          correctAnswer: currentQuestion.correctAnswer
        }
      ]);
    }
  }

  const handleQuestionCheck = () =>
  {
    if (selected == currentQuestion.correctAnswer) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  }

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelected(null);
    setIsCorrect(null);
    setShowFeedback(false);
    setIncorrectAnswers([]);
    setQuizCompleted(false);
    setQuizScore({ correct: 0, total: shuffledQuestions.length });
    setQuizReadyToComplete(false);
    setQuizCompleted(false);
    setShuffledQuestions([...data].sort(() => Math.random() - 0.5).slice(0, 5));

    console.log(quizScore)
    console.log(incorrectAnswers)
  };


  const actionButton = (() => {
    if (quizReadyToComplete) {
      return (
        < PrimaryButton
        text="Finish Quiz"
        onClick={() => setQuizCompleted(true)}
        />
      )
    } else if (selected == null) {
      return (
        < PrimaryLightButton
        text="Submit Answer"
        onClick={() => setShowSelectWarning(true)}
      />
      );
    } else if (selected != null && !showFeedback) {
      return (
        < PrimaryButton
        text="Submit Answer"
        onClick={() => {
          handleSubmitQuestion();
          handleQuestionCheck();
        }}
        />
      )
    } else if (selected != null && showFeedback) {
      console.log("next question")
      return (
        < PrimaryButton
        text="Next Question"
        onClick={handleNextQuestion}
        />
      )
    }
  })();


  const feedbackYes = (() => {
    if (showFeedback && isCorrect) {
      return (
        <h3 className='correct'> CORRECT! </h3>
      )
    } else if (showFeedback && !isCorrect) {
        return (
          <h3 className='incorrect'> INCORRECT! </h3>
        )
    } else {
      return (
        <h2></h2>
      )
    };
  })();


  const optionError = (() => {
    if (showSelectWarning) {
      return (
        <h3>
          Please select an answer
        </h3>
      )
    } else {
      console.log("no error")
    }
  })();

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


  if (quizCompleted) {
    return (
      <div className="results-body">
        <div className="results-top">
          <div className="completed">
            <img src="/imgs/turtle-on-back.png" className="results-turtle" alt="happy turtle on its back" />
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


  return (
    <div className="quiz-body">
      <div className="quiz-main">

        <div className="top-half">
          < ProgressBar
            currentQuestion={currentQuestionIndex + 1}
            totalQuestions={shuffledQuestions.length}
          />
          <div className="question">
            <p>QUESTION {currentQuestionIndex + 1}</p>
            <h2> {currentQuestion.question} </h2>
          </div>
        </div>

        <div className="bottom-half">
          <div className='top-bottom-half'>
            {feedbackYes}
            {optionError}
            <div className="options">
              {optionButtons}
            </div>
          </div>

          <div className="done-cntr">
            {actionButton}
          </div>
        </div>

        <img src={getTurtleImage()} className="turtle-img" alt="sad turtle" />

      </div>
    </div>
  );
}