import React from 'react';

const SearchBar = ( { query, setQuery, onEnter, onChange } ) => 
{
    const handleKeyDown = (e) => 
    {
        if (e.key === 'Enter') 
        {
            onEnter();
        }
    }

    return (

        <div className='search-bar'>
            
            <span className="material-symbols-outlined search-icon">
                search
            </span>

            <input 
            
                type="text" 
                placeholder="Search for terms..." 
                value={ query }
                className='search-bar-input' 
                onChange={ onChange }
                onKeyDown= { handleKeyDown }
                
            />

        </div>

    );
};

export default SearchBar;