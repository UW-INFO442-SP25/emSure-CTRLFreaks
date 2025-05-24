import React from 'react';

const SearchBar = ( { query, setQuery, onEnter } ) => 
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
            
            <span class="material-symbols-outlined search-icon">
                search
            </span>

            <input 
            
                type="text" 
                placeholder="Search for terms..." 
                value={ query }
                className='search-bar-input' 
                onChange={ (e) => setQuery(e.target.value) }
                onKeyDown= { handleKeyDown }
                
            />

        </div>

    );
};

export default SearchBar;