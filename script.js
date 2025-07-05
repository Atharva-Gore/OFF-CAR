const car = document.getElementById("car");
const obstacle = document.getElementById("obstacle");
const scoreDisplay = document.getElementById("score");
const highScoreDisplay = document.getElementById("highScore");
const restartBtn = document.getElementById("restartBtn");

let carLeft = 125;
let score = 0;
let highScore = localStorage.getItem("highScore") || 0;
let speed = 20;
let gameRunning = true;

highScoreDisplay.textContent = highScore;

function moveCar(dir) {
  if (!gameRunning) return;
  if (dir === "left" && carLeft > 0) carLeft -= 25;
  else if (dir === "right" && carLeft < 250) carLeft += 25;
  car.style.left = carLeft + "px";
}

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") moveCar("left");
  else if (e.key === "ArrowRight") moveCar("right");
});

document.addEventListener("touchstart", (e) => {
  const x = e.touches[0].clientX;
  if (x < window.innerWidth / 2) moveCar("left");
  else moveCar("right");
});

function randomLane() {
  return Math.floor(Math.random() * 6) * 50;
}

function dropObstacle() {
  let obstacleTop = -100;
  let obstacleLeft = randomLane();
  obstacle.style.top = obstacleTop + "px";
  obstacle.style.left = obstacleLeft + "px";

  const dropInterval = setInterval(() => {
    if (!gameRunning) return clearInterval(dropInterval);

    obstacleTop += 5;
    obstacle.style.top = obstacleTop + "px";

    if (obstacleTop > 500) {
      clearInterval(dropInterval);
      score++;
      scoreDisplay.textContent = score;
      if (score % 5 === 0 && speed > 8) speed -= 2;
      dropObstacle();
    }

    if (
      obstacleTop > 400 &&
      obstacleTop < 510 &&
      obstacleLeft === carLeft
    ) {
      gameOver(dropInterval);
    }
  }, speed);
}

function gameOver(interval) {
  clearInterval(interval);
  gameRunning = false;
  car.classList.add("crash");

  if (score > highScore) {
    highScore = score;
    localStorage.setItem("highScore", highScore);
    highScoreDisplay.textContent = highScore;
  }

  restartBtn.style.display = "inline-block";
}

function restartGame() {
  car.classList.remove("crash");
  carLeft = 125;
  car.style.left = carLeft + "px";
  score = 0;
  speed = 20;
  scoreDisplay.textContent = 0;
  restartBtn.style.display = "none";
  gameRunning = true;
  dropObstacle();
}

dropObstacle();
