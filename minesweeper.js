//Minesweeper project
//Created by Andre Dupont

// Genereate player board depending on the required numbers of rows and columns
const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
  let board = [];
  for (let rowIndex= 0; rowIndex < numberOfRows; rowIndex++){
    let row = [];
    for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++){
      row.push(' ');
    }
    board.push(row);
  }
  return board;
};


//test for generatePlayerBoard
//console.log(generatePlayerBoard(5,5));

//Generates bomb board with randomly placed bombs
let generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
  let board = [];
  for (let rowIndex= 0; rowIndex < numberOfRows; rowIndex++){
    let row = [];
    for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++){
      row.push(null);
    }
    board.push(row);
  }
  let numberOfBombsPlaced = 0;
  /*The code in your while loop has the potential to place bombs
  on top of already existing bombs. This will be fixed when you learn \
  about control flow.*/
    while (numberOfBombsPlaced < numberOfBombs) {
      let randomRowIndex = Math.floor(Math.random()*numberOfRows);
      let randomColumnIndex = Math.floor(Math.random()*numberOfColumns);

      board[randomRowIndex][randomColumnIndex] = 'B';

      numberOfBombsPlaced +=1;
    }
    return board;
  };

//function to printboards with pipes and line breaks
const printBoard = (board) => {
  console.log(board.map(row => row.join(' | ')).join('\n'));
};

//manual input for board printing
let playerBoard = generatePlayerBoard(3, 4);
printBoard(playerBoard);
let bombBoard = generateBombBoard(3, 4, 5);

//manually printing the boards
console.log('Player Board: ')
printBoard(playerBoard);
console.log('Bomb Board: ')
printBoard(bombBoard);
