function createQuantumBlock(coords, color) {
    //I guess we're using the color field to tie these blocsk together.
	var block = createBlockObject(coords.x, coords.y, '#f1c40f', blockQuantumPic);
    block.type = BLOCK_QUANTUM;
    block.color = color? color : '#f1c40f';

    block.tryPush = function(x, y){
        var quantumBrothers = []
        var canMove = true
        for(var i in blocks){ //check all dem other blocks.
            if(blocks[i].type == BLOCK_QUANTUM && blocks[i].color && blocks[i].color == block.color){ //gotta be a quantum of the saaame color
                canMove = blocks[i].canPush(x, y); //this is the original tryPush, moved into it's own function so quantum stuff can happen first
                //also to keep quantum block stuff seperate from normal block stuff

                if(!canMove){
                    //TODO: Flag quantum block for visual feedback on stuck blocks
                    return false; //block can't move. it blocks all other blocks
                } else {
                    quantumBrothers.push(blocks[i]) //build a book of quantum blocks that match. so next step wont' ahve to go through all of em again.
                }
            }
        }

        //at this point the function would of exited if there where any blocks that could not move
        for(var i in quantumBrothers){
            quantumBrothers[i].queuePush(x, y);
        }
        return true

    }

    block.canPush = function(x, y){
        var nextX = block.x + x;
        var nextY = block.y + y;

        var thisTileIndex = calculateTileIndexAtCoord(block.x, block.y);
        var thisTile = layout[thisTileIndex];
        var tileIndex = calculateTileIndexAtCoord(nextX, nextY);
        var tile = layout[tileIndex];
        if (tile != undefined && tile.block == undefined && tile.active) {
            //ctrl.queuePush(x, y); //normally we would queue up here
            //but since this push can't happen until all blocks can be pushed
            //it just returns wheter or not it can be pushed.
            return true;
        } else {
            return false
        }
    }
	return block;
}
