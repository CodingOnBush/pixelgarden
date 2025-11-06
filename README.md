## PixelGarden

Projet d’entraînement rapide pour réviser des fondamentaux front/back avant un entretien.

### Contexte
Ce dépôt m’a servi à me remettre en jambes avant un entretien technique: manipuler le DOM, gérer des événements (clic sur une grille), appeler une API, et maintenir une petite base de code claire.

### Démo (Render)
L’application est déployée sur Render pour test rapide: [https://pixelgarden.onrender.com](https://pixelgarden.onrender.com)

### Architecture (simple et lisible)
- **Choix volontaire**: back et front dans le même repo et le même serveur pour réduire la friction et faciliter la compréhension.
- **Front**: fichiers statiques dans `public/` (`index.html`, `style.css`, `script.js`).
- **Back**: une petite API dans `server.js` (endpoints pour charger/mettre à jour la grille, lecture/écriture `grid.json`).

### Lancer en local
1. Installer: `npm install`
2. Démarrer: `npm start`
3. Ouvrir: `http://localhost:3000`

### Stack
- Node.js + Express (API légère)
- Fichiers statiques (HTML/CSS/JS vanilla)

### Fonctionnement rapide
- La page affiche une grille 3×3 (`.grid-item`).
- Clic sur une case: feedback visuel discret (baisse d’opacité), calcul d’une nouvelle couleur, appel API pour persister, puis rafraîchit la couleur.

### Pourquoi utile pour s’entraîner avant un entretien
- Exercice compact couvrant UI, events, fetch/API, lecture/écriture côté serveur.
- Code minimal, facilement lisible et modifiable pour tester des variantes (états, erreurs, UX).

### Prochaines pistes (facultatif)
- Étendre la grille, ajouter une palette fixe, gérer l’historique/undo, tests unitaires basiques.