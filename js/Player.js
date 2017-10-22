var cursor; // block manipulation widget
const CURSOR_COLOR = '#2c3e50';

const MOVE_DELAY = 0.25;
var moveTimer = 0;

cursor = {
	type: CURSOR,
	x: undefined,
	y: undefined,
	targetX: undefined,
	targetY: undefined,
	speed: TILE_SIZE/8,
    color: CURSOR_COLOR,
    sprite: cursorPic,

	init: function(x, y)
	{
		this.x = x;
		this.y = y;

		this.targetX = x;
		this.targetY = y;
	},
	move : function(){
        var startPos = {
            x: this.x,
            y: this.y
        }

        if (this.x < this.targetX)
        {
            this.x += this.speed;
        }
        else if (this.x > this.targetX)
        {
            this.x -= this.speed;
        }

        if (this.y < this.targetY)
        {
            this.y += this.speed;
        }
        else if (this.y > this.targetY)
        {
            this.y -= this.speed;
        }
        if (Math.abs(this.x - this.targetX) < 1)
        {
            this.x = this.targetX;
        }
        if (Math.abs(this.y - this.targetY) < 1)
        {
            this.y = this.targetY;
        }

        var tileIndex = calculateTileIndexAtCoord(startPos.x, startPos.y);
        var tile = layout[tileIndex];

        if(this.x != startPos.x || this.y != startPos.y){
            if(tile.block == this){
                tile.block = undefined;
            }

            tileIndex = calculateTileIndexAtCoord(this.x, this.y);
            tile = layout[tileIndex];
            tile.block = this;
        }

        if(tile !== undefined && tile.block !== undefined &&
           tile.block.charged !== undefined && tile.block.charged){ //this shouldn't be here, but it is.
            tile.block.charged = false; //It's discharging metal blocks, maybe other blocks later
        }
    }

}

function updatePlayer()
{
    moveTimer -= TIME_PER_TICK;
    if (cursor.targetX == cursor.x && cursor.targetY == cursor.y && moveTimer <= 0)
    {
        if (leftKeyHeld)
        {
			saveBoard();
            if(pushBlock(cursor.x, cursor.y, -TILE_SIZE, 0))
			{
				setMoveTarget(cursor, cursor.x - TILE_SIZE, cursor.y);
				moveTimer = MOVE_DELAY;
				cursorMoveSound.play();
			}
        }
        else if (rightKeyHeld)
        {
			saveBoard();
            if(pushBlock(cursor.x, cursor.y, TILE_SIZE, 0))
			{
				setMoveTarget(cursor, cursor.x + TILE_SIZE, cursor.y);
				moveTimer = MOVE_DELAY;
				cursorMoveSound.play();
			}
        }
        else if (upKeyHeld)
        {
			saveBoard();
            if(pushBlock(cursor.x, cursor.y, 0, -TILE_SIZE))
			{
				setMoveTarget(cursor, cursor.x, cursor.y - TILE_SIZE);
				moveTimer = MOVE_DELAY;
				cursorMoveSound.play();
			}
        }
        else if (downKeyHeld)
        {
			saveBoard();
            if(pushBlock(cursor.x, cursor.y, 0, TILE_SIZE))
			{
				setMoveTarget(cursor, cursor.x, cursor.y + TILE_SIZE);
				moveTimer = MOVE_DELAY;
				cursorMoveSound.play();
			}
        }
		else if (undoKeyHeld)
		{
			undoMove();
			moveTimer = MOVE_DELAY/2;
		}
		else if (restartKeyHeld)
		{
			restart();
			moveTimer = MOVE_DELAY/2;
		}
    }
}
