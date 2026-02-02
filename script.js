const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");
const size = 15;
const cellSize = canvas.width / size;
const board = Array.from({ length: size }, () => Array(size).fill(null));

let currentPlayer = "black";
let gameOver = false;

function drawBoard() {
  for (let i = 0; i < size; i++) {
    ctx.beginPath();
    ctx.moveTo(cellSize / 2, cellSize / 2 + i * cellSize);
    ctx.lineTo(canvas.width - cellSize / 2, cellSize / 2 + i * cellSize);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(cellSize / 2 + i * cellSize, cellSize / 2);
    ctx.lineTo(cellSize / 2 + i * cellSize, canvas.height - cellSize / 2);
    ctx.stroke();
  }
}

function drawStone(x, y, color) {
  ctx.beginPath();
  ctx.arc(
    cellSize / 2 + x * cellSize,
    cellSize / 2 + y * cellSize,
    cellSize / 2 - 2,
    0,
    2 * Math.PI
  );
  ctx.fillStyle = color;
  ctx.fill();
}

function checkWin(x, y) {
  const directions = [
    [1, 0], [0, 1], [1, 1], [1, -1],
  ];
  for (let [dx, dy] of directions) {
    let count = 1;
    for (let dir of [-1, 1]) {
      let nx = x, ny = y;
      while (true) {
        nx += dx * dir;
        ny += dy * dir;
        if (
          nx >= 0 && nx < size &&
          ny >= 0 && ny < size &&
          board[ny][nx] === currentPlayer
        ) {
          count++;
        } else break;
      }
    }
    if (count >= 5) return true;
  }
  return false;
}

canvas.addEventListener("click", (e) => {
  if (gameOver) return;

  const rect = canvas.getBoundingClientRect();
  const x = Math.floor((e.clientX - rect.left) / cellSize);
  const y = Math.floor((e.clientY - rect.top) / cellSize);

  if (!board[y][x]) {
    board[y][x] = currentPlayer;
    drawStone(x, y, currentPlayer === "black" ? "black" : "white");

    if (checkWin(x, y)) {
      document.getElementById("status").innerText = `${currentPlayer === "black" ? "흑돌" : "백돌"} 승리!`;
      gameOver = true;
    } else {
      currentPlayer = currentPlayer === "black" ? "white" : "black";
      document.getElementById("status").innerText = `${currentPlayer === "black" ? "흑돌" : "백돌"} 차례입니다`;
    }
  }
});

drawBoard();