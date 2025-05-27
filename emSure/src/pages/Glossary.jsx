import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import GlossaryCard from '../components/GlossaryCard';

const Glossary = () => 
{
    const [ query, setQuery ] = useState('');
    const [ activeQuery, setActiveQuery ] = useState('');
    const [ data, setData ] = useState([]);

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

    return (

        <div className='bg-container glossary'>

            <div className='content-container glossary'>

                <h1>Learn about the frequently used terms in health insurance</h1>

                <SearchBar 
                    query={ query } 
                    setQuery={ setQuery }  
                    onEnter={ () => setActiveQuery(query) } />

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