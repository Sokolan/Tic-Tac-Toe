const player = (sign, name, isHuman) => {
  const getName = () => name;
  const getSign = () => sign;
  return { getSign, getName, isHuman };
};

// board object, responsible for handling changes to board,
// storing it's state, and giving information about the state of the board
const gameBoard = (() => {
  const board = [];
  const rows = 3;
  const culs = 3;
  let movesMade = 0;
  const empty = 'Empty';

  const cleanBoard = () => {
    for (let i = 0; i < rows; i += 1) {
      board[i] = [];
      for (let j = 0; j < culs; j += 1) {
        board[i][j] = empty;
      }
    }
    movesMade = 0;
  };

  // returns true/false base on if move was made
  const makeMove = (sign, row, col) => {
    if (row > rows || col > culs) {
      return false;
    }

    if (board[row][col] !== empty) {
      return false;
    }

    board[row][col] = sign;
    movesMade += 1;
    return true;
  };

  const consoleBoard = () => {
    console.log(board);
  };

  const getBoard = () => board;

  const checkForWin = (sign) => {
    // check for a row win
    for (let row = 0; row < rows; row += 1) {
      if (board[row][0] === sign && board[row][1] === sign && board[row][2] === sign) {
        return true;
      }
    }
    // check for culomn win
    for (let cul = 0; cul < culs; cul += 1) {
      if (board[0][cul] === sign && board[1][cul] === sign && board[2][cul] === sign) {
        return true;
      }
    }
    // check for diagonal win
    if ((board[0][0] === sign && board[1][1] === sign && board[2][2] === sign)
      || (board[2][0] === sign && board[1][1] === sign && board[0][2] === sign)) {
      return true;
    }

    // if no diagonal or row or cul win, then no win
    return false;
  };

  const checkIfCellAvailable = (row, cul) => (board[row][cul] === empty);

  const getMovesMade = () => movesMade;

  return {
    getMovesMade,
    checkIfCellAvailable,
    cleanBoard,
    getBoard,
    consoleBoard,
    checkForWin,
    makeMove,
  };
})();

//
const gameControl = (() => {
  let gameState;
  const players = [];
  let currPlayer;

  const board = gameBoard;

  const aiPlayer = (() => {
    const makeEasyMove = () => {
      let row = Math.floor(Math.random() * 3);
      let cul = Math.floor(Math.random() * 3);

      let available = board.checkIfCellAvailable(row, cul);
      while (!available) {
        row = Math.floor(Math.random() * 3);
        cul = Math.floor(Math.random() * 3);
        available = board.checkIfCellAvailable(row, cul);
      }
      makeMove(row, cul);
    };
    return {
      makeEasyMove,
    };
  })();

  const initiateGame = (playerOneName, playerTwoName, playerVsAi, playerOneStart) => {
    // player one 0, player two 1 in array
    board.cleanBoard();
    currPlayer = playerOneStart ? 0 : 1;
    gameState = 'undesided';

    const playerOneSign = playerOneStart ? 'X' : 'O';
    const playerOne = player(playerOneSign, playerOneName, true);

    const playerTwoSign = playerOneStart ? 'O' : 'X';
    const playerTwo = player(playerTwoSign, playerTwoName, !playerVsAi);

    players.pop();
    players.pop();
    players.push(playerOne);
    players.push(playerTwo);

    if (!players[currPlayer].isHuman) {
      aiPlayer.makeEasyMove();
    }
  };

  const makeMove = (row, cul) => {
    if (gameState !== 'undesided' || board.getMovesMade() === 9) {
      return;
    }

    const moveWasMade = board.makeMove(players[currPlayer].getSign(), row, cul);
    if (!moveWasMade) {
      console.log('Illegal parameters');
      return;
    }

    board.consoleBoard();

    if (board.checkForWin(players[currPlayer].getSign())) {
      console.log(`${players[currPlayer].getName()} Wan!`);
      gameState = 'wan';
      return;
    }

    currPlayer = (currPlayer + 1) % 2;
    if (!players[currPlayer].isHuman && board.getMovesMade() < 9) {
      aiPlayer.makeEasyMove();
      return;
    }

    if (board.getMovesMade() === 9) {
      gameState = 'tie';
      console.log('it\'s a tie!');
    }
  };

  const getCurrPlayer = () => currPlayer;

  const getGameState = () => gameState;

  return {
    initiateGame,
    makeMove,
    getCurrPlayer,
    getGameState,
  };
})();

const game = gameControl;
game.initiateGame('dambo', 'Baboon', true, false);
