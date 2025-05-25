import React from 'react';

const GlossaryCard = ( {term, definition} ) => 
{
    return (

        <div className='glossary-card'>

            <div className='glossary-card-content'>
            
                <div className='card-front'>
                
                    <h3>{ term }</h3>

                </div>

                <div className='card-back'>

                    <p> { definition }</p>

                </div>

            </div>

        </div>

    );
};

export default GlossaryCard;