const board = Array(9).fill(null);
let currentPlayer = 'X';
let gameOver = false;

const squares = document.querySelectorAll('.square');
const message = document.getElementById('message');
const resetButton = document.getElementById('reset');

squares.forEach(square => {
    square.addEventListener('click', () => {
        const index = square.getAttribute('data-index');
        if (board[index] || gameOver) return;

       
        board[index] = currentPlayer;
        square.innerText = currentPlayer;
        square.classList.add(currentPlayer);

        if (checkForWin()) {
            message.innerText = `${currentPlayer} wins!`;
            gameOver = true;
        } else if (board.every(square => square !== null)) {
            message.innerText = 'It\'s a draw!';
            gameOver = true;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            message.innerText = `${currentPlayer}'s turn`;
        }
    });
});

resetButton.addEventListener('click', () => {
    resetGame();
});

function resetGame() {
    board.fill(null);
    squares.forEach(square => {
        square.innerText = '';
        square.classList.remove('X', 'O');
    });
    currentPlayer = 'X';
    gameOver = false;
    message.innerText = 'X\'s turn';
}

function checkForWin() {
    const winCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const combination of winCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }

    return false;
}
