import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QuizLanding from './pages/QuizLanding';
import QuizOnboarding from './pages/QuizOnboarding';
import Home from './pages/Home';
import Navbar from './components/navBar';
import QuizPage from './pages/QuizPage/QuizPage.jsx';
import Glossary from './pages/Glossary';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AboutPage from './pages/AboutPage';
import ProfilePage from'./pages/ProfilePage';

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
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/about" element={<AboutPage />} />

            </Routes>

        </Router>
    );
}

export default App;