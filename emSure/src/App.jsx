import { React, useEffect, useState } from 'react';
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
import { getDatabase, ref, set as fbSet, push as fbPush, update as fbUpdate} from 'firebase/database';
import { getAuth, onAuthStateChanged } from 'firebase/auth';


const App = () => {
    const [currentUser, setcurrentUser] = useState(null);
    const database = getDatabase();

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (firebaseUserObj) =>{
            if (firebaseUserObj) {
                const userData = {
                    userid: firebaseUserObj.uid || '',
                    username: firebaseUserObj.displayName || '',
                };

                setcurrentUser(userData);
                // User is signed in

                const uid = firebaseUserObj.uid; // Get the unique user ID

                const userDataRef = ref(database, 'userData/' + uid);
                fbUpdate(userDataRef, userData)
                    .then(() => {
                        console.log('User data has been added to the database.');
                    })
                    .catch((error) => {
                        console.error('Error writing user data:', error);
                    });
            } else {
                // No user is signed in
                setcurrentUser(null);
                console.log('No user is currently signed in.');
            }

        });
    }, [])


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