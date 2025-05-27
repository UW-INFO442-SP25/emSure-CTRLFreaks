import React, { useState } from 'react';

const GlossaryCard = ( {term, definition} ) => 
{
    const [ isFlipped, setIsFlipped ] = useState(false);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    }

    return (

        <div className='glossary-card'>

            <div className='glossary-card-content'>

                <div className={`card-front ${isFlipped ? 'flipped' : ''}`}>
                
                    <h3>{ term }</h3>

                </div>

                <div className={`card-back ${isFlipped ? 'flipped' : ''}`}>

                    <p>{ definition }</p>

                </div>

                <button className='flip-card' onClick={handleFlip}>Flip!</button>

            </div>

        </div>

    );
};

export default GlossaryCard;