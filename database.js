import initSqlJs from "sql.js";
import fs from "fs";

const DB_FILE = "facts.db.json";

// ✅ Pure JavaScript SQLite — Termux ላይ ይሰራል
let db;

async function getDb() {
  if (db) return db;

  const SQL = await initSqlJs();

  if (fs.existsSync(DB_FILE)) {
    const data = JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));
    db = new SQL.Database(Buffer.from(data));
  } else {
    db = new SQL.Database();
  }

  // Tables ፍጠር
  db.run(`
    CREATE TABLE IF NOT EXISTS posted_facts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      content TEXT NOT NULL,
      topic TEXT NOT NULL,
      posted_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS topic_index (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      current_index INTEGER DEFAULT 0
    );

    INSERT OR IGNORE INTO topic_index (id, current_index) VALUES (1, 0);
  `);

  saveDb();
  return db;
}

function saveDb() {
  const data = Buffer.from(db.export());
  fs.writeFileSync(DB_FILE, JSON.stringify(Array.from(data)));
}

// ✅ Fact አስቀምጥ
export async function saveFact(content, topic) {
  const db = await getDb();
  db.run("INSERT INTO posted_facts (content, topic) VALUES (?, ?)", [content, topic]);
  saveDb();
}

// ✅ Duplicate ፈትሽ
export async function isDuplicate(content) {
  const db = await getDb();
  const res = db.exec("SELECT id FROM posted_facts WHERE content = ?", [content]);
  return res.length > 0 && res[0].values.length > 0;
}

// ✅ ቀጣዩ topic index (rotate)
export async function getNextTopicIndex(totalTopics) {
  const db = await getDb();
  const res = db.exec("SELECT current_index FROM topic_index WHERE id = 1");
  const current = res[0].values[0][0];
  const next = (current + 1) % totalTopics;
  db.run("UPDATE topic_index SET current_index = ? WHERE id = 1", [next]);
  saveDb();
  return current;
}

// ✅ Statistics
export async function getStats() {
  const db = await getDb();
  const total = db.exec("SELECT COUNT(*) FROM posted_facts");
  const today = db.exec("SELECT COUNT(*) FROM posted_facts WHERE DATE(posted_at) = DATE('now')");
  return {
    total: total[0].values[0][0],
    today: today[0].values[0][0],
  };
}
