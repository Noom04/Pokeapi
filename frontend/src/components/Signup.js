// Signup.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [pokemon, setPokemon] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // ดึงข้อมูลโปเกม่อนแบบสุ่มเมื่อหน้าโหลดขึ้นมา
        const fetchRandomPokemon = async () => {
            const randomId = Math.floor(Math.random() * 150) + 1; // ดึงโปเกม่อนจาก ID 1 ถึง 150
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
            const data = await response.json();
            setPokemon(data);
        };

        fetchRandomPokemon();
    }, []);

    const handleSignUp = async () => {
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                alert('User registered successfully!');
                navigate('/'); // กลับไปที่หน้า Login หลังสมัครสมาชิกสำเร็จ
            } else {
                alert('Registration failed. Try a different username.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred during registration.');
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Create Your PokéWorld Account</h1>
            {pokemon && (
                <div style={styles.pokemonContainer}>
                    <div style={styles.pokemonCircle}>
                        <img src={pokemon.sprites.front_default} alt={pokemon.name} style={styles.pokemonImage} />
                    </div>
                    <p style={styles.pokemonName}>{pokemon.name.toUpperCase()}</p>
                </div>
            )}
            <div style={styles.form}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={styles.input}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={styles.input}
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    style={styles.input}
                />
                <button onClick={handleSignUp} style={styles.button}>Sign Up</button>
            </div>
            <p style={styles.footer}>
                Already have an account? <Link to="/" style={styles.link}>Log In</Link>
            </p>
        </div>
    );
};

// Styles
const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#87CEEB', // พื้นหลังสีฟ้าสดใสคล้าย Splash Screen
        backgroundImage: 'radial-gradient(circle, #FFFFFF 1px, transparent 1px)', // จุดขาวคล้ายท้องฟ้า
        backgroundSize: '20px 20px',
        textAlign: 'center',
    },
    title: {
        fontSize: '32px',
        fontWeight: 'bold',
        color: '#FFCB05', // สีเหลืองธีมโปเกม่อน
        textShadow: '3px 3px 8px rgba(0, 0, 0, 0.3)',
        marginBottom: '20px',
        fontFamily: 'Arial, sans-serif',
        letterSpacing: '2px',
    },
    pokemonContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '20px',
    },
    pokemonCircle: {
        width: '120px',
        height: '120px',
        borderRadius: '50%',
        backgroundColor: '#FFF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', // เงาให้วงกลมดูมีมิติ
    },
    pokemonImage: {
        width: '100px',
        height: '100px',
    },
    pokemonName: {
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#FF4500', // สีส้มสดใสเพื่อเน้นชื่อโปเกม่อน
        marginTop: '10px',
        textShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '300px',
        backgroundColor: '#FFFFFF',
        padding: '30px',
        borderRadius: '15px',
        boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.3)',
    },
    input: {
        width: '100%',
        padding: '12px',
        margin: '10px 0',
        borderRadius: '8px',
        border: '1px solid #ddd',
        fontSize: '16px',
        boxShadow: 'inset 0px 2px 4px rgba(0, 0, 0, 0.1)', // เงาด้านในให้กล่องดูมีมิติ
    },
    button: {
        width: '100%',
        padding: '12px',
        backgroundColor: '#FFCC00', // สีเหลืองธีมโปเกม่อน
        color: '#333',
        fontWeight: 'bold',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        marginTop: '20px',
        fontSize: '16px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', // เงาให้ปุ่มดูโดดเด่น
        transition: 'background-color 0.3s',
    },
    footer: {
        marginTop: '20px',
        color: '#333',
    },
    link: {
        color: '#3B4CCA', // สีฟ้าเข้มเข้ากับธีมโปเกม่อน
        textDecoration: 'none',
        fontWeight: 'bold',
    },
};

export default Signup;
