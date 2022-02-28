// CoderByte

let total_combinations = 0;
let iterations = 0;

function BracketCombinations(num) { 
  
  r_combinations([ 1 ], num)

  return total_combinations;

}

function sum(arr) {
  return arr.reduce((s, a) => s + a, 0);
}

function count_of(arr, value) {
  return arr.filter(a => a == value).length;
}

function r_combinations(curr, num) {
    iterations++;
    // console.log('curr', curr.join(' '));
  let total = sum(curr);
  if(curr.length == num*2) {
    if(total == 0) {
        // console.log('good');
      total_combinations++;
    }
    return;
  }
  if(curr.length > num*2) {
    return;
  }

  let plus_count = count_of(curr, 1);
  let minus_count = count_of(curr, -1);

  if(plus_count < num) {
    // console.log('adding plus', curr, plus_count, minus_count);
    let curr_plus = curr.slice(0);
    curr_plus.push(1)
    r_combinations(curr_plus, num);
  }

  if(minus_count < plus_count) {
    // console.log('adding minus', curr, plus_count, minus_count);
    let curr_minus = curr.slice(0);
    curr_minus.push(-1)
    r_combinations(curr_minus, num);
  }


}

const Bracket = {

    run(num) {
        num = parseInt(num)
        let result = BracketCombinations(num)
        console.log('iterations', iterations);
        return result;
    },

}

module.exports = Bracket
   
