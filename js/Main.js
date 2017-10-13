var _DEBUG_MAGNETS = false;
var canvas, canvasContext;
var inMenu = true;
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

	loadLevel(testingPuzzle);

	setInterval(function()
	{
		update();
		draw();
	}, 1000/FRAMES_PER_SECOND);
}

function update()
{
	if (inMenu)
	{
		updateMenu();
	}
	else 
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

}

function draw()
{
	drawBackground();
	if (inMenu)
	{
		drawMenu();
	}
	else
	{
		drawBoard();
		drawSortedObjects();
		if (isGoalMet)
		{
			drawText("You won!!!", canvas.width*0.43, canvas.height*0.15, '24px Comic Sans MS', 'yellow');
		}
		if (_EDIT_MODE)
		{
			drawPanelWithButtons(puzzleEditor);
		}
	}

}
