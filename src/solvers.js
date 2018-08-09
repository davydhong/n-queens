/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var deepCopy = function(originBoard) {
    var rows = originBoard.rows();
    var copyRows = []
    for (var i = 0; i < rows.length; i++) {
      copyRows.push(  rows[i].slice() );
    }
    var newBoard = new Board(copyRows);
    return newBoard;
  };

  var storage = [];
  var flag = true;
  var populateTree = function (piecesLeft, currentBoard, row, col) {
    if (!currentBoard.hasAnyRowConflicts() && !currentBoard.hasAnyColConflicts()) {
      if (piecesLeft === 0) {
        storage.push(currentBoard);
        flag = false;
      } else {
        for (var i = row; i < currentBoard.rows().length; i++) {
          for (var j = col; j < currentBoard.rows().length; j++) {
            if (currentBoard.rows()[i][j] === 0 && flag) {
              newBoard = deepCopy(currentBoard);
              newBoard.togglePiece(i, j);
              if (!newBoard.hasRowConflictAt(i) && !newBoard.hasColConflictAt(j)){
                populateTree(piecesLeft - 1, newBoard, i, j);
              }
            }
          } 
        }
      }
    }
  };
  var brd = new Board({n : n});
  populateTree(n, brd, 0 , 0);
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(storage[0].rows()));
  return storage[0].rows();
  // return storage;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var deepCopy = function(originBoard) {
    var rows = originBoard.rows();
    var copyRows = []
    for (var i = 0; i < rows.length; i++) {
      copyRows.push(  rows[i].slice() );
    }
    var newBoard = new Board(copyRows);
    return newBoard;
  };

  var storage = [];
  // var flag = true;
  var populateTree = function (piecesLeft, currentBoard, row, col) {
    if (!currentBoard.hasAnyRowConflicts() && !currentBoard.hasAnyColConflicts()) {
      if (piecesLeft === 0) {
        storage.push(currentBoard);
        flag = false;
      } else {
        for (var i = row; i < currentBoard.rows().length; i++) {
          for (var j = 0; j < currentBoard.rows().length; j++) {
            if (currentBoard.rows()[i][j] === 0                              ) {
              newBoard = deepCopy(currentBoard);
              newBoard.togglePiece(i, j);
              if (!newBoard.hasRowConflictAt(i) && !newBoard.hasColConflictAt(j)){
                populateTree(piecesLeft - 1, newBoard, i, j);
              }
            }
          } 
        }
      }
    }
  };
  var brd = new Board({n : n});
  populateTree(n, brd , 0, 0);
  console.log('Number of solutions for ' + n + ' rooks:', storage.length);
  return storage.length;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var deepCopy = function(originBoard) {
    var rows = originBoard.rows();
    var copyRows = []
    for (var i = 0; i < rows.length; i++) {
      copyRows.push(  rows[i].slice() );
    }
    var newBoard = new Board(copyRows);
    return newBoard;
  };

  var storage = [];
  var flag = true;
  var populateTree = function (piecesLeft, currentBoard) {
    if (!currentBoard.hasAnyRowConflicts() && !currentBoard.hasAnyColConflicts()) {
      if (piecesLeft === 0) {
        storage.push(currentBoard);
        flag = false;
      } else {
        for (var i = 0; i < currentBoard.rows().length; i++) {
          for (var j = 0; j < currentBoard.rows().length; j++) {
            if (currentBoard.rows()[i][j] === 0 && flag) {
              newBoard = deepCopy(currentBoard);
              newBoard.togglePiece(i, j);
              if (!newBoard.hasRowConflictAt(i) && !newBoard.hasColConflictAt(j)){
                populateTree(piecesLeft - 1, newBoard, i, j);
              }
            }
          } 
        }
      }
    }
  };
  var brd = new Board({n : n});
  populateTree(n, brd);
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(storage[0].rows()));
  return storage[0].rows();
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
