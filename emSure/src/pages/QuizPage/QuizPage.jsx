import React, { useState, useEffect } from 'react';
import { PrimaryButton, PrimaryLightButton, StaticOptionButton, SecondaryButton } from '../../components/buttons';
import { ProgressBar } from '../../components/progressBar'
import data from '../../data/quiz-questions.json';
import { QuizResults } from './QuizResults.jsx'
import { getDatabase, ref, push, set } from "firebase/database";
import { getAuth } from "firebase/auth";


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


  const handleCompleteQuiz = async () => {
    console.log("handleCompleteQuiz called!");

    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      console.error("No authenticated user.");
      return;
    }

    const rtdb = getDatabase();
    const quizRef = ref(rtdb, `userData/${user.uid}/quizzes`);
    const newQuizRef = push(quizRef);

    const quizData = {
      score: quizScore.correct,
      totalQuestions: shuffledQuestions.length,
      incorrectAnswers,
      completedAt: new Date().toISOString(),
    };

    try {
      await set(newQuizRef, quizData);
      console.log("Quiz result saved.");
      setQuizCompleted(true);
    } catch (error) {
      console.error("Error saving quiz result:", error);
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
        onClick={handleCompleteQuiz}
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










  if (quizCompleted) {
    return (
      < QuizResults
        quizScore={quizScore}
        shuffledQuestions={shuffledQuestions}
        incorrectAnswers={incorrectAnswers}
        handleRestartQuiz={handleRestartQuiz}
      />
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