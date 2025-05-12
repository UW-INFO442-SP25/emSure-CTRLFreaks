import React, { useState } from 'react';
import { PrimaryButton, PrimaryLightButton, StaticOptionButton } from '../components/buttons';
import { ProgressBar } from '../components/progressBar'


const quizData = [
  {
    question: "What is a premium?",
    options: ["The amount you pay for your insurance policy",
      "The amount you pay when visiting a doctor",
      "The maximum your insurance covers annually",
      "A bonus payment when you don't use your insurance"],
    correctAnswer: "The amount you pay for your insurance policy"
  },
  {
    question: "What does the term 'deductible' mean in health insurance?",
    options: ["The amount deducted from your paycheck for insurance",
      "The amount you must pay before your insurance begins to pay",
      "The discount you receive for being healthy",
      "The maximum amount your plan will cover"],
    correctAnswer: "The amount you pay for your insurance policy"
  },
  {
  question: "What is coinsurance?",
  options: ["Having multiple insurance policies",
    "The percentage of costs you pay after meeting your deductible",
    "Insurance you share with your spouse",
    "The insurance company's portion of the bill"],
  correctAnswer: "Insurance you share with your spouse"
  }
];


export default function QuizPage(props) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentQuestion = quizData[currentQuestionIndex];
  const [selected, setSelected] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showSelectWarning, setShowSelectWarning] = useState(false);
  const [lastQuestion, setLastQuestion] = useState(false);



  const handleAnswerSelect = (option) => {
    setSelected(selected === option ? null : option);
  };

  const optionButtons = currentQuestion.options.map((option, index) => {
    return (
      <StaticOptionButton
        key={index}
        text={option}
        isSelected={selected === option}
        showWarningStyle={showSelectWarning && selected === null}
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
    setCurrentQuestionIndex((prevIndex) =>
        (prevIndex + 1) % quizData.length
      );
    console.log("next page")
  }

  const handleSubmitQuestion = () =>
  {
    setShowFeedback(true)
  }

  const handleQuestionCheck = () =>
  {
    if (selected == currentQuestion.correctAnswer) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  }

  const handleFinishQuiz = () =>
  {

  }


  const actionButton = (() => {
    if (selected == null) {
      return (
        < PrimaryLightButton
        text="Submit Answer"
        onClick={() => setShowSelectWarning(true)}
      />
      );
    } else if (lastQuestion) {
      return (
        < PrimaryButton
        text="Finish Quiz"
        // onClick={() => {
        //   handleFinishQuiz();
        // }}
        />
      )
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
    console.log('please select answer')
    console.log(showSelectWarning)

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


  return (
    <div className="quiz-body">
      <div className="quiz-main">

        <div className="top-half">
          < ProgressBar
            currentQuestion={currentQuestionIndex + 1}
            totalQuestions={quizData.length}
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

        <img src="/imgs/sad-turtle.png" className="turtle-img" alt="sad turtle" />

      </div>
    </div>
  );
}