const square = document.querySelectorAll('.square');

const game = (function (){
    const board = [[-1,-1,-1],[-1,-1,-1],[-1,-1,-1]];
    let currentPlayer = 0;

    const updatePlayer = function (){
        currentPlayer = !currentPlayer;
    }
    const updateBoard = function (row, col, player){
        board[row][col] = player;
    }

    const getBoard = function (row,col){
        return board[row][col];
    }

    const resetBoard = function (){
        board.forEach(row => {
            row.forEach(col => {
                col = 0;
            })
        })
    }

    const addListeners = function (){
        square.forEach(square => {
            square.addEventListener('click', function(e){
                if (getBoard(e.target.dataset.row, e.target.dataset.col) === -1){
                    square.textContent = currentPlayer ? 'X' : 'O';
                    updateBoard(e.target.dataset.row, e.target.dataset.col, currentPlayer);
                    updatePlayer();
                }
            })
        })
    }

    return {updatePlayer, updateBoard, getBoard, resetBoard, addListeners};
})();

game.addListeners();