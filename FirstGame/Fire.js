/** @format */

export default class Fire {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.start_x = x;
		this.width = 50;
		this.height = 50;

		this.image = new Image();
		this.image.src = "images/Fire.png";

		//
		this.canvas = document.getElementById("game");
		this.ctx = this.canvas.getContext("2d");

		document.addEventListener("keydown", this.keydown);
		document.addEventListener("keyup", this.keyup);
	}

	draw(playerX, playerY, isMoving) {
		if (isMoving == 30) {
			this.x = playerX - isMoving; // Update the x position with the player's current x
			this.y = playerY; // Update the y position with the player's current y
			this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
			console.log(this.x, this.y);
		} else if (isMoving == 10) {
			this.x = playerX - isMoving; // Update the x position with the player's current x
			this.y = playerY; // Update the y position with the player's current y
			this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
			console.log(this.x, this.y);
		} else if (isMoving == 7 || isMoving == -7) {
			this.x = playerX - 20; // Update the x position with the player's current x
			this.y = playerY - isMoving; // Update the y position with the player's current y
			this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
			console.log(this.x, this.y);
		} else {
		}
	}
}
