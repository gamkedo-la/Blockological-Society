var _EDIT_MODE = false;
var puzzleEditor;

puzzleEditor = {

	buffer: "",
	button: [
		{ image: tileOffPic, command: setInactiveTile },
		{ image: tileEmptyPic, command: setActiveTile },
		{ image: cursorPic, command: setCursor },
		{ image: blockMagnetPic, command: setMagnetBlock },
		{ image: blockIcePic, command: setIceBlock },
		{ image: blockFirePic, command: setFireBlock },
		{ image: blockQuantumPic, command: setQuantumBlock },
	],

	selected: undefined,

	x: 0,
	y: 0,
	offsetY: 71,
	width: 65,
	height: 142,

	color: 'lime',
	highlightColor: 'yellow',
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
		colorRect(x, y, 64, 70, color);
		drawBitmapCenteredWithRotation(image, x+32, y+35, 0);
		y += panel.offsetY;
		if (y > panel.y + panel.height)
		{
			y = panel.y;
			x += panel.width;
		}
	}

	if (panel.selected != undefined)
	{
		var tileIndex = calculateTileIndexAtCoord(mouseX, mouseY);
		if (grid.layout[tileIndex] != undefined)
		{
			var point = calculateCoordAtTileIndex(tileIndex);
			drawBitmapCenteredWithRotation(panel.selected.image, point.x-16, point.y-17.5, 0);
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

		if (mouseX > x && mouseX < x + panel.width &&
			mouseY > y && mouseY < y + panel.offsetY)
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
		var point = { x: mouseX, y: mouseY };
		puzzleEditor.selected.command(point);
	}
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
		if (grid.layout[tileIndex].block)
		{
			grid.layout[tileIndex].block.destroy();
		}
		var location = calculateCoordAtTileIndex(tileIndex);
		if (cursor.x != location.x || cursor.y != location.y)
		{
			grid.layout[tileIndex].active = true;
		}
	}
}

function setInactiveTile(point)
{
	var cart = isoTotwoD(point.x - TILE_SIZE, point.y);
	var tileIndex = calculateTileIndexAtCoord(cart.x, cart.y);
	if (tileIndex != undefined)
	{
		if (grid.layout[tileIndex].block)
		{
			grid.layout[tileIndex].block.destroy();
		}
		var location = calculateCoordAtTileIndex(tileIndex);
		if (cursor.x != location.x || cursor.y != location.y)
		{
			grid.layout[tileIndex].active = false;
		}
	}
}

function setMagnetBlock(point)
{
	var cart = isoTotwoD(mouseX - TILE_SIZE, mouseY);
	var tileIndex = calculateTileIndexAtCoord(cart.x, cart.y);
	if (tileIndex != undefined && puzzleEditor.selected != undefined)
	{
		if (grid.layout[tileIndex].block)
		{
			grid.layout[tileIndex].block.destroy();
		}
		var location = calculateCoordAtTileIndex(tileIndex);
		if (cursor.x != location.x || cursor.y != location.y)
		{
			var tempBlock = createMagnetBlock(location)
			grid.layout[tileIndex].active = true;
			grid.layout[tileIndex].block = tempBlock;
			blocks.push(tempBlock);
		}
	}
}

function setIceBlock(point)
{
	var cart = isoTotwoD(mouseX - TILE_SIZE, mouseY);
	var tileIndex = calculateTileIndexAtCoord(cart.x, cart.y);
	if (tileIndex != undefined && puzzleEditor.selected != undefined)
	{
		if (grid.layout[tileIndex].block)
		{
			grid.layout[tileIndex].block.destroy();
		}
		var location = calculateCoordAtTileIndex(tileIndex);
		if (cursor.x != location.x || cursor.y != location.y)
		{
			var tempBlock = createIceBlock(location)
			grid.layout[tileIndex].active = true;
			grid.layout[tileIndex].block = tempBlock;
			blocks.push(tempBlock);
		}
	}
}

function setFireBlock(point)
{
	var cart = isoTotwoD(mouseX - TILE_SIZE, mouseY);
	var tileIndex = calculateTileIndexAtCoord(cart.x, cart.y);
	if (tileIndex != undefined && puzzleEditor.selected != undefined)
	{
		if (grid.layout[tileIndex].block)
		{
			grid.layout[tileIndex].block.destroy();
		}
		var location = calculateCoordAtTileIndex(tileIndex);
		if (cursor.x != location.x || cursor.y != location.y)
		{
			var tempBlock = createFireBlock(location)
			grid.layout[tileIndex].active = true;
			grid.layout[tileIndex].block = tempBlock;
			blocks.push(tempBlock);
		}
	}
}

function setQuantumBlock(point)
{
	var cart = isoTotwoD(mouseX - TILE_SIZE, mouseY);
	var tileIndex = calculateTileIndexAtCoord(cart.x, cart.y);
	if (tileIndex != undefined && puzzleEditor.selected != undefined)
	{
		if (grid.layout[tileIndex].block)
		{
			grid.layout[tileIndex].block.destroy();
		}
		var location = calculateCoordAtTileIndex(tileIndex);
		if (cursor.x != location.x || cursor.y != location.y)
		{
			var tempBlock = createQuantumBlock(location)
			grid.layout[tileIndex].active = true;
			grid.layout[tileIndex].block = tempBlock;
			blocks.push(tempBlock);
		}
	}
}

function setCursor(point)
{
	var cart = isoTotwoD(mouseX - TILE_SIZE, mouseY);
	var tileIndex = calculateTileIndexAtCoord(cart.x, cart.y);
	if (tileIndex != undefined && puzzleEditor.selected != undefined)
	{
		if (grid.layout[tileIndex].block)
		{
			grid.layout[tileIndex].block.destroy();
		}
		var location = calculateCoordAtTileIndex(tileIndex);
		if (cursor.x != location.x || cursor.y != location.y)
		{
			cursor.init(location.x, location.y);
			grid.layout[tileIndex].active = true;
		}
	}
}
