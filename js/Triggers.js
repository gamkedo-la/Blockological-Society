var isGoalMet = false;

function checkForTriggers() {
    if (!isGoalMet && undoKeyHeld == false)
    {
        checkForGoal();
    }
}

function checkForGoal() {
    var goalTilesCovered = true;

    for (var i = 0; i < goalTiles.length; i++)
    {   index = goalTiles[i];
        //If it's a goal tile, but there is no block, no win.
        if (layout[index].isGoal &&
            (layout[index].block == undefined || layout[index].block == cursor))
        {
            goalTilesCovered = false;
        }
    }
    
    if (goalTilesCovered)
    {
        isGoalMet = true;
        goalTriggerSound.play();
    }
}
