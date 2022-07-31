const templateBox = document.getElementById("gridBoxTemplate");
const gameBoard = document.getElementById("board");
const snake = document.querySelectorAll(".snake-segment");
const head = document.querySelector(".head");
const tail = document.querySelector(".tail");
const playBtn = document.getElementById("play");

const createGame = (rows) => {
    for (let i = 0; i < rows; i++) {
        let box = templateBox.content.cloneNode(true);
        gameBoard.append(box);
    } 
}

createGame(398);

// =========== SNAKE MOVEMENT ===========  //
const snakeTrack = {
    // Head 
    row: 1,
    col: 4,

    // Tail
    rowTail: 1,
    colTail: 1,

    body: [
        // Read [row, col]
        // Head
        [1, 4],
        // Body
        [1, 3],
        [1, 2],
        // Tail
        [1, 1]
    ], 
    
    direction: "none",
}

//TODO UPDATE SNAKE TRACKING
const trackSnake = () => {
    console.log(snakeTrack.body[0]);
}

const move = () => {
    switch (snakeTrack.direction) {
        case "r":
        // Move right
        // Take first element and move it forward
            
            let nextRight = [];
            nextRight.push(snakeTrack.body[0][0], snakeTrack.body[0][1]); // take body's first element = head
            nextRight[1]++; // col++
            
            snakeTrack.body.unshift(nextRight); // add new head coordinates to front of body
            snakeTrack.body.pop(); // remove last element
            
        // Update snakeTrack.col from body's first element
            snakeTrack.col = snakeTrack.body[0][1];

            trackSnake();

            break;
        
        case "l":
        // Move left
        // Take first element and move it forward
            let nextLeft = [];
            nextLeft.push(snakeTrack.body[0][0], snakeTrack.body[0][1]); // take body's first element = head
            nextLeft[1]--; // col--
            
            snakeTrack.body.unshift(nextLeft); // add new head coordinates to front of body
            snakeTrack.body.pop(); // remove last element
            
        // Update snakeTrack.col from body's first element
            snakeTrack.col = snakeTrack.body[0][1];

            trackSnake();
            break;
        case "u":
        // Move up
            // Take first element and move it forward
            let nextUp = [];
            nextUp.push(snakeTrack.body[0][0], snakeTrack.body[0][1]); // take body's first element = head
            nextUp[0]--; // row--
            
            snakeTrack.body.unshift(nextUp); // add new head coordinates to front of body
            snakeTrack.body.pop(); // remove last element
            
        // Update snakeTrack.col from body's first element
            snakeTrack.row = snakeTrack.body[0][0];
                        
            trackSnake();
            break;
        case "d":
        // Move down
            // Take first element and move it forward
            let nextDown = [];
            nextDown.push(snakeTrack.body[0][0], snakeTrack.body[0][1]); // take body's first element = head
            nextDown[0]++; // row++
            
            snakeTrack.body.unshift(nextDown); // add new head coordinates to front of body
            snakeTrack.body.pop(); // remove last element
            
        // Update snakeTrack.col from body's first element
            snakeTrack.row = snakeTrack.body[0][0];

            trackSnake();
            break;
        case "pause":
        // Pause direction
            break;
        case "none":
            // On startgame
            break;
    }
        
        if (hitWall(snakeTrack)) {
            clearInterval(snakeGo);
            alert("You have died!");
            reset();
            trackSnake();
            return;
        }

    head.style.gridRow = snakeTrack.row;
    head.style.gridColumn = snakeTrack.col;

    // snake.style.gridRow = snakeTrack.row;
    // tail.style.gridRow = snakeTrack.rowTail;

    // snake.style.gridColumn = snakeTrack.col;
    // tail.style.gridColumn = snakeTrack.colTail;
}

const reset = () => {
    snakeTrack.row = 1;
    snakeTrack.col = 1;
    snakeTrack.direction = 'none';
}

const pause = () => {
    snakeTrack.direction = 'pause';
}

// =========== END GAME ===========  //

const hitWall = (position) => {
    // Check if hitting the wall;
    let dead = false;

    if (position.row > 20 || position.row < 1 || position.col > 20 || position.col < 1) {
        dead = true;
    }

    return dead;
}

// TO DO 
// TO END GAME IF BUMPING INTO ITSELF

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
            snakeTrack.direction = "none";
            break;
    }
}

const timer = (speed) => {
    snakeTrack.direction = 'r';
    setInterval(() => {
        move()
    }, speed);
    console.log("this works");
}
const snakeGo = () => {
    timer(400);
}

document.addEventListener("keydown", (e) => {
    checkKey(e);
});


playBtn.addEventListener("click", () => {
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
        snakeGo();
    }
    else {
        reset();
        move();
    }
})


// =========== ADD FOOD TRACKING =========== //

const food = document.getElementById("food");

// FOOD // 

const foodPosition = {
    row: 7,
    col: 8
}

const moveFood = (row, col) => {
    food.style.gridRow = row;
    food.style.gridColumn = col;
}

const randomFood = () => {

    let row = Math.round(Math.random() * 16);
    let col = Math.round(Math.random() * 16);
    
    // TO AVOID PUTTING A SNACK ON SNAKE POSITION
    if (row == snakeTrack.row && col == snakeTrack.col) {
        randomFood();
    }

    foodPosition.row = row;
    foodPosition.col = col;

    moveFood(row, col);

    return foodPosition;
} 

randomFood();


// ████████╗░█████╗░  ██████╗░░█████╗░
// ╚══██╔══╝██╔══██╗  ██╔══██╗██╔══██╗
// ░░░██║░░░██║░░██║  ██║░░██║██║░░██║
// ░░░██║░░░██║░░██║  ██║░░██║██║░░██║
// ░░░██║░░░╚█████╔╝  ██████╔╝╚█████╔╝
// ░░░╚═╝░░░░╚════╝░  ╚═════╝░░╚════╝░

// ========= SNAKE EATS SNACK ========= //