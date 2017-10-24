
//Make a metal block with a modified pic
function createLetterBlock(coords, letter){
    var block = createMetalBlock(coords);
    letter = letter.toString().toUpperCase();
    block.sprite = letterAtlas[letter];

    return block;
}

letterAtlas = {
    "A" : letterBlockA,
    "R" : letterBlockR,
    "S" : letterBlockS,
    "T" : letterBlockT
}