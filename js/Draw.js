
//Main UI elements: buttons, slider, all that good stuff

function drawMenu()
{
	drawText("Blockological Society", canvas.width*0.25, canvas.height*0.15, '36px Consolas', 'yellow');
	//drawText("Press Enter to Play!", canvas.width*0.35, canvas.height*0.35, '24px Consolas', 'yellow');
	drawMenuButtons();
}
function drawButton(button) {
    var highlightSize = 5;
    if (button.hasFocus) {
        colorRect(button.x - button.width / 2 - highlightSize, button.y - button.height / 2 - highlightSize, button.width + highlightSize * 2, button.height + highlightSize * 2, "red");
    }
    if (typeof button.sprite == undefined) {
        colorRect(button.x - button.width / 2, button.y - button.height / 2, button.width, button.height, "red");
    }
    else {
        context.drawImage(button.sprite, button.x - button.width / 2, button.y - button.height / 2, button.width, button.height);
    }
}
function drawMenuButtons() {
    for (var i = 0; i < menuButtons.length; i++) {
        drawButton(menuButtons[i]);
    }
}


//Ingame elements
function drawBackground()
{
	// fill with a solid color
	//colorRect(0, 0, canvas.width, canvas.height, BOARD_COLOR);
	
	// allow for transparent canvas with backgrounds underneath
	context.clearRect(0,0,canvas.width,canvas.height);
}

function drawBoard()
{
    var x = BOARD_X;
    var y = 0;
    for (var row = 0; row < BOARD_ROWS; row++)
    {
        for (var col = 0; col < BOARD_COLS; col++)
        {
            var tileIndex = rowColToArrayIndex(col, row);
			var tile = layout[tileIndex];
			if (tile.active)
            {
                var iso = twoDToIso(x, y);
                var currentColor = tile.isGoal||tile.isStart || tile.isLoad || tile.isEditor ? GOAL_COLOR : TILE_COLOR;

				drawIsoRhombusFilled(currentColor, iso.x, iso.y, TILE_SIZE-BOARD_GAP);
            }
            x += TILE_SIZE;
        }
        x = BOARD_X;
        y += TILE_SIZE;
    }
}

function drawSortedObjects()
{
	for (var i = 0; i < blocks.length; i++)
	{
		var block = blocks[i];
		var iso = twoDToIso(block.x, block.y);
		block.yLevel = iso.y;
	}

	blocks = yLevelQuickSort(blocks);

	for (var i = 0; i < blocks.length; i++)
	{
			var block = blocks[i];
			var iso = twoDToIso(block.x, block.y);
			drawBitmapCenteredWithRotation(block.sprite, iso.x+TILE_SIZE-3, iso.y-3 + block.z, 0);
	}

	drawGoalFrames();
}

function yLevelQuickSort(array)
{
	var pivotIndex, pivot, result;
	var beforeList = [];
	var afterList = [];

	pivotIndex = Math.floor(Math.random() + array.length-1);
	pivot = array[pivotIndex];
	array.splice(pivotIndex, 1);

	for (var i = 0; i < array.length; i++)
	{
		if (array[i].yLevel < pivot.yLevel)
		{
			beforeList.push(array[i]);
		}
		else
		{
			afterList.push(array[i]);
		}
	}
	if (beforeList.length > 1)
	{
		beforeList = yLevelQuickSort(beforeList);
	}
	if (afterList.length > 1)
	{
		afterList = yLevelQuickSort(afterList);
	}
	beforeList.push(pivot);
	result = beforeList.concat(afterList);
	if (result[0] == undefined) { result = [];}
	return result;
}

function drawGoalFrames()
{
    var x = BOARD_X;
    var y = 0;
    for (var row = 0; row < BOARD_ROWS; row++)
    {
        for (var col = 0; col < BOARD_COLS; col++)
        {
            var tileIndex = rowColToArrayIndex(col, row);
            if (layout[tileIndex].active)
            {
				var iso = twoDToIso(x, y);
				if (layout[tileIndex].isGoal)
				{
					if (layout[tileIndex].block == undefined) // not covered by a block
					{
						drawIsoRhombusWire("rgba(0,0,0,0)",GOAL_COLOR_UNSOLVED, iso.x, iso.y, TILE_SIZE-BOARD_GAP);
					}
					else // has a block: success
					{
						drawIsoRhombusWire("rgba(0,0,0,0)",GOAL_COLOR, iso.x, iso.y, TILE_SIZE-BOARD_GAP);
					}
				}
				
            }
            x += TILE_SIZE;
        }
        x = BOARD_X;
        y += TILE_SIZE;
    }
}