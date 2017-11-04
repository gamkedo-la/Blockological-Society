function createFluffyBlock(coords) {
	var block = createBlockObject(coords.x, coords.y, '#f1c40f', blockFluffyPic);
	block.type = BLOCK_FLUFFY;

    block.tryPush = function(x, y){
        var nextX = block.x + x;
        var nextY = block.y + y;

        // var thisTileIndex = calculateTileIndexAtCoord(block.x, block.y);
        // var thisTile = layout[thisTileIndex];
        var tileIndex = calculateTileIndexAtCoord(nextX, nextY);
        var tile = layout[tileIndex];
        var nextTileIndex = calculateTileIndexAtCoord(nextX+x, nextY+y);
        var nextTile = layout[nextTileIndex];
        if (tile != undefined && tile.active && tile.block == undefined) {

            block.queuePush(x, y);
            return true; // can move
        }
        else if (tile != undefined && tile.active &&
                 tile.block != undefined &&
                 tile.block.type == BLOCK_FLUFFY &&
                 nextTile != undefined &&
                 nextTile.active == true &&
                 (nextTile.block == undefined || tile.block.type == BLOCK_FLUFFY))
        {
            console.log("Fluffy!");
            tile.block.tryPush(nextX, nextY);
            block.queuePush(x, y);
            return true; // can move
        }
        else
        {
            return false;
        }
    }
	return block;
}
