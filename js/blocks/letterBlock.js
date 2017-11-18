
//Make a fluffy block with a modified pic
function createMarkedBlock(coords, letter){
    var block = createFluffyBlock(coords);
    letter = letter.toString().toUpperCase();
    console.log(letter);
    block.sprite = markAtlas[letter];
    block.type = letter.toString().toUpperCase();

    return block;
}

markAtlas = {
    "A" : letterBlockA,
    "C" : letterBlockC,
    "D" : letterBlockD,
    "E" : letterBlockE,
    "I" : letterBlockI,
    "L" : letterBlockL,
    "O" : letterBlockO,
    "R" : letterBlockR,
    "S" : letterBlockS,
    "T" : letterBlockT,
    "1" : numberBlock1,
    "2" : numberBlock2,
    "3" : numberBlock3
}