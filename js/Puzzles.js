const CURSOR = "p";
const TILE_OFF = "#";
const TILE_EMPTY = ".";
const TILE_GOAL = "g";
const TILE_MENU_START = "s";
const TILE_MENU_LOAD = "l";
const BLOCK_MAGNET = "m";
const BLOCK_ICE = "i";
const BLOCK_FIRE = "r";
const BLOCK_METAL = "t";
const BLOCK_QUANTUM = "q";
const BLOCK_FLUFFY = "f";
const BLOCK_GHOST = "o";

const BLOCK_A = "A";
const BLOCK_R = "R";
const BLOCK_S = "S";
const BLOCK_T = "T"; 

var menuLevel = `
ffff.fffffff
............
..l.....s...
............
............
............
....f.f.....
START.ffffff
............
..s..f..l...
............
.....p......
`;

var goalTest =
`
............
............
............
............
............
............
............
............
.....gf.....
.....p......
............
............
`;

var emptyLevel =
`
............
............
............
............
............
............
............
............
............
............
............
...........p
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

var bedSpread =
`
############
############
############
###.g.g.####
###gfffg####
###.f.f.####
###gfffg####
###.gpg.####
############
############
############
############
`;


var testingPuzzle = `
...rf.......
f...........
r.q.....iq..
....g.g.....
...g.ffgf...
.....fff....
...g...g..ff
..q.g.g...#.
.q.i......m.
...p...#m...
.........m.m
.........m.#
`;
// hotkey is F5
function exportPuzzle()
{
    var levelData = convertBoardToArray();
	var exportString = convertLevelDataToString(levelData);
    window.prompt("Copy to clipboard and paste into Puzzles.js", exportString);
}
function getUserPuzzle(){
	var levelString = window.prompt("Paste the level you want to play here!");
	return levelString;
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
