const templateBox = document.getElementById("gridBoxTemplate");
const snakeSegment = document.getElementById("snake-block");
const gameBoard = document.getElementById("board");
let snake = document.querySelectorAll(".snake-segment");
let head = document.querySelector(".head");
const tail = document.querySelector(".tail");
const playBtn = document.getElementById("play");

let snakeLen = 4;
let tag = 0;

// =========== CREATE GAME GRID ===========  //

const createGame = (rows) => {
  for (let i = 0; i < rows; i++) {
    let box = templateBox.content.cloneNode(true);
    gameBoard.append(box);
  }
};

createGame(398);

// =========== SNAKE MOVEMENT ===========  //
const snakeTrack = {
  // Head
  row: 1,
  col: 4,
  body: [
    // Read [row, col]
    // Head
    [1, 1],
    // Body
    [1, 1],
    [1, 1],
    // Tail
    [1, 1],
  ],

  direction: "none",
};

// SNAKE TRACKING
const trackSnake = () => {
  head.classList.remove("head");

  snake = document.querySelectorAll(".snake-segment");
  console.log(snake, tag);

  snake[tag].classList.add("head");
  head = document.querySelector(".head");

  head.style.gridRow = snakeTrack.row;
  head.style.gridColumn = snakeTrack.col;

  if (tag == snakeLen - 1) tag = 0;
  else tag++;
};

const move = () => {
  let newTail = [];
  let newHead = [...snakeTrack.body[0]];
  switch (snakeTrack.direction) {
    case "r":
      // Move right
      // Take first element and move it forward
      newHead[1]++; // col++
      break;

    case "l":
      // Move left
      // Take first element and move it forward
      newHead[1]--; // col--

      break;
    case "u":
      // Move up
      // Take first element and move it forward
      newHead[0]--; // row--

      break;
    case "d":
      // Move down
      // Take first element and move it forward
      newHead[0]++; // row++

      break;

    case "pause":
      // Pause direction

      return;

    case "none":
      // On startgame
      return;
  }

  newTail = eatFood(newHead);

  if (newTail) {
    // move forward
    snakeTrack.body.unshift(newHead); // add new head coordinates to front of body
    eatGrow();
  } else {
    // move as normal
    snakeTrack.body.unshift(newHead); // add new head coordinates to front of body
    snakeTrack.body.pop(); // remove last element
  }

  // Update snakeTrack.col from body's first element
  snakeTrack.row = snakeTrack.body[0][0];
  snakeTrack.col = snakeTrack.body[0][1];

  trackSnake();

  if (hitWall()) {
    clearInterval(snakeGo);
    alert("You have died!");
    reset();
    trackSnake();
    return;
  }

  // snake.style.gridRow = snakeTrack.row;
  // tail.style.gridRow = snakeTrack.rowTail;

  // snake.style.gridColumn = snakeTrack.col;
  // tail.style.gridColumn = snakeTrack.colTail;
};

const reset = () => {
  snakeTrack.row = 1;
  snakeTrack.col = 1;
  snakeTrack.body = [
    [1, 1],
    [1, 1],
    [1, 1],
    [1, 1],
  ];
  snake.forEach((x) => {
    x.style.gridRow = 1;
    x.style.gridColumn = 1;
  });
  snakeTrack.direction = "r";
};

const pause = () => {
  snakeTrack.direction = "pause";
  clearInterval(snakeGo);
};

// =========== END GAME ===========  //

const hitWall = () => {
  // Check if hitting the wall;
  let dead = false;

  if (
    snakeTrack.row > 20 ||
    snakeTrack.row < 1 ||
    snakeTrack.col > 20 ||
    snakeTrack.col < 1
  ) {
    dead = true;
  }

  return dead;
};

// TO END GAME IF BUMPING INTO ITSELF
const hitSelf = () => {
  // Check if hitting itself;
  let dead = false;

  let coordinates = snakeTrack.body;
  coordinates = coordinates.map((x) => x.join("."));

  return dead;
};

// =========== ARROW KEYS EVENT ===========  //

function checkKey(e) {
  e = e || window.event;
  e.preventDefault();

  switch (e.keyCode) {
    case 37:
      snakeTrack.direction = "l";
      break;
    case 38:
      snakeTrack.direction = "u";
      break;
    case 39:
      snakeTrack.direction = "r";
      break;
    case 40:
      snakeTrack.direction = "d";
      break;
    case 32:
      snakeTrack.direction = "pause";
      break;
  }
}

const snakeGo = () => {
  move();
};

playBtn.addEventListener("click", () => {
  document.addEventListener("keydown", (e) => {
    checkKey(e);
  });
  // PROBLEM - ON DOUBLE CLICK TIMER IS SET TWICE!!!
  // Might be - because it sets the timer async

  clearInterval(snakeGo);
  // TODO Interval shoudn't work on window.hidden
  //     document.addEventListener('visibilitychange', function() {
  //     if(document.hidden) {
  //         // tab is now inactive
  //         // temporarily clear timer using clearInterval() / clearTimeout()
  //     }
  //     else {
  //         // tab is active again
  //         // restart timers
  //     }
  // });

  // Start game by setting interval timer

  console.log(snakeTrack.direction);

  if (snakeTrack.direction == "none") {
    snakeTrack.direction = "r";
    setInterval(snakeGo, 400);
    console.log("this works");
  } else {
    clearInterval(snakeGo);
    reset();
  }
});

// =========== ADD FOOD TRACKING =========== //

const food = document.getElementById("food");

// FOOD //

const foodPosition = {
  row: 7,
  col: 8,
};

const moveFood = (row, col) => {
  food.style.gridRow = row;
  food.style.gridColumn = col;
};

const randomFood = () => {
  let row = Math.round(Math.random() * 16);
  let col = Math.round(Math.random() * 16);

  // TO AVOID PUTTING A SNACK ON SNAKE POSITION
  // TODO UPDATE
  if (row == snakeTrack.row && col == snakeTrack.col) {
    randomFood();
  } else {
    foodPosition.row = row;
    foodPosition.col = col;

    moveFood(row, col);

    return foodPosition;
  }
};

randomFood();

// ========= SNAKE EATS SNACK ========= //

const eatFood = (newMove) => {
  // newMove [1, 4]
  // Snack [1, 4]

  if (newMove[0] == foodPosition.row && newMove[1] == foodPosition.col) {
    randomFood();
    console.log("yum");
    const newTailCoor = snakeTrack.body[snakeLen - 1];

    console.log(newTailCoor);
    console.log(snakeTrack.body);

    return newTailCoor;
  }
  return false;
};

const eatGrow = () => {
  let newSegment = snakeSegment.content.cloneNode(true);
  head.after(newSegment);
  // gameBoard.prepend(newSegment);
  snakeLen++;

  newSegment = gameBoard.querySelector(".snake-segment");

  let newTail = snakeTrack.body[snakeLen - 1];

  newSegment.style.gridRow = newTail[0];
  newSegment.style.gridColumn = newTail[1];

  console.log("I'm big!");
};
