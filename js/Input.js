const KEY_ARROW_LEFT = 37;
const KEY_ARROW_UP = 38;
const KEY_ARROW_RIGHT = 39;
const KEY_ARROW_DOWN = 40;

const KEY_BACKSPACE = 8
const KEY_ENTER = 13;
const KEY_ESCAPE = 27;
const KEY_SPACEBAR = 32;
const KEY_TILDE = 192;

const KEY_O = 79; // activate editor
const KEY_P = 80; // export puzzle string
const KEY_R = 82; // restart puzzle
const KEY_Y = 89; // redo command (edit mode only)
const KEY_Z = 90; // undo command

const KEY_NUM_0 = 96;
const KEY_NUM_1 = 97;
const KEY_NUM_2 = 98;
const KEY_NUM_3 = 99;

var mousePos = -1;
var isoMousePos = -1;
var mouseButtonHeld = false;
var mouseButtonWasHeld = false;
var undoKeyHeld = false;
var redoKeyHeld = false;
var restartKeyHeld = false;
var jumpKeyHeld = false;
var leftKeyHeld = false;
var upKeyHeld = false;
var rightKeyHeld = false;
var downKeyHeld = false;

function keyPressed(evt)
{
	if (inMenu)
	{
		menuEventHandler(evt)
	}
	else
	{
		keyEventHandler(evt.keyCode, true);
		
			switch(evt.keyCode)
			{
				case KEY_O:
					_EDIT_MODE = !_EDIT_MODE;
					break;
				default:
					break;
			}
			editorKeyHandler(evt);

			var gameKeys = [KEY_ARROW_LEFT, KEY_ARROW_UP, KEY_ARROW_RIGHT, KEY_ARROW_DOWN,
							KEY_BACKSPACE, KEY_ENTER, KEY_ESCAPE, KEY_SPACEBAR, KEY_TILDE,
							KEY_O, KEY_P, KEY_R, KEY_Y, KEY_Z, 
							KEY_NUM_0, KEY_NUM_1, KEY_NUM_2, KEY_NUM_3];
			
			//Only prevent browser behaviour if the game uses the key code
			if (gameKeys.indexOf(evt.keyCode) > -1)
			{
				evt.preventDefault();
			}
				
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
		case KEY_Z:
			undoKeyHeld = state;
			break;
		case KEY_R:
			restartKeyHeld = state;
			break;
		case KEY_Y:
			redoKeyHeld = state;
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
	if (tileIndex == undefined)
	{
		isoMousePos = undefined;
	}
	else
	{
		isoMousePos = twoDToIso(point.x, point.y);
	}
	// drawText(mousePos.x + " " + mousePos.y, mousePos.x, mousePos.y, '15px consolas', 'yellow');
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
