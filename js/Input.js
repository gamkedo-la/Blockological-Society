const KEY_ARROW_LEFT = 37;
const KEY_ARROW_UP = 38;
const KEY_ARROW_RIGHT = 39;
const KEY_ARROW_DOWN = 40;

const KEY_BACKSPACE = 8
const KEY_ENTER = 13;
const KEY_ESCAPE = 27;
const KEY_SPACEBAR = 32;
const KEY_TILDE = 192;

const KEY_F5 = 116;

const KEY_NUM_0 = 96;
const KEY_NUM_1 = 97;
const KEY_NUM_2 = 98;
const KEY_NUM_3 = 99;

var mousePos = -1;
var isoMousePos = -1;
var mouseButtonHeld = false;
var mouseButtonWasHeld = false;
var undoKeyHeld = false;
var jumpKeyHeld = false;
var leftKeyHeld = false;
var upKeyHeld = false;
var rightKeyHeld = false;
var downKeyHeld = false;

function keyPressed(evt)
{
	keyEventHandler(evt.keyCode, true);

	switch(evt.keyCode)
	{
		case KEY_TILDE:
			_EDIT_MODE = !_EDIT_MODE;
			break;
		case KEY_F5:
			exportPuzzle();
			break;
		case KEY_NUM_1:
			loadLevel(testLevel);
			break;
		case KEY_NUM_2:
			loadLevel(emptyLevel);
			break;
		case KEY_NUM_2:
			loadLevel(magnetTestLevel);
			break;
		default:
			break;
	}
}

function keyReleased(evt)
{
	keyEventHandler(evt.keyCode, false);
}

function keyEventHandler(key, state)
{
	switch (key)
	{
		case KEY_ESCAPE:
			undoKeyHeld = state;
			break;
		case KEY_ARROW_LEFT:
			leftKeyHeld = state;
			break;
		case KEY_ARROW_UP:
			upKeyHeld = state;
			break;
		case KEY_ARROW_RIGHT:
			rightKeyHeld = state;
			break;
		case KEY_ARROW_DOWN:
			downKeyHeld = state;
			break;
		default:
			break;
	}
}

function mousePosHandler(evt)
{
	mousePos = calculateMousePos(evt);
	var cart = isoTotwoD(mousePos.x-TILE_SIZE, mousePos.y);
	var tileIndex = calculateTileIndexAtCoord(cart.x, cart.y);
	var point = calculateCoordAtTileIndex(tileIndex);
	isoMousePos = twoDToIso(point.x, point.y);
	drawText(mousePos.x + " " + mousePos.y, mousePos.x, mousePos.y, '15px consolas', 'yellow');
}

function mousePressed(evt)
{
	mouseButtonHeld = true;
}

function mouseReleased(evt)
{
	mouseButtonHeld = false;
}

function calculateMousePos(evt)
{
  var rect = canvas.getBoundingClientRect(), root = document.documentElement;

  // account for the margins, canvas position on page, scroll amount, etc.
  var screenToCanvasRatio = (canvas.width/canvas.clientWidth)
  var mouseX = evt.clientX - rect.left - root.scrollLeft;
  var mouseY = evt.clientY - rect.top - root.scrollTop;
  return {
	x: mouseX * screenToCanvasRatio,
	y: mouseY * screenToCanvasRatio
  };
}
