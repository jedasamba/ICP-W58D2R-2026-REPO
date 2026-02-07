const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;
const dbPath = path.join(__dirname, 'database.json');

app.use(cors());
app.use(express.json());

// Helper to read/write DB
function readDB() {
  return JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
}
function writeDB(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

// --- Clients ---
app.get('/clients', (req,res) => res.json(readDB().clients));

app.post('/clients', (req,res) => {
  const db = readDB();
  db.clients.push(req.body.name);
  writeDB(db);
  res.json(db.clients);
});

// --- Projects ---
app.get('/projects', (req,res) => res.json(readDB().projects));

app.post('/projects', (req,res) => {
  const db = readDB();
  db.projects.push(req.body.name);
  writeDB(db);
  res.json(db.projects);
});

// --- Payments ---
app.get('/payments', (req,res) => res.json({payments: readDB().payments}));

app.post('/payments', (req,res) => {
  const db = readDB();
  db.payments += Number(req.body.amount);
  writeDB(db);
  res.json({payments: db.payments});
});

// --- Tasks ---
app.get('/tasks', (req,res) => res.json(readDB().tasks));

app.post('/tasks', (req,res) => {
  const db = readDB();
  db.tasks.push(req.body);
  writeDB(db);
  res.json(db.tasks);
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
