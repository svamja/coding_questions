// HackerRank

function truckTour(petrolpumps) {
    // Write your code here
    let length = petrolpumps.length;
    petrolpumps = petrolpumps.concat(petrolpumps)

    function canCompleteTrip(start) {
        let petrol = 0;
        for(let j = start; j < start + length; j++) {
            petrol += petrolpumps[j][0];
            let distance = petrolpumps[j][1];
            if(petrol < distance) {
                return false;
            }
            petrol -= distance;
        }
        return true;
    }


    for(let i = 0; i < length; i++) {
        if(canCompleteTrip(i)) {
            return i;
        }
    }
    return -1;

}

   

const Runner = {

    run() {

        // let input = [ [ 1, 5 ], [ 10, 3 ], [ 3, 4 ] ]; // 1
        let input = [ [ 5, 5 ], [ 6, 7 ], [ 4, 4 ], [ 3, 3 ],  ]; // 1
        // let input = [ [ 1, 5 ], [ 10, 3 ], [ 3, 4 ] ]; // 1

        console.log('input', input);

        let result = truckTour(input)
        return result;
    },

}

module.exports = Runner
   
