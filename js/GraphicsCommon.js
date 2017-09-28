function colorRect(x, y, width, height, color)
{
    context.fillStyle = color;
    context.fillRect(x, y, width, height);
}

function drawText(text, x, y, font, color)
{
    context.font = font;
    context.fillStyle = color;
    context.fillText(text, x, y);
}
