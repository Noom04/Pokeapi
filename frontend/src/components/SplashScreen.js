import React, { useState, useEffect } from 'react';

const SplashScreen = ({ onFinish }) => {
    const [pokemon, setPokemon] = useState(null);
    const [animationClass, setAnimationClass] = useState("run-in");

    useEffect(() => {
        // ฟังก์ชันดึงข้อมูลโปเกม่อนแบบสุ่ม
        const fetchRandomPokemon = async () => {
            const randomId = Math.floor(Math.random() * 150) + 1;
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
            const data = await response.json();
            setPokemon(data);
        };

        fetchRandomPokemon();

        // ตั้งเวลาให้เปลี่ยนโปเกม่อนใหม่ทุก 3 วินาที
        const interval = setInterval(() => {
            setAnimationClass("run-out"); // เปลี่ยนเป็นคลาสวิ่งออก

            setTimeout(() => {
                fetchRandomPokemon();
                setAnimationClass("run-in"); // เปลี่ยนเป็นคลาสวิ่งเข้าใหม่
            }, 1000);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div style={styles.container}>
            <h1 style={styles.subtitle}>Welcome to the World of Pokémon!</h1>
            {pokemon ? (
                <div className={animationClass} style={styles.content}>
                    <img src={pokemon.sprites.front_default} alt={pokemon.name} style={styles.image} />
                    <h2 style={styles.title}>Catch '{pokemon.name.toUpperCase()}'!</h2>
                </div>
            ) : (
                <p>Loading...</p>
            )}
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
        backgroundColor: '#87CEEB', // สีฟ้าสดใสคล้ายท้องฟ้า
        backgroundImage: 'radial-gradient(circle, #FFFFFF 1px, transparent 1px)', // จุดขาวคล้ายท้องฟ้า
        backgroundSize: '20px 20px',
        textAlign: 'center',
        overflow: 'hidden', // ป้องกันโปเกม่อนหลุดออกนอกหน้าจอ
    },
    content: {
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    image: {
        width: '150px',
        height: '150px',
        animation: 'runAnimation 1s linear forwards', // เพิ่มแอนิเมชันใน CSS
    },
    title: {
        fontSize: '28px',
        fontWeight: 'bold',
        color: '#FF4500', // สีส้มสดใสเพื่อเน้นชื่อโปเกม่อน
        marginTop: '10px',
        textShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)', // เงาเล็กน้อย
    },
    subtitle: {
        fontSize: '40px', // ขนาดใหญ่ขึ้น
        fontWeight: 'bold',
        color: '#FFCB05', // สีเหลืองที่ใช้ในโลโก้โปเกม่อน
        textShadow: '4px 4px 10px rgba(0, 0, 0, 0.5)', // เพิ่มเงาให้ดูเด่นชัด
        marginBottom: '30px',
        marginTop: '20px',
        fontFamily: 'Arial, sans-serif', // ใช้ฟอนต์ที่ดูสะอาดและคมชัด
        letterSpacing: '2px', // เพิ่มระยะห่างระหว่างตัวอักษรให้ดูสวยงาม
    }
};

// CSS animations
const css = `
    .run-in {
        animation: runIn 1s forwards;
    }
    .run-out {
        animation: runOut 1s forwards;
    }
    @keyframes runIn {
        from {
            transform: translateX(-100%);
        }
        to {
            transform: translateX(0);
        }
    }
    @keyframes runOut {
        from {
            transform: translateX(0);
        }
        to {
            transform: translateX(100%);
        }
    }
`;
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = css;
document.head.appendChild(styleSheet);

export default SplashScreen;
