var _EDIT_MODE = false;
var puzzleEditor;
var anchorRow = -1;
var anchorCol = -1;
var mouseButtonWasHeld = false;

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

	if (mouseButtonHeld)
	{
		var point = { x: mousePos.x, y: mousePos.y };
		if (panel.selected != undefined)
		{
			puzzleEditor.selected.command(point);
		}
	}
	mouseButtonWasHeld = mouseButtonHeld;
}

// NOTE(Cipherpunk): I realize that there is absolutely a way to refactor all of
// these functions below. I do not currently understand how best to do that and I
// decided to get a hacked solution working before I go back and try to make it better.
// Thanks in advance for understanding, future reader and baffled programmer.

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

function setMetalBlock(point)
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
			var tempBlock = createMetalBlock(location)
			layout[tileIndex].active = true;
			layout[tileIndex].block = tempBlock;
			blocks.push(tempBlock);
		}
	}
}

function setMagnetBlock(point)
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
			var tempBlock = createMagnetBlock(location)
			layout[tileIndex].active = true;
			layout[tileIndex].block = tempBlock;
			blocks.push(tempBlock);
		}
	}
}

function setIceBlock(point)
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
			var tempBlock = createIceBlock(location)
			layout[tileIndex].active = true;
			layout[tileIndex].block = tempBlock;
			blocks.push(tempBlock);
		}
	}
}

function setFireBlock(point)
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
			var tempBlock = createFireBlock(location)
			layout[tileIndex].active = true;
			layout[tileIndex].block = tempBlock;
			blocks.push(tempBlock);
		}
	}
}

function setQuantumBlock(point)
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
			var tempBlock = createQuantumBlock(location)
			layout[tileIndex].active = true;
			layout[tileIndex].block = tempBlock;
			blocks.push(tempBlock);
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
