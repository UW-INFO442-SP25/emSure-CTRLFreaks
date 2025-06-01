import { React, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import QuizLanding from './pages/QuizLanding';
import QuizOnboarding from './pages/QuizOnboarding';
import Home from './pages/Home';
import Navbar from './components/navBar';
import QuizPage from './pages/QuizPage/QuizPage.jsx';
import Learn from './pages/Learn.jsx';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AboutPage from './pages/AboutPage';
import ProfilePage from './pages/ProfilePage';
import Footer from './components/Footer';
import Scroll2Top from './components/scroll2top';
import { getDatabase, ref, update as fbUpdate } from 'firebase/database';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const AppContent = () => {
    const location = useLocation();
    const hideFooterRoutes = ['/quiz'];

    return (
        <>
            <Scroll2Top />
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/quiz-onboarding" element={<QuizOnboarding />} />
                <Route path="/quiz-landing" element={<QuizLanding />} />
                <Route path="/quiz" element={<QuizPage />} />
                <Route path="/learn" element={<Learn />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/about" element={<AboutPage />} />
            </Routes>
            {!hideFooterRoutes.includes(location.pathname) && <Footer />}
        </>
    );
};

const App = () => {
    const [currentUser, setcurrentUser] = useState(null);
    const database = getDatabase();

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (firebaseUserObj) => {
            if (firebaseUserObj) {
                const userData = {
                    userid: firebaseUserObj.uid || '',
                    username: firebaseUserObj.displayName || '',
                };

                setcurrentUser(userData);

                const uid = firebaseUserObj.uid;
                const userDataRef = ref(database, 'userData/' + uid);
                fbUpdate(userDataRef, userData)
                    .then(() => {
                        console.log('User data has been added to the database.');
                    })
                    .catch((error) => {
                        console.error('Error writing user data:', error);
                    });
            } else {
                setcurrentUser(null);
                console.log('No user is currently signed in.');
            }
        });
    }, []);

    return (
        <Router>
            <AppContent />
        </Router>
    );
};

export default App;
