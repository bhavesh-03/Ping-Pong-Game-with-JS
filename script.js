// Initialize canvas
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// getting the buttons
var startBtn = document.getElementById("start-btn");
var pauseBtn = document.getElementById("pause-btn");
var restartBtn = document.getElementById("restart-btn");
var animationId;
var gameRunning = false;

// setting start buttons 
startBtn.addEventListener("click", function() {
    if (!gameRunning) { // only start the game if gameRunning is false
        gameRunning = true; // set gameRunning to true when the game starts
        loop();
    }
});

// setting pause button 
pauseBtn.addEventListener("click", function() {
  // if(gameRunning==true){
  //   gameRunning=false;
  // }else{
  //   gameRunning=true;
  // }
  gameRunning = false;
    // comment the below line and then try to pause the game
    cancelAnimationFrame(animationId);
});


// setting restart button
restartBtn.addEventListener("click", function() {
    document.location.reload()
});


addEventListener("load", (event) => {
    draw();
});
// draw();


// Define ball properties
var ballRadius = 10;
var ballX = canvas.width / 2;
var ballY = canvas.height / 2;
var ballSpeedX = 5;
var ballSpeedY = 5;

// Define paddle properties
var paddleHeight = 80;
var paddleWidth = 10;
var leftPaddleY = canvas.height / 2 - paddleHeight / 2;
var rightPaddleY = canvas.height / 2 - paddleHeight / 2;
var paddleSpeed = 10;

// Define score properties
var leftPlayerScore = 0;
var rightPlayerScore = 0;
var maxScore = 10 ;


// draw objects on canvas 
function draw() {
    // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // line properties
  ctx.fillStyle = "white";
  ctx.font = "30px Arial";
  ctx.lineWidth = 2;
  
  // draw net
  ctx.beginPath();
  ctx.setLineDash([15, 15]);
  ctx.moveTo(canvas.width / 2,0);
  ctx.lineTo(canvas.width / 2, canvas.height);
  ctx.strokeStyle = "#ffffff"; // Set line color to white
  ctx.stroke();
  ctx.closePath();

  // draw ball 
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
  ctx.fill();
  ctx.closePath();
  ctx.fillRect(0, leftPaddleY, paddleWidth, paddleHeight);

  // Draw right paddle
  ctx.fillRect(canvas.width - paddleWidth, rightPaddleY, paddleWidth, paddleHeight);

  // Draw scores
  ctx.fillText(  leftPlayerScore, canvas.width/4, 30);
  ctx.fillText(rightPlayerScore, canvas.width - canvas.width/4, 30);

}



// getting keys 
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

// setting keys as false 
var upPressed = false;
var downPressed = false;
let wPressed = false;
let sPressed = false;

// handle down key press
function keyDownHandler(e) {
  if (e.key === "ArrowUp") {
    upPressed = true;
  } else if (e.key === "ArrowDown") {
    downPressed = true;
  } else if (e.key === "w") {
    wPressed = true;
  } else if (e.key === "s") {
    sPressed = true;
  }
}

// handle up key press
function keyUpHandler(e) {
  if (e.key === "ArrowUp") {
    upPressed = false;
  } else if (e.key === "ArrowDown") {
    downPressed = false;
  } else if (e.key === "w") {
    wPressed = false;
  } else if (e.key === "s") {
    sPressed = false;
  }
}

// update on key pressed
function update(){
    // Move Paddles 
    if(upPressed && rightPaddleY>0){
      rightPaddleY-=paddleSpeed;
    }else if (downPressed && rightPaddleY + paddleHeight < canvas.height) {
    rightPaddleY += paddleSpeed;
  }

  // move left paddle using w and s ; 
  if (wPressed && leftPaddleY > 0) {
    leftPaddleY -= paddleSpeed;
  } else if (sPressed && leftPaddleY + paddleHeight < canvas.height) {
    leftPaddleY += paddleSpeed;
  }

  // ball speed ; 
  ballX += ballSpeedX ;
  ballY += ballSpeedY ;

  // if ball collides with the top of the canvas or bottom of the canvas ;
    if(ballY - ballRadius < 0 || ballY+ballRadius > canvas.height){
      ballSpeedY = -ballSpeedY ;
    }
 
  // if ball collieds with left paddle 
  if(ballX - ballRadius<paddleWidth && ballY > leftPaddleY && ballY<leftPaddleY + paddleHeight ) {
    ballSpeedX=-ballSpeedX
  } 

  if(ballX + ballRadius>canvas.width && ballY > rightPaddleY && ballY<rightPaddleY + paddleHeight ) {
    ballSpeedX=-ballSpeedX
  } 


   // Check if ball goes out of bounds on left or right side of canvas
  if (ballX < 0) {
    rightPlayerScore++;
    reset();
  } else if (ballX > canvas.width) {
    leftPlayerScore++;
    reset();
  }

  if (leftPlayerScore === maxScore) {
    playerWin("Left player");
  } else if (rightPlayerScore === maxScore) {
    playerWin("Right player");
  }
}

// Reset the ball to orignal position 
function reset(){
  ballX = canvas.width/2 ; 
  ballY = canvas.height/2 ;
  ballSpeedX=-ballSpeedX  ;
  ballSpeedY=Math.random() * 10 -5 ;
}

// player win message function 
function playerWin(player){
  if (alert(`Congratulations to the ` + player + " for winning the set! ")) {
    reload() ;
  } else {
    reload() ;
  }
}

// game on the loop if one set ends and need to start another set
function loop(){
    if(gameRunning){
        update()
        draw();
        animationId = requestAnimationFrame(loop);
    }
}

