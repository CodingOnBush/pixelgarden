const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'grid.json');

app.use(express.json());
app.use(express.static('public'));

// 🧩 Fonction utilitaire pour lire le fichier JSON
function readGrid() {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch {
    // Si le fichier n'existe pas encore, créer une grille blanche 3x3
    const grid = Array.from({ length: 3 }, () => Array(3).fill('#ffffff'));
    fs.writeFileSync(DATA_FILE, JSON.stringify(grid, null, 2));
    return grid;
  }
}

// 🧩 Fonction utilitaire pour écrire dans le fichier JSON
function saveGrid(grid) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(grid, null, 2));
}

// 🟩 Route GET : renvoyer la grille complète
app.get('/api/grid', (req, res) => {
  const grid = readGrid();
  res.json(grid);
});

// 🟦 Route PUT : mettre à jour une cellule
app.put('/api/cell', (req, res) => {
  const { x, y, color } = req.body;
  if (typeof x !== 'number' || typeof y !== 'number' || typeof color !== 'string') {
    return res.status(400).json({ ok: false, message: 'Paramètres invalides' });
  }

  const grid = readGrid();
  if (!grid[y] || !grid[y][x]) {
    return res.status(400).json({ ok: false, message: 'Coordonnées invalides' });
  }

  grid[y][x] = color;
  saveGrid(grid);
  res.json({ ok: true });
});

// 🚀 Lancement du serveur
app.listen(PORT, () => console.log(`🌱 PixelGarden tourne sur le port ${PORT}`));
