// Global variables
var arr = [[], [], [], [], [], [], [], [], []];
var board = [[], [], [], [], [], [], [], [], []];
var sampleBoard = [];

// Get elements and set up the board
window.onload = function () {
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      arr[i][j] = document.getElementById(i * 9 + j);
    }
  }

  // Clear Board button click event handler
  ClearBoard.onclick = function () {
    clearBoard();
    sampleBoard = [];
  };

  // Get Puzzle button click event handler
  GetPuzzle.onclick = function () {
    clearBoard();
    generatePuzzle();
    FillBoard(sampleBoard);
  };

  // Call SudokuSolver with the sample board
  SolvePuzzle.onclick = function () {
    SudokuSolver(sampleBoard, 0, 0, 9);
  };
};

// Function to clear the Sudoku board
function clearBoard() {
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      arr[i][j].innerText = '';
    }
  }
}

// Function to generate a new Sudoku puzzle
function generatePuzzle() {
  // Generate a new random puzzle
  sampleBoard = generateEmptyBoard();
  solvePuzzle(sampleBoard);
  removeNumbersFromBoard(sampleBoard);
}

// Function to generate an empty Sudoku board
function generateEmptyBoard() {
  var board = [];
  for (var i = 0; i < 9; i++) {
    board[i] = [];
    for (var j = 0; j < 9; j++) {
      board[i][j] = 0;
    }
  }
  return board;
}

// Function to solve a Sudoku puzzle
function solvePuzzle(board) {
  // Find an empty cell on the board
  var emptyCell = findEmptyCell(board);
  if (!emptyCell) {
    // Board is solved
    return true;
  }

  var row = emptyCell.row;
  var col = emptyCell.col;

  // Generate a random order of numbers to try
  var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  shuffleArray(numbers);

  // Try different numbers in the empty cell
  for (var i = 0; i < numbers.length; i++) {
    var num = numbers[i];
    if (isValid(board, row, col, num)) {
      board[row][col] = num;
      if (solvePuzzle(board)) {
        return true;
      }
      // Backtrack if the solution is not valid
      board[row][col] = 0;
    }
  }

  return false;
}

// Function to find an empty cell on the board
function findEmptyCell(board) {
  for (var row = 0; row < 9; row++) {
    for (var col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        return { row: row, col: col };
      }
    }
  }
  return null;
}

// Function to remove numbers from a solved Sudoku puzzle
function removeNumbersFromBoard(board) {
  // Determine the number of cells to remove (difficulty level)
  var numToRemove = Math.floor(Math.random() * 20) + 40;

  // Remove numbers from cells randomly
  for (var i = 0; i < numToRemove; i++) {
    var row = Math.floor(Math.random() * 9);
    var col = Math.floor(Math.random() * 9);
    if (board[row][col] !== 0) {
      board[row][col] = 0;
    } else {
      // If the randomly selected cell is already empty, try again
      i--;
    }
  }
}

// Function to fill the Sudoku board with data
function FillBoard(board) {
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      if (board[i][j] !== 0) {
        arr[i][j].innerText = board[i][j];
      } else {
        arr[i][j].innerText = '';
      }
    }
  }
}

// SudokuSolver function
function SudokuSolver(board, i, j, n) {
  if (i === n) {
    // All rows have been filled (0 to 8)
    FillBoard(board);
    return true;
  }

  if (j === n) {
    // Move to the next row
    return SudokuSolver(board, i + 1, 0, n);
  }

  if (board[i][j] !== 0) {
    // Cell is already filled, move to the next cell
    return SudokuSolver(board, i, j + 1, n);
  }

  for (var num = 1; num <= 9; num++) {
    if (isValid(board, i, j, num)) {
      board[i][j] = num;
      if (SudokuSolver(board, i, j + 1, n)) {
        return true;
      }
      // Backtrack if the solution is not valid
      board[i][j] = 0;
    }
  }

  return false;
}

// Function to check if a number is valid in a Sudoku board
function isValid(board, row, col, num) {
  // Check if the number is already present in the current row
  for (var j = 0; j < 9; j++) {
    if (board[row][j] === num) {
      return false;
    }
  }

  // Check if the number is already present in the current column
  for (var i = 0; i < 9; i++) {
    if (board[i][col] === num) {
      return false;
    }
  }

  // Check if the number is already present in the current 3x3 box
  var boxRow = Math.floor(row / 3) * 3;
  var boxCol = Math.floor(col / 3) * 3;
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      if (board[boxRow + i][boxCol + j] === num) {
        return false;
      }
    }
  }

  return true;
}

// Function to shuffle an array using the Fisher-Yates algorithm
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}
