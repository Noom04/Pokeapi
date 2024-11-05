// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SplashScreen from './components/SplashScreen';
import Login from './components/Login';
import Signup from './components/Signup';
import PokemonCardGame from './components/PokemonCatchGame';
import Leaderboard from './components/Leaderboard';

const App = () => {
    const [showSplash, setShowSplash] = useState(true);
    const [loggedInUsername, setLoggedInUsername] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowSplash(false); // ซ่อน Splash Screen หลังจากเวลาผ่านไป
        }, 3000); // ตั้งเวลาให้ Splash Screen แสดงผล 3 วินาที

        return () => clearTimeout(timer);
    }, []);

    // ฟังก์ชันเพื่ออัปเดตชื่อผู้ใช้หลังจากล็อกอินสำเร็จ
    const handleLogin = (username) => {
        setLoggedInUsername(username);
    };

    return (
        <Router>
            {showSplash ? (
                <SplashScreen />
            ) : (
                <Routes>
                    <Route path="/" element={<Login onLogin={handleLogin} />} />
                    <Route path="/catch-game" element={<PokemonCardGame username={loggedInUsername} />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/leaderboard" element={<Leaderboard />} />
                </Routes>
            )}
        </Router>
    );
};

export default App;
