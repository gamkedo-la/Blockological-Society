var isGoalMet = false;

function checkForTriggers() {
    if (!isGoalMet)
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
            if (layout[tileIndex].isGoal && layout[tileIndex].block == undefined)
            {
                goalTilesCovered = false;
            }
        }
    }

    if (goalTilesCovered)
    {
        isGoalMet = true;
        //TODO: add delay to allow for animation
        //TODO: replace alert with some sort of UI
        //TODO: trigger opening up next puzzle
    }
}
