var _DEBUG_MAGNETS = false;
var canvas, canvasContext;
const FRAMES_PER_SECOND = 60;
const TIME_PER_TICK = 1/FRAMES_PER_SECOND;

const KEY_ARROW_LEFT = 37;
const KEY_ARROW_UP = 38;
const KEY_ARROW_RIGHT = 39;
const KEY_ARROW_DOWN = 40;

const KEY_BACKSPACE = 8
const KEY_ENTER = 13;
const KEY_ESCAPE = 27;
const KEY_SPACEBAR = 32;
const KEY_TILDE = 192; // cheat console

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


const TILE_OFF = 0;
const TILE_EMPTY = 1;
const CURSOR_START = 2;
const BLOCK_MAGNET = 3;
const CURSOR = 4;

const BOARD_OFFSET = -24;
const BOARD_X = 368 + BOARD_OFFSET;
const BOARD_Y = BOARD_OFFSET;
const BOARD_COLS = 12;
const BOARD_ROWS = 12;
const TILE_SIZE = 34;
const BOARD_COLOR = '#2980b9';
const TILE_COLOR = '#3498db';
const CURSOR_COLOR = '#2c3e50';

var blocks = [];
var blockPic = document.createElement("img");
var cursorPic = document.createElement("img");

const MOVE_DELAY = .30;
var moveTimer = 0;
var moves = [];

var cursor = { // block manipulation widget
	x: undefined,
	y: undefined,
    targetX: undefined,
    targetY: undefined,
    speed: TILE_SIZE/8,
	color: CURSOR_COLOR,

    init: function(x, y)
    {
        this.x = x;
        this.y = y;

        this.targetX = x;
        this.targetY = y;
    }
}

var tile = {
	active: false,
	block: undefined
}

var testLevel = test; // in Puzzles.js
var layout = Array(BOARD_ROWS*BOARD_COLS);
for (var i = 0; i < layout.length; i++)
{
	layout[i] = {...tile}; // copies tile object data into array index
	switch (testLevel[i])
	{
		case TILE_EMPTY:
			layout[i].active = true;
			break;
		case CURSOR_START:
			var result = calculateCoordAtTileIndex(i);
            cursor.init(result.x, result.y);
            layout[i].active = true;
            blocks.push(cursor);
            break;
        case BLOCK_MAGNET:
            var result = calculateCoordAtTileIndex(i);
            layout[i].block = createBlockObject(result.x, result.y, '#f1c40f');
            layout[i].active = true;
            blocks.push(layout[i].block);
            break;
		default:
			// layout[i].active = true;
			break;
	}
}

var grid = {
	gap: 2,
	x: BOARD_X,
	y: BOARD_Y,
	color: TILE_COLOR,

	layout: layout
}

function createBlockObject(x, y, color)
{
	return {
		x: x,
		y: y,
		yLevel: -999999,
        speed: TILE_SIZE/8,
		size: 32,
		color: color,
	};
}

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
	cursorPic.src = "img/cursor.png";

	setInterval(function()
	{
		update();
		draw();
	}, 1000/FRAMES_PER_SECOND);
}

function setMoveTarget(object, x, y)
{
    var tileIndex = calculateTileIndexAtCoord(x, y);
    object.targetX = x;
    object.targetY = y;
}

function update()
{
    moveTimer -= TIME_PER_TICK;
    if (cursor.targetX == cursor.x && cursor.targetY == cursor.y && moveTimer <= 0)
    {
        if (leftKeyHeld)
        {
            if(pushBlock(cursor.x, cursor.y, -TILE_SIZE, 0))
               setMoveTarget(cursor, cursor.x - TILE_SIZE, cursor.y);
               moveTimer = MOVE_DELAY;
        }
        else if (rightKeyHeld)
        {
            if(pushBlock(cursor.x, cursor.y, TILE_SIZE, 0))
               setMoveTarget(cursor, cursor.x + TILE_SIZE, cursor.y);
               moveTimer = MOVE_DELAY;
        }
        else if (upKeyHeld)
        {
            if(pushBlock(cursor.x, cursor.y, 0, -TILE_SIZE))
               setMoveTarget(cursor, cursor.x, cursor.y - TILE_SIZE);
               moveTimer = MOVE_DELAY;
        }
        else if (downKeyHeld)
        {
            if(pushBlock(cursor.x, cursor.y, 0, TILE_SIZE))
               setMoveTarget(cursor, cursor.x, cursor.y + TILE_SIZE);
               moveTimer = MOVE_DELAY;
        }
    }

    for (var i = 0; i < blocks.length; i++)
    {
        moveTowardsTarget(blocks[i]);
    }

	// Broken logic for magnets
	for (var i = 0; i < blocks.length; i++)
	{
		if (!_DEBUG_MAGNETS)
		{
			break;
		}
		if (blocks[i] == cursor)
		{
			continue;
		}
		if (blocks[i].x == blocks[i].targetX &&
			blocks[i].y == blocks[i].targetY)
		{
			pushBlock(blocks[i].x, blocks[i].y, 0, -TILE_SIZE);
			pushBlock(blocks[i].x, blocks[i].y, 0, TILE_SIZE);
			pushBlock(blocks[i].x, blocks[i].y, -TILE_SIZE, 0);
			pushBlock(blocks[i].x, blocks[i].y, TILE_SIZE, 0);
		}
	}

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
	// draw background
	colorRect(0, 0, canvas.width, canvas.height, BOARD_COLOR);

	// draw board grid
	var isoX, isoY, result;
	var x = grid.x;
	var y = grid.y;
	for (var row = 0; row < BOARD_ROWS; row++)
	{
		for (var col = 0; col < BOARD_COLS; col++)
		{
			var tileIndex = rowColToArrayIndex(col, row);
			if (grid.layout[tileIndex].active)
			{
				var iso = twoDToIso(x, y);
				drawIsoRhombusFilled(TILE_COLOR, iso.x, iso.y, TILE_SIZE-grid.gap);
			}
			x += TILE_SIZE;
		}
		x = grid.x;
		y += TILE_SIZE;
	}

	if (cursorIsMoving())
	{
		for (var i = 0; i < blocks.length; i++)
		{
			var block = blocks[i];
			var iso = twoDToIso(block.x, block.y);
			block.yLevel = iso.y;
		}

		blocks = yLevelQuickSort(blocks);
	}

	for (var i = 0; i < blocks.length; i++)
	{
		if (blocks[i] == cursor)
		{
			var iso = twoDToIso(cursor.x, cursor.y);
			drawBitmapCenteredWithRotation(cursorPic, iso.x+TILE_SIZE-3, iso.y-3, 0);
		}
		else
		{
			var block = blocks[i];
			var iso = twoDToIso(block.x, block.y);
			drawBitmapCenteredWithRotation(blockPic, iso.x+TILE_SIZE-3, iso.y-3, 0);
		}
	}
}

