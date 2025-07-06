const player = document.getElementById("player");
const enemy = document.getElementById("enemy");
const gameContainer = document.getElementById("gameContainer");
const scoreEl = document.getElementById("score");
const highScoreEl = document.getElementById("highScore");
const restartBtn = document.getElementById("restartBtn");

const crashSound = document.getElementById("crashSound");
const engineSound = document.getElementById("engineSound");

let score = 0;
let highScore = localStorage.getItem("highScore") || 0;
highScoreEl.innerText = highScore;

let enemySpeed = 3;
let gameRunning = true;

function resetEnemy() {
  enemy.style.top = "-100px";
  enemy.style.left = `${Math.floor(Math.random() * 250)}px`;
}

function moveEnemy() {
  if (!gameRunning) return;
  const enemyTop = parseInt(window.getComputedStyle(enemy).getPropertyValue("top"));
  if (enemyTop >= 500) {
    score++;
    scoreEl.innerText = score;
    resetEnemy();
  } else {
    enemy.style.top = `${enemyTop + enemySpeed}px`;
  }
}

function detectCollision() {
  const playerRect = player.getBoundingClientRect();
  const enemyRect = enemy.getBoundingClientRect();

  const collision =
    playerRect.left < enemyRect.right &&
    playerRect.right > enemyRect.left &&
    playerRect.top < enemyRect.bottom &&
    playerRect.bottom > enemyRect.top;

  if (collision) {
    gameRunning = false;
    crashSound.play();
    engineSound.pause();
    restartBtn.style.display = "inline-block";

    if (score > highScore) {
      highScore = score;
      localStorage.setItem("highScore", highScore);
      highScoreEl.innerText = highScore;
    }

    setTimeout(() => {
      restartGame();
    }, 2000);
  }
}

function movePlayer(e) {
  const left = parseInt(window.getComputedStyle(player).getPropertyValue("left"));

  if (e.key === "ArrowLeft" && left > 0) {
    player.style.left = `${left - 15}px`;
  } else if (e.key === "ArrowRight" && left < 250) {
    player.style.left = `${left + 15}px`;
  }
}

function restartGame() {
  score = 0;
  scoreEl.innerText = score;
  player.style.left = "125px";
  resetEnemy();
  gameRunning = true;
  restartBtn.style.display = "none";
  engineSound.play();
}

restartBtn.addEventListener("click", restartGame);
document.addEventListener("keydown", movePlayer);

function gameLoop() {
  if (gameRunning) {
    moveEnemy();
    detectCollision();
  }
  requestAnimationFrame(gameLoop);
}

resetEnemy();
engineSound.play();
gameLoop();
