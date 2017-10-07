var _DEBUG_MAGNETS = false;
var canvas, canvasContext;
const FRAMES_PER_SECOND = 60;
const TIME_PER_TICK = 1/FRAMES_PER_SECOND;

var tileOffPic = document.createElement("img");
var tileEmptyPic = document.createElement("img");
var blockMagnetPic = document.createElement("img");
var blockIcePic = document.createElement("img");
var blockFirePic = document.createElement("img");
var blockQuantumPic = document.createElement("img");
var blockMetalPic = document.createElement("img");
var blockYellowPic = document.createElement("img");
var cursorPic = document.createElement("img");

var editorTileOffPic = document.createElement("img");
var editorTileEmptyPic = document.createElement("img");
var editorBlockMagnetPic = document.createElement("img");
var editorBlockIcePic = document.createElement("img");
var editorBlockFirePic = document.createElement("img");
var editorBlockQuantumPic = document.createElement("img");
var editorBlockMetalPic = document.createElement("img");
var editorBlockYellowPic = document.createElement("img");
var editorCursorPic = document.createElement("img");

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
	blockQuantumPic.src = "img/cube_quantum.png";
	blockMetalPic.src = "img/cube_metal.png";
	blockYellowPic.src = "img/cube_yellow.png";
	blockFirePic.src = "img/cube_fire_PLEASE_REPLACE.png";
	cursorPic.src = "img/cursor.png";

	editorTileOffPic.src = "img/editor/edit_tile_off.png";
	editorTileEmptyPic.src = "img/editor/edit_tile_empty.png";
	editorBlockMagnetPic.src = "img/editor/edit_cube_magnet.png";
	editorBlockIcePic.src = "img/editor/edit_cube_ice.png";
	editorBlockQuantumPic.src = "img/editor/edit_cube_quantum.png";
	editorBlockMetalPic.src = "img/editor/edit_cube_metal.png";
	editorBlockFirePic.src = "img/editor/edit_cube_fire_PLEASE_REPLACE.png";
	editorCursorPic.src = "img/editor/edit_cursor.png";

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
