
function updateMenu() {


    for (var i = 0; i < menuButtons.length; i++) {
        if (checkButtonMouseOver(menuButtons[i])) {
            menuButtons[i].hasFocus = true;
            if (mouseButtonHeld) {
                menuButtons[i].command();
                break;
            }
        }
        else menuButtons[i].hasFocus = false;
    }
}

//////////////////////                  Button callbacks                  ////////////////////
function startGame() {
    inMenu = false;

    if (!music_already_playing) // see Input.js - music waits until the 1st keypress
        musicTrack.loopSong("music/rooftops_by_mcfunkypants_lofi");
}

function startEditor() {
    inMenu = false;
    _EDIT_MODE = true;
    startLeaveTransition(emptyLevel);

    musicTrack.loopSong("music/rooftops_by_mcfunkypants_lofi");
}

var destinationBoard;
var timer = 0; //frames
//////////////////////                 Floaty transition                  ///////////////////
function startLeaveTransition(to) {
    //The game is frozen between the beginning and end of this transition
    destinationBoard = to;
    inLeaveTransition = true;
    var durations = [];

    for (var i = 0; i < blocks.length; i++) {
        blocks[i].velocityZ = getRandomBetween(-11,-6); //randomized z speeds
        blocks[i].targetZ = -900;
        var thisDuration = Math.abs((blocks[i].targetZ-blocks[i].z) / blocks[i].velocityZ);  //how long for this block?
        durations.push(thisDuration);
    }
    durations = QuickSort(durations);
    if (durations.length == 0){
        durations = [0];
    }
    timer = Math.ceil(durations[durations.length - 1]); //get longest
    //when timer reaches 0, we change to next phase!
    //it ain't 100% frame perfect, but it simplifies the phase detection a great deal

}
function startEnterTransition() {

    var durations = [];
    inLeaveTransition = false;
    inEnterTransition = true;
    loadLevel(destinationBoard);
    clearBoard();

    for (var i = 0; i < blocks.length; i++) {
        blocks[i].inTransit = true;
        blocks[i].z = -1000;
        blocks[i].targetZ = 0;
        blocks[i].velocityZ = getRandomBetween(6,11); //randomized z speeds
        var thisDuration = Math.abs((blocks[i].targetZ-blocks[i].z) / blocks[i].velocityZ);  //how long for this block?
        durations.push(thisDuration);
    }
    durations = QuickSort(durations);
    if (durations.length == 0){
        durations = [0];
    }
    timer = Math.ceil(durations[durations.length - 1]); //get longest
}

function updateTransition() {
    //blocks get updated in updateBlocks
    timer--;
    if (inLeaveTransition && timer <= 0) {
        console.log("Starting enter transition...");
        startEnterTransition();
    }
    if (inEnterTransition && timer <= 0) {
        console.log("Transition over, let's play!");
        inEnterTransition = false;
    }
}

/////////////////////                       Other                         ////////////////////
function createButton(name, x, y, sprite, command) {
    var button = {
        x: x, //(x,y) is center
        y: y,
        sprite: sprite,
        command: command,
        width: sprite.width,
        height: sprite.height
    }
    return button;
}

function checkButtonMouseOver(button) {
    if (mousePos.x <= button.x + button.width / 2 &&
        mousePos.x >= button.x - button.width / 2 &&
        mousePos.y <= button.y + button.height / 2 &&
        mousePos.y >= button.y - button.height / 2) {
        return true;
    }
    else return false;
}

//Called once, after image loading
function setupMenuButtons() {
    startButton = createButton("StartButton", 400, 230, startButtonPic, startGame);
    editorButton = createButton("EditorButton", 400, 380, editorButtonPic, startEditor);
    optionsButton = createButton("OptionsButton", 400, 530, optionsButtonPic, startEditor);
    menuButtons = [startButton, editorButton, optionsButton]; //soon in a state machine
}