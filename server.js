import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

const GRID_FILE = path.join(__dirname, 'grid.json');

app.get('/api/grid', async (req, res) => {
	try {
		const data = await fs.readFile(GRID_FILE, 'utf-8');
		const grid = JSON.parse(data);
		res.json(grid);
	} catch (error) {
		console.error('Error reading grid.json:', error);
		res.status(500).json({ error: 'Error reading grid.json' });
	}
});

app.post('/api/update-color', async (req, res) => {
	try {
		const { row, col, color } = req.body;

		if (typeof row !== 'number' || typeof col !== 'number' || !color) {
			return res.status(400).json({ error: 'Invalid parameters: row, col and color are required' });
		}

		const data = await fs.readFile(GRID_FILE, 'utf-8');
		const grid = JSON.parse(data);

		if (row < 0 || row >= grid.length || col < 0 || col >= grid[row].length) {
			return res.status(400).json({ error: 'Invalid coordinates' });
		}

		grid[row][col] = color;

		await fs.writeFile(GRID_FILE, JSON.stringify(grid, null, 2), 'utf-8');

		res.json({ success: true });
	} catch (error) {
		console.error('Error updating color:', error);
		res.status(500).json({ error: 'Error updating color' });
	}
});

app.listen(PORT, () => {
	console.log(`PixelGarden listening on port ${PORT}`);
});