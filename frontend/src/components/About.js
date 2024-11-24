import React from 'react';
import { useNavigate } from 'react-router-dom';
import profileImage from '../assets/profile.jpg';
import advisorImage from '../assets/ผศ.ดร.ชัยพร.jpg';
import citeLogo from '../assets/logo-cite-edit.jpg';
import arc from '../assets/arc.png';

const About = () => {
    const navigate = useNavigate();

    const handleBackToHome = () => {
        navigate('/');
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>เกี่ยวกับโปรเจกต์นี้</h1>
            
            <div style={styles.contentContainer}>
                <img src={advisorImage} alt="ผศ.ดร.ชัยพร เขมะภาตะพันธ์" style={styles.image} />
                <p style={styles.text}>
                    โปรเจกต์นี้เป็นส่วนหนึ่งของวิชา Web Engineering ภายใต้การควบคุมและให้คำปรึกษาโดย 
                    <strong> ผศ.ดร.ชัยพร เขมะภาตะพันธ์</strong> จัดทำโดย 
                    <strong> นายปัญญา หลีนวรัตน์</strong> นักศึกษาปริญญาโท คณะวิศวกรรมคอมพิวเตอร์ 
                    มหาวิทยาลัยธุรกิจบัณฑิตย์
                </p>
                
                <img src={profileImage} alt="นายปัญญา หลีนวรัตน์" style={styles.image} />
                <img src={citeLogo} alt="โลโก้ CITE" style={styles.logo} />
            </div>

            {/* เพิ่มเนื้อหาจาก README.md */}
            <div style={styles.additionalContent}>
                <h2 style={styles.subtitle}>ภาพรวมของโปรเจกต์</h2>
                <img src={arc} alt="การทำงานของระบบ " style={styles.logo} />
                <p style={styles.text}>
                    โปรเจกต์นี้เป็นเกมการ์ดโปเกม่อนที่ใช้ <strong>PokeAPI</strong> ผู้เล่นสามารถโต้ตอบกับเกม 
                    เช่น เลือกการ์ดโปเกม่อนที่สุ่มขึ้นมา ระบบยังมีการบันทึกคะแนนในฐานข้อมูล SQLite 
                    และจัดอันดับคะแนนผู้เล่นผ่าน Leaderboard
                </p>

                <h2 style={styles.subtitle}>คุณสมบัติหลัก</h2>
                <ul style={styles.list}>
                    <li>ระบบสมัครสมาชิกและเข้าสู่ระบบ: ใช้ Express และ SQLite เพื่อจัดการข้อมูลผู้ใช้</li>
                    <li>ระบบจัดอันดับคะแนน (Leaderboard): แสดงคะแนนสูงสุดของผู้เล่น</li>
                    <li>เกมการ์ดโปเกม่อน: การ์ดแต่ละใบจะมีคะแนนสุ่มตั้งแต่ -100 ถึง 100</li>
                    <li>รองรับ Docker: สามารถดีพลอยด้วย Docker Compose</li>
                </ul>

                <h2 style={styles.subtitle}>โครงสร้างโปรเจกต์</h2>
                <pre style={styles.codeBlock}>
{`project-root
├── backend
│   ├── index.ts          # โค้ดเซิร์ฟเวอร์หลัก
│   ├── package.json      # ข้อมูลแพ็กเกจ Node.js สำหรับ backend
│   └── tsconfig.json     # การตั้งค่า TypeScript
├── frontend
│   ├── src
│   │   ├── App.js        # โค้ดหลักของ React frontend
│   │   └── components    # คอมโพเนนต์ต่าง ๆ
│   └── package.json      # ข้อมูลแพ็กเกจ Node.js สำหรับ frontend
└── docker-compose.yml    # การตั้งค่า Docker Compose`}
                </pre>

                <h2 style={styles.subtitle}>วิธีการใช้งาน</h2>
                <h3 style={styles.sectionTitle}>การใช้งานผ่าน Docker</h3>
                <p style={styles.text}>
                    ติดตั้ง Docker และ Docker Compose จากนั้นรันคำสั่ง:
                </p>
                <pre style={styles.codeBlock}>
{`docker-compose up --build`}
                </pre>
                <p style={styles.text}>
                    คำสั่งนี้จะ build และรันบริการ backend และ frontend ตามที่กำหนดไว้ในไฟล์ docker-compose.yml
                </p>

                <h3 style={styles.sectionTitle}>การใช้งานโดยไม่ใช้ Docker</h3>
                <ol style={styles.list}>
                    <li>
                        ไปที่โฟลเดอร์ <code>backend</code> และติดตั้ง dependencies:
                        <pre style={styles.codeBlock}>
{`cd backend
npm install
npm start`}
                        </pre>
                    </li>
                    <li>
                        ไปที่โฟลเดอร์ <code>frontend</code> และติดตั้ง dependencies:
                        <pre style={styles.codeBlock}>
{`cd ../frontend
npm install
npm start`}
                        </pre>
                    </li>
                </ol>
            </div>

            <p style={styles.thankYouText}>ขอบคุณที่รับชมโปรเจกต์นี้!</p>

            <button onClick={handleBackToHome} style={styles.backButton}>กลับไปที่หน้าหลัก</button>
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
    subtitle: {
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#3B4CCA',
        marginTop: '20px',
        marginBottom: '10px',
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
    additionalContent: {
        maxWidth: '800px',
        textAlign: 'left',
        marginTop: '20px',
    },
    text: {
        fontSize: '18px',
        color: '#333',
        lineHeight: '1.6',
        marginBottom: '20px',
    },
    list: {
        paddingLeft: '20px',
        marginBottom: '20px',
    },
    codeBlock: {
        backgroundColor: '#f4f4f4',
        padding: '10px',
        borderRadius: '5px',
        fontFamily: 'monospace',
        marginBottom: '20px',
        overflowX: 'auto',
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
