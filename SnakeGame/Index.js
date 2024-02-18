const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

class SnakePart {
    constructor(x,y) {
        this.x=x;
        this.y=y;

    }
}
let speed = 3;
let tileCount = 15;
let tileSize = 10; 

let headX = 10;
let headY = 10;

let appleX =5;
let appleY =5;

let yVelocity = 0;
let xVelocity = 0;
const snakeParts = [];
let tailLength = 2;
let score = 0 ;
let result=false;


function GameLoop() {        
    changeSnakePosition();
    let result = isGameOver();
    if (result) {
      return;
    }
    clearScreen();
    changeSnakePosition();
    console.log("drawgame");
    setTimeout(GameLoop, 1000/speed);
    drawSnake();
    drawApple();
    checkAppleColision();
    drawScore();

}


function isGameOver() {
    let gameOver = false;
  
    if (yVelocity === 0 && xVelocity === 0) {
      return false;
    }
  
    //walls
    if (headX < 0) {
      gameOver = true;
    } else if (headX === tileCount) {
      gameOver = true;
    } else if (headY < 0) {
      gameOver = true;
    } else if (headY === tileCount) {
      gameOver = true;
    }
  
    for (let i = 0; i < snakeParts.length; i++) {
      let part = snakeParts[i];
      if (part.x === headX && part.y === headY) {
        gameOver = true;
        break;
      }
    }
  
    if (gameOver) {
      ctx.fillStyle = "white";
      ctx.font = "50px Verdana";
  
      if (gameOver) {
        ctx.fillStyle = "white";
        ctx.font = "50px Verdana";
  
        var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop("0", " magenta");
        gradient.addColorStop("0.5", "blue");
        gradient.addColorStop("1.0", "red");
        // Fill with gradient
        ctx.fillStyle = gradient;
  
        ctx.fillText("Game Over!", canvas.width / 6.5, canvas.height / 2);
      }
  
      ctx.fillText("Game Over!", canvas.width / 6.5, canvas.height / 2);
    }
  
    return gameOver;
  }
  


function clearScreen() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

function drawSnake(){
    
    ctx.fillStyle = "green";
    for(let i=0; i<snakeParts.length; i++) {
        let part = snakeParts[i]
        ctx.fillRect(part.x *tileCount, part.y*tileCount,tileSize, tileSize)
    }

    snakeParts.push(new SnakePart(headX,headY));
  //  if(snakeParts.length>tailLength){
    //    snakeParts.shift();
    //}
    while(snakeParts.length>tailLength){
        snakeParts.shift();
    }

    ctx.fillStyle = 'orange'   
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);

}


document.body.addEventListener('keydown', keyDown);

function changeSnakePosition() {
    headX = headX +xVelocity;
    headY = headY + yVelocity;
}
function keyDown(event) {
    //up
    if(event.keyCode==38) {
        if(yVelocity==1)
        return;
        yVelocity =-1;
        xVelocity = 0; 
    }
        //down
    if(event.keyCode==40) {
        if(yVelocity== -1)
        return;
        yVelocity = 1;
        xVelocity = 0; 
    } // left
    if(event.keyCode==37) {
        if(xVelocity== 1)
        return;
        yVelocity = 0;
        xVelocity = -1; 
    }
    //right
    if(event.keyCode==39) {
        if(yVelocity== -1)
        return;
        yVelocity = 0;
        xVelocity = 1; 
    }
}

function drawApple(){
    ctx.fillStyle = "red"
    ctx.fillRect(appleX*tileCount,appleY*tileCount, tileSize, tileSize)
}

function checkAppleColision() {
    if (appleX===headX && appleY == headY) {
        appleX=Math.floor(Math.random()*tileCount);
        appleY=Math.floor(Math.random()*tileCount);
        tailLength++
        score++
    }
}


function drawScore() {
    ctx.fillStyle = "white";
    ctx.font = "10px Verdana";
    ctx.fillText("Score " + score, canvas.width - 50, 10);
  }

GameLoop();