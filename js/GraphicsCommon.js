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

function drawIsoRhombusFilled(color, x, y, squareSize){
    context.fillStyle = color;
    context.beginPath();
    context.moveTo(x, y + squareSize / 2);
    context.lineTo(x + squareSize, y);
    context.lineTo(x + 2 * squareSize, y + squareSize / 2);
    context.lineTo(x + squareSize, y + squareSize);
    context.closePath();
    context.fill();
}

function drawIsoRhombusWire(fillColor, strokeColor, x, y, squareSize){
    context.fillStyle = fillColor;
    context.strokeStyle = strokeColor;
    context.beginPath();
    context.moveTo(x, y + squareSize / 2);
    context.lineTo(x + squareSize, y);
    context.lineTo(x + 2 * squareSize, y + squareSize / 2);
    context.lineTo(x + squareSize, y + squareSize);
    context.closePath();
    context.fill();
    context.stroke();
}

function drawLine(strokeColor, startX, startY, endX, endY){
    context.strokeStyle = strokeColor;
    context.beginPath();
    context.moveTo(startX, startY);
    context.lineTo(endX, endY);
    context.closePath();
    context.stroke();
}

function twoDToIso(ptX, ptY){
    var tempPt = {x:0,y:0};
    tempPt.x = ptX - ptY;
    tempPt.y = (ptX + ptY) / 2;
    return tempPt;
}

function isoTotwoD(ptX, ptY)
{
    return {
        x: (2 * ptY + ptX) / 2,
        y: (2 * ptY - ptX) / 2
    }
}
