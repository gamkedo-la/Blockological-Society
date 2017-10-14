var blocks = [];
const Xoffset = 26; //this is the number that get returns from (ctrl.x % TILE_SIZE) when the block is stationary
const Yoffset = 0;
function createBlockObject(x, y, color, sprite){
    var ctrl = {
        type: BLOCK_MAGNET,
        x: x,
        y: y,
        targetX: x,
        targetY: y,
        yLevel: -999999,
        speed: TILE_SIZE/8,
        size: 32,
        color: color,
        sprite: sprite
    }
    ctrl.tryPush = function(x, y){
        var nextX = ctrl.x + x;
        var nextY = ctrl.y + y;

        // var thisTileIndex = calculateTileIndexAtCoord(ctrl.x, ctrl.y);
        // var thisTile = layout[thisTileIndex];
        var tileIndex = calculateTileIndexAtCoord(nextX, nextY);
        var tile = layout[tileIndex];
        if (tile != undefined && tile.block == undefined && tile.active) {
            ctrl.queuePush(x, y);
            return true; // can move
        } else {
            return false
        }
    }

    ctrl.queuePush = function(x, y){
        var nextX = ctrl.targetX + x;
        var nextY = ctrl.targetY + y;
        if(nextX == cursor.x && nextY == cursor.y){
            return;
        }


        if((ctrl.x - Xoffset)  % TILE_SIZE != 0 || (ctrl.y - 0) % TILE_SIZE != 0){
            return;
        }
        
        ctrl.targetX = nextX;
        ctrl.targetY = nextY;
    }

    ctrl.move = function(){
        var startPos = {
            x: ctrl.x,
            y: ctrl.y
        }

        if (ctrl.x < ctrl.targetX)
        {
            ctrl.x += ctrl.speed;
        }
        else if (ctrl.x > ctrl.targetX)
        {
            ctrl.x -= ctrl.speed;
        }

        if (ctrl.y < ctrl.targetY)
        {
            ctrl.y += ctrl.speed;
        }
        else if (ctrl.y > ctrl.targetY)
        {
            ctrl.y -= ctrl.speed;
        }
        if (Math.abs(ctrl.x - ctrl.targetX) < 1)
        {
            ctrl.x = ctrl.targetX;
        }
        if (Math.abs(ctrl.y - ctrl.targetY) < 1)
        {
            ctrl.y = ctrl.targetY;
        }

        var tileIndex = calculateTileIndexAtCoord(startPos.x, startPos.y);
        var tile = layout[tileIndex];

        if(ctrl.x != startPos.x || ctrl.y != startPos.y){
            if(tile.block == ctrl){
                tile.block = undefined;
            }

            tileIndex = calculateTileIndexAtCoord(ctrl.x, ctrl.y);
            tile = layout[tileIndex];
            tile.block = ctrl;
        }

        if(tile != undefined && tile.block != undefined &&
           tile.block.charged != undefined && tile.block.charged){ //this shouldn't be here, but it is.
            tile.block.charged = false; //It's discharging metal blocks, maybe other blocks later
        }
    }


    ctrl.destroy = function(){
        var thisTileIndex = calculateTileIndexAtCoord(ctrl.x, ctrl.y);
        var thisTile = layout[thisTileIndex];
        thisTile.block = undefined;
        var foundHere = blocks.indexOf(ctrl);
        if (foundHere > -1) {
            blocks.splice(foundHere, 1);
        }
    }

	return ctrl;
}

function pushBlock(x, y, offsetX, offsetY)
{
    var nextX = x + offsetX;
    var nextY = y + offsetY;

    var tileIndex = calculateTileIndexAtCoord(nextX, nextY);
    var tile = layout[tileIndex];
    if (tile != undefined && tile.block != undefined)
    {
        var block = tile.block;
        return block.tryPush(offsetX, offsetY)
    }
    else if (tile != undefined && tile.active &&
			 (nextX != cursor.x || nextY != cursor.y))
    {
        return true;
    }
    return false; // can move
}


function setMoveTarget(object, x, y)
{
    var tileIndex = calculateTileIndexAtCoord(x, y);
    object.targetX = x;
    object.targetY = y;
}

function isMoving(object)
{
	return (object.x != object.targetX ||
	 		object.y != object.targetY);
}

function blocksMoving()
{
	for (var i = 0; i < blocks.length; i++)
	{
		if (blocks[i] == cursor)
		{
			continue;
		}
		if (isMoving(blocks[i]))
		{
			return true;
		}
	}
	return false;
}

function updateBlocks() {
    for (var i = 0; i < blocks.length; i++)
    {
        blocks[i].move();
    }
}
function applyBlockEffects(){
    for (var i = 0; i < blocks.length; i++)
    {
        if(typeof blocks[i].logic === "function"){
            blocks[i].logic()
        }
    }
}
