const board = Array(9).fill(null);
let currentPlayer = 'X';
let gameOver = false;
let computerPlayer = 'O';

const squares = document.querySelectorAll('.square');
const message = document.getElementById('message');
const resetButton = document.getElementById('reset');

squares.forEach(square => {
    square.addEventListener('click', () => {
        const index = square.getAttribute('data-index');
        if (board[index] || gameOver || currentPlayer !== 'X') return;

        
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
            currentPlayer = 'O';
            message.innerText = `${currentPlayer}'s turn`;

            setTimeout(computerMove, 500);
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

function computerMove() {
    if (gameOver) return;

    const bestMove = getBestMove();
    makeMove(computerPlayer, bestMove);

    if (checkForWin()) {
        message.innerText = 'Computer wins!';
        gameOver = true;
    } else if (board.every(square => square !== null)) {
        message.innerText = 'It\'s a draw!';
        gameOver = true;
    } else {
        currentPlayer = 'X';
        message.innerText = `${currentPlayer}'s turn`;
    }
}
function getBestMove() {
    
    for (let i = 0; i < 9; i++) {
        if (!board[i]) {
            board[i] = computerPlayer;
            if (checkForWin()) {
                board[i] = null; 
                return i;
            }
            board[i] = null; 
        }
    }

    for (let i = 0; i < 9; i++) {
        if (!board[i]) {
            board[i] = currentPlayer;
            if (checkForWin()) {
                board[i] = null; 
                return i;
            }
            board[i] = null; 
        }
    }

    
    const corners = [0, 2, 6, 8];
    for (const corner of corners) {
        if (!board[corner]) return corner;
    }

    
    if (!board[4]) return 4;

    const edges = [1, 3, 5, 7];
    for (const edge of edges) {
        if (!board[edge]) return edge;
    }

   
    const emptySquares = [...squares].filter(square => !square.innerText);
    if (emptySquares.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptySquares.length);
        return emptySquares[randomIndex].getAttribute('data-index');
    }

    return -1; 
}

function makeMove(player, index) {
    board[index] = player;
    squares[index].innerText = player;
    squares[index].classList.add(player);
}
