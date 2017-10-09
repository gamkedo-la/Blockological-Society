const BOARD_GAP = 2;
const BOARD_COLS = 12;
const BOARD_ROWS = 12;
const TILE_SIZE = 34;

const BOARD_COLOR = '#2980b9';
const TILE_COLOR = '#3498db';
const GOAL_COLOR = '#44db34';

var layout;
var boardHistory = [];

function loadLevel(level)
{
    blocks = [];

    var tile = {
        active: false,
        block: undefined
    }

    layout = Array(BOARD_ROWS*BOARD_COLS);
    for (var i = 0; i < layout.length; i++)
    {
        layout[i] = {...tile}; // copies tile object data into array index
        switch (level[i])
        {
            case TILE_EMPTY:
            layout[i].active = true;
            break;
            case TILE_GOAL:
            layout[i].active = true;
            layout[i].isGoal = true;
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
            case BLOCK_METAL:
                var location = calculateCoordAtTileIndex(i);
                layout[i].block = createMetalBlock(location)
                layout[i].active = true;
                blocks.push(layout[i].block);
                break;
            default:
                break;
        }
    }
}

function rowColToArrayIndex(col, row)
{
	return col + BOARD_COLS * row;
}

function rowColAtTileIndex(tileIndex)
{
    var  col  =  tileIndex % BOARD_COLS;
    var  row  =  Math.floor(tileIndex / BOARD_COLS);
    return {
        row: row,
        col: col
    }
}

function calculateTileIndexAtCoord(x, y)
{
    // console.log("Y check ", BOARD_Y, BOARD_Y);
	var col = Math.floor(x / TILE_SIZE);
	var row = Math.floor(y / TILE_SIZE);
	var tileIndex = rowColToArrayIndex(col, row);

	if(col >= 0 && col < BOARD_COLS &&
	   row >= 0 && row < BOARD_ROWS)
	{
		return tileIndex;
	}

	return undefined;
}

function calculateCoordAtTileIndex(tileIndex)
{
    var  col  =  tileIndex % BOARD_COLS;
    var  row  =  Math.floor(tileIndex / BOARD_COLS);
    return {
        x: TILE_SIZE * col,
        y: TILE_SIZE * row
    };
}


function updateTileEdit()
{
    if (mouseButtonHeld && !mouseButtonWasHeld)
	{
		var cart = isoTotwoD(mouseX - TILE_SIZE, mouseY);
		var tileIndex = calculateTileIndexAtCoord(cart.x, cart.y);
		if (tileIndex != undefined)
			layout[tileIndex].active = !layout[tileIndex].active;
	}
	mouseButtonWasHeld = mouseButtonHeld;
}

function convertBoardToArray()
{
    var levelArray = Array(BOARD_ROWS*BOARD_COLS);

    for (var i = 0; i < layout.length; i++)
    {
        if (layout[i].active)
        {
            if (layout[i].isGoal)
            {
                levelArray[i] = TILE_GOAL;
            }
            else
            {
                levelArray[i] = TILE_EMPTY;
            }
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

function saveBoard()
{
	var boardState = convertBoardToArray();
	boardHistory.push(boardState);
}

function undoMove()
{
	if (boardHistory < 1)
	{
		return false;
	}
	blocks = [];
	loadLevel(boardHistory[boardHistory.length-1]);
	boardHistory.splice(-1, 1);
	return true;
}
