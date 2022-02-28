// CoderByte

function MinWindowSubstring(strArr) { 

    let text = strArr[0]
    let chars = strArr[1].split('');
    console.log(text, chars);

    let min_found = text.length;
    let min_index = 0;

    let find_smaller = function(window_text) {
        let check_chars = chars.slice(0);
        for(let i = 0; i < min_found; i++) {
            let char = window_text[i];
            let index = check_chars.indexOf(char);
            if(index > -1) {
                check_chars.splice(index, 1);
                if(check_chars.length == 0) {
                    min_found = i;
                    return true;
                }
            }
        }
    }

    for(let i = 0; i < text.length - chars.length + 1; i++) {
        if(chars.includes(text[i])) {
            if(find_smaller(text.substring(i))) {
                min_index = i;
            }
        }
    }

    return text.substring(min_index, min_found + min_index + 1);


}
   
const WindowString = {

    run(str1, str2) {
        let result = MinWindowSubstring([ str1, str2 ])
        return result;
    },

}

module.exports = WindowString
   
