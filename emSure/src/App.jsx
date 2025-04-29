import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QuizLanding from './pages/QuizLanding';
import QuizOnboarding from './pages/QuizOnboarding';
import Navbar from './components/navBar';

const App = () => 
{
    return (

        <Router>

            <Navbar />
            
            <Routes>

                <Route path="/quiz-onboarding" element={ <QuizOnboarding /> } />
                <Route path="/quiz-landing" element={ <QuizLanding /> } />

            </Routes>

        </Router>
    );
}

export default App;