const gameBoard = document.getElementById("game-board");
const context = gameBoard.getContext("2d");
const unitSize = 50;
let velocity = unitSize;
const play = document.getElementById("play");
let start = false;
let count = 0;
const tetrominoes = [
  {
    x: 0,
    y: 0,
    shape: [[1, 1, 1, 1]],
    velocity: 0,
  },
  {
    x: 0,
    y: 0,
    shape: [
      [1, 1],
      [1, 1],
    ],
    velocity: 0,
  },
  {
    x: 0,
    y: 0,
    shape: [
      [0, 1, 0],
      [1, 1, 1],
    ],
    velocity: 0,
  },
  {
    x: 0,
    y: 0,
    shape: [
      [0, 1, 1],
      [1, 1, 0],
    ],
    velocity: 0,
  },
  {
    x: 0,
    y: 0,
    shape: [
      [0, 0, 1],
      [1, 1, 1],
    ],
    velocity: 0,
  },
];
const tetromino2 = tetrominoes.slice();
const rows = [
  0,
  unitSize,
  unitSize * 2,
  unitSize * 3,
  unitSize * 4,
  unitSize * 5,
  unitSize * 6,
  unitSize * 7,
  unitSize * 8,
  unitSize * 9,
];
const columns = [
  0,
  unitSize,
  unitSize * 2,
  unitSize * 3,
  unitSize * 4,
  unitSize * 5,
  unitSize * 6,
  unitSize * 7,
  unitSize * 8,
  unitSize * 9,
  unitSize * 10,
  unitSize * 11,
  unitSize * 12,
  unitSize * 13,
  unitSize * 14,
  unitSize * 15,
];
const tetromino = {
  x: 0,
  y: 0,
};

let doIt1 = false;
let doIt2 = true;
let made = false;
let arrNum = [];

play.addEventListener("click", startGame);

function startGame() {
  if (!start) {
    setTimeout(() => {
      start = true;
      update();
      play.remove();
    }, 300);
  }
}
function update() {
  setTimeout(() => requestAnimationFrame(update), 1000 / 5);
  context.clearRect(0, 0, gameBoard.width, gameBoard.height);
  drawRows();
  makeBlocks();
  moveBlocks();
  checkCollision();
}
function makeBlocks() {
  for (let i = 0; i <= count; i++) {
    tetrominoes.forEach((item, index) => {
      if (index === i) {
        item.shape.forEach((item2, index2) => {
          item2.forEach((item3, index3) => {
            if (item3 !== 0) {
              item.x = index3 * unitSize;
              item.y = index2 * unitSize + item.velocity;
              context.fillStyle = "red";
              context.fillRect(item.x, item.y, unitSize, unitSize);
            }
          });
        });
      }
    });
  }

  if (tetrominoes.length === 1 && doIt1) {
    tetrominoes.splice(0, 1);
    tetrominoes.push(...tetromino2);
  } else if (doIt1) {
    tetrominoes.splice(0, 1);
  }
}
function drawRows() {
  columns.forEach((itemCol, index) => {
    rows.forEach((itemRow, index) => {
      context.beginPath();
      context.lineWidth = 5;
      context.strokeStyle = "rgb(13, 13, 139)";
      context.strokeRect(itemRow, itemCol, unitSize, unitSize);
    });
  });
}
function moveBlocks() {
  // if (doIt2) {
  //   velocity += unitSize;
  // }
  tetrominoes.forEach((item, index) => {
    if (count === index) {
      if (tetrominoes[index - 1]) {
        if (tetrominoes[index - 1].shape.length === 1) {
          if (item.y >= tetrominoes[index - 1].y - 50) {
            count++;
          } else {
            item.velocity += unitSize;
          }
        } else {
          if (item.y >= tetrominoes[index - 1].y - 100) {
            count++;
          } else {
            item.velocity += unitSize;
          }
        }
      } else {
        if (item.y <= 700) {
          item.velocity += unitSize;
        } else {
          count++;
        }
      }
    }
  });
}
function checkCollision() {
  // if (tetromino.y === 700) {
  // }
}
