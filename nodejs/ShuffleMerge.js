// HackerRank


function reverseShuffleMerge(s) {

    // get single set
    let counts = {};
    let base_chars = [];
    for(let char of s) {
        counts[char] = counts[char] || 0;
        counts[char]++;
        if(counts[char] % 2 == 1) {
            base_chars.push(char);
        }
    }
    console.log(base_chars);

    // sorted base characters
    base_chars.sort((a, b) => a > b ? 1 : -1);

    // reversed input
    let reversed = s.split('').reverse().join('');
    console.log(reversed);

    // hunt for the lex lowest string


    return base_chars.join('');

}



const Runner = {

    run(str) {

        let result = reverseShuffleMerge(str)
        return result;
    },

}

module.exports = Runner
   
