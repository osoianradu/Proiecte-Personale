/** @format */
import Cactus from "./Cactus.js";
export default class CactiController {
	CACTUS_INTERVAL_MIN = 600;
	CACTUS_INTERVAL_MAX = 1200;

	nextCactusInterval = null;
	cacti = [];

	//
	constructor(ctx, cactiImages, scaleRatio, speed) {
		this.ctx = ctx;
		this.canvas = ctx.canvas;
		this.cactiImages = cactiImages;
		this.scaleRatio = scaleRatio;
		this.speed = speed;

		this.setNextCactusTime();
	}

	update(gameSpeed, frameTimeDelta) {}

	setNextCactusTime() {
		const num = this.getRandomNumber(
			this.CACTUS_INTERVAL_MAX,
			this.CACTUS_INTERVAL_MIN
		);

		this.nextCactusInterval = num;
	}

	getRandomNumber(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}
	createCactus() {
		const index = this.getRandomNumber(0, this.cactiImages.length - 1.5);
		const cactusImage = this.cactiImages[index];
		const x = this.canvas.width * 1.5;
		const y = this.canvas.height - cactusImage.height;
		const cactus = new Cactus(
			this.ctx,
			x,
			y,
			cactusImage.width,
			cactusImage.height,
			cactusImage.image
		);
		this.cacti.push(cactus);
	}
	update(gameSpeed, frameTimeDelta) {
		if (this.nextCactusInterval <= 0) {
			//create cactus
			this.createCactus();
			this.setNextCactusTime();
		}
		this.nextCactusInterval -= frameTimeDelta;
		this.cacti.forEach((cactus) => {
			cactus.update(this.speed, gameSpeed, frameTimeDelta, this.scaleRatio);
		});
	}
	draw() {
		this.cacti.forEach((cactus) => cactus.draw());
	}
	collideWith(sprite) {
		return this.cacti.some((cactus) => cactus.collideWith(sprite));
	}

	reset() {
		this.cacti = [];
	}
}
