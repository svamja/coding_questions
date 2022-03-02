'use strict';

// Codewars
const snail = function(array) {

    if(!array.length || !array[0].length) {
        return [];
    }

    const size = array.length;
    let circle_count = Math.ceil(size / 2);

    let path = [];

    for(let circle = 0; circle < circle_count; circle++) {
        let path_length = size - circle*2 - 1;

        if(path_length == 0) {
            path.push(array[circle][circle]);
            break;
        }

        // Right
        for(let i = 0; i < path_length; i++) {
            path.push(array[circle][circle + i]);
        }
        // Down
        for(let i = 0; i < path_length; i++) {
            path.push(array[circle + i][circle + path_length]);
        }
        // Left
        for(let i = circle + path_length; i > circle; i--) {
            path.push(array[size - circle - 1][i]);
        }
        // Up
        for(let i = circle + path_length; i > circle; i--) {
            path.push(array[i][circle]);
        }
    }

    return path;

}

// Codewars

const maxSequence = function(arr) {
    console.log(arr);
    let n = arr.length;
    if(!n) {
        return 0;
    }
    let local_max = 0;
    let global_max = 0;
    for(let i = 0; i < n; i++) {
        local_max = Math.max(arr[i], arr[i] + local_max);
        if(local_max > global_max) {
            global_max = local_max;
        }
    }
    return global_max;
}

// Codewars

// let multiples;

// function r_multiply(curr_digits, remaining_arrays) {
//     if(remaining_arrays.length == 0) {
//         multiples.push(curr_digits);
//         return;
//     }
//     for(let digit of remaining_arrays[0]) {
//         r_multiply(curr_digits + digit, remaining_arrays.slice(1));
//     }
// }


// function getPINs(observed) {
//     const adj_map = [
//         [ 0, 8 ],
//         [ 1, 2, 4 ], [ 2, 1, 3, 5 ], [ 3, 2, 6 ],
//         [ 4, 1, 5, 7 ], [ 5, 2, 4, 6, 8 ], [ 6, 3, 5, 9 ],
//         [ 7, 4, 8 ], [ 8, 5, 7, 9, 0 ], [ 9, 6, 8 ],
//     ];

//     let arrays = [];
//     for(let char of observed) {
//         arrays.push(adj_map[char]);
//     }

//     multiples = [];
//     r_multiply('', arrays);
//     return multiples;

// }

function getPINs(observed) {
    const map = [
        [ 0, 8 ],
        [ 1, 2, 4 ], [ 2, 1, 3, 5 ], [ 3, 2, 6 ],
        [ 4, 1, 5, 7 ], [ 5, 2, 4, 6, 8 ], [ 6, 3, 5, 9 ],
        [ 7, 4, 8 ], [ 8, 5, 7, 9, 0 ], [ 9, 6, 8 ],
    ];
    let combinations = observed.split('').map(digit => map[digit]);
    let multiply = (pre, cur) => [].concat(...pre.map(p => cur.map(c => '' + p + c)))
    return combinations.reduce(multiply);
}

// Codewars

function sumIntervals(intervals) {

    // console.log('intervals', intervals);

    while(true) {
        let merged = [];
        for(let curr of intervals) {
            let matched = false;
            for(let m_interval of merged) {
                if(curr[0] >= m_interval[0] && curr[0] <= m_interval[1]) {
                    matched = true;
                }
                if(curr[1] >= m_interval[0] && curr[1] <= m_interval[1]) {
                    matched = true;
                }
                if(curr[0] < m_interval[0] && curr[1] > m_interval[1]) {
                    matched = true;
                }
                if(curr[0] > m_interval[0] && curr[1] < m_interval[1]) {
                    matched = true;
                }
                if(matched) {
                    m_interval[0] = Math.min(curr[0], m_interval[0]);
                    m_interval[1] = Math.max(curr[1], m_interval[1]);
                    break;
                }
            }
            if(!matched) {
                merged.push(curr);
            }
        }
        if(merged.length == intervals.length) {
            break;
        }
        intervals = merged;
    }

    // console.log('merged', intervals);

    return intervals.map(interval => interval[1] - interval[0])
        .reduce((a, b) => a + b);

}

