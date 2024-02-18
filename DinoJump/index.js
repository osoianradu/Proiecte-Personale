/** @format */
import Player from "./Player.js";
import Ground from "./Ground.js";
import CactiController from "./CactiController.js";
import Score from "./Score.js";
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const GAME_WIDTH = 800;
const GAME_HEIGHT = 200;
const Player_Width = 88 / 1.5;
const Player_Height = 94 / 1.5;
const Max_JUMP_Height = GAME_HEIGHT;
const MIN_JUMP_Height = 150;
const GROUND_WIDTH = 2400;
const GROUND_HEIGHT = 24;
const GROUND_AND_CACTUS_SPEED = 0.5;

const GAME_SPEED_START = 0.75;
const GAME_SPEED_INCREMENT = 0.00001;
const CACTI_CONFIG = [
	{ width: 48 / 1.5, height: 100 / 1.5, image: "images/cactus_1.png" },
	{ width: 98 / 1.5, height: 100 / 1.5, image: "images/cactus_2.png" },
	{ width: 68 / 1.5, height: 70 / 1.5, image: "images/cactus_3.png" },
];
let score = null;
let player = null;
//
let scaleRatio = null;
let previousTime = null;
let ground = null;
let gameSpeed = GAME_SPEED_START;
let cactiController = null;
let gameOver = false;
let hasAddedEventListenersForRestart = false;
function showgameOver() {
	const fontSize = 70 * scaleRatio;
	ctx.font = `${fontSize}px Verdana`;
	ctx.fillStyle = "grey";
	const x = canvas.width / 4;
	const y = canvas.height / 2;
	ctx.fillText("You Loose", x, y);
}

function createSprites() {
	const Player_WidthInGame = Player_Width * scaleRatio;
	const Player_HeightInGame = Player_Height * scaleRatio;
	const minJumpHeightInGame = MIN_JUMP_Height * scaleRatio;
	const maxJumpHeightInGame = Max_JUMP_Height * scaleRatio;
	const groundWidthInGame = GROUND_WIDTH * scaleRatio;
	const groundHeightInGame = GROUND_HEIGHT * scaleRatio;
	player = new Player(
		ctx,
		Player_WidthInGame,
		Player_HeightInGame,
		minJumpHeightInGame,
		maxJumpHeightInGame,
		scaleRatio
	);
	ground = new Ground(
		ctx,
		groundWidthInGame,
		groundHeightInGame,
		GROUND_AND_CACTUS_SPEED,
		scaleRatio
	);

	const cactiImages = CACTI_CONFIG.map((cactus) => {
		const image = new Image();
		image.src = cactus.image;
		return {
			image: image,
			width: cactus.width * scaleRatio,
			height: cactus.height * scaleRatio,
		};
	});

	cactiController = new CactiController(
		ctx,
		cactiImages,
		scaleRatio,
		GROUND_AND_CACTUS_SPEED
	);
	score = new Score(ctx, scaleRatio);
}

function setupGameReset() {
	if (!hasAddedEventListenersForRestart) {
		hasAddedEventListenersForRestart = true;

		setTimeout(() => {
			window.addEventListener("keyup", reset, { once: true });
			window.addEventListener("touchstart", reset, { once: true });
		}, 1000);
	}
}

function reset() {
	hasAddedEventListenersForRestart = false;
	gameOver = false;
	ground.reset();
	cactiController.reset();
	gameSpeed = GAME_SPEED_START;
	score.reset();
}
function setScreen() {
	scaleRatio = getScaleRatio();
	canvas.width = GAME_WIDTH * scaleRatio;
	canvas.height = GAME_HEIGHT * scaleRatio;
	createSprites();
}
setScreen();

window.addEventListener("resize", () => setTimeout(setScreen, 500));

if (screen.orientation) {
	screen.orientation.addEventListener("change", setScreen);
}
function getScaleRatio() {
	const screenHeight = Math.min(
		window.innerHeight,
		document.documentElement.clientWidth
	);
	const screenWidth = Math.min(
		window.innerWidth,
		document.documentElement.clientWidth
	);
	// window is wider then the game width

	if (screenWidth / screenHeight < GAME_WIDTH / GAME_HEIGHT) {
		return screenWidth / GAME_WIDTH;
	} else {
		return screenHeight / GAME_HEIGHT;
	}
}

function clearScreen() {
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function updateGameSpeed(frameTimeDelta) {
	gameSpeed += frameTimeDelta * GAME_SPEED_INCREMENT;
}
function gameLoop(currentTime) {
	console.log(gameSpeed);
	if (previousTime === null) {
		previousTime = currentTime;
		requestAnimationFrame(gameLoop);
		return;
	}
	const frameTimeDelta = currentTime - previousTime;
	previousTime = currentTime;

	clearScreen();
	if (!gameOver) {
		//Update game objects;
		ground.update(gameSpeed, frameTimeDelta);
		cactiController.update(gameSpeed, frameTimeDelta);
		player.update(gameSpeed, frameTimeDelta);
		updateGameSpeed(frameTimeDelta);
		score.update(frameTimeDelta);
	}

	if (!gameOver && cactiController.collideWith(player)) {
		gameOver = true;
		setupGameReset();
		score.setHighScore();

		console.log("true");
	}

	//Draw game objects;
	ground.draw();
	cactiController.draw();
	player.draw();
	score.draw();

	if (gameOver) {
		showgameOver();
	}

	//

	requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
