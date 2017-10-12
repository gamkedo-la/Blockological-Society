function createFireBlock(coords) {
	var block = createBlockObject(coords.x, coords.y, '#f1c40f', blockFirePic);
    block.type = BLOCK_FIRE;
    block.logic = function(){
        block.destroyIfIce(0, -TILE_SIZE);
        block.destroyIfIce(0, TILE_SIZE);
        block.destroyIfIce(-TILE_SIZE, 0);
        block.destroyIfIce(TILE_SIZE, 0);
    }

    block.destroyIfIce = function(x, y){
        tileIndex = calculateTileIndexAtCoord(block.x + x, block.y + y);
        tile = layout[tileIndex];
        if(tile && tile.block && tile.block.type){
            if(tile.block.type == BLOCK_ICE){
                tile.block.destroy();
            }
        }

    }
	return block;
}
