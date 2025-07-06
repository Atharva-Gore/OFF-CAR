const playerCar = document.getElementById("playerCar");
const enemyCar1 = document.getElementById("enemyCar1");
const enemyCar2 = document.getElementById("enemyCar2");
const scoreDisplay = document.getElementById("score");
const highScoreDisplay = document.getElementById("highScore");
const restartBtn = document.getElementById("restartBtn");
const crashSound = document.getElementById("crashSound");
const engineSound = document.getElementById("engineSound");
const pointSound = document.getElementById("pointSound");

let playerX = 175;
let score = 0;
let highScore = localStorage.getItem("highScore") || 0;
let gameInterval;
let enemySpeed = 3;
let enemies = [enemyCar1, enemyCar2];

highScoreDisplay.textContent = highScore;

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft" && playerX > 75) {
    playerX -= 100;
  } else if (e.key === "ArrowRight" && playerX < 275) {
    playerX += 100;
  }
  playerCar.style.left = `${playerX}px`;
});

function resetEnemy(enemy) {
  enemy.style.top = "-150px";
  enemy.style.left = `${75 + Math.floor(Math.random() * 3) * 100}px`;
}

function updateGame() {
  enemies.forEach((enemy) => {
    let currentTop = parseInt(enemy.style.top || "-150");
    if (currentTop >= 500) {
      resetEnemy(enemy);
      updateScore();
    } else {
      enemy.style.top = `${currentTop + enemySpeed}px`;
    }

    if (checkCollision(playerCar, enemy)) {
      crashSound.play();
      stopGame();
      setTimeout(startGame, 1500); // restart after 1.5 seconds
    }
  });
}

function updateScore() {
  score++;
  scoreDisplay.textContent = score;
  pointSound.play();
  if (score > highScore) {
    highScore = score;
    highScoreDisplay.textContent = highScore;
    localStorage.setItem("highScore", highScore);
  }
}

function checkCollision(car1, car2) {
  const r1 = car1.getBoundingClientRect();
  const r2 = car2.getBoundingClientRect();
  return !(
    r1.bottom < r2.top ||
    r1.top > r2.bottom ||
    r1.right < r2.left ||
    r1.left > r2.right
  );
}

function startGame() {
  score = 0;
  playerX = 175;
  playerCar.style.left = `${playerX}px`;
  enemies.forEach(resetEnemy);
  gameInterval = setInterval(updateGame, 20);
  engineSound.play();
}

function stopGame() {
  clearInterval(gameInterval);
  engineSound.pause();
  engineSound.currentTime = 0;
}

restartBtn.addEventListener("click", () => {
  stopGame();
  restartBtn.style.display = "none";
  startGame();
});

startGame();
