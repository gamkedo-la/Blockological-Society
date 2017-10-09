const CURSOR = 99;
const TILE_OFF = 0;
const TILE_EMPTY = 1;
const TILE_GOAL = 2;
const BLOCK_MAGNET = 3;
const BLOCK_ICE = 4;
const BLOCK_FIRE = 5;
const BLOCK_METAL = 6;
const BLOCK_QUANTUM = 7;

var testLevel = [
	0,0,0,0,0,0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,0,0,0,0,0,
	0,0,0,0,0,1,1,1,0,0,0,0,
	0,0,0,0,1,1,3,1,0,0,0,0,
	0,0,1,1,1,7,1,5,2,0,0,0,
	0,0,3,1,2,1,1,1,1,0,0,0,
	0,0,1,1,1,7,1,1,1,1,0,0,
	0,0,2,3,1,99,3,1,6,1,0,0,
	0,0,0,0,0,1,1,1,1,0,0,0,
	0,0,0,0,0,0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,0,0,0,0,0,
];

var emptyLevel = [
	0,0,0,0,0,0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,0,0,0,0,0,
	0,0,0,1,1,1,0,0,0,0,0,0,
	0,0,0,1,7,99,0,0,0,0,0,0,
	0,0,0,1,1,1,0,0,0,0,0,0,
	0,0,0,0,0,0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,0,0,0,0,0,
];

// hotkey is F5
function exportPuzzle()
{
    var levelData, exportString;

    levelData = convertBoardToArray();

    exportString = "var puzzle = [\n"
    for (var row = 0; row < BOARD_ROWS; row++)
    {
        exportString += "\t" + levelData.slice(BOARD_COLS*row, BOARD_COLS*row+BOARD_COLS) + ",\n";
    }
    exportString += "];";

    window.prompt("Copy to clipboard and paste into Puzzles.js", exportString);
}
