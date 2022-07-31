const templateBox = document.getElementById("gridBoxTemplate");
const gameBoard = document.getElementById("board");
const snake = document.getElementById("snake");
const playBtn = document.getElementById("play");

const createGame = (rows) => {
    for (let i = 0; i < rows; i++) {
        let box = templateBox.content.cloneNode(true);
        gameBoard.append(box);
    } 
}

createGame(398);


const snakeTrack = {
    row: 1,
    col: 1,
    direction: "none",
    coor: [
        // To read [row, col]
        [1, 1]
    ]
}

const trackSnake = () => {
    snakeTrack.coor.shift();
    snakeTrack.coor.push([snakeTrack.row, snakeTrack.col]);
    console.log(snakeTrack.coor);
}


const move = () => {
    switch (snakeTrack.direction) {
        case "r":
        // Move right
            snakeTrack.col++;
            trackSnake();
            break;
        case "l":
        // Move left
            snakeTrack.col--;
            trackSnake();
            break;
        case "u":
        // Move up
            snakeTrack.row--;
            trackSnake();
            break;
        case "d":
        // Move down
            snakeTrack.row++;
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

    snake.style.gridRow = snakeTrack.row;
    snake.style.gridColumn = snakeTrack.col;
}

const reset = () => {
    snakeTrack.row = 1;
    snakeTrack.col = 1;
    snakeTrack.direction = 'none';
}

const pause = () => {
    snakeTrack.direction = 'pause';
}


const hitWall = (position) => {
    // Check if hitting the wall;
    let dead = false;

    if (position.row > 20 || position.row < 1 || position.col > 20 || position.col < 1) {
        dead = true;
    }

    return dead;
}

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

const snakeGo = () => {
    snakeTrack.direction = 'r';
    let speed = 400;
    setInterval(() => {
        move()
    }, speed);
    console.log("this works");
}

document.addEventListener("keydown", (e) => {
    checkKey(e);
});


playBtn.addEventListener("click", () => {

    // TODO Interval doesn't work on window.hidden
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

    clearInterval(snakeGo);
    console.log(snakeTrack.direction);

    if (snakeTrack.direction == "none") {
        snakeGo();
    }
    else {
        reset();
    }
})


