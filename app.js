let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

function makeMove(index) {
    if (gameActive && board[index] === '') {
        board[index] = currentPlayer;
        updateBoard();
        checkWinner();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

        // If the game is still active, let the bot make a move
        if (gameActive && currentPlayer === 'O') {
            makeBotMove();
        }
    }
}

function makeBotMove() {
    // Simple bot logic: Find the first empty cell and make a move
    const emptyCells = board.reduce((acc, cell, index) => {
        if (cell === '') {
            acc.push(index);
        }
        return acc;
    }, []);

    if (emptyCells.length > 0) {
        const botMove = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        setTimeout(() => makeMove(botMove), 500); // Introduce a delay for a more natural feel
    }
}

function updateBoard() {
    const cells = document.getElementsByClassName('cell');
    for (let i = 0; i < cells.length; i++) {
        cells[i].textContent = board[i];
        cells[i].classList.remove('clicked');
    }
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameActive = false;
            displayResult(`${currentPlayer} wins! Congratulations!`);
            return;
        }
    }

    if (!board.includes('')) {
        gameActive = false;
        displayResult("It's a draw!");
    }
}

function displayResult(result) {
    const resultElement = document.getElementById('result');
    resultElement.textContent = result;
    resultElement.classList.add('show');
    setTimeout(() => {
        resultElement.classList.remove('show');
    }, 3000); // Display result for 3 seconds
}

function restartGame() {
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    updateBoard();
    displayResult('');

    // If the game starts with the bot, make the first move
    if (currentPlayer === 'O') {
        makeBotMove();
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const cells = document.getElementsByClassName('cell');
    for (let i = 0; i < cells.length; i++) {
        cells[i].addEventListener('click', function () {
            makeMove(i);
            this.classList.add('clicked');
        });
    }
});
