import React, { useState } from 'react';

const GlossaryCard = ({term, definition, synonym}) => 
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

                    <p className='synonym'>
                        <span className='synonym-bold'>Synonym(s): </span> 
                         { synonym }
                    </p>

                </div>

                <button className='flip-card' onClick={handleFlip}>Flip!</button>

            </div>

        </div>

    );
};

export default GlossaryCard;