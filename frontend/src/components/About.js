import React from 'react';
import { useNavigate } from 'react-router-dom';
import profileImage from '../assets/profile.jpg';
import advisorImage from '../assets/ผศ.ดร.ชัยพร.jpg';
import citeLogo from '../assets/logo-cite-edit.jpg';

const About = () => {
    const navigate = useNavigate();

    const handleBackToHome = () => {
        navigate('/');
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>About This Project</h1>
            
            <div style={styles.contentContainer}>
                <img src={advisorImage} alt="Panya Leenavarat" style={styles.image} />
                <p style={styles.text}>
                    This project is part of the Web Engineering course under the guidance and supervision of 
                    <strong> Assistant Professor Dr. Chaiporn Kemapathapat</strong>. It is created by 
                    <strong> Mr. Panya Leenavarat</strong>, a Master's student at the 
                    <strong> College of Engineering and Technology, Dhurakij Pundit University</strong>.
                </p>
                
                <img src={profileImage} alt="Assistant Professor Dr. Chaiporn Kemapathapat" style={styles.image} />
                <img src={citeLogo} alt="CITE Logo" style={styles.logo} />
                
                <p style={styles.thankYouText}>Thank you for viewing!</p>
            </div>

            <button onClick={handleBackToHome} style={styles.backButton}>Back to Home</button>
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
        fontFamily: 'Arial, sans-serif',
    },
    title: {
        fontSize: '36px',
        fontWeight: 'bold',
        color: '#3B4CCA',
        marginBottom: '20px',
    },
    contentContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '600px',
        textAlign: 'center',
    },
    image: {
        width: '150px',
        height: '150px',
        borderRadius: '50%',
        marginBottom: '20px',
        objectFit: 'cover',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    },
    logo: {
        width: '200px',
        height: 'auto',
        margin: '20px 0',
    },
    text: {
        fontSize: '18px',
        color: '#333',
        lineHeight: '1.6',
        marginBottom: '20px',
    },
    thankYouText: {
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#555',
        marginTop: '20px',
    },
    backButton: {
        padding: '10px 20px',
        backgroundColor: '#4CAF50',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '16px',
        marginTop: '20px',
        transition: 'background-color 0.3s',
    },
};

export default About;
