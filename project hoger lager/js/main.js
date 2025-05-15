// met deze stukje code kan je de thema's veranderen.
if (document.querySelector(".theme")) {
  document.querySelector(".theme").addEventListener("change", (event) => {
    console.log(event.target.value);
    const chosen = event.target.value;

    location.href = chosen + ".html";
  });
}

let randomNumber = Math.floor(Math.random() * 10000) + 1; // random getal tussen 1 en 10000
let attempts = 15; // Aantal pogingen

const guessInput = document.querySelector(".guessInput");
const resultText = document.querySelector(".result");
const attemptsLeftText = document.querySelector(".attemptsLeft");
const resetButton = document.querySelector(".resetButton");
const guessButton = document.querySelector(".guess-btn");

// Verberg de reset-knop bij het opstarten van de pagina
if (resetButton) {
  resetButton.style.display = "none";
}

// Functie om het spel opnieuw te starten
function resetGame() {
  randomNumber = Math.floor(Math.random() * 10000) + 1; // Nieuw willekeurig getal
  attempts = 15; // Reset pogingen
  attemptsLeftText.textContent = "pogingen over: " + attempts; // zegt hoeveel pogingen je nog hebt.
  resultText.textContent = ""; // Reset resultaat tekst
  guessInput.value = ""; // Reset invoer
  guessButton.disabled = false; // Maak het gokknop weer actief
  resetButton.style.display = "none"; // laat de resetButton niet zien.
  attemptsLeftText.style.display = "block";

}

if (guessButton) {
  guessButton.addEventListener("click", function () {
    guess();
  });
}

// Functie om de reset knop te laten zien.
function showReset() {
  resetButton.style.display = "block"; // laat de resetknop zien.
}
if (resetButton) {
  resetButton.addEventListener("click", resetGame);
}

document.addEventListener("keydown", (event) => {
  console.log(`Key pressed: ${event.key}`);

  if (event.key === "Enter") {
    guess();
  }
});

function guess() {
  let guess = parseInt(guessInput.value);

  // kijkt of je geen letter typt en een getal tussen de 1 en de 10000, anders zegt het spel Voer een geldig getal in tussen 1 en 10000.
  if (isNaN(guess) || guess < 1 || guess > 10000) {
    resultText.textContent = "Voer een geldig getal in tussen 1 en 10000.";
    return;
  }

  // elke keer als je klikt op de knop word de attempts -1.
  attempts--;
  attemptsLeftText.textContent = "pogingen over: " + attempts;

  if (guess === randomNumber) {
    resultText.textContent =
      "Gefeliciteerd! Je hebt het juiste nummer geraden!";
    guessButton.disabled = true; // laat de gok knop niet meer werken
    showReset(); // laat de resetknop
  } else if (guess > randomNumber) {
    resultText.textContent = "Lager!";
  } else {
    resultText.textContent = "Hoger!";
  }

  // Controleer of de pogingen op zijn
  if (attempts === 0 && guess !== randomNumber) {
    guessButton.disabled = true; // laat de knop niet meer werken
    resultText.textContent =
      " helaas het was " + randomNumber + "volgende keer beter.";
    showReset(); // laat de resetknop zien
    attemptsLeftText.style.display = "none";
  }
}



