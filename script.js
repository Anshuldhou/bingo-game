let board = [];
let selected = [];
let winCount = 0;

// Create a shuffled 5x5 Bingo board
function createBoard() {
    const numbers = Array.from({ length: 25 }, (_, i) => i + 1).sort(() => 0.5 - Math.random());
    board = [];
    selected = [];
    winCount = 0;
    document.getElementById("message").textContent = "";

    for (let i = 0; i < 5; i++) {
        board.push(numbers.slice(i * 5, i * 5 + 5));
        selected.push([false, false, false, false, false]);
    }

    renderBoard();
}

// Render the board in HTML
function renderBoard() {
    const boardDiv = document.getElementById("bingo-board");
    boardDiv.innerHTML = "";

    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            const cell = document.createElement("div");
            cell.className = "cell";
            cell.textContent = board[i][j];
            if (selected[i][j]) cell.classList.add("selected");
            cell.onclick = () => handleClick(i, j);
            boardDiv.appendChild(cell);
        }
    }
}

// Handle cell click
function handleClick(row, col) {
    if (!selected[row][col]) {
        selected[row][col] = true;
        renderBoard();
        checkWin();
    }
}

// Check rows, columns, and diagonals
function checkWin() {
    let count = 0;

    // Check rows
    for (let i = 0; i < 5; i++) {
        if (selected[i].every(val => val)) count++;
    }

    // Check columns
    for (let j = 0; j < 5; j++) {
        let colComplete = true;
        for (let i = 0; i < 5; i++) {
            if (!selected[i][j]) {
                colComplete = false;
                break;
            }
        }
        if (colComplete) count++;
    }

    // Diagonal 1
    if ([0, 1, 2, 3, 4].every(i => selected[i][i])) count++;

    // Diagonal 2
    if ([0, 1, 2, 3, 4].every(i => selected[i][4 - i])) count++;

    if (count >= 5 && winCount === 0) {
        winCount = count;
        document.getElementById("message").textContent = `🎉 You won the match!`;
        document.getElementById("winSound").play();
    }
}

// Restart the game
function restartGame() {
    if (confirm("Are you sure you want to restart the game?")) {
        createBoard();
    }
}

// Show remaining numbers (Defeat)
function showRemaining() {
    const left = [];
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            if (!selected[i][j]) {
                left.push(board[i][j]);
            }
        }
    }

    alert("Numbers left: " + left.join(", "));
}

window.onload = createBoard;
