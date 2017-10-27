var _EDIT_MODE = false;
var puzzleEditor;
var anchorRow = -1;
var anchorCol = -1;

puzzleEditor = {

	button: [
		{ image: editorTileOffPic, preview: tileOffPic, command: setInactiveTile },
		{ image: editorTileEmptyPic, preview: tileEmptyPic, command: setActiveTile },
		{ image: editorTileGoalPic, preview: tileGoalPic, command: setGoalTile },
		{ image: editorCursorPic, preview: cursorPic, command: setCursor },
		{ image: editorBlockMetalPic, preview: blockMetalPic, command: setMetalBlock },
		{ image: editorBlockMagnetPic, preview: blockMagnetPic, command: setMagnetBlock },
		{ image: editorBlockIcePic, preview: blockIcePic, command: setIceBlock },
		{ image: editorBlockFirePic, preview: blockFirePic, command: setFireBlock },
		{ image: editorBlockQuantumPic, preview: blockQuantumPic, command: setQuantumBlock },
		{ image: editorBlockFluffyPic, preview: blockFluffyPic, command: setFluffyBlock },
	],

	selected: undefined,

	x: 0,
	y: 0,
	offsetY: 36,
	width: 33,
	height: 96,

	color: 'dimGrey',
	highlightColor: 'lightGrey',
};

function drawPanelWithButtons(panel)
{
	var x = panel.x;
	var y = panel.y;

	for (var i = 0; i < panel.button.length; i++)
	{
		var button = panel.button[i];
		var buttonY = y - panel.offsetY;
		var color = panel.color;

		if (panel.selected == button)
		{
			color = panel.highlightColor;
			drawButton(panel.button[i].image, color);
		}
		else
		{
			drawButton(panel.button[i].image, color);
		}
	}

	function drawButton(image, color)
	{
		colorRect(x, y, 32, 35, color);
		drawBitmapCenteredWithRotation(image, x+16, y+17.5, 0);
		y += panel.offsetY;
		if (y > panel.y + panel.height)
		{
			y = panel.y;
			x += panel.width;
		}
	}

	if (panel.selected != undefined)
	{
		if (isoMousePos != undefined)
		{
			drawBitmapCenteredWithRotation(panel.selected.preview, isoMousePos.x+32, isoMousePos.y-3, 0);
		}
	}
}

function panelUpdate(panel)
{
	var x = panel.x;
	var y = panel.y;

	for (var i = 0; i < panel.button.length; i++)
	{
		var button = panel.button[i];
		var color = panel.color;

		if (mousePos.x > x && mousePos.x < x + panel.width &&
			mousePos.y > y && mousePos.y < y + panel.offsetY)
		{
			if (mouseButtonHeld)
			{
				panel.selected = button;
			}
		}
		y += panel.offsetY;
		if (y > panel.y + panel.height)
		{
			y = panel.y;
			x += panel.width;
		}
	}

	moveTimer -= TIME_PER_TICK;
	if (undoKeyHeld && moveTimer <=0)
	{
		undoMove();
		moveTimer = MOVE_DELAY/2;
	}
	else if (redoKeyHeld && moveTimer <=0)
	{
		redoMove();
		moveTimer = MOVE_DELAY/2;
	}
	else if (mouseButtonHeld)
	{
		var point = { x: mousePos.x, y: mousePos.y };
		if (panel.selected != undefined)
		{
			saveBoard();
			puzzleEditor.selected.command(point);
		}
	}
}

function editorKeyHandler(evt)
{
	if (!_EDIT_MODE)
	{
		return false;
	}

	switch (evt.keyCode)
	{
		case KEY_M:
			randomPuzzle();
			break;
		case KEY_P:
			exportPuzzle();
			break;
		case KEY_NUM_1:
			loadLevel(testLevel);
			break;
		case KEY_NUM_2:
			loadLevel(emptyLevel);
			break;
		case KEY_NUM_2:
			loadLevel(magnetTestLevel);
			break;
		default:
			break;
	}
}

function setActiveTile(point)
{
	var cart = isoTotwoD(point.x - TILE_SIZE, point.y);
	var tileIndex = calculateTileIndexAtCoord(cart.x, cart.y);
	if (tileIndex != undefined)
	{
		if (layout[tileIndex].block != undefined)
		{
			layout[tileIndex].block.destroy();
		}
		var location = calculateCoordAtTileIndex(tileIndex);
		if (cursor.x != location.x || cursor.y != location.y)
		{
			layout[tileIndex].active = true;
			layout[tileIndex].isGoal = false;
		}
	}
}

function setInactiveTile(point)
{
	var cart = isoTotwoD(point.x - TILE_SIZE, point.y);
	var tileIndex = calculateTileIndexAtCoord(cart.x, cart.y);
	if (tileIndex != undefined)
	{
		if (layout[tileIndex].block != undefined)
		{
			layout[tileIndex].block.destroy();
		}
		var location = calculateCoordAtTileIndex(tileIndex);
		if (cursor.x != location.x || cursor.y != location.y)
		{
			layout[tileIndex].active = false;
			layout[tileIndex].isGoal = false;
		}
	}
}

function setGoalTile(point)
{
	var cart = isoTotwoD(point.x - TILE_SIZE, point.y);
	var tileIndex = calculateTileIndexAtCoord(cart.x, cart.y);
	if (tileIndex != undefined)
	{
		if (layout[tileIndex].block != undefined)
		{
			layout[tileIndex].block.destroy();
		}
		var location = calculateCoordAtTileIndex(tileIndex);
		if (cursor.x != location.x || cursor.y != location.y)
		{
			layout[tileIndex].active = true;
			layout[tileIndex].isGoal = true;
		}
	}
}

