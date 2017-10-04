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

var mouseX;
var mouseY;
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
	if (evt.keyCode == KEY_TILDE)
	{
		_EDIT_MODE = !_EDIT_MODE;
	}
	if (evt.keyCode == KEY_F5)
	{
		exportPuzzle();
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
		case KEY_TILDE:
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
	var mousePos = calculateMousePos(evt);
	mouseX = mousePos.x;
	mouseY = mousePos.y;
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
