var _EDIT_MODE = false;
var puzzleEditor;

puzzleEditor = {

	buffer: "",
	button: [
		{ image: tileOffPic, value: createMagnetBlock },
		{ image: tileEmptyPic, value: createMagnetBlock },
		{ image: cursorPic, value: createMagnetBlock },
		{ image: blockMagnetPic, value: createMagnetBlock },
		{ image: blockIcePic, value: createIceBlock },
		{ image: blockFirePic, value: createFireBlock },
	],

	selected: undefined,
	highlighted: undefined,

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

	if (mouseButtonHeld && !mouseButtonWasHeld)
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
				var tempBlock = puzzleEditor.selected.value(location)
				grid.layout[tileIndex].active = true;
				grid.layout[tileIndex].block = tempBlock;
				blocks.push(tempBlock);
			}
		}
	}
	mouseButtonWasHeld = mouseButtonHeld;
}
