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



window.findNRooksSolution = function (n) {
  var deepCopy = function (originBoard) {
    var rows = originBoard.rows();
    var copyRows = [];
    for (var i = 0; i < rows.length; i++) {
      copyRows.push(rows[i].slice());
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
              // currentBoard.togglePiece(i, j);
              // if (!currentBoard.hasRowConflictAt(i) && !currentBoard.hasColConflictAt(j)) {
              //   populateTree(piecesLeft - 1, currentBoard, i, j);
              // }
              // currentBoard.togglePiece(i, j);
              newBoard = deepCopy(currentBoard);
              newBoard.togglePiece(i, j);
              if (!newBoard.hasRowConflictAt(i) && !newBoard.hasColConflictAt(j)) {
                populateTree(piecesLeft - 1, newBoard, i, j);
              }
            }
          }
        }
      }
    }
  };
  var brd = new Board({ n: n });
  populateTree(n, brd, 0, 0);
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(storage[0].rows()));
  return storage[0].rows();
  // return storage;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function (n) {
  var solCount = 0;
  var optionsAvail = [];
  for (var i = 1; i <= n; i++) {
    optionsAvail.push(i);
  }
  var populate = function (optionsAvailable) {
    if (optionsAvailable.length === 0) {
      solCount++;
    } else {
      for (var i = 0; i < optionsAvailable.length; i++) {
        var arr = optionsAvailable.slice();
        arr.splice(i, 1);
        populate(arr);
      }
    }
  };
  populate(optionsAvail);
  console.log('Number of solutions for ' + n + ' rooks:', solCount);
  return solCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function (n) {
  if (n === 0 || n === 2 || n === 3) {
    var brd = new Board({ n: n });
    solution = brd.rows();
    console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
    return solution;
  }

  var Arr2Brd = function (Arr) {
    var newBrd = new Board({ n: n });
    for (var i = 0; i < Arr.length; i++) {
      newBrd.togglePiece(i, Arr[i] - 1);
    }
    return newBrd;
  };

  var optionsAvail = [];
  for (var i = 1; i <= n; i++) {
    optionsAvail.push(i);
  }
  var solution = [];
  var flag = true;
  var populate = function (optionsAvailable, boardRep) {
    if (optionsAvailable.length === 0) {
      var brd = Arr2Brd(boardRep);
      if (!brd.hasAnyMajorDiagonalConflicts() && !brd.hasAnyMinorDiagonalConflicts()) {
        solution = brd.rows();
        flag = false;
      }
    } else if (flag) {
      for (var i = 0; i < optionsAvailable.length; i++) {
        var copyOptionsAvailable = optionsAvailable.slice();
        var copyBoardRep = boardRep.slice();
        copyBoardRep.push(optionsAvailable[i]);
        copyOptionsAvailable.splice(i, 1);
        populate(copyOptionsAvailable, copyBoardRep);
      }
    }
  };
  populate(optionsAvail, []);

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};



// window.countNQueensSolutions = function (n) {
//   var solCount = 0;

//   var storeDiagOptions = function (obj, board, i) {
//     if (board.indexOf(i + 1) === -1 && i < n-1 && obj.available.indexOf(i + 1) === -1) {
//       obj.diag.push(i + 1);
//       obj.available.splice(i + 1, 1);
//     }
//     if (board.indexOf(i - 1) === -1 && i > 1 && obj.available.indexOf(i - 1) === -1) {
//       obj.diag.push(i - 1);
//       obj.available.splice(i - 1, 1);
//     }
//   };

//   var restoreDiagOptions = function (obj) {
//     obj.available.concat(obj.diag);
//     obj.diag = [];
//   };

//   if (n === 0) {
//     solCount = 1;
//     console.log('Number of solutions for ' + n + ' queens:', solCount);
//     return solCount;
//   }

//   var Arr2Brd = function (Arr) {
//     var newBrd = new Board({ n: n });
//     for (var i = 0; i < Arr.length; i++) {
//       newBrd.togglePiece(i, Arr[i] - 1);
//     }
//     return newBrd;
//   };

//   var optionsInit = {
//     available: [],
//     diag: []
//   };

//   for (var i = 1; i <= n; i++) {
//     optionsInit.available.push(i);
//   }
//   var populate = function (options, boardRep) {
//     debugger;
//     restoreDiagOptions(options);
//     if (options.available.length === 0) {
//       var brd = Arr2Brd(boardRep);
//       if (!brd.hasAnyMajorDiagonalConflicts() && !brd.hasAnyMinorDiagonalConflicts()) {
//         solCount++;
//       }
//     } else {
//       for (var i = 0; i < options.available.length; i++) {
//         var copyOptions = JSON.parse(JSON.stringify(options));
//         var copyBoardRep = boardRep.slice();
//         copyBoardRep.push(options.available[i]);
//         debugger;
//         copyOptions.available.splice(i, 1);
//         storeDiagOptions(copyOptions, copyBoardRep, i);
//         populate(copyOptions, copyBoardRep);
//       }
//     }
//   };
//   populate(optionsInit, []);

//   console.log('Number of solutions for ' + n + ' queens:', solCount);
//   return solCount;
// };

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function (n) {
  var solCount = 0;

  if (n === 0) {
    solCount = 1;
    console.log('Number of solutions for ' + n + ' queens:', solCount);
    return solCount;
  }

  var Arr2Brd = function (Arr) {
    var newBrd = new Board({ n: n });
    for (var i = 0; i < Arr.length; i++) {
      newBrd.togglePiece(i, Arr[i] - 1);
    }
    return newBrd;
  };

  var optionsAvail = [];
  for (var i = 1; i <= n; i++) {
    optionsAvail.push(i);
  }
  var populate = function (optionsAvailable, boardRep) {
    if (optionsAvailable.length === 0) {
      var brd = Arr2Brd(boardRep);
      if (!brd.hasAnyMajorDiagonalConflicts() && !brd.hasAnyMinorDiagonalConflicts()) {
        solCount++;
      }
    } else {
      for (var i = 0; i < optionsAvailable.length; i++   ) {
        var copyOptionsAvailable = optionsAvailable.slice();
        var copyBoardRep = boardRep.slice();
        copyBoardRep.push(optionsAvailable[i]);
        copyOptionsAvailable.splice(i, 1);

        populate(copyOptionsAvailable, copyBoardRep  );
      }
    }
  };
  populate(optionsAvail, []  );

  console.log('Number of solutions for ' + n + ' queens:', solCount);
  return solCount;
};
