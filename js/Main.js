var _DEBUG_MAGNETS = false;
var canvas, canvasContext;
const FRAMES_PER_SECOND = 60;
const TIME_PER_TICK = 1/FRAMES_PER_SECOND;

var tileOffPic = document.createElement("img");
var tileEmptyPic = document.createElement("img");
var blockMagnetPic = document.createElement("img");
var blockIcePic = document.createElement("img");
var blockFirePic = document.createElement("img");
var cursorPic = document.createElement("img");

window.onload = function()
{
	canvas = document.getElementById('gameCanvas');
	context = canvas.getContext('2d');

	document.addEventListener('keydown', keyPressed);
	document.addEventListener('keyup', keyReleased);
	document.addEventListener('mousemove', mousePosHandler);
	document.addEventListener('mousedown', mousePressed);
	document.addEventListener('mouseup', mouseReleased);

	tileOffPic.src = "img/tile_off.png";
	tileEmptyPic.src = "img/tile_empty.png";
	blockMagnetPic.src = "img/cube_magnet.png";
	blockIcePic.src = "img/cube_ice.png";
	blockFirePic.src = "img/cube_fire_PLEASE_REPLACE.png";
	cursorPic.src = "img/cursor.png";

	loadLevel();

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
	updateMagnets(); // Broken logic for magnets

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
