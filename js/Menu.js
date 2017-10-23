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
        context.drawImage(button.sprite, button.x - button.width / 2, button.y - button.height / 2);
    }
}
function setupMenuButtons(){
    startButton = createButton("Start Button", 400, 300, startButtonPic, startGame);
    menuButtons = [startButton];
}

function drawMenuButtons() {
    for (var i = 0; i < menuButtons.length; i++) {
        drawButton(menuButtons[i]);
    }
}

function checkButtonMouseOver(button) {
    if (mousePos.x <= startButton.x + startButton.width / 2 &&
        mousePos.x >= startButton.x - startButton.width / 2 &&
        mousePos.y <= startButton.y + startButton.height / 2 &&
        mousePos.y >= startButton.y - startButton.height / 2) {
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