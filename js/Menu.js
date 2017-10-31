
//s,t,a,r,t,e,d,i,t,c,l

var destinationBoard;

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
/*
function menuEventHandler(evt) {
    //disabled atm, now in startGame()!
    if (false) {
        inMenu = false;

        musicTrack.loopSong("music/rooftops_by_mcfunkypants_lofi");
    }
}
*/



//////////////////////                  Button callbacks                  ////////////////////
function startGame() {
    inMenu = false;

    musicTrack.loopSong("music/rooftops_by_mcfunkypants_lofi");
}

function startEditor() {
    inMenu = false;
    _EDIT_MODE = true;
    loadLevel(emptyLevel);

    musicTrack.loopSong("music/rooftops_by_mcfunkypants_lofi");
}

//////////////////////                 Floaty transition                  ///////////////////
function startLeaveTransition(to) {
    //The game is frozen between the beginning and end of this transition
    destinationBoard = to;
    remaining = blocks.length; //ticks down in updateTransition
    inLeaveTransition = true;
    boardHistory = [];
    for (var i = 0; i < blocks.length; i++) {
        blocks[i].inTransit = true;
    }
    for (var i = 0; i < blocks.length; i++) {
        console.log(blocks[i].inTransit);
    }

    console.log(remaining);

}
function startEnterTransition() {
    inLeaveTransition = false;
    inEnterTransition = true;
    loadLevel(destinationBoard);
    remaining = blocks.length;
    blocksRemaining = ArrayWithOnes(blocks.length);
    for (var i = 0; i < blocks.length; i++) {
        blocks[i].inTransit = true;
        blocks[i].z = -1000;
        blocks[i].targetZ = 0;
        blocks[i].velocityZ = (Math.random() + 0.2) * 5;
        //blocks[i].velocityZ = 0;
    }
}

function updateTransition() {
    //blocks get updated in updateBlocks
    console.log(ArraySum(blocksRemaining));
    if (inEnterTransition && ArraySum(blocksRemaining)==0) {
        console.log("Transition over");
        inEnterTransition = false;
    }
    if (inLeaveTransition && blocks.length == 0) {
            console.log("Starting enter transition");
            startEnterTransition();
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