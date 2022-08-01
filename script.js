const templateBox = document.getElementById("gridBoxTemplate");
const snakeSegment = document.getElementById("snake-block");
const gameBoard = document.getElementById("board");
let snake = document.querySelectorAll(".snake-segment");
const tail = document.querySelector(".tail");
const playBtn = document.getElementById("play");

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
    [1, 4, snake[0]],
    // Body
    [1, 3, snake[1]],
    [1, 2, snake[2]],
    // Tail
    [1, 1, snake[3]],
  ],

  direction: "none",
};

// SNAKE TRACKING
const trackSnake = () => {
  let head = snakeTrack.body[0];
    // Update snakeTrack.col from body's first element
  snakeTrack.row = head[0];
  snakeTrack.col = head[1];

  head[2].style.gridRow = head[0];
  head[2].style.gridColumn = head[1];
};

const move = () => {
  let newHead = [...snakeTrack.body[0]];
  newHead[2] = undefined;
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

  if (eatFood(newHead)) {
      // if newHead is food, then insert new element as newHead
    snakeTrack.body.unshift(newHead); // add new head coordinates to front of body
    eatGrow(newHead);
  } else {
    // move as normal, tail to the head
    let oldTail = snakeTrack.body.pop();
    newHead[2] = oldTail[2];
    snakeTrack.body.unshift(newHead); // add new head coordinates to front of body
  }

  trackSnake();

  if (hitWall() || hitSelf()) {
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
  coordinates = coordinates.map((x) => x[0] + "." + x[1]);
  
  //Check if all coordinates are unique
  // If not you're dead
  if ((new Set(coordinates)).size !== coordinates.length) {
    dead = true;
  }
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
    console.log(snakeTrack.body);

    return true;
  }
  return false;
};

const eatGrow = (newHead) => {
  let newSegment = snakeSegment.content.cloneNode(true);
  gameBoard.prepend(newSegment);
  newSegment = gameBoard.querySelector(".snake-segment");
  newHead[2] = newSegment;

  newSegment.style.gridRow = newHead[0];
  newSegment.style.gridColumn = newHead[1];

  console.log("I'm big!");
};
