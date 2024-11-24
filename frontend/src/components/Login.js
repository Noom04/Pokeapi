import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [pokemon, setPokemon] = useState(null);
    const navigate = useNavigate();

    // ดึงโปเกม่อนแบบสุ่มมาแสดงในหน้า Login
    useEffect(() => {
        const fetchRandomPokemon = async () => {
            const randomId = Math.floor(Math.random() * 150) + 1;
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
            const data = await response.json();
            setPokemon(data);
        };

        fetchRandomPokemon();
    }, []);

    // ฟังก์ชันสำหรับการตรวจสอบการเข้าสู่ระบบ
    const handleLogin = async () => {
        if (username && password) {
            try {
                const response = await fetch('http://localhost:5000/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password }),
                });

                // ตรวจสอบสถานะการตอบกลับจากเซิร์ฟเวอร์
                if (response.ok) {
                    onLogin(username); // เรียก onLogin เพื่อส่ง username กลับไปที่ App.js
                    navigate('/catch-game'); // ไปที่หน้า catch-game โดยตรงเมื่อเข้าสู่ระบบสำเร็จ
                } else {
                    const errorData = await response.json();
                    alert(errorData.message || 'Invalid username or password.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred. Please check your network connection and try again.');
            }
        } else {
            alert("Please enter both username and password.");
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Log In to PokéWorld</h1>
            {pokemon && (
                <div style={styles.pokemonContainer}>
                    <div style={styles.pokemonCircle}>
                        <img src={pokemon.sprites.front_default} alt={pokemon.name} style={styles.pokemonImage} />
                    </div>
                    <p style={styles.pokemonName}>{pokemon.name.toUpperCase()}</p>
                    {/* เพิ่มคำอธิบายเกี่ยวกับเกมจับโปเกม่อน */}
                    <div style={styles.descriptionContainer}>
                        <p style={styles.description}>
                            <strong>เกมจับโปเกม่อน:</strong> ผู้เล่นสามารถคลิกเลือกการ์ดโปเกม่อน โดยการ์ดแต่ละใบจะมีคะแนนสุ่มตั้งแต่ <strong>-100 ถึง 100</strong> 
                            โดยผู้เล่นสามารถเลือกการ์ดที่ถูกสุ่มขึ้นมาได้จำนวน <strong>5 ใบ</strong>
                        </p>
                        <p style={styles.description}>
                            หากไม่พอใจโปเกม่อนที่จับมาได้ ผู้เล่นสามารถปล่อยโปเกม่อนได้ <strong>3 ตัว</strong> 
                            โดยเมื่อผู้เล่นพอใจคะแนนของตัวเองแล้ว สามารถกดส่งคะแนนเพื่อนำไปจัดอันดับได้
                        </p>
                        <p style={styles.description}>
                            <strong>รหัสสำหรับทดสอบระบบ:</strong><br />
                            <strong>Username:</strong> 1<br />
                            <strong>Password:</strong> 1
                        </p>
                    </div>
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
                <button onClick={handleLogin} style={styles.button}>Log In</button>
            </div>
            <p style={styles.footer}>
                Don’t have an account? <Link to="/signup" style={styles.link}>Sign up</Link>
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
        backgroundColor: '#87CEEB',
        backgroundImage: 'radial-gradient(circle, #FFFFFF 1px, transparent 1px)',
        backgroundSize: '20px 20px',
        textAlign: 'center',
    },
    title: {
        fontSize: '36px',
        fontWeight: 'bold',
        color: '#FFCB05',
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
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
    },
    pokemonImage: {
        width: '100px',
        height: '100px',
    },
    pokemonName: {
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#FF4500',
        marginTop: '10px',
        textShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)',
    },
    descriptionContainer: {
        marginTop: '10px',
        textAlign: 'center',
    },
    description: {
        fontSize: '16px',
        color: '#333',
        marginBottom: '10px',
        lineHeight: '1.5',
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
        boxShadow: 'inset 0px 2px 4px rgba(0, 0, 0, 0.1)',
    },
    button: {
        width: '100%',
        padding: '12px',
        backgroundColor: '#FFCC00',
        color: '#333',
        fontWeight: 'bold',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        marginTop: '20px',
        fontSize: '16px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
        transition: 'background-color 0.3s',
    },
    footer: {
        marginTop: '20px',
        color: '#333',
    },
    link: {
        color: '#3B4CCA',
        textDecoration: 'none',
        fontWeight: 'bold',
    },
};

export default Login;
