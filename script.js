const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const startButton = document.getElementById("startButton");
const restartButton = document.getElementById("restartButton");
const scoreElement = document.getElementById("score");

// Variables du jeu
let birdX = 50;
let birdY = canvas.height / 2;
let birdVelocityY = 0;
const gravity = 0.5;
const jumpStrength = 10;
let isGameOver = false;
let score = 0;

// Variables des tuyaux
const pipeWidth = 50;
const pipeHeight = 200;
let pipeX = canvas.width;
let pipeGap = 150;
let pipeOffset = Math.random() * (canvas.height - pipeGap * 2) + pipeGap;

// Écouter les événements de clic
document.addEventListener("click", () => {
  if (!isGameOver) birdVelocityY = -jumpStrength;
  if (isGameOver) {
    birdX = 50;
    birdY = canvas.height / 2;
    pipeX = canvas.width;
    isGameOver = false;
  }
});

function drawBird() {
  ctx.fillStyle = "yellow";
  ctx.fillRect(birdX, birdY, 30, 20);
}

function drawPipe() {
  ctx.fillStyle = "green";
  ctx.fillRect(pipeX, 0, pipeWidth, pipeOffset);
  ctx.fillRect(pipeX, pipeOffset + pipeGap, pipeWidth, canvas.height - pipeOffset - pipeGap);
}

function checkCollision() {
  if (birdY < 0 || birdY + 20 > canvas.height ||     (birdX + 30 > pipeX && birdX < pipeX + pipeWidth && (birdY < pipeOffset || birdY + 20 > pipeOffset + pipeGap))
  ) {
    isGameOver = true;
  }
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (!isGameOver) {
    birdVelocityY += gravity;
    birdY += birdVelocityY;
    pipeX -= 5;

    if (pipeX + pipeWidth < 0) {
      pipeX = canvas.width;
      pipeOffset = Math.random() * (canvas.height - pipeGap * 2) + pipeGap;
      updateScore();
    }

    checkCollision();
    drawPipe();
  }

  drawBird();

  if (!isGameOver) requestAnimationFrame(gameLoop);
  else {
    ctx.fillStyle = "red";
    ctx.font = "40px Arial";
    ctx.fillText("Game Over", canvas.width / 2 - 100, canvas.height / 2);
    restartButton.style.display = "block";

    ctx.fillText("Cliquez pour rejouer", canvas.width / 2 - 150, canvas.height / 2 + 50);
  }
}

startButton.addEventListener("click", startGame);

function startGame() {
    startButton.style.display = "none";
    pipeX = canvas.width;
    score = 0;
    isGameOver = false;
    birdVelocityY = 0;
    birdY = canvas.height / 2;
    requestAnimationFrame(gameLoop);
}
restartButton.addEventListener("click", startGame);

function updateScore() {
    score++;
    scoreElement.textContent = "Score : " + score;
  }

gameLoop();
