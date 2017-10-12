var cursor; // block manipulation widget
const CURSOR_COLOR = '#2c3e50';

const MOVE_DELAY = .25;
var moveTimer = 0;

cursor = {
	type: CURSOR,
	x: undefined,
	y: undefined,
	targetX: undefined,
	targetY: undefined,
	speed: TILE_SIZE/8,
	color: CURSOR_COLOR,

	init: function(x, y)
	{
		this.x = x;
		this.y = y;

		this.targetX = x;
		this.targetY = y;
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
			}
        }
        else if (rightKeyHeld)
        {
			saveBoard();
            if(pushBlock(cursor.x, cursor.y, TILE_SIZE, 0))
			{
				setMoveTarget(cursor, cursor.x + TILE_SIZE, cursor.y);
				moveTimer = MOVE_DELAY;
			}
        }
        else if (upKeyHeld)
        {
			saveBoard();
            if(pushBlock(cursor.x, cursor.y, 0, -TILE_SIZE))
			{
				setMoveTarget(cursor, cursor.x, cursor.y - TILE_SIZE);
				moveTimer = MOVE_DELAY;
			}
        }
        else if (downKeyHeld)
        {
			saveBoard();
            if(pushBlock(cursor.x, cursor.y, 0, TILE_SIZE))
			{
				setMoveTarget(cursor, cursor.x, cursor.y + TILE_SIZE);
				moveTimer = MOVE_DELAY;
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
