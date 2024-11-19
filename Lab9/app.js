const questions = ["barney", "apple", "banana", "cherry", "grapes", "Bin", "Bucket", "Hangers", "Bowl", "Towel", "Chairs", "Flashlight", "Kettle", "Broom", "Clock", "Fridge", "Glasses", "Sofa", "Spoon", "Fork", "dog", "cat", "fish", "mouse", "canary", "chameleon", "snake", "parrot", "turtle", "rabbit", "frog", "duck", "fox", "beer", "kangaroo", "octopus", "zebra", "giraffe", "elephant", "monkey", "filamingo", "panda", "camel", "deer", "leon", "wol", "owl", "tiger", "eagle", "pig", "yellow", "blue", "green", "red", "black", "dark", "pink", "brown", "purple", "orange", "cyan", "white", "Aydana", "Sarnai"];
let targetWord = questions[Math.floor(Math.random() * questions.length)].toUpperCase();
let guessed = Array(targetWord.length).fill("_");
let lives = 6; 
let score = 0;
let level = 1;

const wordDisplay = document.querySelector(".Answer");
const livesDisplay = document.getElementById("lives");
const hangmanImg = document.querySelector("#hangman-img img");
const alphabetContainer = document.querySelector(".alphabit");
const scoreDisplay = document.querySelector(".current-score");
const levelDisplay = document.querySelector(".current-level");

wordDisplay.innerText = guessed.join(" ");
livesDisplay.textContent = "Lives: " + lives;
scoreDisplay.innerHTML = '<i class="bi bi-gem"></i>' + score;

levelDisplay.innerHTML = `<i class="bi bi-trophy"></i>` + level;
hangmanImg.src = "./img/img-" + (7 - lives) + ".png";

function handleLetterClick(letterElement) {
  const letter = letterElement.innerText;

  if (targetWord.includes(letter)) {
    for (let i = 0; i <= targetWord.length; i++) {
      if (targetWord[i] === letter) 
        guessed[i] = letter;
      letterElement.style.backgroundColor = "#08f57a";
      letterElement.style.color = "#333";
    }
    wordDisplay.innerText = guessed.join(" ");
    if (!guessed.includes("_")) {
      alert("You Win! Starting Next Level... " + targetWord);
      wordDisplay.innerText = guessed.join(targetWord);
      score += 10; 
      level++;
      updateScoreAndLevel();
      startNewGame();
    }
  } else {
    letterElement.style.backgroundColor = "#f72929";
    letterElement.style.color = "#fff";
    lives--;
    livesDisplay.textContent = "Lives: " + lives;
    hangmanImg.src = "./img/img-" + (7 - lives) + ".png";

    if (lives === 0) {
      livesDisplay.textContent = "Lives: " + lives;
      alert("Game Over! Try Again. " + targetWord);
      resetGame();
    }
  }
}

function updateScoreAndLevel() {
  scoreDisplay.innerHTML = `<i class="bi bi-gem"></i>` + score;
  levelDisplay.innerHTML = `<i class="bi bi-trophy"></i>` + level;
}


function setupAlphabetButtons() {
  alphabetContainer.innerHTML = ""; 
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  letters.split("").forEach((letter) => {
    const letterDiv = document.createElement("div");
    letterDiv.innerText = letter;
    letterDiv.className = letter; 
    letterDiv.onclick = () => handleLetterClick(letterDiv);
    alphabetContainer.appendChild(letterDiv);
  });
}

function startNewGame() {
  targetWord = questions[Math.floor(Math.random() * questions.length)].toUpperCase();
  guessed = Array(targetWord.length).fill("_");
  wordDisplay.innerText = guessed.join(" ");
  lives = 6;
  livesDisplay.textContent = "Lives: " + lives;
  hangmanImg.src = "./img/img-" + (7 - lives) + ".png";

  setupAlphabetButtons();
}

function resetGame() {
  score = 0;
  level = 1;
  updateScoreAndLevel();
  startNewGame();
}

setupAlphabetButtons();
