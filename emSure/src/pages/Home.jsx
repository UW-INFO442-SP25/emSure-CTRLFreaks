import React from 'react'
import { SecondaryButton, PrimaryButton } from '../components/buttons'

const Home = () => 
{
  return (

    <div className='home'>
      
        <div className='bg-container'>

            {/* <div className='bg-gradient'></div> */}

            <div className='content-container home'>
            
                <div className='home-box-1'>

                    <img src='/imgs/book-closed.png' alt=""></img>

                    <div className='home-box-1-content'>

                        <h1>Take the guesswork out of health insurance</h1>
                        <PrimaryButton text="Start Learning" />
                    </div>

                </div>

                <div className='home-box-2'>

                    <img src='/imgs/book-open.png' alt=""></img>

                    <div className='home-box-2-content'>

                        <h2>Learn New Words</h2>
                        <p>Read and search through our glossary to learn about health insurance terms you don’t know</p>
                        <SecondaryButton text="Glossary →" />

                    </div>

                </div>

                <div className='home-box-3'>

                    <img src='/imgs/lightbulb.png' alt=""></img>

                    <div className='home-box-3-content'>

                        <h2>Test Your Learning</h2>
                        <p>Read and search through our glossary to learn about health insurance terms you don’t know </p>
                        <SecondaryButton text="Take Quiz →" />

                    </div>

                </div>

            </div> 

        </div>

    </div>

  )
}

export default Home