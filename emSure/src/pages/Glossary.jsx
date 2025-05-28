import React, { useState, useEffect, use } from 'react';
import SearchBar from '../components/SearchBar';
import GlossaryCard from '../components/GlossaryCard';

const Glossary = () => 
{
    const [ query, setQuery ] = useState('');
    const [ activeQuery, setActiveQuery ] = useState('');
    const [ data, setData ] = useState([]);

    const suggestions = data;
    const [ showSuggestions, setShowSuggestions ] = useState(false);
    const [ filteredSuggestions, setFilteredSuggestions ] = useState([]);

    useEffect(() => {
        fetch('/data/glossaryTerms.json')
            .then((response) => response.json())
            .then((jsonResponses) => setData(jsonResponses))
            .catch((error) => console.error('Error fetching glossary data:', error));
    }, []);

    const filteredData = activeQuery 
        ? data.filter(item =>
            item.term.toLowerCase().includes(activeQuery.toLowerCase()) 
            // || item.definition.toLowerCase().includes(activeQuery.toLowerCase()) //filtering by def makes it confusing and results become irrelevant
        )
        : data;  

    const handleChange = (e) => {
        const newQuery = e.target.value;
        setQuery(newQuery);
        const filtered = suggestions.filter( (item) =>
            item.term.toLowerCase().startsWith(newQuery.toLowerCase())
        );

        setFilteredSuggestions(filtered);
        setShowSuggestions(query.length > 0 && filtered.length > 0);

        if (newQuery.length === 0) {
            setFilteredSuggestions([]);
            setShowSuggestions(false);
        }
    }

    const handleSuggestionClick = (suggestion) => {
        setQuery(suggestion.term);
        setFilteredSuggestions([]);
        setActiveQuery(suggestion.term);
        setShowSuggestions(false);
    }
    
    return (

        <div className='bg-container glossary'>

            <div className='content-container glossary'>

                <h1>Learn about the frequently used terms in health insurance</h1>

                <div className="search-wrapper">

                    <SearchBar 
                        query={ query } 
                        setQuery={ setQuery }  
                        onEnter={ () => setActiveQuery(query) } 
                        onChange= { handleChange }
                    />

                    { showSuggestions && (
                        <ul className="suggestion-list">
                            { filteredSuggestions.map((suggestion, index) => (
                                <li 
                                    key={ index } 
                                    className="suggestion-item" 
                                    onClick={ () => handleSuggestionClick(suggestion) }
                                >
                                    { suggestion.term }
                                </li>
                            ))}
                        </ul>
                    )}

                </div>

                <div className="results-container">
                
                    { filteredData.length > 0 
                        ? (filteredData.map((item, index) => 
                            (
                                <GlossaryCard 
                                    key={ index } 
                                    term={ item.term } 
                                    definition={ item.definition } 
                                /> 
                            ))
                        ) : ( <p>No results found.</p> )
                    }

                </div>

            </div>

        </div>

    );
};

export default Glossary;