// Codewars

// TBD

const recoverSecret = function(triplets) {

    let secret = triplets[0];
    let prev_secret = [];
    let z = secret.length - 1;

    while(prev_secret.join('') != secret.join('')) {
        prev_secret = secret;
        for(let triplet of triplets) {

            // prepend triplet
            if(secret[0] == triplet[2]) {
                secret = [ triplet[0], triplet[1], ...secret ];
            }
            else if(secret[0] == triplet[1]) {
                secret = [ triplet[0], ...secret ];
            }
            z = secret.length - 1;

            // append triplet
            if(secret[z] == triplet[0]) {
                secret = [ ...secret, triplet[1], triplet[2] ];
            }
            else if(secret[z] == triplet[1]) {
                secret = [ ...secret, triplet[2] ];
            }
            z = secret.length - 1;

            // insert in middle
            for(let i = 0; i < z - 1; i++) {
                if(secret[i] == triplet[0] && secret[i+1] == triplet[2]) {
                    secret.splice(i+1, 0, triplet[1]);
                }
            }
        }
    }


    // console.log(secret);

    return secret.join('');

}


const Misc = {

    secret() {
        const input = [
          ['h','a','p'],
          ['t','u','p'],
          ['w','h','i'],
          ['t','s','u'],
          ['a','t','s'],
          ['t','i','s'],
          ['w','h','s']
        ];
        let output = recoverSecret(input);
        return output;
    },

    intervals() {
        // const input = [[1,5]]; // 4
        // const input = [[1,5],[6,10]]; // 8
        // const input = [[1,5],[1,5]]; // 4
        // const input = [[7, 10],[3, 5], [1,4]]; // 7
        // const input = [ [ 1, 5 ], [ 10, 20 ], [ 1, 6 ], [ 16, 19 ], [ 5, 11 ] ]; // 19
        const input = [ [ -9, -5 ], [ 14, 15 ], [ -19, 11 ], [ -3, 9 ], [ -18, 8 ] ]; 
        let output = sumIntervals(input);
        return output;
    },

    pin(input) {
        let output = getPINs(input);
        console.log(output);
    },


    run_snail() {

        let input = [[1, 2, 3, 4, 5, 6], [20, 21, 22, 23, 24, 7], [19, 32, 33, 34, 25, 8], [18, 31, 36, 35, 26, 9], [17, 30, 29, 28, 27, 10], [16, 15, 14, 13, 12, 11]];
        // output => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36]);

        // let input = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
        // output => [1, 2, 3, 6, 9, 8, 7, 4, 5]

        // let input = [[1, 2, 3, 4, 5], [6, 7, 8, 9, 10], [11, 12, 13, 14, 15], [16, 17, 18, 19, 20], [21, 22, 23, 24, 25]]
        // output => [1, 2, 3, 4, 5, 10, 15, 20, 25, 24, 23, 22, 21, 16, 11, 6, 7, 8, 9, 14, 19, 18, 17, 12, 13];


        let output = snail(input);
        console.log(output);

    },

    max_seq() {
        // const input = [ -2, 1, -3, 4, -1, 2, 1, -5, 4 ]; // 6
        // const input = [ 2, 1, -1, -1, 1, 2, 1  ]; // 4
        // const input = [ 4, 4, -10, 4, 4, 4, -20, 4, 4 ]; // 12
        const input = [ 7, 4, 11, -11, 39, 36, 10, -6, 37, -10, -32, 44, -26, -34, 43, 43 ]; // 155
        const output = maxSequence(input);
        return output;
    },


}

module.exports = Misc


