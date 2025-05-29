import React from 'react'
import { SecondaryButton, TertiaryButton } from '../components/buttons';
import { useNavigate } from 'react-router-dom';

const QuizLanding = () => 
{
  const navigate = useNavigate();

  return (

    <div className='bg-container quiz-landing'>

        <div className='bg-gradient'></div>

        <div className='content-container quiz-landing'>

            <img src="/imgs/book-brain.png" className="quiz-landing-img" alt="Book Brain"></img>

            <div className='quiz-page-text'>

                <h1>Ready to test your health insurance knowledge?</h1>

                <div className='learn-quiz-options'>

                  <TertiaryButton text="Keep Learning" onClick={ () => navigate('/learn') }/>
                  <SecondaryButton text="Take Quiz" onClick={ () => navigate('/quiz-onboarding') }/>

                </div>

            </div>

        </div>

    </div>

  )
}

export default QuizLanding;