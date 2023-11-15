const square = document.querySelectorAll('.square');
const reset = document.querySelector('#reset');
const changeName = document.querySelector('#changeName');

const game = (function () {
    const board = [[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]];
    let currentPlayer = 1;
    let name1 = 'Player 1';
    let name2 = 'Player 2';


    const setName = function () {
        name1 = prompt('Enter name for player 1');
        name2 = prompt('Enter name for player 2');
    }

    const updatePlayer = function () {
        if (currentPlayer === 1) {
            currentPlayer = 2;
        } else {
            currentPlayer = 1;

        }
    }
    const updateBoard = function (row, col, player) {
        board[row][col] = player;
    }

    const getBoard = function (row, col) {
        return board[row][col];
    }

    const resetBoard = function () {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                board[i][j] = -1;
            }
        }
        square.forEach(square => {
            square.textContent = '';
        })
        currentPlayer = 1;
    }

    const addListeners = function () {
        square.forEach(square => {
            square.addEventListener('click', function (e) {
                if (getBoard(e.target.dataset.row, e.target.dataset.col) === -1) {
                    if (currentPlayer === 1) {
                        e.target.textContent = 'X';
                    } else {
                        e.target.textContent = 'O';
                    }
                    updateBoard(e.target.dataset.row, e.target.dataset.col, currentPlayer);
                    checkWin();
                }
            })
        })
        reset.addEventListener('click', function () {
            resetBoard();
        })
        changeName.addEventListener('click', function () {
            setName();
        })
    }

    const checkTie = function () {
        return board.every(row => row.every(cell => cell !== -1))
    }

    const displayWin = function (winner) {
        if (winner === -1) {
            updatePlayer();
            return;
        } else if (winner === -2) {
            alert('Tie!');
        } else {
            if (winner === 1) {
                alert(`${name1} wins!`);
            } else {
                alert(`${name2} wins!`);
            }
        }
        resetBoard();
    }

    const checkWin = function () {
        for (let x = 0; x < 3; x++) {
            if (getBoard(x, 0) !== -1 && getBoard(x, 0) === getBoard(x, 1) && getBoard(x, 1) === getBoard(x, 2)) {
                displayWin(getBoard(x, 0));
                return;
            }
        }
        for (let y = 0; y < 3; y++) {
            if (getBoard(0, y) !== -1 && getBoard(0, y) === getBoard(1, y) && getBoard(1, y) === getBoard(2, y)) {
                displayWin(getBoard(0, y));
                return;
            }
        }
        if (getBoard(0, 0) !== -1 && getBoard(0, 0) === getBoard(1, 1) && getBoard(1, 1) === getBoard(2, 2)) {
            displayWin(getBoard(0, 0));
            return;
        }
        if (getBoard(0, 2) !== -1 && getBoard(0, 2) === getBoard(1, 1) && getBoard(1, 1) === getBoard(2, 0)) {
            displayWin(getBoard(0, 2));
            return;
        }
        if (checkTie()) {
            displayWin(-2);
            return;
        }

        displayWin(-1);
    }

    return {updatePlayer, updateBoard, getBoard, resetBoard, addListeners, checkWin, checkTie, displayWin, setName};
})();

game.setName();
game.addListeners();