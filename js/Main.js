var _DEBUG_MAGNETS = false;
var canvas, canvasContext;
const FRAMES_PER_SECOND = 60;
const TIME_PER_TICK = 1/FRAMES_PER_SECOND;

window.onload = function()
{
	canvas = document.getElementById('gameCanvas');
	context = canvas.getContext('2d');

	document.addEventListener('keydown', keyPressed);
	document.addEventListener('keyup', keyReleased);
	document.addEventListener('mousemove', mousePosHandler);
	document.addEventListener('mousedown', mousePressed);
	document.addEventListener('mouseup', mouseReleased);
	
	loadLevel(test);

	setInterval(function()
	{
		update();
		draw();
	}, 1000/FRAMES_PER_SECOND);
}

function update()
{
	if (_EDIT_MODE)
	{
		panelUpdate(puzzleEditor);
		return;
	}

	updatePlayer();
	updateBlocks();
	applyBlockEffects();
	checkForTriggers();

}

function draw()
{
	drawBackground();
	drawBoard();
	drawSortedObjects();

	if (_EDIT_MODE)
	{
		drawPanelWithButtons(puzzleEditor);
	}
}
