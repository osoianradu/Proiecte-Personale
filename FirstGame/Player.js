/** @format */
import Fire from "./Fire.js";

export default class Player {
	rightPressed = false;
	leftPressed = false;
	upPressed = false;
	downPressed = false;
	shootPressed = false;
	heading = 90;
	fire = new Fire(this.x, this.y);

	constructor(x, y, speed, width, height) {
		this.x = x;
		this.y = y;
		this.width = 50;
		this.height = 50;
		this.speed;
		this.image = new Image();
		this.image.src = "images/Player_Alb.png";
		this.canvas = document.getElementById("game");
		this.ctx = this.canvas.getContext("2d");
		this.moving = 0;
		this.fire = new Fire(this.x, this.y);

		//add event listener
		document.addEventListener("keydown", this.keydown);
		document.addEventListener("keyup", this.keyup);
	}

	draw() {
		this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
		this.move();
		this.collideWithWalls();
		this.fire.draw(this.x, this.y, this.moving);
		this.moving = 1;
	}
	collideWithWalls() {
		if (this.x < 0) {
			this.x = 0;
		}
		if (this.x > this.canvas.width - this.width) {
			this.x = this.canvas.width - this.width;
		}
		if (this.y < 0) {
			this.y = 0;
		}
		if (this.y > this.canvas.height - this.height) {
			this.y = this.canvas.height - this.height;
		}
	}

	keydown = (event) => {
		if (event.code == "ArrowRight") {
			console.log("ArrowRight");
			this.rightPressed = true;
		}
		if (event.code == "ArrowLeft") {
			this.leftPressed = true;
		}
		if (event.code == "ArrowUp") {
			this.upPressed = true;
		}
		if (event.code == "ArrowDown") {
			this.downPressed = true;
		}
	};

	keyup = (event) => {
		console.log(this.moving);
		if (event.code == "ArrowRight") {
			this.rightPressed = false;
		}
		if (event.code == "ArrowLeft") {
			this.leftPressed = false;
		}
		if (event.code == "ArrowUp") {
			this.upPressed = false;
		}
		if (event.code == "ArrowDown") {
			this.downPressed = false;
		}
	};

	move() {
		if (this.rightPressed) {
			this.x += 10;
			this.moving = 30;
		} else if (this.leftPressed) {
			this.x -= 10;
			this.moving = 10;
		} else if (this.upPressed) {
			this.y -= 10;
			this.moving = -7;
		} else if (this.downPressed) {
			this.y += 10;
			this.moving = 7;
		}
	}

	collideWith(sprite) {
		if (
			this.x + this.width > sprite.x &&
			this.x < sprite.x + sprite.width &&
			this.y + this.height > sprite.y &&
			this.y < sprite.y + sprite.height
		) {
			return true;
		} else {
			return false;
		}
	}
}
