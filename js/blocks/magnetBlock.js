function createMagnetBlock(result) {
	var block = createBlockObject(result.x, result.y, '#f1c40f', blockMagnetPic);
    block.type = BLOCK_MAGNET;
    block.logic = function(){
        block.exertForce( 0, -TILE_SIZE);
        block.exertForce( 0, TILE_SIZE);
        block.exertForce( -TILE_SIZE, 0);
        block.exertForce( TILE_SIZE, 0);
    }
    block.exertForce = function(x, y){
        tileIndex = calculateTileIndexAtCoord(block.x + x, block.y + y);
        tile = grid.layout[tileIndex];
        if(tile && tile.block && tile.block.type){
            if(tile.block.type == BLOCK_MAGNET){
                tile.block.tryPush(x, y);
            }
        }

    }
	return block;
}
