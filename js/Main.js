var _DEBUG_MAGNETS = false;
var _CREDITS_MODE = false;
var canvas, canvasContext;
var inMenu = true;
var inLeaveTransition = false;
var inEnterTransition = false;
var currentLevel = 0;
const FRAMES_PER_SECOND = 60;
const TIME_PER_TICK = 1 / FRAMES_PER_SECOND;

window.onload = function () {
	canvas = document.getElementById('gameCanvas');
	context = canvas.getContext('2d');

	document.addEventListener('keydown', keyPressed);
	document.addEventListener('keyup', keyReleased);
	document.addEventListener('mousemove', mousePosHandler);
	document.addEventListener('mousedown', mousePressed);
	document.addEventListener('mouseup', mouseReleased);

	loadImages();
}

function imageLoadingDoneSoStartGame() {

	setupMenuButtons();
	loadLevel(menuLevel);

	setInterval(function () {
		update();
		draw();
	}, 1000 / FRAMES_PER_SECOND);
}

function update() {
	if (enterKeyHeld && !inLeaveTransition) {
		startLeaveTransition(testingPuzzle);
	}
	if (inLeaveTransition || inEnterTransition) {
		updateTransition();
	}
	if (_EDIT_MODE) {
		panelUpdate(puzzleEditor);
		//return;
	}

	if (!inLeaveTransition && !inEnterTransition) { updatePlayer(); }
	updateBlocks();
	if (!inLeaveTransition && !inEnterTransition) {applyBlockEffects();}
	checkForTriggers();

	// constant waterfall splashes
	if (Math.random()>0.9) // rarely
		particleFX(800,386,1,"rgba(100,200,255,1.0)",-0.02,-0.1,8.0,0.002,0.1,8.0);

	updateParticles();

}

function draw() {
	drawBackground();
	{
		drawBoard();
		drawSortedObjects();
		drawParticles();
		if (isGoalMet) {
			drawText("You won!!!", canvas.width * 0.43, canvas.height * 0.15, '24px Comic Sans MS', 'yellow');
		}
		if (_EDIT_MODE) {
			drawPanelWithButtons(puzzleEditor);
		}
	}
	if (_CREDITS_MODE)
	{
		drawCredits();
	}
}
