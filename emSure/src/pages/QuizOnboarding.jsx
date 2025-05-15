import React, { useState } from 'react';
import { TertiaryButton, SecondaryButton } from '../components/buttons';
import { useNavigate } from 'react-router-dom';

const QuizOnboarding = () => 
{
    const [ currDialogueIndex, setCurrDialogueIndex ] = useState(0);
    const navigate = useNavigate();

    const dialogueTop = [ 
        "Hi, I’m Tilly the Turtle!", 
        "Only way is forward!", 
        "Takes it slow and steady!",
        "Ready?"
    ]

    const dialogueBottom = [ 
        "I’ll be the one testing you on your health insurance knowledge!", 
        "You’ll get 15 questions. Once you answer one, you can’t go back and change it—so take your time and give it your best shot!",
        "If you miss a question, no worries. We’ll move on to a new topic so you can build knowledge across different areas",
        "Ready to get started and take charge of your healthcare choices?"
    ]

    const dialogueTurtle = [ 
        "/imgs/turtle-1.png", 
        "/imgs/turtle-2.png",
        "/imgs/turtle-1.png",
        "/imgs/turtle-3.png"
    ]

    const handleContinue = () =>
    {
        if (currDialogueIndex < dialogueTop.length - 1)
        {
            setCurrDialogueIndex(prev => prev + 1);
        }
        else {
            setCurrDialogueIndex(0);
            navigate('/quiz');
        }
    };

    return (

        <div className='bg-container quiz-onboarding'>

            <div className='bg-gradient'></div>

            <div className='content-container quiz-onboarding'>

                <div className='quiz-onboarding-content'>

                    <div className='quiz-onboarding-dialogue'>
                        <h1>{ dialogueTop[currDialogueIndex] }</h1>
                        <h2>{ dialogueBottom[currDialogueIndex] }</h2>
                    </div>

                    <div className='quiz-onboarding-btns'>
                        <TertiaryButton text="Skip Intro" />
                        <SecondaryButton 
                            onClick={ handleContinue } 
                            text= { currDialogueIndex < dialogueTop.length - 1 ? "Continue" : "Begin Quiz!" } 
                        />
                    </div>

                </div>

                <div className='quiz-onboarding-img-container'>
                    
                    <img src={ dialogueTurtle[currDialogueIndex] } className="quiz-onboarding-img" alt="Turtle Smiling"></img>
                
                </div>

            </div>

        </div>

    )
}

export default QuizOnboarding;