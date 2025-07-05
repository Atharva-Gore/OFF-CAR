const car = document.getElementById("car");
const obstacle = document.getElementById("obstacle");
const scoreDisplay = document.getElementById("score");
const moveSound = document.getElementById("moveSound");
const crashSound = document.getElementById("crashSound");

let carLeft = 125;
let score = 0;
let speed = 20;

// Move car left/right
function moveCar(direction) {
  if (direction === "left" && carLeft > 0) {
    carLeft -= 25;
  } else if (direction === "right" && carLeft < 250) {
    carLeft += 25;
  }
  car.style.left = carLeft + "px";
  moveSound.currentTime = 0;
  moveSound.play();
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

function randomPosition() {
  return Math.floor(Math.random() * 6) * 50;
}

function dropObstacle() {
  let obstacleTop = -100;
  let obstacleLeft = randomPosition();
  obstacle.style.top = obstacleTop + "px";
  obstacle.style.left = obstacleLeft + "px";

  const dropInterval = setInterval(() => {
    obstacleTop += 5;
    obstacle.style.top = obstacleTop + "px";

    if (obstacleTop > 500) {
      clearInterval(dropInterval);
      score++;
      scoreDisplay.textContent = "Score: " + score;

      // 🏁 Speed increases every 5 points (max: 10ms delay)
      if (score % 5 === 0 && speed > 10) speed -= 2;

      dropObstacle();
    }

    // 💥 Collision detection
    if (
      obstacleTop > 400 &&
      obstacleTop < 500 &&
      obstacleLeft === carLeft
    ) {
      clearInterval(dropInterval);
      crashSound.play();
      car.classList.add("crash");

      setTimeout(() => {
        car.classList.remove("crash");
        alert("💥 Game Over!\nFinal Score: " + score);
        score = 0;
        speed = 20;
        scoreDisplay.textContent = "Score: 0";
        obstacle.style.top = "-100px";
        dropObstacle();
      }, 500);
    }
  }, speed);
}

// Start game
dropObstacle();
