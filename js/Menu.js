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

function drawButton(button) {
    if (typeof button.sprite == undefined) {
        colorRect(button.x - button.width / 2, button.y - button.height / 2, button.width, button.height, "red");
    }
    else {
        context.drawImage(button.sprite, button.x - button.width / 2, button.y - button.height / 2, button.width, button.height);
    }
}

function setupMenuButtons() {
    startButton = createButton("StartButton", 400, 250, startButtonPic, startGame);
    editorButton = createButton("EditorButton", 400, 400, editorButtonPic, startEditor);
    menuButtons = [startButton, editorButton]; //soon in a state machine
}

function drawMenuButtons() {
    for (var i = 0; i < menuButtons.length; i++) {
        drawButton(menuButtons[i]);
    }
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

function updateMenu() {
    if (mouseButtonHeld) {
        for (var i = 0; i < menuButtons.length; i++) {
            if (checkButtonMouseOver(menuButtons[i])) {
                menuButtons[i].command();
                break;
            }
        }
    }
}
function menuEventHandler(evt) {
    if (evt.keyCode == KEY_ENTER) {
        inMenu = false;

        musicTrack.loopSong("music/rooftops_by_mcfunkypants_lofi");
    }
}

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