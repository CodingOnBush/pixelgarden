// Générer une couleur hexadécimale aléatoire
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Récupérer les couleurs du serveur et les appliquer à la grille
async function loadGridColors() {
    try {
        const response = await fetch('/api/grid');
        const grid = await response.json();
        
        // Appliquer les couleurs aux cases de la grille
        const gridItems = document.querySelectorAll('.grid-item');
        let index = 0;
        
        for (let row = 0; row < grid.length; row++) {
            for (let col = 0; col < grid[row].length; col++) {
                if (gridItems[index]) {
                    gridItems[index].style.backgroundColor = grid[row][col];
                    // Stocker les coordonnées dans l'élément
                    gridItems[index].dataset.row = row;
                    gridItems[index].dataset.col = col;
                    index++;
                }
            }
        }
    } catch (error) {
        console.error('Erreur lors du chargement des couleurs:', error);
    }
}

// Mettre à jour la couleur d'une cellule sur le serveur
async function updateCellColor(x, y, color) {
    try {
        const response = await fetch('/api/cell', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ x, y, color })
        });
        
        const result = await response.json();
        if (result.ok) {
            return true;
        } else {
            console.error('Erreur serveur:', result.message);
            return false;
        }
    } catch (error) {
        console.error('Erreur lors de la mise à jour:', error);
        return false;
    }
}

// Gérer le clic sur une case
function handleCellClick(event) {
    const cell = event.target;
    const x = parseInt(cell.dataset.col);
    const y = parseInt(cell.dataset.row);
    
    // Générer une nouvelle couleur aléatoire
    const newColor = getRandomColor();
    
    // Mettre à jour visuellement immédiatement
    cell.style.backgroundColor = newColor;
    
    // Envoyer la mise à jour au serveur
    updateCellColor(x, y, newColor);
}

// Initialiser les écouteurs d'événements après le chargement
function setupEventListeners() {
    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach(item => {
        item.addEventListener('click', handleCellClick);
        // Ajouter un style pour indiquer que c'est cliquable
        item.style.cursor = 'pointer';
    });
}

// Charger les couleurs au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    loadGridColors().then(() => {
        setupEventListeners();
    });
});

