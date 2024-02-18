/** @format */

export default class Star {
	constructor(x, y, imageNumber) {
		this.x = x;
		this.y = y;
		this.start_x = x;
		this.scale = Math.floor(Math.random() * 25);
		this.width = this.scale + 5;
		this.height = this.scale + 8;

		this.imageNumber = imageNumber;
		this.image = new Image();
		this.image.src = `images/Stelute/Steluta_${this.imageNumber}.png`;

		//
		this.canvas = document.getElementById("game");
		this.ctx = this.canvas.getContext("2d");
	}

	draw(ctx) {
		ctx.drawImage(this.image, this.x, this.y, this.width, this.height);

		this.collideWithWalls();
	}

	collideWithWalls() {
		if (this.x < 0) {
			this.x = this.canvas.width;
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

	move(xVelocity, yVelocity) {
		this.x -= xVelocity;
		this.y += yVelocity;
	}
}
