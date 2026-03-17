const express       = require('express');
const { pool }      = require('../db/db');
const requireAuth   = require('../middleware/authMiddleware');

const router = express.Router();

// Helper: ส่ง log (ปรับปรุงให้ไม่พังถ้า log-service ดับ)
async function logEvent(data) {
  try {
    // หมายเหตุ: ถ้ายังไม่ได้สร้าง log-service บน Railway บรรทัดนี้จะ Error
    // ให้เปลี่ยน URL เป็น Public URL ของ log-service หรือใช้ตัวแปร ENV แทน
    const logUrl = process.env.LOG_SERVICE_URL || 'http://log-service:3003/api/logs/internal';
    
    await fetch(logUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service: 'task-service',
        ...data,
        ip_address: data.ip || '0.0.0.0',
        user_id: data.userId,
        status_code: data.statusCode
      })
    });
  } catch (err) {
    // เงียบไว้ ไม่ให้การส่ง Log พังแล้วทำให้การสร้าง Task พังไปด้วย
    console.log('[task-service] Log delivery failed (skipping...)');
  }
}

// GET /health
router.get('/health', (_, res) => res.json({ status:'ok', service:'task-service' }));

// ทุก route ต้องผ่าน JWT middleware
router.use(requireAuth);

// GET /api/tasks/
router.get('/', async (req, res) => {
  try {
    let result;
    // ใช้ req.user.sub ตามที่ดึงมาจาก Token
    const userId = req.user.sub;
    
    if (req.user.role === 'admin') {
      result = await pool.query(`SELECT * FROM tasks ORDER BY created_at DESC`);
    } else {
      result = await pool.query(`SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at DESC`, [userId]);
    }
    res.json({ tasks: result.rows, count: result.rowCount });
  } catch (err) {
    console.error('[task-service] GET error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/tasks/
router.post('/', async (req, res) => {
  const { title, description, status = 'TODO', priority = 'medium' } = req.body;
  
  if (!title) return res.status(400).json({ error: 'title is required' });
  
  try {
    // บันทึกลง Database
    const result = await pool.query(
      `INSERT INTO tasks (user_id, title, description, status, priority)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [req.user.sub, title, description, status, priority]
    );
    
    const task = result.rows[0];

    // เรียกส่ง Log (ไม่ต้อง await ก็ได้เพื่อความเร็ว หรือล้อมด้วย try-catch แล้ว)
    logEvent({ 
      level:'INFO', event:'TASK_CREATED', userId: req.user.sub,
      method:'POST', path:'/api/tasks', statusCode:201,
      message: `Task created: "${title}"`, meta: { task_id: task.id, title } 
    });

    res.status(201).json({ task });
  } catch (err) {
    // ส่วนสำคัญ: พิมพ์ Error ออกมาดูใน Railway Logs
    console.error('[task-service] POST error:', err.message);
    res.status(500).json({ error: `Server error: ${err.message}` });
  }
});

// ... ส่วนที่เหลือ (PUT/DELETE) ให้คงเดิมไว้ได้เลยครับ ...
module.exports = router;