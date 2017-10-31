//Some common functions missing from the JS library :P Feel free to expand

function getRandomBetween(min, max) {
    return Math.random() * (max - min) + min; //The maximum is exclusive and the minimum is inclusive
  }

function ArrayWithOnes(length) { //Lol this took too much time to find
    array = [];
    
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

function QuickSort(array)
{
	var pivotIndex, pivot, result;
	var beforeList = [];
	var afterList = [];

	pivotIndex = Math.floor(Math.random() + array.length-1);
	pivot = array[pivotIndex];
	array.splice(pivotIndex, 1);

	for (var i = 0; i < array.length; i++)
	{
		if (array[i] < pivot)
		{
			beforeList.push(array[i]);
		}
		else
		{
			afterList.push(array[i]);
		}
	}
	if (beforeList.length > 1)
	{
		beforeList = QuickSort(beforeList);
	}
	if (afterList.length > 1)
	{
		afterList = QuickSort(afterList);
	}
	beforeList.push(pivot);
	result = beforeList.concat(afterList);
    if (result[0] == undefined) { result = [];} //Added this to prevent a bug, hopefully it doesn't cause other bugs
	return result;
}
