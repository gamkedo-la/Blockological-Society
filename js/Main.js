var _DEBUG_MAGNETS = false;
var canvas, canvasContext;
var inMenu = true;
var inLeaveTransition = false;
var inEnterTransition = false;
var remaining;
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
	//loadLevel(goalTest);
	loadLevel(menuLevel);

	setInterval(function () {
		update();
		draw();
	}, 1000 / FRAMES_PER_SECOND);
}

function update() {
	//Old button-based menu functionalities
	/*
	if (inMenu)
	{
		updateMenu();
	}
	else*/
	if (enterKeyHeld && !inLeaveTransition) {
		startLeaveTransition(testingPuzzle);
	}
	if (inLeaveTransition || inEnterTransition) {
		updateTransition();
	}
	if (_EDIT_MODE) {
		panelUpdate(puzzleEditor);
		return;
	}

	if (!inLeaveTransition && !inEnterTransition) { updatePlayer(); }
	updateBlocks();
	if (!inLeaveTransition && !inEnterTransition) {applyBlockEffects();}
	checkForTriggers();

}

function draw() {
	drawBackground();

	//Old button-based menu functionality
	/*if (inMenu)
	{
		drawMenu();
	}
	else*/
	{
		drawBoard();
		drawSortedObjects();
		if (isGoalMet) {
			drawText("You won!!!", canvas.width * 0.43, canvas.height * 0.15, '24px Comic Sans MS', 'yellow');
		}
		if (_EDIT_MODE) {
			drawPanelWithButtons(puzzleEditor);
		}
	}

}
