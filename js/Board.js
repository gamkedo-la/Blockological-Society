const BOARD_OFFSET = -24;
const BOARD_X = 368 + BOARD_OFFSET;
const BOARD_Y = BOARD_OFFSET;
const BOARD_COLS = 12;
const BOARD_ROWS = 12;
const TILE_SIZE = 34;

const BOARD_COLOR = '#2980b9';
const TILE_COLOR = '#3498db';

var grid;
var levelData; // for exporting puzzles

function loadLevel()
{
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
            case CURSOR:
                var result = calculateCoordAtTileIndex(i);
                cursor.init(result.x, result.y);
                layout[i].active = true;
                blocks.push(cursor);
            break;
            case BLOCK_MAGNET:
                var location = calculateCoordAtTileIndex(i);
                layout[i].block = createMagnetBlock(location)
                layout[i].active = true;
                blocks.push(layout[i].block);
                break;
            case BLOCK_ICE:
                var location = calculateCoordAtTileIndex(i);
                layout[i].block = createIceBlock(location)
                layout[i].active = true;
                blocks.push(layout[i].block);
                break;
            case BLOCK_FIRE:
                var location = calculateCoordAtTileIndex(i);
                layout[i].block = createFireBlock(location)
                layout[i].active = true;
                blocks.push(layout[i].block);
                break;
            case BLOCK_QUANTUM:
                var location = calculateCoordAtTileIndex(i);
                layout[i].block = createQuantumBlock(location)
                layout[i].active = true;
                blocks.push(layout[i].block);
                break;
            default:
            // layout[i].active = true;
            break;
        }
    }

    grid = {
        gap: 2,
        x: BOARD_X,
        y: BOARD_Y,
        color: TILE_COLOR,

        layout: layout
    }
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

function updateTileEdit()
{
    if (mouseButtonHeld && !mouseButtonWasHeld)
	{
		var cart = isoTotwoD(mouseX - TILE_SIZE, mouseY);
		var tileIndex = calculateTileIndexAtCoord(cart.x, cart.y);
		if (tileIndex != undefined)
			grid.layout[tileIndex].active = !grid.layout[tileIndex].active;
	}
	mouseButtonWasHeld = mouseButtonHeld;
}

function convertBoardToArray()
{
    var levelArray = Array(BOARD_ROWS*BOARD_COLS);

    for (var i = 0; i < grid.layout.length; i++)
    {
        if (grid.layout[i].active)
        {
            levelArray[i] = TILE_EMPTY;
        }
        else
        {
            levelArray[i] = TILE_OFF;
        }
    }

    for (var i = 0; i < blocks.length; i++)
    {
        var tileIndex = calculateTileIndexAtCoord(blocks[i].x, blocks[i].y);
        levelArray[tileIndex] = blocks[i].type;
    }

    return levelArray;
}
