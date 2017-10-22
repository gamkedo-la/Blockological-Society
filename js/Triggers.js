var isGoalMet = false;

function checkForTriggers() {
    if (!isGoalMet && undoKeyHeld == false)
    {
        checkForGoal();
    }
}

function checkForGoal() {
    var goalTilesCovered = true;

    for (var row = 0; row < BOARD_ROWS; row++)
    {
        for (var col = 0; col < BOARD_COLS; col++)
        {
            var tileIndex = rowColToArrayIndex(col, row);
            //If it's a goal tile, but there is no block, no win.
            if (layout[tileIndex].isGoal &&
                (layout[tileIndex].block == undefined || layout[tileIndex].block == cursor))
            {
                goalTilesCovered = false;
            }
        }
    }

    if (goalTilesCovered)
    {
        isGoalMet = true;
        goalTriggerSound.play();
    }
}
