const snake = document.getElementById("snake");
// Change position use => snake.style.gridColumn = 3; snake.style.gridRow = 3;

const position = {
    row: 1,
    col: 1
}

let direction = "r";


const move = () => {
    switch (direction) {
        case "r":
        // Move right
            position.col++;
            break;
        case "l":
        // Move left
            position.col--;
            break;
        case "u":
        // Move up
            position.row--;
            break;
        case "d":
        // Move down
            position.row++;
            break;
        case "none":
        // Move down
            break;
    }
        
        if (hitWall(position)) {
            alert("You have died!");
            reset();
            return;
        }

    snake.style.gridRow = position.row;
    snake.style.gridColumn = position.col;
}

const reset = () => {
    position.row = 1;
    position.col = 1;
    direction = 'r';
}

const pause = () => {
    direction = 'none';
}


const hitWall = (position) => {
    // Check if hitting the wall;
    let dead = false;

    if (position.row > 6 || position.row < 1 || position.col > 6 || position.col < 1) {
        dead = true;
    }

    return dead;
}

function checkKey(e) {
    e = e || window.event;
    e.preventDefault();
    console.log(e.keyCode);
    
    switch (e.keyCode) {
        case 37:
            direction = "l";
            break;
        case 38:
            direction = "u";
            break;
        case 39:
            direction = "r";
            break;
        case 40:
            direction = "d";
            break;
        case 32:
            direction = "none";
            break;
    }
}

document.addEventListener("keydown", (e) => {
    checkKey(e);
});

let speed = 1000;
    setInterval(() => {
        move()
    }, speed);