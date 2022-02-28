// CoderByte

function TreeConstructor(strArr) { 
    let nodes = strArr.map(n => n.split(',').map(d => parseInt(d.replace(/[\(\)]/, ''))));
    let tree = [];
    for(let node of nodes) {
        tree[node[1]] = tree[node[1]] || [];
        tree[node[1]].push(node[0]);
        if(tree[node[1]].length > 2) {
            return false;
        }
    }
    return true;
}
   

const Runner = {

    run() {

        // let input = ["(1,2)", "(2,4)", "(5,7)", "(7,2)", "(9,5)"]; // true
        // let input = ["(1,2)", "(3,2)", "(2,12)", "(5,2)"]; // false
        let input = ["(1,2)", "(2,3)", "(3,4)", "(4,5)"]; // false

        console.log('input', input);

        let result = TreeConstructor(input)
        return result;
    },

}

module.exports = Runner
   
