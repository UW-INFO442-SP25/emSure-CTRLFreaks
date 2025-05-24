import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import GlossaryCard from '../components/GlossaryCard';

const Glossary = () => 
{
    const [ query, setQuery ] = useState('');
    const [ activeQuery, setActiveQuery ] = useState('');

    const data = [
        { term: 'Premium', definition: 'The amount paid for an insurance policy.' },
        { term: 'Deductible', definition: 'The amount you pay out of pocket before insurance covers expenses.' },
        { term: 'Claim', definition: 'A request for payment based on the terms of an insurance policy.' },
        { term: 'Underwriting', definition: 'The process of evaluating risk and issuing insurance policies.' },
        { term: 'Coverage', definition: 'The amount of protection given by an insurance policy.' },
        { term: 'Beneficiary', definition: 'The person who receives the benefit from an insurance policy.' },
        { term: 'Policyholder', definition: 'The individual who owns the insurance policy.' },
        { term: 'Exclusion', definition: 'A condition or situation not covered by the policy.' },
        { term: 'Copayment', definition: 'A fixed amount paid for a covered service, usually at the time of service.' },
        { term: 'Coinsurance', definition: 'The percentage of costs you pay after meeting your deductible.' },
        { term: 'Network', definition: 'A group of healthcare providers contracted with an insurance company.' },
        { term: 'Out-of-pocket maximum', definition: 'The maximum amount you will pay for covered services in a policy period.' },
        { term: 'Pre-existing condition', definition: 'A health issue that existed before the start of an insurance policy.' },
        { term: 'Lifetime limit', definition: 'The maximum amount an insurer will pay for a covered individual over their lifetime.' },
        { term: 'Waiting period', definition: 'The time you must wait before certain benefits become available under a policy.' }
    ];

    const filteredData = activeQuery 
        ? data.filter(item =>
            item.term.toLowerCase().includes(activeQuery.toLowerCase()) ||
            item.definition.toLowerCase().includes(activeQuery.toLowerCase())
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