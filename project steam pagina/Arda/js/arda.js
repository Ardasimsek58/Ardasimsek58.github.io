// Selecteer het grid-element in de DOM
const grid = document.querySelector(".grid");

// Stel het aantal rijen en kolommen in voor het speelbord
const rows = 6;
const cols = 7;

// Maak een lege array om het bord voor te stellen
// Elk element is null om aan te geven dat de cel leeg is
const board = Array.from({ length: rows }, () => Array(cols).fill(null));

// Stel de huidige speler in (startend met 'red')
let currentPlayer = "red";

// Voeg een click-eventlistener toe aan het grid
// Wordt geactiveerd wanneer een speler op een cel klikt
grid.addEventListener("click", (e) => {
  const column = getColumnIndex(e.target); // Bepaal op welke kolom is geklikt
  if (column !== null) {
    dropDisc(column); // Laat een schijf vallen in de kolom
  }
});

// Bepaal de kolomindex op basis van het aangeklikte element
function getColumnIndex(target) {
  const index = Array.from(grid.children).indexOf(target); // Vind de index van het doel-element
  return index >= 0 ? index % cols : null; // Bereken de kolomindex, of null als buiten bereik
}

// Laat een schijf vallen in de gekozen kolom
function dropDisc(column) {
  const row = findAvailableRow(column); // Zoek de eerste beschikbare rij
  if (row === -1) {
    alert("Column is full!"); // Waarschuw als de kolom vol is
    return;
  }

  board[row][column] = currentPlayer; // Vult het bord met de huidige speler
  updateCell(row, column); // Werk de visuele cel bij

  // Controleer of de huidige speler gewonnen heeft
  if (checkWin(row, column)) {
    setTimeout(() => alert(`${currentPlayer} wins!`), 100); // Toon winnaa r
    resetGame(); // Reset het spel na winst
  } else {
    switchPlayer(); // Wissel van speler als niemand wint
  }
}

// Zoek de eerste beschikbare rij in een kolom
function findAvailableRow(column) {
  for (let row = rows - 1; row >= 0; row--) {
    // Begin onderaan de kolom
    if (!board[row][column]) return row; // Return de eerste lege rij
  }
  return -1; // Geen lege rijen beschikbaar
}

function updateCell(row, column) {
  const cell = grid.children[row * cols + column]; // Zoek de juiste cel in het grid
  cell.style.backgroundColor = currentPlayer; // Stel de kleur in op basis van de huidige speler
}

// Wissel de huidige speler
function switchPlayer() {
  currentPlayer = currentPlayer === "red" ? "yellow" : "red"; // Wissel tussen 'red' en 'yellow'
}

// Controleer of er een winnaar is
function checkWin(row, column) {
  return (
    checkDirection(row, column, 1, 0) || // Controleer horizontale lijn
    checkDirection(row, column, 0, 1) || // Controleer verticale lijn
    checkDirection(row, column, 1, 1) || // Controleer diagonale lijn /
    checkDirection(row, column, 1, -1) // Controleer diagonale lijn \
  );
}

// Controleer een specifieke richting voor opeenvolgende schijven
function checkDirection(row, column, rowStep, colStep) {
  let count = 1; // Start met de huidige schijf
  count += countConsecutive(row, column, rowStep, colStep); // Tel vooruit
  count += countConsecutive(row, column, -rowStep, -colStep); // Tel achteruit
  return count >= 4; // Win als er minstens 4 op een rij zijn
}

// Tel het aantal opeenvolgende schijven in een richting
function countConsecutive(row, column, rowStep, colStep) {
  let count = 0;
  let r = row + rowStep;
  let c = column + colStep;

  // Blijf tellen zolang we binnen de grenzen zijn en dezelfde kleur vinden
  while (
    r >= 0 &&
    r < rows &&
    c >= 0 &&
    c < cols &&
    board[r][c] === currentPlayer
  ) {
    count++;
    r += rowStep;
    c += colStep;
  }

  return count; // Return het aantal opeenvolgende schijven
}

// Reset het spel naar de beginsituatie
function resetGame() {
  board.forEach((row) => row.fill(null)); // Maak het bord leeg
  Array.from(grid.children).forEach((cell) => {
    cell.style.backgroundColor = "white"; // Reset celkleuren
  });
  (currentPlayer = red), yellow; // Begin opnieuw met de rode spele
}
