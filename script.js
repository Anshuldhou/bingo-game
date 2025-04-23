let playerBoard = [];
let playerLines = 0;
let allNumbers = [];

function createBoard() {
  const boardDiv = document.getElementById("player-board");
  boardDiv.innerHTML = "";
  let numbers = Array.from({ length: 25 }, (_, i) => i + 1).sort(() => 0.5 - Math.random());
  allNumbers = numbers.slice();
  let index = 0;

  for (let i = 0; i < 5; i++) {
    playerBoard[i] = [];
    for (let j = 0; j < 5; j++) {
      const number = numbers[index++];
      const cellDiv = document.createElement("div");
      cellDiv.className = "cell";
      cellDiv.textContent = number;
      cellDiv.dataset.clicked = "false";

      const cellObj = {
        element: cellDiv,
        number: number,
        clicked: false
      };

      cellDiv.onclick = () => {
        if (cellDiv.dataset.clicked === "false") {
          cellDiv.classList.add("clicked");
          cellDiv.dataset.clicked = "true";
          cellObj.clicked = true;
          checkBingo(playerBoard);
        }
      };

      boardDiv.appendChild(cellDiv);
      playerBoard[i][j] = cellObj;
    }
  }
}

function checkBingo(board) {
  let lines = 0;

  // Rows
  for (let i = 0; i < 5; i++) {
    if (board[i].every(cell => cell.clicked)) lines++;
  }

  // Columns
  for (let j = 0; j < 5; j++) {
    if ([0, 1, 2, 3, 4].every(i => board[i][j].clicked)) lines++;
  }

  // Diagonals
  if ([0, 1, 2, 3, 4].every(i => board[i][i].clicked)) lines++;
  if ([0, 1, 2, 3, 4].every(i => board[i][4 - i].clicked)) lines++;

  playerLines = lines;
  document.getElementById("player-points").textContent = playerLines;

  if (playerLines >= 5) {
    document.getElementById("message").textContent = "🎉 You Won!";
    document.getElementById("win-sound").play();
  }
}

function revealLeftNumbers() {
  const left = [];

  for (let row of playerBoard) {
    for (let cell of row) {
      if (!cell.clicked) {
        left.push(cell.number);
        cell.clicked = true;
        cell.element.classList.add("clicked");
        cell.element.dataset.clicked = "true";
      }
    }
  }

  checkBingo(playerBoard);

  if (left.length > 0) {
    alert("❗ Numbers you didn't click: " + left.join(", "));
  } else {
    alert("✅ You already clicked all the numbers!");
  }
}


window.onload = createBoard;
