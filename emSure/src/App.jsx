import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QuizLanding from './pages/QuizLanding';
import QuizOnboarding from './pages/QuizOnboarding';
import Home from './pages/Home';

const App = () => 
{
    return (

        <Router>
    
            <Routes>

                <Route path="/" element={ <Home /> } />
                <Route path="/quiz-onboarding" element={ <QuizOnboarding /> } />
                <Route path="/quiz-landing" element={ <QuizLanding /> } />

            </Routes>

        </Router>
    );
}

export default App;