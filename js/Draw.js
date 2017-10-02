function drawBackground()
{
    colorRect(0, 0, canvas.width, canvas.height, BOARD_COLOR);
}

function drawBoard()
{
    var isoX, isoY, result;
    var x = BOARD_X;
    var y = BOARD_Y;
    for (var row = 0; row < BOARD_ROWS; row++)
    {
        for (var col = 0; col < BOARD_COLS; col++)
        {
            var tileIndex = rowColToArrayIndex(col, row);
            if (grid.layout[tileIndex].active)
            {
                var iso = twoDToIso(x, y);
                drawIsoRhombusFilled(TILE_COLOR, iso.x, iso.y, TILE_SIZE-grid.gap);
            }
            x += TILE_SIZE;
        }
        x = grid.x;
        y += TILE_SIZE;
    }
}

function drawSortedObjects()
{
	if (isMoving(cursor))
	{
		for (var i = 0; i < blocks.length; i++)
		{
			var block = blocks[i];
			var iso = twoDToIso(block.x, block.y);
			block.yLevel = iso.y;
		}

		blocks = yLevelQuickSort(blocks);
	}

	for (var i = 0; i < blocks.length; i++)
	{
		if (blocks[i] == cursor)
		{
			var iso = twoDToIso(cursor.x, cursor.y);
			drawBitmapCenteredWithRotation(cursorPic, iso.x+TILE_SIZE-3, iso.y-3, 0);
		}
		else
		{
			var block = blocks[i];
			var iso = twoDToIso(block.x, block.y);
			drawBitmapCenteredWithRotation(blockPic, iso.x+TILE_SIZE-3, iso.y-3, 0);
		}
	}
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
	return result;
}
