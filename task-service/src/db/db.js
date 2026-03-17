const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // เพิ่ม SSL สำหรับ Railway (ถ้าไม่ใส่บางครั้งจะต่อไม่ได้)
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false,
});

async function initDB() {
  try {
    const sqlPath = path.join(__dirname, 'init.sql');
    if (!fs.existsSync(sqlPath)) {
        console.error('[task-db] Error: init.sql file not found at', sqlPath);
        return;
    }
    const sql = fs.readFileSync(sqlPath, 'utf8');
    await pool.query(sql);
    console.log('[task-db] Tables initialized successfully');
  } catch (err) {
    console.error('[task-db] Error initializing tables:', err.message);
    throw err;
  }
}

// export ทั้งคู่เพื่อให้ index.js เรียกใช้งานได้
module.exports = { pool, initDB };