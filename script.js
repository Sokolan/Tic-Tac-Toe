const player = (sign) => {
  return { sign };
};

const humanPlayer = (sign) => {
  const {sign} = 
};

// board object, responsible for handling changes to board,
// storing it's state, and giving information about the state of the board
const gameBoard = (() => {
  const board = [];
  const rows = 3;
  const culs = 3;
  const empty = 'Empty';

  const cleanBoard = () => {
    for (let i = 0; i < rows; i += 1) {
      board[i] = [];
      for (let j = 0; j < culs; j += 1) {
        board[i][j] = empty;
      }
    }
  };

  // returns true/false base on if move was made
  const makeMove = (player, row, col) => {
    if (row > rows || col > culs) {
      return false;
    }

    if (board[row][col] !== empty) {
      return false;
    }

    board[row][col] = player;
    return true;
  };

  const consoleBoard = () => {
    console.log(board);
  };

  const getBoard = () => board;

  const checkForWin = (player) => {
    // check for a row win
    for (let row = 0; row < rows; row += 1) {
      if (board[row][0] === player && board[row][1] === player && board[row][2] === player) {
        return true;
      }
    }
    // check for culomn win
    for (let cul = 0; cul < culs; cul += 1) {
      if (board[0][cul] === player && board[1][cul] === player && board[2][cul] === player) {
        return true;
      }
    }
    // check for diagonal win
    if ((board[0][0] === player && board[1][1] === player && board[2][2] === player)
      || (board[2][0] === player && board[1][1] === player && board[0][2] === player)) {
      return true;
    }

    // if no diagonal or row or cul win, then no win
    return false;
  };

  return {
    cleanBoard,
    getBoard,
    consoleBoard,
    checkForWin,
    makeMove,
  };
})();

//
const gameControl = (() => {})();

// const displayControl = () => {

// }

gameBoard.cleanBoard();
gameBoard.makeMove('X', 0, 0);
gameBoard.makeMove('X', 1, 0);
gameBoard.makeMove('O', 2, 0);
console.log(gameBoard.checkForWin('X'));
console.log(gameBoard.getBoard());
