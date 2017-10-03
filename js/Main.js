var _DEBUG_MAGNETS = false;
var canvas, canvasContext;
const FRAMES_PER_SECOND = 60;
const TIME_PER_TICK = 1/FRAMES_PER_SECOND;

var blockPic = document.createElement("img");
var blockIce = document.createElement("img");
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

	blockPic.src = "img/cube_magnet.png";
	blockIce.src = "img/cube_ice.png";
	cursorPic.src = "img/cursor.png";

	initPlayer();
	loadLevel();

	setInterval(function()
	{
		update();
		draw();
	}, 1000/FRAMES_PER_SECOND);
}

function update()
{
	updatePlayer();
	updateBlocks();
	applyBlockEffects();
	updateMagnets(); // Broken logic for magnets

    if (mouseButtonHeld && !mouseButtonWasHeld)
	{
		var cart = isoTotwoD(mouseX - TILE_SIZE, mouseY);
		var tileIndex = calculateTileIndexAtCoord(cart.x, cart.y);
		if (tileIndex != undefined)
			grid.layout[tileIndex].active = !grid.layout[tileIndex].active;
	}
	mouseButtonWasHeld = mouseButtonHeld;
}

function draw()
{
	drawBackground();
	drawBoard();
	drawSortedObjects();
}
