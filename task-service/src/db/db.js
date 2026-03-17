const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

const pool = new Pool({
  // สำคัญ: บน Railway ต้องใช้ connectionString จาก DATABASE_URL
  connectionString: process.env.DATABASE_URL,
  // ค่าเหล่านี้จะใช้เมื่อรันในเครื่องตัวเอง (Local)
  host:     process.env.DB_HOST     || 'localhost',
  port:     process.env.DB_PORT     || 5432,
  database: process.env.DB_NAME     || 'task_db',
  user:     process.env.DB_USER     || 'task_user',
  password: process.env.DB_PASSWORD || 'task_secret',
});

async function initDB() {
  try {
    // ใช้ path.join เพื่อให้หาไฟล์ init.sql เจอไม่ว่าจะรันจากโฟลเดอร์ไหน
    const sqlPath = path.join(__dirname, 'init.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');
    await pool.query(sql);
    console.log('[task-db] Tables initialized successfully');
  } catch (err) {
    console.error('[task-db] Error initializing tables:', err.message);
    throw err; // ส่ง Error ต่อไปให้ index.js จัดการ
  }
}

module.exports = { pool, initDB };