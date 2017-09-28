var _DEBUG_CHEAT_CONSOLE = false;
const NUMBER = "number";
const PRECISION = 100;

var debugPanel = {

	buffer: "",
	button: [
		{ name: "Move Vel: ", value: eval(makePtr("hero.moveSpeed")) },
		{ name: "Jump Vel: ", value: eval(makePtr("hero.jumpSpeed")) },
		{ name: "Gravity:  ", value: eval(makePtr("_GRAVITY")) },
		{ name: "Friction: ", value: eval(makePtr("_FRICTION")) },
		{ name: "Air Drag: ", value: eval(makePtr("_AIR_RESISTANCE")) },
		{ name: "Rewind:   ", value: eval(makePtr("_REWIND_MULTIPLIER")) },
	],

	selected: undefined,
	highlighted: undefined,

	x: 12,
	y: 80,
	offsetY: 15,
	width: 150,

	font: '15px Consolas',
	color: 'lime',
	highlightColor: 'yellow',
};

function drawPanelWithButtons(panel, precision)
{
	if (!_DEBUG_CHEAT_CONSOLE)
	{
		return;
	}

	var x = panel.x;
	var y = panel.y;

	for (var i = 0; i < panel.button.length; i++)
	{
		var button = panel.button[i];
		var buttonY = y - panel.offsetY;
		var color = panel.color;

		if (button == panel.highlighted)
		{
			color = panel.highlightColor;
		}

		if (button == panel.selected)
		{
			color = panel.highlightColor;
			drawButton(button.name, panel.buffer);
		}
		else
		{
			drawButton(button.name, button.value());
		}
	}

	function drawButton(text, value)
	{
		var font = panel.font;
		var result = value;
		if (typeof value == NUMBER)
		{
			result = Math.round(value*precision)/precision;
		}
		drawText(text + result, x, y, font, color);
		y += panel.offsetY;
	}
}

function panelUpdate(panel)
{
	if (!_DEBUG_CHEAT_CONSOLE)
	{
		return;
	}

	var currentY = panel.y;

    panel.highlighted = undefined;
	for (var i = 0; i < panel.button.length; i++)
	{
		var button = panel.button[i];
		var buttonY = currentY - panel.offsetY;
		var color = panel.color;

		if (mouseX > panel.x &&
			mouseX < panel.x + panel.width &&
			mouseY > buttonY &&
			mouseY < buttonY + panel.offsetY)
		{
			if (mouseButtonHeld)
			{
				panel.selected = button;
				panel.buffer = "";
			}
			panel.highlighted = button;
		}
		currentY += panel.offsetY;
	}
}

function panelKeyCapture(panel, evt)
{
	var key = evt.keyCode;
	if (key == KEY_TILDE) {
		_DEBUG_CHEAT_CONSOLE = !_DEBUG_CHEAT_CONSOLE;
	}
	if (!_DEBUG_CHEAT_CONSOLE)
	{
		return;
	}

    if (panel.selected != undefined) {

		if (key == KEY_ESCAPE) {
			panel.selected = undefined;
			panel.buffer = "";
		}
        if (key >= KEY_NUMPAD_0 && key <= KEY_NUMPAD_9)
        {
            var num = key-96;
            panel.buffer += num.toString();
        }
        if (key >= KEY_0 && key <= KEY_9)
        {
            var num = key-48;
            panel.buffer += num.toString();
        }
        if (key == KEY_MINUS || key == KEY_NUMPAD_MINUS)
        {
            panel.buffer += "-";
        }
        if (key == KEY_PERIOD || key == KEY_NUMPAD_PERIOD)
        {
            panel.buffer += ".";
        }
        if (key == KEY_BACKSPACE)
        {
            panel.buffer = panel.buffer.slice(0, -1);
        }
        if (key == KEY_ENTER) {
            var number = Number(panel.buffer);
            if (!isNaN(number) && panel.buffer != "") {
                panel.selected.value(number);
            }

			panel.selected = undefined;
            panel.buffer = "";
        }
    }
}

function drawText(text, x, y, font, color)
{
    canvasContext.font = font;
    canvasContext.fillStyle = color;
    canvasContext.fillText(text, x, y);
}

function makePtr(varName) {
    return "(function(_val) {\n" +
        "    if (arguments.length > 0) " + varName + " = _val;\n" +
        "    return " + varName + ";\n" +
        "})";
}
