// PokemonCardGame.js
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const MAX_SELECTIONS = 5;
const MAX_RELEASES = 3;
const REFRESH_INTERVAL = 1000; // รีเฟรชทุก 5 วินาที
const NUM_CARDS = 20;

const PokemonCardGame = ({ username }) => {
    const [pokemonCards, setPokemonCards] = useState(Array(NUM_CARDS).fill({}));
    const [selectedCards, setSelectedCards] = useState([]);
    const [releaseCount, setReleaseCount] = useState(0);
    const navigate = useNavigate();

    const fetchPokemonCards = async () => {
        const promises = Array.from({ length: NUM_CARDS }).map(() =>
            fetch(`https://pokeapi.co/api/v2/pokemon/${Math.floor(Math.random() * 150) + 1}`)
                .then((res) => res.json())
                .then((data) => ({
                    id: data.id,
                    name: data.name,
                    image: data.sprites.front_default,
                    score: Math.floor(Math.random() * 201) - 100,
                }))
        );
        const results = await Promise.all(promises);
        setPokemonCards(results);
    };

    useEffect(() => {
        fetchPokemonCards();
        const interval = setInterval(fetchPokemonCards, REFRESH_INTERVAL);
        return () => clearInterval(interval);
    }, []);

    const selectCard = (card) => {
        if (selectedCards.length < MAX_SELECTIONS && !selectedCards.some((selected) => selected.id === card.id)) {
            setSelectedCards([...selectedCards, card]);
        }
    };

    const releaseCard = (card) => {
        if (releaseCount < MAX_RELEASES) {
            setSelectedCards(selectedCards.filter((selected) => selected.id !== card.id));
            setReleaseCount(releaseCount + 1);
        } else {
            alert("You have reached the maximum number of releases.");
        }
    };

    const saveScore = useCallback(async () => {
        const totalScore = selectedCards.reduce((total, card) => total + card.score, 0);
        try {
            await fetch("http://localhost:5000/save-score", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, score: totalScore }), // ส่งทั้ง username และ score
            });
            alert("Score saved successfully!");
        } catch (error) {
            console.error("Error saving score:", error);
        }
    }, [selectedCards, username]);

    const saveScoreAndRedirect = useCallback(async () => {
        await saveScore();
        navigate('/leaderboard');
    }, [saveScore, navigate]);

    useEffect(() => {
        if (selectedCards.length === MAX_SELECTIONS && releaseCount >= MAX_RELEASES) {
            saveScoreAndRedirect();
        }
    }, [selectedCards, releaseCount, saveScoreAndRedirect]);

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Pokémon Card Game</h1>
            <h2 style={styles.score}>Total Score: {selectedCards.reduce((total, card) => total + card.score, 0)}</h2>

            <div style={styles.cardContainer}>
                {pokemonCards.map((card, index) => (
                    <div key={index} style={styles.card} onClick={() => selectCard(card)}>
                        <img src={card.image} alt={card.name} style={styles.cardImage} />
                        <p style={styles.cardName}>{card.name?.toUpperCase()}</p>
                        <p style={styles.cardScore}>Score: {card.score}</p>
                    </div>
                ))}
            </div>

            <div style={styles.selectedCardsContainer}>
                <h2 style={styles.selectedTitle}>Selected Pokémon</h2>
                {selectedCards.map((card) => (
                    <div key={card.id} style={styles.selectedCard}>
                        <img src={card.image} alt={card.name} style={styles.cardImage} />
                        <p style={styles.cardName}>{card.name.toUpperCase()}</p>
                        <p style={styles.cardScore}>Score: {card.score}</p>
                        <button onClick={() => releaseCard(card)} style={styles.releaseButton}>Release</button>
                    </div>
                ))}
            </div>

            <button onClick={saveScoreAndRedirect} style={styles.sendScoreButton}>Send My Score</button>
        </div>
    );
};

// Styles
const styles = {
    container: {
        textAlign: 'center',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#87CEEB',
        backgroundImage: 'radial-gradient(circle, #FFFFFF 1px, transparent 1px)',
        backgroundSize: '20px 20px',
        color: '#333',
        minHeight: '100vh',
    },
    title: {
        fontSize: '36px',
        fontWeight: 'bold',
        color: '#3B4CCA',
        marginBottom: '10px',
    },
    score: {
        fontSize: '24px',
        color: '#333',
        marginBottom: '20px',
    },
    cardContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '20px',
        marginTop: '20px',
    },
    card: {
        textAlign: 'center',
        cursor: 'pointer',
        padding: '15px',
        borderRadius: '10px',
        backgroundColor: '#ffffff',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
        transition: 'transform 0.2s, background-color 0.3s',
        minHeight: '180px',
    },
    cardImage: {
        width: '80px',
        height: '80px',
    },
    cardName: {
        fontWeight: 'bold',
        color: '#3B4CCA',
        margin: '10px 0 5px',
        fontSize: '16px',
    },
    cardScore: {
        color: '#333',
        fontSize: '14px',
    },
    selectedCardsContainer: {
        marginTop: '30px',
        padding: '10px',
        backgroundColor: '#f0f8ff',
        borderRadius: '10px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    },
    selectedTitle: {
        fontSize: '24px',
        color: '#3B4CCA',
        marginBottom: '10px',
    },
    selectedCard: {
        display: 'inline-block',
        margin: '10px',
        textAlign: 'center',
        backgroundColor: '#ffffff',
        borderRadius: '10px',
        padding: '10px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
    },
    releaseButton: {
        marginTop: '5px',
        padding: '5px 15px',
        backgroundColor: '#FF4500',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
    },
    sendScoreButton: {
        marginTop: '20px',
        padding: '10px 20px',
        fontSize: '18px',
        backgroundColor: '#4B9CD3',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
    },
};

export default PokemonCardGame;
