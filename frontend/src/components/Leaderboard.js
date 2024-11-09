// Leaderboard.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Leaderboard = () => {
    const [leaderboard, setLeaderboard] = useState([]);
    const navigate = useNavigate();

    // ฟังก์ชันดึงโปเกม่อนแบบสุ่ม
    const getRandomPokemonImage = async () => {
        const randomId = Math.floor(Math.random() * 150) + 1;
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
        const data = await response.json();
        return data.sprites.front_default;
    };

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const response = await fetch("http://localhost:5000/leaderboard");
                const data = await response.json();

                // ดึงภาพโปเกม่อนแบบสุ่มให้กับแต่ละผู้ใช้
                const leaderboardWithPokemon = await Promise.all(
                    data.map(async (entry) => {
                        const pokemonImage = await getRandomPokemonImage();
                        return { ...entry, pokemonImage };
                    })
                );

                setLeaderboard(leaderboardWithPokemon);
            } catch (error) {
                console.error("Error fetching leaderboard:", error);
            }
        };

        fetchLeaderboard();
    }, []);

    const handleExitGame = () => {
        navigate('/'); // นำทางกลับไปที่หน้าแรก
    };

    const handlePlayAgain = () => {
        navigate('/catch-game'); // นำทางกลับไปที่หน้าเกม
    };

    const handleAboutAuthor = () => {
        navigate('/about'); // นำทางไปยังหน้า About
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Leaderboard</h1>
            <ul style={styles.list}>
                {leaderboard.map((entry, index) => (
                    <li key={index} style={styles.listItem}>
                        <span style={styles.rank}>{index + 1}.</span>
                        <img src={entry.pokemonImage} alt="pokemon" style={styles.pokemonIcon} />
                        <span style={styles.username}>{entry.username}</span>
                        <span style={styles.score}>Score: {entry.score}</span>
                    </li>
                ))}
            </ul>

            <div style={styles.buttonContainer}>
                <button onClick={handleExitGame} style={styles.exitButton}>Exit Game</button>
                <button onClick={handlePlayAgain} style={styles.playAgainButton}>Play Again</button>
                <button onClick={handleAboutAuthor} style={styles.aboutButton}>About the Author</button>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        backgroundColor: '#f0f8ff',
        minHeight: '100vh',
    },
    title: {
        fontSize: '36px',
        fontWeight: 'bold',
        color: '#3B4CCA',
        marginBottom: '20px',
    },
    list: {
        listStyleType: 'none',
        padding: 0,
        width: '100%',
        maxWidth: '500px',
    },
    listItem: {
        fontSize: '18px',
        padding: '10px',
        borderBottom: '1px solid #ccc',
        color: '#333',
        backgroundColor: '#ffffff',
        borderRadius: '5px',
        marginBottom: '10px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
    },
    rank: {
        fontWeight: 'bold',
        color: '#333',
        marginRight: '10px',
    },
    pokemonIcon: {
        width: '40px',
        height: '40px',
    },
    username: {
        fontWeight: 'bold',
        color: '#3B4CCA',
        flex: '1',
    },
    score: {
        color: '#555',
        fontSize: '16px',
        fontWeight: 'bold',
    },
    buttonContainer: {
        display: 'flex',
        gap: '20px',
        marginTop: '20px',
    },
    exitButton: {
        padding: '10px 20px',
        backgroundColor: '#FF4500',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontWeight: 'bold',
        transition: 'background-color 0.3s',
    },
    playAgainButton: {
        padding: '10px 20px',
        backgroundColor: '#4CAF50',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontWeight: 'bold',
        transition: 'background-color 0.3s',
    },
    aboutButton: {
        padding: '10px 20px',
        backgroundColor: '#3B4CCA',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontWeight: 'bold',
        transition: 'background-color 0.3s',
    },
};

export default Leaderboard;
