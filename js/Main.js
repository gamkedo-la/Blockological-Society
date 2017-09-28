/*
	TODO:
	x Movement animation
    x Load level data
	Pushable blocks
	Grabbable blocks
	Tile brush editor
	Panel with block types for brush
*/

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
const BLOCK_BASIC = 3;

const BOARD_X = 60;
const BOARD_Y = 45;
const BOARD_COLS = 20;
const BOARD_ROWS = 15;
const TILE_SIZE = 34;
const BOARD_COLOR = '#2980b9';
const TILE_COLOR = '#3498db';
const CURSOR_COLOR = '#2c3e50';
var blocks = [];

const MOVE_DELAY = .30;
var moveTimer = 0;

var cursor = { // block manipulation widget
	x: undefined,
	y: undefined,
    targetX: undefined,
    targetY: undefined,
    speed: TILE_SIZE/8,
	width: 16,
	height: 16,
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
            break;
        case BLOCK_BASIC:
            var result = calculateCoordAtTileIndex(i);
            layout[i].block = createBlockObject(result.x, result.y, '#f1c40f');
            layout[i].active = true;
            blocks.push(layout[i].block);
            break;
		default:
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

    moveTowardsTarget(cursor);

    for (var i = 0; i < blocks.length; i++)
    {
        moveTowardsTarget(blocks[i]);
    }

    if (mouseButtonHeld && !mouseButtonWasHeld)
	{
		var tileIndex = calculateTileIndexAtCoord(mouseX, mouseY);
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
	var x = grid.x;
	var y = grid.y;
	for (var row = 0; row < BOARD_ROWS; row++)
	{
		for (var col = 0; col < BOARD_COLS; col++)
		{
			var tileIndex = rowColToArrayIndex(col, row);
			if (grid.layout[tileIndex].active)
				colorRect(x, y, TILE_SIZE-grid.gap, TILE_SIZE-grid.gap, grid.color);
			x += TILE_SIZE;
		}
		x = grid.x;
		y += TILE_SIZE;
	}

    for (var i = 0; i < blocks.length; i++)
    {
        var block = blocks[i];
        colorRect(block.x, block.y, block.size, block.size, block.color);
    }

	// draw block manipulation widget
	colorRect(cursor.x+8, cursor.y+8, cursor.width, cursor.height, cursor.color);
}

function keyPressed(evt)
{
	keyEventHandler(evt.keyCode, true);
	panelKeyCapture(debugPanel, evt);
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
			jumpKeyHeld = state;
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
  var mouseX = evt.clientX - rect.left - root.scrollLeft;
  var mouseY = evt.clientY - rect.top - root.scrollTop;
  return {
	x: mouseX,
	y: mouseY
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
    else if (tile.active)
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
