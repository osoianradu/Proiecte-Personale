/** @format */

export default class Monster {
	space = false;
	constructor(x, speed) {
		this.x = x;
		this.start_x = x;
		this.y = 100;
		this.width = 50;
		this.height = 50;
		this.speed = speed;
		this.image = new Image();
		this.image.src = "images/Monstrii/monstru_1.png";
		this.canvas = document.getElementById("game");
		this.ctx = this.canvas.getContext("2d");

		document.addEventListener("keydown", this.keydown);
		document.addEventListener("keyup", this.keyup);
	}

	draw() {
		this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
		this.ctx.fillStyle = "white";
		this.ctx.font = "12px Arial";
		this.ctx.fillText(`Speed: ${this.speed}`, this.x, this.y - 5);

		this.move(this.speed);
		this.collideWithWalls();
		console.log(this.speed);
	}

	collideWithWalls() {
		if (this.x < 0) {
			this.x = this.start_x;
			this.y = Math.floor(Math.random() * (this.canvas.height - this.height));
		}
		if (this.x > this.canvas.width - this.width) {
			this.x = this.canvas.width - this.width;
		}
		if (this.y < 0) {
			this.y = 0;
		}
		if (this.y > this.canvas.height - this.height) {
			this.x = this.canvas.height - this.height;
		}
	}

	keydown = (event) => {
		if (event.code == "Space") {
			if (this.space) {
				this.space = false;
			} else {
				this.space = true;
			}
		}
	};

	keyup = (event) => {
		if (event.code == "Space") {
			//this.space = false;
		}
	};
	move(speed) {
		this.x -= speed;
	}
}
