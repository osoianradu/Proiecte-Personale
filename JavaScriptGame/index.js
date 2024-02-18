const canvas = document.getElementById('gameArea');
const ctx = canvas.getContext("2d");


let x = 100
let y = 100;
let radius=50;

let downPressed = false;
let upPressed = false;
let leftPressed = false;
let rightPressed = false;
let speed = 10 ;


//requestAnimationFrame(func)
//setInterval(drawGame,1000)


//Game Loop
function drawGame(){
    requestAnimationFrame(drawGame)
    clearScreen();
    inputs();
    Miscare();
    wallTouch();

}

function inputs() {
    if(downPressed){
        y=y+speed;
    }
    if(upPressed){
        y=y-speed;
    }
    if(leftPressed){
        x=x-speed;
    }
    if(rightPressed){
        x=x+speed;
    }
}

function wallTouch() {
    if (y < radius) {
        y = radius;
      } else if (x < radius) {
        x = radius;
      } else if (y > canvas.height - radius) {
        y = canvas.height - radius;
      } else  if (x > canvas.width - radius) {
        x = canvas.width - radius;
      }
}

ctx.fillStyle = "black";
ctx.fillRect(0,0, canvas.width, canvas.height);


function drawArrow(x, y, radius, angle) {
    ctx.translate(x, y);
    ctx.rotate(angle);

    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.moveTo(radius, 0);
    ctx.lineTo(-radius, -radius / 2);
    ctx.lineTo(-radius, radius / 2);
    ctx.closePath();
    ctx.fill();


    
}


function Miscare() {
    if (upPressed) {
        ctx.fillStyle = "red";
        drawGreenBlob();
      }
    
    if (downPressed) {
        ctx.fillStyle = "blue";
        drawGreenBlob();
      }
      if (leftPressed) {
        ctx.fillStyle = "yellow";
        drawArrow();
      }
      if (rightPressed) {
        ctx.fillStyle = "purple";
        drawArrow();
      }
}

function drawGreenBlob(){

    ctx.fillStyle = "green";

    ctx.arc(x,y,radius,0, Math.PI*2)
    ctx.fill(); 
    

}


function clearScreen() {
    ctx.fillStyle = "black";
ctx.fillRect(0,0, canvas.width, canvas.height);

}

document.body.addEventListener("keydown", keyDown)
document.body.addEventListener("keyup", keyUp)



function keyUp(event) {
    if (event.keyCode == 38) {
        console.log("up");
        upPressed = false;
    }

    //down
    if (event.keyCode == 40) {
        console.log("down");
        downPressed = false;
    }
    //left
    if (event.keyCode == 37) {
        leftPressed = false;
    }

    //right
    if (event.keyCode == 39) {
        rightPressed = false;
    }
}

function keyDown(event) {
    if (event.keyCode == 38) {
        console.log("up");
        upPressed = true;
    }

    //down
    if (event.keyCode == 40) {
        console.log("down");
        downPressed = true;
    }
    //left
    if (event.keyCode == 37) {
        leftPressed = true;
    }

    //right
    if (event.keyCode == 39) {
        rightPressed = true;
    }
}




drawGame();
