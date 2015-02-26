
// Order doesn't matter
var permutation = function (collection){
    var current,
    subarray,
    result = [],
    currentArray = [],
    newResultArray = [];
     
    if (collection.length) {
        current = collection.shift();
        result = permutation(collection);
        
        currentArray.push(current);
         
        result.map(function(list) {
            newResultArray.push(list.slice(0));
            list.push(current);
        });
        
        result.push(currentArray);
        result = result.concat(newResultArray);
    }
    
    return result;
};

exports.getPairs = function (collection) {
    permutation = permutation(collection);
    var pairs = [];
    for (var i = 0; i < permutation.length; i ++) {
        if (permutation[i].length == 2) {
            pairs.push (permutation[i]);
        }
    }
    return pairs;
};

//var result = permutation(['a', 'b', 'c', 'd']);
//console.log (getPairs(result));

// Order matters
/*function generateAnagrams(word) {

    if (word.length < 2) {
        return [word];
    } else {
		
		var anagrams = [];
        var before, focus, after;
        var shortWord, subAnagrams, newEntry;

        for (var i = 0; i < word.length; i++) {

            before = word.slice(0, i);
            focus = word[i];
            after = word.slice(i + 1, word.length + 1);
            shortWord = before + after;
            subAnagrams = generateAnagrams(shortWord);

            for (var j = 0; j < subAnagrams.length; j++){
                newEntry = focus + subAnagrams[j];
                anagrams.push(newEntry);
            }
        }
        return anagrams;
    }
}

function generatePairs(anagrams) {
	var pairs = [];
	for (var i = 0; i < anagrams.length; i ++) {
		var pair = anagrams[i].slice(0, 2);
		if (!arrayContains(pairs, pair)) {
			pairs.push(pair);
		}
	}
	return pairs;
}

function arrayContains(array, value) {
    for (var i = 0; i < array.length; i ++) {
        if (array[i] == value) {
            return true;
        }
    }
    return false;
}

//var result = generateAnagrams('abcd');
//console.log (generatePairs(result));

*/



