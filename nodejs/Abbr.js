
function isMatch(a, b) {
    if(a.length == b.length) {
        if(a.toUpperCase() == b) {
            return true;
        }
        else {
            return false;
        }
    }
    if(a.length < b.length) {
        return false;
    }

    // First Character - Lower Case

    if(a[0] >= 'a') { // lowercase
        // try delete
        if(isMatch(a.substring(1), b)) {
            return true;
        }
        // try uppercase
        if(isMatch(a[0].toUpperCase() + a.substring(1), b)) {
            return true;
        }
        return false;
    }

    // First character - Uppercase

    // first characters differ
    if(a[0] != b[0]) {
        return false;
    }
    // first characters are same, 
    // check remainer of strings
    return isMatch(a.substring(1), b.substring(1));

}

function abbreviation(a, b) {
    if(isMatch(a, b)) {
        return 'YES';
    }
    else {
        return 'NO';
    }
}



const Runner = {

    run(str1, str2) {

        // AbcDE ABDE  ->  true
        // AbcDE AFDE  ->  false
        // daBcd ABC  ->  true
        // KXzQ K  ->  false
        // ABC A  ->  false
        // ABC ABCD  ->  false


        let result = abbreviation(str1, str2)
        return result;
    },

}

module.exports = Runner
   

// function isMatch(a, b) {
//     if(!a.length && !b.length) {
//         return true;
//     }
//     if(!a.length) {
//         return false;
//     }
//     if(a[0].toUpperCase() == b[0]) {
//         return isMatch(a.substring(1), b.substring(1));
//     }
//     if(a[0] > 'Z') { // lowercase
//         return isMatch(a.substring(1), b);
//     }
// }

// function abbreviation(a, b) {
//     for(let i = 0; i < a.length - b.length + 1; i++) {
//         if(isMatch(a.substring(i), b)) {
//             return 'YES';
//         }
//         if(a[i] < 'a') { // uppercase
//             break;
//         }
//     }
//     return 'NO';
// }

// function abbreviation(a, b) {
//     let pattern = '^[a-z]*';
//     for(let ch of b) {
//         pattern += '[' + ch + ch.toLowerCase() + ']';
//         pattern += '[a-z]*';
//     }
//     pattern += '$';
//     if(a.match(new RegExp(pattern))) {
//         return 'YES';
//     }
//     return 'NO';
// }


