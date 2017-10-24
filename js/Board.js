const BOARD_X = 366;
const BOARD_GAP = 2;
const BOARD_COLS = 12;
const BOARD_ROWS = 12;
const TILE_SIZE = 34;

const BOARD_COLOR = '#2980b9';
const TILE_COLOR = '#3498db';
const GOAL_COLOR = '#44db34';
const GOAL_COLOR_UNSOLVED = '#ffff00';

var layout;
var boardHistory = [];
var currentIndex = -1;

function loadLevel(level) {
    isGoalMet = false;
    blocks = [];

    var tile = {
        active: false,
        block: undefined
    }

    layout = Array(BOARD_ROWS * BOARD_COLS);
    var levelDataIndex = 0;
    for (var i = 0; i < layout.length; i++) {
        layout[i] = { ...tile }; // copies tile object data into array index
        var location = calculateCoordAtTileIndex(i);
        layout[i].active = true; //defaults to true, switched if TILE_OFF
        switch (level[levelDataIndex]) {
            case TILE_OFF:
                layout[i].active = false;
                break;
            case TILE_EMPTY:
                break;
            case TILE_GOAL:
                layout[i].isGoal = true;
                break;
            case CURSOR:
                cursor.init(location.x, location.y);
                blocks.push(cursor);
                break;
            case BLOCK_MAGNET:
                layout[i].block = createMagnetBlock(location);
                break;
            case BLOCK_ICE:
                layout[i].block = createIceBlock(location);
                break;
            case BLOCK_FIRE:
                layout[i].block = createFireBlock(location);
                break;
            case BLOCK_QUANTUM:
                layout[i].block = createQuantumBlock(location);
                break;
            case BLOCK_METAL:
                layout[i].block = createMetalBlock(location);
                break;
            case BLOCK_FLUFFY:
                layout[i].block = createFluffyBlock(location);
                break;
            case BLOCK_A:
                layout[i].block = createLetterBlock(location, "A");
                break;
            case BLOCK_R:
                layout[i].block = createLetterBlock(location, "R");
                break;
            case BLOCK_S:
                layout[i].block = createLetterBlock(location, "S");
                break;
            case BLOCK_T:
                layout[i].block = createLetterBlock(location, "T");
                break;
            default:
                i--;
                break;
        }
        if (i>0 && typeof layout[i].block != "undefined") {
            blocks.push(layout[i].block);
        }
        levelDataIndex++;
    }
}

function rowColToArrayIndex(col, row) {
    return col + BOARD_COLS * row;
}

function rowColAtTileIndex(tileIndex) {
    var col = tileIndex % BOARD_COLS;
    var row = Math.floor(tileIndex / BOARD_COLS);
    return {
        row: row,
        col: col
    }
}

function calculateTileIndexAtCoord(x, y) {
    var col = Math.floor((x - BOARD_X) / TILE_SIZE);
    var row = Math.floor((y) / TILE_SIZE);
    var tileIndex = rowColToArrayIndex(col, row);

    if (col >= 0 && col < BOARD_COLS &&
        row >= 0 && row < BOARD_ROWS) {
        return tileIndex;
    }

    return undefined;
}

function calculateCoordAtTileIndex(tileIndex) {
    var col = tileIndex % BOARD_COLS;
    var row = Math.floor(tileIndex / BOARD_COLS);
    return {
        x: TILE_SIZE * col + BOARD_X,
        y: TILE_SIZE * row
    };
}

function convertBoardToArray() {
    var levelArray = Array(BOARD_ROWS * BOARD_COLS);

    for (var i = 0; i < layout.length; i++) {
        if (layout[i].active) {
            if (layout[i].isGoal) {
                levelArray[i] = TILE_GOAL;
            }
            else {
                levelArray[i] = TILE_EMPTY;
            }
        }
        else {
            levelArray[i] = TILE_OFF;
        }
    }

    for (var i = 0; i < blocks.length; i++) {
        var tileIndex = calculateTileIndexAtCoord(blocks[i].x, blocks[i].y);
        levelArray[tileIndex] = blocks[i].type;
    }

    return levelArray;
}

function saveBoard() {
    boardHistory = boardHistory.slice(0, currentIndex + 1);

    var boardState = convertBoardToArray();
    if (boardHistory.length > 0) {
        var boardString = convertLevelDataToString(boardState);
        var lastBoardString = convertLevelDataToString(boardHistory[currentIndex]);

        if (boardString == lastBoardString) {
            return false;
        }
    }

    currentIndex++;

    boardHistory.push(boardState);
}

function undoMove() {
    if (boardHistory < 1) {
        return false;
    }
    loadLevel(boardHistory[currentIndex]);
    if (currentIndex > 0) {
        currentIndex--;
    }
    return true;
}

function redoMove() {
    if (currentIndex >= boardHistory.length - 1) {
        return false;
    }
    currentIndex++;
    loadLevel(boardHistory[currentIndex]);
    return true;
}

function restart() {
    loadLevel(boardHistory[0]);
    saveBoard();
}
