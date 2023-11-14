const gameDisplay = document.querySelector(".game-display");
const gameScore = document.querySelector(".score");
const resetBtn = document.querySelector(".reset-btn");

const ctx = gameDisplay.getContext("2d");

const widthGameDisplay = gameDisplay.width;
const heightGameDisplay = gameDisplay.height;

let backgroundColor = 'white';
let snakeColor = 'green';
let foodColor = 'red';

let size = 25;

let xVelocity = 25;
let yVelocity = 0;

let snakeBody = [
    { x: xVelocity * 4, y: yVelocity },
    { x: xVelocity * 3, y: yVelocity },
    { x: xVelocity * 2, y: yVelocity },
    { x: xVelocity * 1, y: yVelocity },
    { x: xVelocity * 0, y: yVelocity }
];

let snakeHead = {};

let xFoodAxis = 0;
let yFoodAxis = 0;

let running = true;
let score = 0;
let timeoutId = 0;


window.addEventListener("keydown", directionSnake);

resetBtn.addEventListener("click", resetGame);

gameStart();

function gameStart() {
    createFood();
    tick();
}

function tick() {
    if (running) {
        timeoutId = setTimeout(() => {
            clearGameBoard();
            drawFood();
            moveSnake();
            drawSnake();
            gameOver();
            tick();
        }, 90);
    } else {
        displayGameOver();
    }
}

function clearGameBoard() {
    ctx.clearRect(0, 0, widthGameDisplay, heightGameDisplay);
}

function createFood() {
    function randomDirection(value) {
        return Math.floor(Math.random() * value) * size;
    }
    xFoodAxis = randomDirection(20);
    yFoodAxis = randomDirection(20);
};

function drawFood() {
    ctx.fillStyle = foodColor;
    ctx.fillRect(xFoodAxis, yFoodAxis, size, size);
};

function moveSnake() {
    snakeHead = { x: xVelocity + snakeBody[0].x, y: yVelocity + snakeBody[0].y };
    snakeBody.unshift(snakeHead);
    if (snakeHead.x == xFoodAxis && snakeHead.y == yFoodAxis) {
        score++;
        gameScore.textContent = score;
        createFood();
    }
    else {
        snakeBody.pop();
    }
}

function drawSnake() {
    ctx.fillStyle = snakeColor;
    snakeBody.forEach(part => {
        ctx.fillRect(part.x, part.y, size, size);
        ctx.strokeRect(part.x, part.y, size, size);
    });
}

function directionSnake(event) {
    let top = -25;
    let bottom = 25;
    let right = 25;
    let left = -25;
    let key = event.key;
    if (key === "ArrowRight" && xVelocity != left) {
        xVelocity = right;
        yVelocity = 0;
    } else if (key === "ArrowLeft" && xVelocity != right) {
        xVelocity = left;
        yVelocity = 0;
    }
    else if (key === "ArrowUp" && yVelocity != bottom) {
        yVelocity = top;
        xVelocity = 0;
    } else if (key === "ArrowDown" && yVelocity != top) {
        yVelocity = bottom;
        xVelocity = 0;
    }
}

function gameOver() {
    if (snakeHead.x < 0 || snakeHead.x >= widthGameDisplay || snakeHead.y < 0 || snakeHead.y >= heightGameDisplay) {
        running = false;
    }
    else if (running) {
        for (let i = 4; i < snakeBody.length; i++) {
            if (snakeBody[i].x == snakeHead.x && snakeBody[i].y == snakeHead.y) {
                running = false;
                break;
            }
        }
    }
}

function displayGameOver() {
    ctx.font = "50px MV Boli";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER!", widthGameDisplay / 2, heightGameDisplay / 2);
}

function resetGame() {
    xVelocity = 25;
    yVelocity = 0;
    running = true;
    snakeBody = [
        { x: xVelocity * 4, y: yVelocity },
        { x: xVelocity * 3, y: yVelocity },
        { x: xVelocity * 2, y: yVelocity },
        { x: xVelocity * 1, y: yVelocity },
        { x: xVelocity * 0, y: yVelocity }
    ];
    score = 0;
    gameScore.textContent = score;
    gameStart();
}