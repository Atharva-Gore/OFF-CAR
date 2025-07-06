const player = document.getElementById("playerCar");
const enemy = document.getElementById("enemyCar");
const scoreEl = document.getElementById("score");
const highScoreEl = document.getElementById("highScore");
const restartBtn = document.getElementById("restartBtn");

let score = 0;
let highScore = localStorage.getItem("highScore") || 0;
let gameInterval;
let enemySpeed = 2;

highScoreEl.innerText = highScore;

function resetEnemy() {
  enemy.style.top = "-50px";
  enemy.style.left = `${Math.floor(Math.random() * 260)}px`;
}

function checkCollision() {
  const playerRect = player.getBoundingClientRect();
  const enemyRect = enemy.getBoundingClientRect();

  return !(
    playerRect.bottom < enemyRect.top ||
    playerRect.top > enemyRect.bottom ||
    playerRect.right < enemyRect.left ||
    playerRect.left > enemyRect.right
  );
}

function updateScore() {
  score++;
  scoreEl.innerText = score;
  if (score > highScore) {
    highScore = score;
    highScoreEl.innerText = highScore;
    localStorage.setItem("highScore", highScore);
  }
}

function startGame() {
  score = 0;
  scoreEl.innerText = score;
  resetEnemy();

  gameInterval = setInterval(() => {
    let enemyTop = parseInt(enemy.style.top);
    enemyTop += enemySpeed;
    enemy.style.top = `${enemyTop}px`;

    if (enemyTop > 500) {
      resetEnemy();
      updateScore();
    }

    if (checkCollision()) {
      clearInterval(gameInterval);
      alert("Game Over! 🚫");
    }
  }, 20);
}

restartBtn.addEventListener("click", () => {
  clearInterval(gameInterval);
  player.style.left = "130px";
  startGame();
});

document.addEventListener("keydown", (e) => {
  const playerLeft = parseInt(player.style.left);
  if (e.key === "ArrowLeft" && playerLeft > 0) {
    player.style.left = `${playerLeft - 20}px`;
  } else if (e.key === "ArrowRight" && playerLeft < 260) {
    player.style.left = `${playerLeft + 20}px`;
  }
});

window.onload = startGame;