function keyPressed(evt)
{
	keyEventHandler(evt.keyCode, true);
	if (evt.keyCode == KEY_SPACEBAR)
	{
		_DEBUG_MAGNETS = !_DEBUG_MAGNETS;
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
		case KEY_SPACEBAR:
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

function boxCollisionDetected(box1, box2)
{
	return ((box1.x > box2.x + box2.width  ||
			 box1.x + box1.width < box2.x  ||
			 box1.y > box2.y + box2.height ||
			 box1.y + box1.height < box2.y) == false)
}

function calculateTileIndexAtCoord(x, y)
{
	var col = Math.floor((x-grid.x) / TILE_SIZE);
	var row = Math.floor((y-grid.y) / TILE_SIZE);
	var tileIndex = rowColToArrayIndex(col, row);

	if(col >= 0 && col < BOARD_COLS &&
	   row >= 0 && row < BOARD_ROWS)
	{
		return tileIndex;
	}

	return undefined;
}

function rowColToArrayIndex(col, row)
{
	return col + BOARD_COLS * row;
}

function calculateCoordAtTileIndex(tileIndex)
{
    var  col  =  tileIndex % BOARD_COLS
    var  row  =  Math.floor(tileIndex / BOARD_COLS);
    return {
        x: TILE_SIZE * col + BOARD_X,
        y: TILE_SIZE * row + BOARD_Y
    }
}

function pushBlock(x, y, offsetX, offsetY)
{
    var nextX = x + offsetX;
    var nextY = y + offsetY;
    var block, tile, nextTile;

    var tileIndex = calculateTileIndexAtCoord(nextX, nextY);
    var tile = grid.layout[tileIndex];
    if (tile != undefined && tile.block != undefined)
    {
        var block = tile.block;
        nextX += offsetX;
        nextY += offsetY;

        lastTile = tile;
        tileIndex = calculateTileIndexAtCoord(nextX, nextY);
        tile = grid.layout[tileIndex];
        if (tile != undefined && tile.block == undefined && tile.active)
        {
            tile.block = block;
            lastTile.block = undefined;
            setMoveTarget(block, nextX, nextY);
            return true; // can move
        }
    }
    else if (tile != undefined && tile.active &&
			 (nextX != cursor.x || nextY != cursor.y))
    {
        return true;
    }
    return false; // can move
}

function moveTowardsTarget(object)
{
    if (object.x < object.targetX)
    {
        object.x += object.speed;
    }
    else if (object.x > object.targetX)
    {
        object.x -= object.speed;
    }

    if (object.y < object.targetY)
    {
        object.y += object.speed;
    }
    else if (object.y > object.targetY)
    {
        object.y -= object.speed;
    }
    if (Math.abs(object.x - object.targetX) < 1)
    {
        object.x = object.targetX;
    }
    if (Math.abs(object.y - object.targetY) < 1)
    {
        object.y = object.targetY;
    }
}

function yLevelQuickSort(array)
{
	var pivotIndex, pivot, result;
	var beforeList = [];
	var afterList = [];

	pivotIndex = Math.floor(Math.random() + array.length-1);
	pivot = array[pivotIndex];
	array.splice(pivotIndex, 1);

	for (var i = 0; i < array.length; i++)
	{
		if (array[i].yLevel < pivot.yLevel)
		{
			beforeList.push(array[i]);
		}
		else
		{
			afterList.push(array[i]);
		}
	}
	if (beforeList.length > 1)
	{
		beforeList = yLevelQuickSort(beforeList);
	}
	if (afterList.length > 1)
	{
		afterList = yLevelQuickSort(afterList);
	}
	beforeList.push(pivot);
	result = beforeList.concat(afterList);
	return result;
}

function cursorIsMoving()
{
	return (cursor.x != cursor.targetX ||
	 		cursor.y != cursor.targetY);
}
