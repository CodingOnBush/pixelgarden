const COLOR_PALETTE = ['#FF5733', '#33C3F0', '#2ECC71', '#9B59B6', '#F1C40F'];

/**
 * Get a random color from the color palette
 * @returns {string} - A random color from the color palette
 */
const getNextColor = (prevColor = '') => {
    const index = COLOR_PALETTE.indexOf(prevColor);
    if (index === -1) {
        return COLOR_PALETTE[Math.floor(Math.random() * COLOR_PALETTE.length)];
    }
    return COLOR_PALETTE[(index + 1) % COLOR_PALETTE.length];
}

/**
 * Load the grid from the server
 * @returns {Promise<void>} - A promise that resolves when the grid is loaded
 */
const loadGrid = async () => {
    try {
        const response = await fetch('/api/grid');
        const grid = await response.json();

        const cells = document.querySelectorAll('.grid-item');
        cells.forEach(cell => {
            const row = parseInt(cell.getAttribute('data-row'));
            const col = parseInt(cell.getAttribute('data-col'));
            if (grid[row] && grid[row][col]) {
                cell.style.backgroundColor = grid[row][col];
            }
        });
    } catch (error) {
        console.error('Erreur lors du chargement de la grille:', error);
    }
}

/**
 * Update the color of a cell
 * @param {number} row 
 * @param {number} col 
 * @param {string} color 
 * @returns {Promise<void>} - A promise that resolves when the color is updated
 */
const updateColor = async (row, col, color) => {
    const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
    if (!cell) return;

    try {
        const response = await fetch('/api/update-color', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ row, col, color }),
        });

        const data = await response.json();

        if (response.ok && data.success) {
            cell.style.backgroundColor = color;
        }
    } catch (error) {
        console.error('Error updating color:', error);
    }
}

// When the window is loaded, load the grid and handle clicks
window.addEventListener('load', () => {
    loadGrid();
    handleClicks();
});

/**
 * Handle clicks on the cells
 * @returns {void}
 */
const handleClicks = () => {
    const cells = document.querySelectorAll('.grid-item');
    cells.forEach(cell => {
        cell.addEventListener('click', () => {
            // Mise à jour de couleur
            const row = parseInt(cell.getAttribute('data-row'));
            const col = parseInt(cell.getAttribute('data-col'));
            const color = getNextColor(cell.style.backgroundColor);
            updateColor(row, col, color);
        });
    });
};