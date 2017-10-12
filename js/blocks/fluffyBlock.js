function createFluffyBlock(coords) {
	var block = createBlockObject(coords.x, coords.y, '#f1c40f', blockFluffyPic);
	block.type = BLOCK_FLUFFY;

	return block;
}
