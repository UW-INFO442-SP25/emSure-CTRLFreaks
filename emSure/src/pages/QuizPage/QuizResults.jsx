import React, { useEffect, } from 'react';
import { PrimaryButton, PrimaryLightButton, StaticOptionButton, SecondaryButton } from '../../components/buttons';
import { getDatabase, ref, push, set } from "firebase/database";
import { getAuth } from "firebase/auth";



export function QuizResults(props) {
  const { quizScore, shuffledQuestions, incorrectAnswers, handleRestartQuiz } = props;

  // useEffect(() => {
  //   const saveQuizResult = async () => {
  //     const auth = getAuth();
  //     const user = auth.currentUser;

  //     if (!user) {
  //       console.error("No authenticated user.");
  //       return;
  //     }

  //     const rtdb = getDatabase();
  //     const quizRef = ref(rtdb, `userData/${user.uid}/quizzes`);

  //     const newQuizRef = push(quizRef); // Creates a unique ID
  //     const quizData = {
  //       score: quizScore.correct,
  //       totalQuestions: shuffledQuestions.length,
  //       incorrectAnswers,
  //       completedAt: new Date().toISOString(),
  //     };

  //     try {
  //       await set(newQuizRef, quizData);
  //       console.log("Quiz result saved.");
  //     } catch (error) {
  //       console.error("Error saving quiz result:", error);
  //     }
  //   };

  //   saveQuizResult();
  // }, []);


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