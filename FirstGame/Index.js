/** @format */
import Player from "./Player.js";
import Monster from "./Monster.js";
import Fire from "./Fire.js";
import Star from "./Star.js";
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth * 0.8;
canvas.height = window.innerHeight * 0.8;
const player = new Player(250, 250, 0);
const monster = new Monster(canvas.width, 10);

const stars = [];

for (let i = 0; i < 16; i++) {
	const star = new Star(
		Math.floor(Math.random() * canvas.width),
		Math.floor(Math.random() * canvas.height),
		Math.floor(Math.random() + 1 * 6)
	);
	stars.push(star);
}
//GAME LOOP

function gameLoop() {
	setScreen();
	player.draw();
	monster.draw();
	stars.forEach((star) => {
		star.draw(ctx);
		star.move(4, 0);
	});

	if (player.collideWith(monster)) {
		console.log("Game Over");
		monster.speed = 0;
	} else {
	}
}

// OtherFunctions/
function setScreen() {
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}

setInterval(gameLoop, 1000 / 24);
