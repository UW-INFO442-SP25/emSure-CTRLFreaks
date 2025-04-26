import React from 'react';

export const TertiaryButton = ({ text, onClick }) => 
{
    return (

        <button className='tertiary-btn' onClick={ onClick }>

            <h3>{ text }</h3>

        </button>

    )
}

export const TertiaryDarkButton = ({ text, onClick }) => 
{
    return (

        <button className='tertiary-dark-btn' onClick={ onClick }>

           { text }

        </button>

    )
}

export const SecondaryButton = ({ text, onClick }) => 
{
    return (

        <button className='secondary-btn' onClick={ onClick }>

            <h3>{ text }</h3>

        </button>

    )
}


export const SecondaryDarkButton = ({ text, onClick }) => 
{
    return (

        <button className='secondary-dark-btn' onClick={ onClick }>

            <h3>{ text }</h3>

        </button>

    )
}

export const PrimaryButton = ({ text, onClick }) => 
    {
        return (
    
            <button className='primary-btn' onClick={ onClick }>
    
                <h3>{ text }</h3>
    
            </button>
    
        )
    }
    
export const PrimaryDarkButton = ({ text, onClick }) => 
{
    return (

        <button className='primary-dark-btn' onClick={ onClick }>

            <h3>{ text }</h3>

        </button>

    )
}

export const PrimaryLightButton = ({ text, onClick }) => 
{
    return (

        <button className='primary-light-btn' onClick={ onClick }>

            <h3>{ text }</h3>

        </button>

    )
}