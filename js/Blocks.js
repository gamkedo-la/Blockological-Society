var blocks = [];
const Xoffset = 26; //this is the number that get returns from (ctrl.x % TILE_SIZE) when the block is stationary
const Yoffset = 0;

function createBlockObject(x, y, color, sprite) {
    var ctrl = {
        type: BLOCK_MAGNET,
        x: x,
        y: y,
        z: 0, //used for transition effect
        targetX: x,
        targetY: y,
        targetZ: -1500, //before disappearing after transition
        yLevel: -999999,
        speed: TILE_SIZE / 8,
        size: 32,
        color: color,
        sprite: sprite
    }
    //ctrl.targetZ = Math.random() * -300;
    ctrl.velocityZ = (Math.random() + 0.2) * -15; //TODO: Clamp function
    ctrl.tryPush = function (x, y) {
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
            return false;
        }
    }

    ctrl.queuePush = function (x, y) {
        var nextX = ctrl.targetX + x;
        var nextY = ctrl.targetY + y;
        if (nextX == cursor.x && nextY == cursor.y) {
            return;
        }


        if ((ctrl.x - Xoffset) % TILE_SIZE != 0 || (ctrl.y - 0) % TILE_SIZE != 0) {
            return;
        }

        ctrl.targetX = nextX;
        ctrl.targetY = nextY;
    }

    ctrl.move = function () {
        var startPos = {
            x: ctrl.x,
            y: ctrl.y
        }

        //Clamp X speed
        if (ctrl.x < ctrl.targetX) {
            ctrl.x += ctrl.speed;
        }
        else if (ctrl.x > ctrl.targetX) {
            ctrl.x -= ctrl.speed;
        }
        //Clamp Y speed
        if (ctrl.y < ctrl.targetY) {
            ctrl.y += ctrl.speed;
        }
        else if (ctrl.y > ctrl.targetY) {
            ctrl.y -= ctrl.speed;
        }

        if (Math.abs(ctrl.x - ctrl.targetX) < 1) {
            ctrl.x = ctrl.targetX;
        }
        if (Math.abs(ctrl.y - ctrl.targetY) < 1) {
            ctrl.y = ctrl.targetY;
        }

        var tileIndex = calculateTileIndexAtCoord(startPos.x, startPos.y);
        var tile = layout[tileIndex];

        if (ctrl.x != startPos.x || ctrl.y != startPos.y) {
            if (tile.block == ctrl) {
                tile.block = undefined;
            }

            tileIndex = calculateTileIndexAtCoord(ctrl.x, ctrl.y);
            tile = layout[tileIndex];
            tile.block = ctrl;
        }

        if (tile != undefined && tile.block != undefined &&
            tile.block.charged != undefined && tile.block.charged) { //this shouldn't be here, but it is.
            tile.block.charged = false; //It's discharging metal blocks, maybe other blocks later
        }
    }


    ctrl.destroy = function () {
        var thisTileIndex = calculateTileIndexAtCoord(ctrl.x, ctrl.y); // x and y can be undefined
        if (thisTileIndex == undefined) {
            console.log("Warning: ctrl has an undefined tileIndex! Ignoring.");
        }
        else {
            var thisTile = layout[thisTileIndex];
            thisTile.block = undefined;
        }
        var foundHere = blocks.indexOf(ctrl);
        if (foundHere > -1) {
            blocks.splice(foundHere, 1);
        }
    }
    return ctrl;
}

function pushBlock(x, y, offsetX, offsetY) {
    var nextX = x + offsetX;
    var nextY = y + offsetY;

    var tileIndex = calculateTileIndexAtCoord(nextX, nextY);
    var tile = layout[tileIndex];
    if (tile != undefined && tile.block != undefined) {
        var block = tile.block;
        return block.tryPush(offsetX, offsetY)
    }
    else if (tile != undefined && tile.active &&
        (nextX != cursor.x || nextY != cursor.y)) {
        return true;
    }
    return false; // can move
}


function setMoveTarget(object, x, y) {
    var tileIndex = calculateTileIndexAtCoord(x, y);
    object.targetX = x;
    object.targetY = y;
}

function isMoving(object) {
    return (object.x != object.targetX ||
        object.y != object.targetY);
}

function blocksMoving() {
    for (var i = 0; i < blocks.length; i++) {
        if (blocks[i] == cursor) {
            continue;
        }
        if (isMoving(blocks[i])) {
            return true;
        }
    }
    return false;
}



function ArrayWithOnes(length) { //Lol this took too much time to find
    array = [];
    console.log("Array with length: ", length);
    for (i = 0; i < length; i++) {
        array.push(1);
    }
    return array;
}
function ArraySum(array) {
    var sum = 0;
    for (i = 0; i < array.length; i++) {
        toAdd = array[i];
        sum += toAdd;
    }
    return sum;
}

var tick = 0;
var blocksRemaining = [];
function updateBlocks() {

    //console.log(blocksRemaining);
    for (var i = 0; i < blocks.length; i++) {
        blocks[i].move();
        //Still wondering whether or not it would be worth it to make a state machine for this.
        //Prob. will eventually so keeping this rough.
        //console.log(blocks);
        if (inLeaveTransition || inEnterTransition) {
            //console.log(inLeaveTransition, inEnterTransition);
            if (inLeaveTransition || (inEnterTransition && blocksRemaining[i] !=0)){blocks[i].z += blocks[i].velocityZ;}
            if ((blocks[i].z <= blocks[i].targetZ && inLeaveTransition) ||
                (blocks[i].z >= blocks[i].targetZ && inEnterTransition)) {
                if (inLeaveTransition){blocks.splice(i, 1);}
                else if (inEnterTransition && blocksRemaining[i] !=0){
                    blocksRemaining[i] = 0;
                    blocks[i].z = 0;
                    console.log(blocksRemaining);
                }
                //console.log("Length after: ", blocks.length);
                //console.log(blocks);
                //console.log(blocks.length);                             
            }
        }
    }
}
function applyBlockEffects() {
    for (var i = 0; i < blocks.length; i++) {
        if (typeof blocks[i].logic === "function") {
            blocks[i].logic()
        }
    }
}
