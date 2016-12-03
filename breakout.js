var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRadius = 10;

var x = canvas.width / 2;
var y = canvas.height-30;
var dx = 3;
var dy = -3;//Math.random() < 0.5 ? -1 : 1;

var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth)/ 2;
var rightPressed = false;
var leftPressed = false;

var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

var score = 0;

var bricks = [];
for(c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0 , status: 1};
    }
}
function drawBricks(){
    for(c = 0; c < brickColumnCount; c++){
        for (r = 0; r < brickRowCount; r++){
            if(bricks[c][r].status == 1){
                var brickX = (c*(brickWidth + brickPadding)) + brickOffsetLeft;
                var brickY = (r*(brickHeight + brickPadding)) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
};


document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e){
    if (e.keyCode == 39){
        rightPressed = true;
    }
    else if(e.keyCode == 37){
        leftPressed = true;
    }
}

function keyUpHandler(e){
    if(e.keyCode == 39){
        rightPressed = false;
    }else if(e.keyCode == 37){
        leftPressed = false;
    }
}

function collisionDetection() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                if (b.status == 1){
                    b.status = 0;
                    dy = -dy;
                    score++;
                    if (score == brickRowCount * brickColumnCount){
                        alert("You win, congrats !\nScore: " + score);
                        document.location.reload();
                    }
                }
            }
        }
    }
}

function drawScore(){
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 8, 20);
}

function drawPaddle(){
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawBall(){
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawBricks();
    drawScore();
    if (x+dx+ballRadius > canvas.width || x+dx-ballRadius < 0){
        dx = -dx;
    }


    if (y+dy-ballRadius < 0){
        dy = -dy
    }else if(y+dy+ballRadius > canvas.height){
        if(x > paddleX && x < paddleX + paddleWidth){
            dy = -dy;
        }else{
            console.log("GAME OVER");
            document.location.reload();
        }
    }
    x += dx;
    y += dy;
    if(rightPressed && paddleX + paddleWidth < canvas.width){
        paddleX += 7;
    }else if(leftPressed && paddleX > 0){
        paddleX -= 7;
    }
    collisionDetection();
}

var paused = false;
var int = setInterval(draw, 10);

document.body.addEventListener("click", function(){
    if (!paused){
        clearInterval(int);
        paused = true;
    }else {
        int = setInterval(draw, 10);
        paused = false;
    }
});

