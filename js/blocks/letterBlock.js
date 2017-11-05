
//Make a fluffy block with a modified pic
function createLetterBlock(coords, letter){
    var block = createFluffyBlock(coords);
    letter = letter.toString().toUpperCase();
    block.sprite = letterAtlas[letter];
    block.type = letter.toString().toUpperCase();

    return block;
}

letterAtlas = {
    "A" : letterBlockA,
    "C" : letterBlockC,
    "D" : letterBlockD,
    "E" : letterBlockE,
    "I" : letterBlockI,
    "L" : letterBlockL,
    "O" : letterBlockO,
    "R" : letterBlockR,
    "S" : letterBlockS,
    "T" : letterBlockT
}