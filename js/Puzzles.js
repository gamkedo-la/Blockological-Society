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
############
##g#########
#m..########
#.m..#######
#p.m.#######
##...#######
############
############
############
############
############
############
`;

var magnetTestLevel =
`
############
#.g.t...####
#gm.m...####
#..p....####
##m.##.#####
#...#..g####
#.m.#..#####
#...##g#####
############
############
############
############
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

var quantumHard =
`
.....g..####
.....#....##
#.g..q#...##
....#.....##
.#q.....#.##
.#p.#.....##
.#..#.....##
.......#..##
.###.#..#.##
...........#
.....#.....#
###....#..##
`;

// hotkey is F5
function exportPuzzle()
{
    var levelData = convertBoardToArray();
	var exportString = convertLevelDataToString(levelData);
    window.prompt("Copy to clipboard and paste into Puzzles.js", exportString);
}

function convertLevelDataToString(levelData)
{
	var string = "`\n";
	for (var row = 0; row < BOARD_ROWS; row++)
	{
		string += levelData.slice(BOARD_COLS*row, BOARD_COLS*row+BOARD_COLS) + ",\n";
	}
	string = string.replace(/,/g, '');
	string += "`;";

	return string;
}
