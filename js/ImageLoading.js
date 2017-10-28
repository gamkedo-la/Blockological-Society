//Menus
var startButtonPic = document.createElement("img");
var editorButtonPic = document.createElement("img");
var optionsButtonPic = document.createElement("img");



//In-game objects
var tileGoalPic     = document.createElement("img");
var tileOffPic      = document.createElement("img");
var tileEmptyPic    = document.createElement("img");
var blockMagnetPic  = document.createElement("img");
var blockIcePic     = document.createElement("img");
var blockFirePic    = document.createElement("img");
var blockQuantumPic = document.createElement("img");
var blockMetalPic   = document.createElement("img");
var blockFluffyPic  = document.createElement("img");
var blockYellowPic  = document.createElement("img");
var blockGhostPic   = document.createElement("img");
var cursorPic       = document.createElement("img");

var letterBlockA  = document.createElement("img");
//var letterBlockE  = document.createElement("img");
var letterBlockR  = document.createElement("img");
var letterBlockS  = document.createElement("img");
var letterBlockT  = document.createElement("img");

//Puzzle Editor
var editorTileGoalPic = document.createElement("img");
var editorTileOffPic = document.createElement("img");
var editorTileEmptyPic = document.createElement("img");
var editorBlockMagnetPic = document.createElement("img");
var editorBlockIcePic = document.createElement("img");
var editorBlockFirePic = document.createElement("img");
var editorBlockQuantumPic = document.createElement("img");
var editorBlockMetalPic = document.createElement("img");
var editorBlockFluffyPic = document.createElement("img");
var editorBlockYellowPic = document.createElement("img");
var editorCursorPic = document.createElement("img");
var editorBlockGhostPic = document.createElement("img");


var picsToLoad = 0; //set automatically in loadImages()

function loadImages() {
    var imageList = [
        { varName: startButtonPic, theFile: "img/menu/startButton.png"},
        { varName: editorButtonPic, theFile: "img/menu/editorButton.png"},
        { varName: optionsButtonPic, theFile: "img/menu/optionsButton.png"},

        { varName: tileGoalPic, theFile: "img/tile_goal.png"},
        { varName: tileOffPic, theFile: "img/tile_off.png"},
        { varName: tileEmptyPic, theFile: "img/tile_empty.png"},
        { varName: blockMagnetPic, theFile: "img/cube_magnet.png"},
        { varName: blockIcePic, theFile: "img/cube_ice.png"},
        { varName: blockFirePic, theFile: "img/cube_fire_PLEASE_REPLACE.png"},
        { varName: blockQuantumPic, theFile: "img/cube_quantum.png"},
        { varName: blockMetalPic, theFile: "img/cube_metal.png"},
        { varName: blockFluffyPic, theFile: "img/cube_fluffy.png"},
        { varName: blockYellowPic, theFile: "img/cube_yellow.png"},
        { varName: blockGhostPic, theFile: "img/cube_ghost.png"},
        { varName: letterBlockA, theFile: "img/letterCubes/cube_A.png"},
        { varName: letterBlockR, theFile: "img/letterCubes/cube_R.png"},
        { varName: letterBlockS, theFile: "img/letterCubes/cube_S.png"},
        { varName: letterBlockT, theFile: "img/letterCubes/cube_T.png"},
        { varName: cursorPic, theFile: "img/cursor.png"},

        { varName: editorTileGoalPic, theFile: "img/editor/edit_tile_goal.png"},
        { varName: editorTileOffPic, theFile: "img/editor/edit_tile_off.png"},
        { varName: editorTileEmptyPic, theFile: "img/editor/edit_tile_empty.png"},
        { varName: editorBlockMagnetPic, theFile: "img/editor/edit_cube_magnet.png"},
        { varName: editorBlockIcePic, theFile: "img/editor/edit_cube_ice.png"},
        { varName: editorBlockFirePic, theFile: "img/editor/edit_cube_fire_PLEASE_REPLACE.png"},
        { varName: editorBlockQuantumPic, theFile: "img/editor/edit_cube_quantum.png"},
        { varName: editorBlockMetalPic, theFile: "img/editor/edit_cube_metal.png"},
        { varName: editorBlockFluffyPic, theFile: "img/editor/edit_cube_fluffy.png"},
        { varName: editorBlockGhostPic, theFile: "img/editor/edit_cube_ghost.png"},
        { varName: editorCursorPic, theFile: "img/editor/edit_cursor.png"}
    ]
    picsToLoad = imageList.length; //This method avoids a race condition

    for (var i = 0; i < imageList.length; i++) {
        beginLoadingImage(imageList[i].varName, imageList[i].theFile);
    }
}

/*
startButtonPic.src = "img/menu/startButton.png";

tileGoalPic.src = "img/tile_goal.png";
tileOffPic.src = "img/tile_off.png";
tileEmptyPic.src = "img/tile_empty.png";
blockMagnetPic.src = "img/cube_magnet.png";
blockIcePic.src = "img/cube_ice.png";
blockQuantumPic.src = "img/cube_quantum.png";
blockMetalPic.src = "img/cube_metal.png";
blockFluffyPic.src = "img/cube_fluffy.png";
blockYellowPic.src = "img/cube_yellow.png";
blockFirePic.src = "img/cube_fire_PLEASE_REPLACE.png";
cursorPic.src = "img/cursor.png";

editorTileGoalPic.src = "img/editor/edit_tile_goal.png";
editorTileOffPic.src = "img/editor/edit_tile_off.png";
editorTileEmptyPic.src = "img/editor/edit_tile_empty.png";
editorBlockMagnetPic.src = "img/editor/edit_cube_magnet.png";
editorBlockIcePic.src = "img/editor/edit_cube_ice.png";
editorBlockQuantumPic.src = "img/editor/edit_cube_quantum.png";
editorBlockMetalPic.src = "img/editor/edit_cube_metal.png";
editorBlockFluffyPic.src = "img/editor/edit_cube_fluffy.png";
editorBlockFirePic.src = "img/editor/edit_cube_fire_PLEASE_REPLACE.png";
editorCursorPic.src = "img/editor/edit_cursor.png";
*/

function countLoadedImagesAndLaunchIfReady() {
    picsToLoad--;
    //console.log(picsToLoad);
    if (picsToLoad == 0) {
        imageLoadingDoneSoStartGame();
    }
}

function beginLoadingImage(imgVar, fileName) {
    imgVar.onload = function (){
        countLoadedImagesAndLaunchIfReady();
    }
    imgVar.src = fileName;
}