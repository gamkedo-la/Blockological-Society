const BOARD_X = 366;
const BOARD_GAP = 2;
const BOARD_COLS = 12;
const BOARD_ROWS = 12;
const TILE_SIZE = 34;
const BOARD_COLOR = '#2980b9'; // 'rgba(255,255,255,0.5)'; also works
const TILE_COLOR = '#3498db';
const GOAL_COLOR = '#44db34';
const GOAL_COLOR_UNSOLVED = '#ffff00';

var layout;
var boardHistory = [];
var currentIndex = -1;

var goalTiles = []; //stored to not iterate over whole grid in checkGoal
var menuTiles = [];

var invalidLevel = false; //best practice would have been to have been a return value of a checkIfValid function, but that would mean iterating over the board twice (unless I'm dumb?)

function loadLevel(level) {
    isGoalMet = false;
    invalidLevel = false;
    blocks = [];
    goalTiles = [];
    menuTiles = [];
    var currentLvlTile = 0; //start at level "0" and incremented with every "@" tile
    var tile = {
        active: false,
        block: undefined
    }

    layout = Array(BOARD_ROWS * BOARD_COLS);
    var levelDataIndex = 0;
    for (var i = 0; i < layout.length; i++) {
        // copy tile object data into array index
        // BUGFIX: spread "..." operator incompatible with old browsers
        // layout[i] = { ...tile }; // works in Chrome but not Edge
        layout[i] = { active: tile.active, block: tile.block };
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
                goalTiles.push(i);
                break;
            case TILE_MENU_START:
                layout[i].isStart = true;
                menuTiles.push(i);
                break;
            case TILE_MENU_CREDITS:
                layout[i].isCredits = true;
                menuTiles.push(i);
                break;
            case TILE_MENU_LOAD:
                layout[i].isLoad = true;
                menuTiles.push(i);
                break;
            case TILE_MENU_LEVELSTART:
                layout[i].isLevel = true;
                if (currentLvlTile <= currentLevel){
                    layout[i].isUnlocked = true;
                }
                layout[i].levelNumber = currentLvlTile;
                currentLvlTile++;
                menuTiles.push(i);
                break;
            case TILE_MENU_EDITOR:
                layout[i].isEditor = true;
                menuTiles.push(i);
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
            case BLOCK_GHOST:
                layout[i].block = createGhostBlock(location);
                break;
            case BLOCK_A:
                layout[i].block = createMarkedBlock(location, "A");
                break;
            case BLOCK_C:
                layout[i].block = createMarkedBlock(location, "C");
                break;
            case BLOCK_D:
                layout[i].block = createMarkedBlock(location, "D");
                break;
            case BLOCK_E:
                layout[i].block = createMarkedBlock(location, "E");
                break;
            case BLOCK_I:
                layout[i].block = createMarkedBlock(location, "I");
                break;
            case BLOCK_L:
                layout[i].block = createMarkedBlock(location, "L");
                break;
            case BLOCK_O:
                layout[i].block = createMarkedBlock(location, "O");
                break;
            case BLOCK_R:
                layout[i].block = createMarkedBlock(location, "R");
                break;
            case BLOCK_S:
                layout[i].block = createMarkedBlock(location, "S");
                break;
            case BLOCK_T:
                layout[i].block = createMarkedBlock(location, "T");
                break;
            case BLOCK_1:
            console.log("Made number block 1");
                layout[i].block = createMarkedBlock(location, "1");
                break;
            case BLOCK_2:
            console.log("Made number block 2");
                layout[i].block = createMarkedBlock(location, "2");
                break;
            case BLOCK_3:
            console.log("Made number block 3");
                layout[i].block = createMarkedBlock(location, "3");
                break;
            case "\n":
                i--;
                break;
            case " ":
                i--;
                break;
            //If we reach here, there is an incorrect character in the level string; abort mission!
            default:
                invalidLevel = true; //drats!
                break;
        }
        if (i >= 0 && typeof layout[i].block != "undefined") {
            blocks.push(layout[i].block);
        }
        levelDataIndex++;
    }
    if (invalidLevel) {
        console.log("Incorrect character in the level input. Reverting board...");
        undoMove();
        throw "Invalid level entered";
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
            else if (layout[i].isStart) {
                levelArray[i] = TILE_MENU_START;
            }
            else if (layout[i].isLoad) {
                levelArray[i] = TILE_MENU_LOAD;
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

//used when changing levels
function clearBoard(){
    boardHistory = [];
    currentIndex = -1; //might be better to refactor this to 0?
    saveBoard();
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
