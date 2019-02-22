//Minesweeper project
//Created by Andre Dupont

class Game {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
  }

  playMove(rowIndex, columnIndex) {
    this._board.flipTile(rowIndex, columnIndex);
    if (this._board.playerBoard[rowIndex][columnIndex] === 'B') {
      console.log('Game over! Here is the final bomb board: ');
      this._board.print();
    }
    else if (this._board.hasSafeTiles()) {
      console.log('Current board: ');
      this._board.print();
    }
    else {
      console.log('Current Board: ');
      this._board.print();
    }
  }
}


class Board {
  constructor (numberOfRows, numberOfColumns, numberOfBombs) {
    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns;

    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generatebombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }

  get playerBoard() {
    return this._playerBoard;
  }

  flipTile (rowIndex, columnIndex) {
    if (this._playerBoard[rowIndex][columnIndex] !== ' ') {
      console.log('Already flipped that tile!');
      return;
    } else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
      this._playerBoard[rowIndex][columnIndex] = 'B';
    } else {
      this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
    }
    this._numberOfTiles--;
  };

  // Function that returns the number of neibouring bombs
  //rowIndex & columnIndex represent the tile that is to be flipped on bombBoard
  getNumberOfNeighborBombs (rowIndex, columnIndex) {
    const neighborOffsets = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1]
    ];
    const numberOfRows = this._bombBoard.length;
    const numberOfColumns = this._bombBoard[0].length;

    let numberOfBombs = 0;

    neighborOffsets.forEach(offset => {
      const neighborRowIndex = rowIndex + offset[0];
      const neighborColumnIndex = columnIndex + offset[1];
      if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows &&
          neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
        if (this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
          numberOfBombs++;
        }
      }
    });
    return numberOfBombs;
  };


  hasSafeTiles (numberOfTiles, numberOfBombs) {
    (this._numberOfTiles !== this._numberOfBombs) //I wrote > instead of !==
      return;
    (this._numberOfTiles === this._numberOfBombs)
      return 'There are no more safe tiles on the board!';
  }

  //function to printboards with pipes and line breaks
  print() {
    console.log(this._playerBoard.map(row => row.join(' | ')).join('\n'));
  }

  // Genereate player board depending on the required numbers of rows and columns
  static generatePlayerBoard (numberOfRows, numberOfColumns) {
    let board = [];
    for (let rowIndex= 0; rowIndex < numberOfRows; rowIndex++){
      let row = [];
      for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++){
        row.push(' ');
      }
      board.push(row);
    }
    return board;
  }

  //Generates bomb board with randomly placed bombs
  static generatebombBoard (numberOfRows, numberOfColumns, numberOfBombs) {
    let board = [];
    for (let rowIndex= 0; rowIndex < numberOfRows; rowIndex++){
      let row = [];
      for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++){
        row.push(null); //why is it null?
      }
      board.push(row);
    }
    let numberOfBombsPlaced = 0;
      while (numberOfBombsPlaced < numberOfBombs) {
        const randomRowIndex = Math.floor(Math.random()*numberOfRows);
        const randomColumnIndex = Math.floor(Math.random()*numberOfColumns);

          if(board[randomRowIndex][randomColumnIndex] !== 'B'){
            board[randomRowIndex][randomColumnIndex] = 'B';
            numberOfBombsPlaced++;
          }
      }
      return board;
    }

}

//test
const g = new Game(3, 3, 3);
g.playMove(0, 0);

//test for generatePlayerBoard
//console.log(generatePlayerBoard(5,5));



//manual input for board printing
/*
const playerBoard = generatePlayerBoard(5, 5);
const bombBoard = generatebombBoard(5, 5, 8);

//printBoard(bombBoard)
//console.log(getNumberOfNeighborBombs(bombBoard, 0, 0))

//manually printing the boards

console.log('Player Board: ')
printBoard(playerBoard);
console.log('Bomb Board: ');
printBoard(bombBoard);
flipTile(playerBoard, bombBoard, 0, 0);
console.log('Updated player board: ');
printBoard(playerBoard);
*/
