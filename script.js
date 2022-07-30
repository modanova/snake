const snake = document.getElementById("snake");
// Change position use => snake.style.gridColumn = 3; snake.style.gridRow = 3;

const position = {
    row: 1,
    col: 1
}

const move = () => {
    snake.style.gridRow = position.row;
    snake.style.gridColumn = position.col;
}

const reset = () => {
    position.row = 1;
    position.col = 1;
    move();
}

move();


const hitWall = (position) => {
    // Check if hitting the wall;
    let alive = 1;
    if (position > 6 || position < 1) {
        alive = 0;
    }

    return alive;
}

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '38') {
        // up arrow
        let alive = 1;
        position.row--;
        // Check if hitWall();
        alive = hitWall(position.row);
        if (!alive) {
            alert("You have died!");
            reset();
            return;
        }
        move();
        
    } else if (e.keyCode == '40') {
        // down arrow
        let alive = 1;
        position.row++;
        // Check if hitWall();
        alive = hitWall(position.row);
        if (!alive) {
            alert("You have died!");
            reset();
            return;
        }
        move();
    } else if (e.keyCode == '37') {
       // left arrow
        let alive = 1;
        position.col--;
        // Check if hitWall();
        alive = hitWall(position.col);
        if (!alive) {
            alert("You have died!");
            reset();
            return;
        }
        move();
    } else if (e.keyCode == '39') {
       // right arrow
        let alive = 1;
        position.col++;
        // Check if hitWall();
        alive = hitWall(position.col);
        if (!alive) {
            alert("You have died!");
            reset();
            return;
        }
        move();
    }

}

document.addEventListener("keydown", (direction) => {
    checkKey(direction);
});
