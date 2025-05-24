import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QuizLanding from './pages/QuizLanding';
import QuizOnboarding from './pages/QuizOnboarding';
import Home from './pages/Home';
import Navbar from './components/navBar';
import QuizPage from './pages/QuizPage';
import Glossary from './pages/Glossary';

const App = () =>
{
    return (

        <Router>

            <Navbar />

            <Routes>

                <Route path="/" element={ <Home /> } />
                <Route path="/quiz-onboarding" element={ <QuizOnboarding /> } />
                <Route path="/quiz-landing" element={ <QuizLanding /> } />
                <Route path="/quiz" element={ <QuizPage /> } />
                <Route path="/glossary" element={ <Glossary /> } />

            </Routes>

        </Router>
    );
}

export default App;