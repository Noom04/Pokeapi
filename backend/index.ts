import express from "express";
import cors from "cors";
import { Database } from "bun:sqlite"; 
import path from "path";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const dbPath = path.resolve('./database', 'users.db');
const db = new Database(dbPath);

// สร้างตาราง users ถ้ายังไม่มีอยู่
db.run(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT
    )
`);

// API สำหรับสมัครสมาชิก
app.post("/signup", (req, res) => {
    const { username, password } = req.body;
    console.log("Attempting to register user:", username);

    try {
        db.run(`INSERT INTO users (username, password) VALUES ('${username}', '${password}')`);
        console.log("User registered:", username);
        res.status(200).json({ message: "User registered successfully." });
    } catch (err) {
        console.error("Error inserting user:", err);
        res.status(500).json({ message: "User registration failed." });
    }
});

// API สำหรับเข้าสู่ระบบ
app.post("/login", (req, res) => {
    const { username, password } = req.body;
    console.log("Received login request for user:", username);

    try {
        const row = db.query(`SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`).get();
        if (row) {
            console.log("Login successful for user:", username);
            res.status(200).json({ message: "Login successful" });
        } else {
            console.log("Invalid username or password for user:", username);
            res.status(401).json({ message: "Invalid username or password" });
        }
    } catch (err) {
        console.error("Error querying database:", err);
        res.status(500).json({ message: "Database error." });
    }
});

// สร้างตาราง leaderboard ถ้ายังไม่มีอยู่
db.run(`
    CREATE TABLE IF NOT EXISTS leaderboard (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT,
        score INTEGER,
        date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
`);

// บันทึกคะแนนของผู้เล่นใน leaderboard
app.post("/save-score", (req, res) => {
    const { username, score } = req.body;
    try {
        db.run(`INSERT INTO leaderboard (username, score) VALUES ('${username}', ${score})`);
        res.status(200).json({ message: "Score saved successfully." });
    } catch (err) {
        console.error("Error saving score:", err);
        res.status(500).json({ message: "Failed to save score." });
    }
});

// ดึงข้อมูลคะแนนสูงสุดจาก leaderboard
app.get("/leaderboard", (req, res) => {
    try {
        const rows = db.query("SELECT username, score FROM leaderboard ORDER BY score DESC LIMIT 10").all();
        res.status(200).json(rows);
    } catch (err) {
        console.error("Error fetching leaderboard:", err);
        res.status(500).json({ message: "Failed to fetch leaderboard." });
    }
});

// เริ่มเซิร์ฟเวอร์
app.listen(PORT, () => {
    console.log(`Express server is running on http://localhost:${PORT}`);
});
