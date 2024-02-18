/** @format */

export default class Score {
	score = 0;
	HIGH_SCORE_KEY = "highScore";

	constructor(ctx, scaleRatio) {
		this.ctx = ctx;
		this.canvas = ctx.canvas;
		this.scaleRatio = scaleRatio;
	}

	update(frameTimeDelta) {
		this.score += frameTimeDelta * 0.01;
	}

	reset() {
		this.score = 0;
	}

	setHighScore() {
		const highScore = Number(localStorage.getItem(this.HIGH_SCORE_KEY));
		if (this.score > highScore) {
			localStorage.setItem(this.HIGH_SCORE_KEY, Math.floor(this.score));
		}
	}

	draw() {
		const highScore = Number(localStorage.getItem(this.HIGH_SCORE_KEY));
		const y = 20 * this.scaleRatio;

		const fontSize = 20 * this.scaleRatio;
		this.ctx.font = `${fontSize}px serif`;
		this.ctx.fillStyle = "#525250";
		const scoreX = this.canvas.width - 75 * this.scaleRatio;
		const highScoreX = scoreX - 125 * this.scaleRatio;

		const scorePadded = Math.floor(this.score).toString().padStart(6, 0);
		const highScorePadded = highScore.toString().padStart(6, 0);

		// Draw the first line of text
		this.ctx.fillText(scorePadded, scoreX, y);

		// Set a vertical padding (e.g., 10 pixels) to separate the lines
		const verticalPadding = 10 * this.scaleRatio;

		// Draw the second line of text below the first line
		this.ctx.fillText(
			`Highest: ${highScorePadded}`,
			highScoreX,
			y + fontSize + verticalPadding
		);
	}
}
