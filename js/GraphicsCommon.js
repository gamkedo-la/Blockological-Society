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

function drawBitmapCenteredWithRotation(useBitmap, atX,atY, withAng) {
	context.save();
	context.translate(atX, atY);
	context.rotate(withAng);
	context.drawImage(useBitmap, -useBitmap.width/2, -useBitmap.height/2);
	context.restore();
}
