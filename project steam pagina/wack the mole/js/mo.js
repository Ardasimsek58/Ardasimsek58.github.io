document.addEventListener("DOMContentLoaded", function () {
  const holes = document.querySelectorAll(".hole");
  //haalt het boord op
  const startbtn = document.getElementById("startknop");
  //haalt de startknop op
  const endbtn = document.getElementById("stopknop");
  //haalt de stopknop op
  const scoreshowen = document.getElementById("score");
  //haalt de score op
  const timershowen = document.getElementById("timer");
  //haalt de timer op
  const playername = document.querySelector(".player-name");
  // haalt de speler naam op

  let playerNameInput = prompt("Voer je naam in");
  playername.textContent = playerNameInput;
  //zet naam van prompt in


  let countdown;
  let moleInterval;

  let timer;
  //geeft timer
  let score = 0;
  //start score
  let moletime = 1000; 
  // de snelheid van de mole
  const minMoletime = 300; 
  // minimale molesnelheid

  let gameOver = true;

  function startGame() {
    if (!gameOver) return;
    //laat spel starten wanneer je op start kilkt

    function comeout() {
      holes.forEach((hole) => {
        hole.classList.remove("mole");
        hole.removeEventListener("click", MoleClick);
      });
      //haalt de mole weg zodat het weer ergens anders kan

      const random = holes[Math.floor(Math.random() * holes.length)];
      random.classList.add("mole");
      random.addEventListener("click", MoleClick);
      //laat de mole op een random plek veschijnen
    }

    function MoleClick() {
      if (gameOver) return;

      score++;
      scoreshowen.textContent = `Score: ${score}`;
      //laat score omhoog gaan
     

      this.classList.remove("mole");


      moletime = Math.max(minMoletime, 1000 - score * 20);
      clearInterval(moleInterval);
      moleInterval = setInterval(comeout, moletime);
            // laat de mole sneller gaan als je meer punten heb maar niet onder minimale snelheid
    }

    gameOver = false;
    score = 0;
    moletime = 1000; 
    // maakt moletijd weer naar normale snelheid

    scoreshowen.textContent = `Score: ${score}`;
    timer = 60;
    timershowen.textContent = `Time: ${timer}s`;

    startbtn.disabled = true;
    endbtn.disabled = false;
    //zorgt ervoor dat je niet start kan klikken wanneer het spel klaar is

    countdown = setInterval(() => {
      timer--;
      timershowen.textContent = `Time: ${timer}s`;
      //laat de timer werken

      if (timer <= 0) {
        clearInterval(countdown);
        clearInterval(moleInterval);
        gameOver = true;
        alert(`spel klaar!\njouw score: ${score}`);
        startbtn.disabled = false;
        endbtn.disabled = true;
        //laat het spel stoppen als de timer bij nul is 
      }
    }, 1000);

    moleInterval = setInterval(comeout, moletime);
  }

  function endGame() {
    clearInterval(countdown);
    clearInterval(moleInterval);
    gameOver = true;
    //stopt het spel

    alert(`spel klaar!\njouw score: ${score}`);
   
    if (score > 20) {
      alert("JIJ HEB GEWONNEN!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    }  else {
      alert("Volgende keer beter maat.");
    }
    if (score > 40) {
        alert("Jij kan kapot snel klikken!");
      }
    //geeft alert voor als je heb gewonnen en als je niet heb gewonnen

    score = 0;
    timer = 60;
    //reset de score en timer weer wanneer het spel klaar is
    scoreshowen.textContent = `Score: ${score}`;
    timershowen.textContent = `Time: ${timer}s`;
    //laat de score en timer zien als het spel klaar is
    startbtn.disabled = false;
    endbtn.disabled = true;
    //zorgt ervoor dat je wel op start kan killken maar niet op stop wanneer het spel al klaar is
  }

  startbtn.addEventListener("click", startGame);
  endbtn.addEventListener("click", endGame);
  //maakt function om spel te stoppen of starten als je op de knoppen klikt
});
