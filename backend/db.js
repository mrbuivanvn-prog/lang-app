const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./vocab.db");

db.serialize(() => {

  db.run(`
    CREATE TABLE IF NOT EXISTS vocab (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      word TEXT,
      meaning TEXT
    )
  `);

});

module.exports = db;
