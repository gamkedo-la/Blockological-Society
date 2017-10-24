function createMetalBlock(coords) {
	var block = createBlockObject(coords.x, coords.y, '#f1c40f', blockMetalPic);
    block.type = BLOCK_METAL;
    block.charged = false;
    block.groupId = Math.random() * 1000000000; //basically quantum color
    block.group = block.groupId;

    block.logic = function(){
        if(block.charged){
            block.exertCharge( 0, -TILE_SIZE); //exert your groupID upon other blocks
            block.exertCharge( 0, TILE_SIZE);
            block.exertCharge( -TILE_SIZE, 0);
            block.exertCharge( TILE_SIZE, 0);
            block.blockSprite = blockYellowPic;
        } else {
            block.blockSprite = blockMetalPic;
            block.group = block.groupId;
        }
    }
    block.charge = function(groupId){
        block.group = groupId //groupId is artifact from quantum block. currently not used? 
        block.charged = true;
        block.blockSprite = blockYellowPic;
    }
    block.exertCharge = function(x, y){
        tileIndex = calculateTileIndexAtCoord(block.x + x, block.y + y);
        tile = layout[tileIndex];
        if(tile && tile.block && tile.block.type){
            if(tile.block.type == BLOCK_MAGNET){
                tile.block.group = block.group; //instead of pushing, set that shit to our groupID
            } else if (tile.block.type == BLOCK_METAL){
                tile.block.group = block.group;
            }
        }
    }

    block.tryPush = function(x, y, isMagnetPushing){
        var magnetBros = [];
        var canMove = true;
        if(block.charged && !isMagnetPushing){
            return false;
        }

        var thisTileIndex = calculateTileIndexAtCoord(block.x, block.y);
        var thisTile = layout[thisTileIndex];
        var tileIndex = calculateTileIndexAtCoord(nextX, nextY);
        var tile = layout[tileIndex];
        if (tile != undefined && tile.block == undefined && tile.active) {
            block.queuePush(x, y);
            return true; // can move
        } else {
            return false;
        }
        //old magnet behavior 
        /*
        for(var i in blocks){ //check all dem other blocks.
            if(blocks[i].group && blocks[i].group == block.group && typeof blocks[i].canPush === "function"){ //gotta be a quantum of the saaame color
                canMove = blocks[i].canPush(x, y); //this is the original tryPush, moved into it's own function so quantum stuff can happen first
                //also to keep quantum block stuff seperate from normal block stuff

                if(canMove){
                    magnetBros.push(blocks[i]) //build a book of quantum blocks that match. so next step wont' ahve to go through all of em again.
                }
            }
        }

        for(var i in magnetBros){
            magnetBros[i].queuePush(x, y);
        }
        return block.canPush();
        */
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
        } else if(tile != undefined && tile.active && tile.block && tile.block.group && tile.block.group == block.group){
            return true;
        } else {
            return false;
        }
    }
	return block;
}
