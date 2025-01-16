const tableContainer = document.getElementById('table-container');
const totalElement = document.getElementById('total'); // Élément pour afficher le total
let total = 0; // Nouvelle variable pour le total

// Fonction pour mettre à jour le total
function updateTotal(value, isChecked) {
    if (isChecked) {
        total += value; // Ajouter la valeur au total
    } else {
        total -= value; // Retirer la valeur du total
    }
    totalElement.textContent = total; // Mettre à jour l'affichage
}

// Fonction pour gérer le stockage local
function saveCheckedState(value, isChecked) {
    let checkedValues = JSON.parse(localStorage.getItem('checkedValues')) || {};
    if (isChecked) {
        checkedValues[value] = true; // Sauvegarder comme coché
    } else {
        delete checkedValues[value]; // Supprimer la valeur si décochée
    }
    localStorage.setItem('checkedValues', JSON.stringify(checkedValues));
}

// Fonction pour récupérer l'état des cases cochées depuis le stockage local
function loadCheckedState() {
    return JSON.parse(localStorage.getItem('checkedValues')) || {};
}

function createTable() {
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    // Ajouter une ligne d'en-tête (optionnel)
    const headerRow = document.createElement('tr');
    for (let i = 0; i < 20; i++) {
        const th = document.createElement('th');
        th.textContent = `Col ${i + 1}`;
        headerRow.appendChild(th);
    }
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const checkedValues = loadCheckedState(); // Charger les cases cochées

    // Générer les lignes
    for (let i = 0; i < 10; i++) { // 10 lignes
        const row = document.createElement('tr');
        let number = 5; // Réinitialiser le nombre à 5 pour chaque ligne
        for (let j = 0; j < 20; j++) { // 20 colonnes
            const cell = document.createElement('td');

            // Créer une case à cocher et afficher le nombre
            const label = document.createElement('label');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';

            const span = document.createElement('span');
            span.textContent = number;

            // Vérifier si la case était cochée précédemment
            if (checkedValues[number]) {
                checkbox.checked = true;
                total += number; // Ajouter au total initial si coché
            }

            // Ajouter la case et le nombre au label
            label.appendChild(checkbox);
            label.appendChild(span);
            cell.appendChild(label);

            // Ajouter un gestionnaire d'événements pour la case à cocher
            checkbox.addEventListener('change', function () {
                if (checkbox.checked) {
                    updateTotal(number, true); // Ajouter au total
                } else {
                    updateTotal(number, false); // Retirer du total
                }
                saveCheckedState(number, checkbox.checked); // Sauvegarder l'état
            });

            // Incrémenter le nombre de 5
            number += 5;

            // Ajouter la cellule à la ligne
            row.appendChild(cell);
        }
        tbody.appendChild(row);
    }

    table.appendChild(tbody);
    tableContainer.appendChild(table);

    // Mettre à jour l'affichage initial du total
    totalElement.textContent = total;
}

// Appeler la fonction pour afficher le tableau
createTable();
