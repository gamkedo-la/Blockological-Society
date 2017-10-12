const CURSOR = "p";
const TILE_OFF = "#";
const TILE_EMPTY = ".";
const TILE_GOAL = "g";
const BLOCK_MAGNET = "m";
const BLOCK_ICE = "i";
const BLOCK_FIRE = "f";
const BLOCK_METAL = "t";
const BLOCK_QUANTUM = "q";

var emptyLevel =
`
	#,#,#,#,#,#,#,#,#,#,#,#,
	#,#,g,#,#,#,#,#,#,#,#,#,
	#,m,.,.,#,#,#,#,#,#,#,#,
	#,.,m,.,.,#,#,#,#,#,#,#,
	#,p,.,m,.,#,#,#,#,#,#,#,
	#,#,.,.,.,#,#,#,#,#,#,#,
	#,#,#,#,#,#,#,#,#,#,#,#,
	#,#,#,#,#,#,#,#,#,#,#,#,
	#,#,#,#,#,#,#,#,#,#,#,#,
	#,#,#,#,#,#,#,#,#,#,#,#,
	#,#,#,#,#,#,#,#,#,#,#,#,
	#,#,#,#,#,#,#,#,#,#,#,#,
`;

var magnetTestLevel =
`
	#,#,#,#,#,#,#,#,#,#,#,#,
	#,.,g,.,t,.,.,.,#,#,#,#,
	#,g,m,.,m,.,.,.,#,#,#,#,
	#,.,.,p,.,.,.,.,#,#,#,#,
	#,#,m,.,#,#,.,#,#,#,#,#,
	#,.,.,.,#,.,.,g,#,#,#,#,
	#,.,m,.,#,.,.,#,#,#,#,#,
	#,.,.,.,#,#,g,#,#,#,#,#,
	#,#,#,#,#,#,#,#,#,#,#,#,
	#,#,#,#,#,#,#,#,#,#,#,#,
	#,#,#,#,#,#,#,#,#,#,#,#,
	#,#,#,#,#,#,#,#,#,#,#,#,
`;

var quantumTunnel =
`
	...g.......#
	.#.###.#.#.#
	.g.........#
	.#.#.###.#.#
	..q..#.....#
	.#.#.#.###.#
	q#..p....#.#
	.#.#.#.#.#.#
	...#.......#
	.#.###.#.#.#
	...........#
	############

`;

// hotkey is F5
function exportPuzzle()
{
    var levelData, exportString;

    levelData = convertBoardToArray();

    exportString = "var puzzle = \n`\n"
    for (var i = 0; i < levelData; i++)
    {
        exportString += "\t" + levelData.slice(BOARD_COLS*row, BOARD_COLS*row+BOARD_COLS) + ",\n";
    }
    exportString += "`;";

    window.prompt("Copy to clipboard and paste into Puzzles.js", exportString);
}
