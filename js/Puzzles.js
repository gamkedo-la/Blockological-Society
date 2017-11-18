const CURSOR = "p";
const TILE_OFF = "#";
const TILE_EMPTY = ".";
const TILE_GOAL = "g";
const TILE_MENU_START = "s";
const TILE_MENU_LOAD = "l";
const TILE_MENU_EDITOR = "e";
const TILE_MENU_LEVELSTART = "@"; //give this to all "level start" tiles
const BLOCK_MAGNET = "m";
const BLOCK_ICE = "i";
const BLOCK_FIRE = "r";
const BLOCK_METAL = "t";
const BLOCK_QUANTUM = "q";
const BLOCK_FLUFFY = "f";
const BLOCK_GHOST = "o";

const BLOCK_A = "A";
const BLOCK_C = "C";
const BLOCK_D = "D";
const BLOCK_E = "E";
const BLOCK_I = "I";
const BLOCK_L = "L";
const BLOCK_O = "O"; 
const BLOCK_R = "R";
const BLOCK_S = "S";
const BLOCK_T = "T"; 

const BLOCK_1 = "1";
const BLOCK_2 = "2";
const BLOCK_3 = "3";

var menuLevel = `
LOAD.CREDITS
............
..l.....s...
............
............
............
....f.f.....
START.EDITOR
............
..s..f..e...
............
.....p......
`;

var levelSelect = `
.....p......
............
.1.1.1.1.1..
.@.@.@.@.@..
............
.2.2...2....
.@.@...@....
............
.3.3.3.3.3..
.@.@.@.@.@..
............
............
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
......p.....
............
............
............
............
............
............
`;

var icyManeuvers = `
ii....ii.r..
..i......rt.
.........tt.
rrr.........
tttttm.....r
p..rt......r
.i.rtt.i...r
..r.m....tt.
.itt...tttt.
....m..ttg..
............
rrrrtt...m..
`;

var strongStrongMagnets = `
############
############
############
###g...m.###
###m..t..###
###f.tm..###
###......###
###..m.m.###
###...m..###
###...p..###
############
############
`;
var justPickOne = `
.m.m.m.m.m.g
m...#######m
......m.....
m...m..m...m
...m.m..m.m.
m....#######
.m.m.m......
###.m.m.m.m.
.m.m.m.....m
.#t##.....m.
p.#t###..m..
..m.m.m.m...
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

var easyIntro = `
ffffffffffff
ffffffffffff
ff#######fff
ff#....##fff
ff#.f..##fff
ff#.g.p##fff
ff#....##fff
ff#######fff
ff#######fff
ffffffffffff
ffffffffffff
ffffffffffff
`;
var step2Intro = `
ffffffffffff
f...fff...ff
f...f.....ff
f..ff#....ff
fffff#...fff
ff.###...fff
ff....g..fff
f......p.fff
f........fff
f...ffffffff
ffffffffffff
ffffffffffff
`;
var step3Intro = `
ffffffffffff
ffffffffffff
fff......fff
ff........ff
ff..#f#...ff
ff..#f#...ff
ff..g.p...ff
ff........ff
ff........ff
fff......fff
ffffffffffff
ffffffffffff
`;

var allUnlocked = true;
var levelOrder = [easyIntro, step2Intro, step3Intro, strongStrongMagnets,
					quantumTunnel, quantumHard, icyManeuvers,bedSpread,
					magnetLevels.intro,magnetLevels.stuckMagnet,
					magnetLevels.stuckMagnet2,magnetLevels.stuckMagnet3,
					magnetLevels.stuckMagnet4];
levelOrder[0].isUnlocked = true; //the beginning of all that is!

// hotkey is F5
function exportPuzzle()
{
    var levelData = convertBoardToArray();
	var exportString = convertLevelDataToString(levelData);
    window.prompt("Copy to clipboard and paste into Puzzles.js", exportString);
}
function getUserPuzzle(){
	var levelString = window.prompt("Paste the level you want to play here!");
	//levelString = levelString.replace(/\s/g, "!"); //replaces whitespaces with other whitespaces that work
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
