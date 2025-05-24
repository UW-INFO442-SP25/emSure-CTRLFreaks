import React from 'react';

const GlossaryCard = ( {term, definition} ) => 
{
    return (

        <div className='glossary-card'>
            
           <h3>{ term }</h3>

           <p>{ definition }</p>

        </div>

    );
};

export default GlossaryCard;