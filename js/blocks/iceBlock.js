function createIceBlock(result) {
	var block = createBlockObject(result.x, result.y, '#f1c40f', blockIcePic);
	block.type = BLOCK_ICE;
	block.queuePush = function(x, y){
        var nextX = block.x + x+ x;
        var nextY = block.y + y+ y;
        var count = 0
        var tileIndex;
        var tile;
        for(var isDone = false; isDone == false;  count++){
        	tileIndex = calculateTileIndexAtCoord(nextX, nextY);
        	tile = layout[tileIndex];
        	if (tile != undefined && tile.block == undefined && tile.active) {
        		nextX += x;
        		nextY += y;
        	} else {
        		nextX -= x;
        		nextY -= y;
        		isDone = true;
        	}
        	if(count > 1000){
        		break;
        	}
        }
        block.targetX = nextX;
        block.targetY = nextY;
    }
	return block;
}
