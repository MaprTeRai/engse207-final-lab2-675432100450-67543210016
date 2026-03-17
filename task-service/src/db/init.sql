-- 1. สร้างตาราง Tasks
CREATE TABLE IF NOT EXISTS tasks (
    id          SERIAL PRIMARY KEY,
    user_id     INTEGER      NOT NULL,
    title       VARCHAR(200) NOT NULL,
    description TEXT,
    status      VARCHAR(20)  DEFAULT 'TODO'   CHECK (status IN ('TODO','IN_PROGRESS','DONE')),
    priority    VARCHAR(10)  DEFAULT 'medium' CHECK (priority IN ('low','medium','high')),
    created_at  TIMESTAMP    DEFAULT NOW(),
    updated_at  TIMESTAMP    DEFAULT NOW()
);

-- 2. สร้างตาราง Logs
CREATE TABLE IF NOT EXISTS logs (
    id         SERIAL PRIMARY KEY,
    level      VARCHAR(10)  NOT NULL, -- เช่น 'info', 'warn', 'error'
    event      VARCHAR(100) NOT NULL,
    user_id    INTEGER,
    message    TEXT,
    meta       JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 3. เพิ่ม Index เพื่อให้ Query ข้อมูลเร็วขึ้น (Optional แต่แนะนำ)
CREATE INDEX IF NOT EXISTS idx_tasks_user_id ON tasks(user_id);
CREATE INDEX IF NOT EXISTS idx_logs_created_at ON logs(created_at);

-- 4. ฟังก์ชันสำหรับอัปเดตเวลา updated_at อัตโนมัติ (Advanced)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 5. สร้าง Trigger ให้ตาราง tasks (จะทำงานทุกครั้งที่มีการ UPDATE)
DROP TRIGGER IF EXISTS update_tasks_modtime ON tasks;
CREATE TRIGGER update_tasks_modtime
    BEFORE UPDATE ON tasks
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();