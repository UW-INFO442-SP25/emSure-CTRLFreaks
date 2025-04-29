import React, { useState } from 'react';
import { TertiaryButton, SecondaryButton } from '../components/buttons';


export default function QuizPage(props) {
  return (
    <div className="quiz-body">
      <div className="quiz-main">

        <div className="top-half">
          <img src="/imgs/Quiz-Progress-Bar.png" alt="progress bar" />
          <div className="question">
            <p>QUESTION 1 - PPO</p>
            <h2>What does the term PPO stand for?</h2>
          </div>
        </div>

        <div className="bottom-half">
          <div className="options">
            <div className="option-set">
              <button className="option-btn">
                <h3>option 1</h3>
              </button>
              <button className="option-btn">
                <h3>option 2</h3>
              </button>
            </div>
            <div className="option-set">
              <button className="option-btn">
                <h3>option 3</h3>
              </button>
              <button className="option-btn">
                <h3>option 4</h3>
              </button>
            </div>
          </div>
          <div className="done-cntr">
            <button className="primary-btn">
              <h3>Done</h3>
            </button>
          </div>
        </div>

        <img src="/imgs/sad-turtle.png" className="turtle-img" alt="sad turtle" />
      </div>
    </div>
  );
}