function setCursor(point)
{
	var cart = isoTotwoD(mousePos.x - TILE_SIZE, mousePos.y);
	var tileIndex = calculateTileIndexAtCoord(cart.x, cart.y);
	if (tileIndex != undefined && puzzleEditor.selected != undefined)
	{
		if (layout[tileIndex].block != undefined)
		{
			layout[tileIndex].block.destroy();
		}
		var location = calculateCoordAtTileIndex(tileIndex);
		if (cursor.x != location.x || cursor.y != location.y)
		{
			lastTileIndex = calculateTileIndexAtCoord(cursor.x, cursor.y);
			if (layout[lastTileIndex].block != undefined)
			{
				layout[lastTileIndex].block.destroy();
			}
			cursor.init(location.x, location.y);
			layout[tileIndex].active = true;
		}
	}
}

function setBlockAt(point,blockFunction)
{
	var cart = isoTotwoD(point.x - TILE_SIZE, point.y);
	var tileIndex = calculateTileIndexAtCoord(cart.x, cart.y);
	if (tileIndex != undefined && puzzleEditor.selected != undefined)
	{
		if (layout[tileIndex].block != undefined)
		{
			layout[tileIndex].block.destroy();
		}
		var location = calculateCoordAtTileIndex(tileIndex);
		if (cursor.x != location.x || cursor.y != location.y)
		{
			var tempBlock = blockFunction(location);
			layout[tileIndex].active = true;
			layout[tileIndex].block = tempBlock;
			blocks.push(tempBlock);
		}
	}
}

function setBlockByIndex(tileIndex,blockFunction)
{
	if (!layout[tileIndex])
	{
		console.log("warning: setBlockByIndex got an unknown tileindex of " + tileIndex);
		return;
	}
	if (layout[tileIndex].block != undefined)
	{
		layout[tileIndex].block.destroy();
	}
	var location = calculateCoordAtTileIndex(tileIndex);
	var tempBlock = blockFunction(location);
	layout[tileIndex].active = true;
	layout[tileIndex].block = tempBlock;
	blocks.push(tempBlock);
}

function randomCoord() // unused! may be be buggy
{
	var newIndex = Math.round(Math.random()*layout.length);
	var newCoord = calculateCoordAtTileIndex(newIndex);
	console.log("Random index from layout length " + layout.length + " is " + newIndex + " which is at coord " + newCoord.x+','+newCoord.y);
	return newCoord;
}

function randomIndex()
{
	return Math.floor(Math.random()*layout.length);
}

function erasePuzzle()
{
	console.log("Erasing existing puzzle board.");
	for (var tileIndex=0; tileIndex<layout.length; tileIndex++)
	{
		layout[tileIndex].active = true;
		layout[tileIndex].isGoal = false;
		if (layout[tileIndex].block != undefined)
		{
			layout[tileIndex].block.destroy();
		}
	}
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomPuzzle()
{
	console.log("Generating a random puzzle start...");

	erasePuzzle();

	var loop=0;

	var numMetal = getRandomInt(0,4);
	var numMagnet = getRandomInt(0,4);
	var numIce = getRandomInt(0,3);
	var numFire = getRandomInt(0,1);
	var numQuant = getRandomInt(0,4);
	var numFluffy = getRandomInt(2,6);
	var numGoal = getRandomInt(1,4);
	
	console.log("Randomly adding "
		+numMetal+" metal, "
		+numMagnet+" magnet, "
		+numIce+" ice, "
		+numFire+" fire, "
		+numQuant+" quantum, "
		+numFluffy+" fluffy, with "
		+numGoal+" goals."
	);
		
	for (loop=0; loop<numMetal; loop++)
	{
		setBlockByIndex(randomIndex(),createMetalBlock);
	}
	for (loop=0; loop<numMagnet; loop++)
	{
		setBlockByIndex(randomIndex(),createMagnetBlock);
	}
	for (loop=0; loop<numIce; loop++)
	{
		setBlockByIndex(randomIndex(),createIceBlock);
	}
	for (loop=0; loop<numFire; loop++)
	{
		setBlockByIndex(randomIndex(),createFireBlock);
	}
	for (loop=0; loop<numQuant; loop++)
	{
		setBlockByIndex(randomIndex(),createQuantumBlock);
	}
	for (loop=0; loop<numFluffy; loop++)
	{
		setBlockByIndex(randomIndex(),createFluffyBlock);
	}

	// set a player cursor start location
	var startIndex = randomIndex();
	while (layout[startIndex].block != undefined) // find a blank tile
	{
		startIndex = randomIndex();
	}
	var startCoord = calculateCoordAtTileIndex(startIndex);
	cursor.init(startCoord.x, startCoord.y);
	layout[startIndex].active = true;

	// now simulate tons of player moves
	
	// find four tiles that have a block right now
	// but didn't at the start state
	// FIXME: TODO
	for (loop=0; loop<numGoal; loop++)
	{
		var goalIndex = randomIndex();
		layout[goalIndex].active = true;
		layout[goalIndex].isGoal = true;
	}

}

function setMetalBlock(point)
{
	setBlockAt(point, createMetalBlock);
}

function setMagnetBlock(point)
{
	setBlockAt(point, createMagnetBlock);
}

function setIceBlock(point)
{
	setBlockAt(point, createIceBlock);
}

function setFireBlock(point)
{
	setBlockAt(point, createFireBlock);
}

function setQuantumBlock(point)
{
	setBlockAt(point, createQuantumBlock);
}

function setFluffyBlock(point)
{
	setBlockAt(point, createFluffyBlock);
}
