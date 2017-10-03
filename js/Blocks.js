var _DEBUG_MAGNETS = false;

var blocks = [];

function createBlockObject(x, y, color, sprite)
{

	return {
		x: x,
		y: y,
		targetX: x,
		targetY: y,
		yLevel: -999999,
        speed: TILE_SIZE/8,
		size: 32,
		color: color,
        blockSprite: sprite
	};
}

function pushBlock(x, y, offsetX, offsetY)
{
    var nextX = x + offsetX;
    var nextY = y + offsetY;
    var block, tile, nextTile;

    var tileIndex = calculateTileIndexAtCoord(nextX, nextY);
    var tile = grid.layout[tileIndex];
    if (tile != undefined && tile.block != undefined)
    {
        var block = tile.block;
        nextX += offsetX;
        nextY += offsetY;
        
        lastTile = tile;
        tileIndex = calculateTileIndexAtCoord(nextX, nextY);
        tile = grid.layout[tileIndex];
        if (tile != undefined && tile.block == undefined && tile.active)
        {
            tile.block = block;
            lastTile.block = undefined;
            setMoveTarget(block, nextX, nextY);
            return true; // can move
        }
    }
    else if (tile != undefined && tile.active &&
			 (nextX != cursor.x || nextY != cursor.y))
    {
        return true;
    }
    return false; // can move
}

function moveTowardsTarget(object)
{
    if (object.x < object.targetX)
    {
        object.x += object.speed;
    }
    else if (object.x > object.targetX)
    {
        object.x -= object.speed;
    }

    if (object.y < object.targetY)
    {
        object.y += object.speed;
    }
    else if (object.y > object.targetY)
    {
        object.y -= object.speed;
    }
    if (Math.abs(object.x - object.targetX) < 1)
    {
        object.x = object.targetX;
    }
    if (Math.abs(object.y - object.targetY) < 1)
    {
        object.y = object.targetY;
    }
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
        moveTowardsTarget(blocks[i]);
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

function updateMagnets()
{
    if (!blocksMoving())
    {
        for (var i = 0; i < blocks.length; i++)
        {
            if (!_DEBUG_MAGNETS || isMoving(cursor))
            {
                break;
            }
            if (blocks[i] == cursor)
            {
                continue;
            }
            pushBlock(blocks[i].x, blocks[i].y, 0, -TILE_SIZE);
            pushBlock(blocks[i].x, blocks[i].y, 0, TILE_SIZE);
            pushBlock(blocks[i].x, blocks[i].y, -TILE_SIZE, 0);
            pushBlock(blocks[i].x, blocks[i].y, TILE_SIZE, 0);
        }
    }
}
