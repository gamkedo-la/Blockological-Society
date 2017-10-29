var isGoalMet = false;

function checkForTriggers() {
    if (!isGoalMet && undoKeyHeld == false) {
        checkForGoal();
    }
    if (inMenu && undoKeyHeld == false) {
        checkMenuTiles();
    }
}

function checkForGoal() {
    var goalTilesCovered = true;

    if (goalTiles.length == 0) {
        goalTilesCovered = false;
    }

    for (var i = 0; i < goalTiles.length; i++) {
        index = goalTiles[i];
        //If it's a goal tile, but there is no block, no win.
        if (layout[index].isGoal &&
            (layout[index].block == undefined || layout[index].block == cursor)) {
            goalTilesCovered = false;
        }
    }

    if (goalTilesCovered) {
        isGoalMet = true;
        goalTriggerSound.play();
    }
}

function checkMenuTiles() {
    var menuTilesCovered = true;

    if (menuTiles.length == 0) {
        menuTilesCovered = false; //safety
    }

    for (var i = 0; i < menuTiles.length; i++) {
        index = menuTiles[i]; //it really is a ref to the index of the tile in the layout 

        if (layout[index].isStart &&
            (layout[index].block != undefined && layout[index].block != cursor)) {
            inMenu = false;
            loadLevel(magnetTestLevel);
            startGame();
        }
        else if (layout[index].isLoad &&
            (layout[index].block != undefined && layout[index].block != cursor)) {
            var toLoad = getUserPuzzle(); //returns NULL (not undefined) if the user clicks Cancel at the prompt
            if (toLoad == null) {
                resetKeyboardInputs();
                undoMove();
            }
            else {
                resetKeyboardInputs();
                try { loadLevel(toLoad); }
                catch (err) {
                    break; //the level was wrong, let's get out of here!
                }
                {
                    //All clear!
                    inMenu = false;
                    startGame();
                }
            }
        }
    }
}