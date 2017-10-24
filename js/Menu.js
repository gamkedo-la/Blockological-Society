
//s,t,a,r,t,e,d,i,t,c,l

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