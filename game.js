var LEVEL = 5;

var WIDTH = 480;
var HEIGHT = 480;
var V_PAD = 60; // px
var H_PAD = 60; // px

var STONE_R = 10; // px

$(function() {
  console.log("loaded");
  var board = initGame();
  board[[0, 0]] = 0;
  drawBoard(board);
  vuls = vulnerables(board);
  setUpUIMove(board, vuls);
});

function initGame() {
  console.log("init game");
  var board = {};

  for (var i = 0; i < LEVEL; i++) {
    for (var j = 0; j < i + 1; j++) {
      board[[i, j]] = 1;
    }
  }
  return board;
}

function countStone(board) {
  var count = 0;
  for (var i = 0; i < LEVEL; i++) {
    for (var j = 0; j < i + 1; j++) {
      if (board[[i, j]] == 1) {
        count += 1;
      }
    }
  }
  return count;
}


function drawBoard(board) {
  var ctx = document.getElementById("cv").getContext("2d");

  for (var i = 0; i < LEVEL; i++) {
    for (var j = 0; j < i + 1; j++) {
      x = (WIDTH - i * H_PAD) / 2 + j * V_PAD;
      y = V_PAD * (i + 1);
      if (board[[i, j]] == 1) {
        ctx.beginPath();
        ctx.arc(x, y, STONE_R, 0, Math.PI * 2, false);
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2, false);
        ctx.stroke();
      }
    }
  }
}

function setUpUIMove(board, vuls) {
  console.log('set up UI')
  if (vuls.length == 0) {
    $('#message').text('Cant move anymore.');
    return;
  }

  $('#message').text('Choose your move.');
  vuls.forEach(function (v) {
    $('#move-button').append(
      $('<input type="button" class="btn">')
      .val(function () {
        return v.pos[0] + ' - ' + v.pos[1] + ': ' + v.drc_str;
      })
      .click(function () {
        move(board, v.pos, v.drc_str);
        $('#cv').empty();
        var ctx = document.getElementById("cv").getContext("2d");
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
        $('#move-button').empty();
        drawBoard(board);
        vuls = vulnerables(board);
        setUpUIMove(board, vuls);
      })
    );
  });
}

function vulnerables(board) {
  var vuls = [];
  for (var i = 0; i < LEVEL; i++) {
    for (var j = 0; j < i + 1; j++) {
      if (board[[i, j]] == 0) {
        continue;
      }

      if ([[i - 1, j]] in board && [[i - 2, j]] in board
        && board[[i - 1, j]] == 1 && board[[i - 2, j]] == 0) {
        vuls.push({ pos: [i, j], drc_str: "↗"})
      }
      if ([[i + 1, j]] in board && [[i + 2, j]] in board
        && board[[i + 1, j]] == 1 && board[[i + 2, j]] == 0) { pos:
        vuls.push({ pos: [i, j], drc_str: "↙"})
      }
      if ([[i, j + 1]] in board && [[i, j + 2]] in board
        && board[[i, j + 1]] == 1 && board[[i, j + 2]] == 0) { pos:
        vuls.push({ pos: [i, j], drc_str: "→"})
      }
      if ([[i, j - 1]] in board && [[i, j - 2]] in board
        && board[[i, j - 1]] == 1 && board[[i, j - 2]] == 0) {
        vuls.push({ pos: [i, j], drc_str: "←"})
      }
      if ([[i - 1, j - 1]] in board && [[i - 1, j - 1]] in board
        && board[[i - 1, j - 1]] == 1 && board[[i - 2, j - 2]] == 0) {
        vuls.push({ pos: [i, j], drc_str: "↖"})
      }
      if ([[i + 1, j + 1]] in board && [[i + 2, j + 2]] in board
        && board[[i + 1, j + 1]] == 1 && board[[i + 2, j + 2]] == 0) {
        vuls.push({ pos: [i, j], drc_str: "↘"})
      }
    }
  }
  console.log(vuls);
  return vuls;
}

function move(board, pos, drc) {
  console.log(pos)
  console.log(drc)
  i = pos[0];
  j = pos[1];
  if (board[[i, j]] == 0) {
    return board;
  }

  if (drc === "↗" && [[i - 1, j]] in board && [[i - 2, j]] in board
    && board[[i - 1, j]] == 1 && board[[i - 2, j]] == 0) {
    board[[i - 1, j]] = 0;
    board[[i - 2, j]] = 1;
  }
  if (drc === "↙" && [[i + 1, j]] in board && [[i + 2, j]] in board
    && board[[i + 1, j]] == 1 && board[[i + 2, j]] == 0) { pos:
    board[[i + 1, j]] = 0;
    board[[i + 2, j]] = 1;
  }
  if (drc === "→" && [[i, j + 1]] in board && [[i, j + 2]] in board
    && board[[i, j + 1]] == 1 && board[[i, j + 2]] == 0) { pos:
    board[[i, j + 1]] = 0;
    board[[i, j + 2]] = 1;
  }
  if (drc === "←" && [[i, j - 1]] in board && [[i, j - 2]] in board
    && board[[i, j - 1]] == 1 && board[[i, j - 2]] == 0) {
    board[[i, j - 1]] = 0;
    board[[i, j - 2]] = 1;
  }
  if (drc === "↖" && [[i - 1, j - 1]] in board && [[i - 2, j - 2]] in board
    && board[[i - 1, j - 1]] == 1 && board[[i - 2, j - 2]] == 0) {
    board[[i - 1, j - 1]] = 0;
    board[[i - 2, j - 2]] = 1;
  }
  if (drc === "↘" && [[i + 1, j + 1]] in board && [[i + 2, j + 2]] in board
    && board[[i + 1, j + 1]] == 1 && board[[i + 2, j + 2]] == 0) {
    board[[i + 1, j + 1]] = 0;
    board[[i + 2, j + 2]] = 1;
  }
  board[[i, j]] = 0;
  return board;
}
