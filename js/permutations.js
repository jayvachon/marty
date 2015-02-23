function generateAnagrams(word) {

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

var result = generateAnagrams('abcd');
console.log (generatePairs(result));
