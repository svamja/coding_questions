function IntStorage(byteLength, ints) {
    console.log('new', byteLength, ints);
    if(byteLength === undefined && ints === undefined) {
        throw new Error('no input');
    }
    if(byteLength === 0 || isNaN(byteLength)) {
        throw new Error('Invalid byteLength');
    }
    if(typeof byteLength != 'number' && typeof byteLength != 'undefined' && byteLength !== null) {
      throw new Error('Invalid type of byteLength');
    }
    this.byteLength = byteLength || 32;
    if(this.byteLength < 1 || this.byteLength > 32) {
        throw new Error('Invalid byteLength');
    }
    this.ints = ints ? ints.slice(0) : [];
    this.length = this.ints.length * byteLength;
    // this.print();
    this.calculateMask();
    this.validate();
}

IntStorage.prototype.validate = function() {
    if(typeof this.ints !== 'object' || this.ints.length === undefined) {
        throw new Error('invalid ints type');
    }
    for(let int of this.ints) {
        if(int > this.byteMask) {
            throw new Error('invalid integer value');
        }
    }

}


IntStorage.prototype.print = function() {
    let binaries = this.ints.map(int => int.toString(2).padStart(this.byteLength, '0'));
    console.log(binaries.join(' '));
}

IntStorage.prototype.calculateMask = function() {
    let byteMask = 0;
    let multiplier = 1;
    for(let i = 0; i < this.byteLength; i++) {
        byteMask += multiplier;
        multiplier *= 2;
    }
    this.byteMask = byteMask;
}

IntStorage.prototype.byteValue = function(byte, start, end) {
    let byteLength = this.byteLength;
    let byteMask = this.byteMask;
    let ints = this.ints;

    let right_shift = byteLength - end - 1;
    let left_shift = start;

    if(left_shift) {
        byte = ((byte << left_shift) & byteMask) >> left_shift
    }
    if(right_shift) {
        byte = byte >> right_shift;
    }
    return byte;
}

IntStorage.prototype.evaluate = function(values, to) {
    let byteLength = this.byteLength;
    let byteMask = this.byteMask;
    let right_shift = byteLength - to % byteLength - 1;
    let left_shift = (byteLength - right_shift) % byteLength;

    let total = 0;
    for(let i = values.length - 1; i >= 0; i--) {
        let curr = values[i];
        if(right_shift > 0 && i < values.length - 1) {
            curr = curr >> right_shift;
        }
        let prev = 0;
        if(i > 0 && left_shift) {
            prev = values[i - 1];
            prev = (prev << left_shift) & byteMask;
        }
        let value = prev + curr;
        let j = values.length - i - 1;
        total += value * Math.pow(2, byteLength * j)
    }

    return total;
}


IntStorage.prototype.read = function(from, count) {

    if(from < 0) {
        throw new Error('invalid from');
    }

    if(count == 0) {
        return 0;
    }

    if(count < 0) {
        throw new Error('invalid count');
    }

    let ints = this.ints;
    let byteLength = this.byteLength;
    from = from || 0;
    count = count || byteLength;
    let to = from + count - 1;

    if(to >= this.length) {
        throw new Error('count out of range');
    }

    let start_byte = Math.floor(from / byteLength);
    let end_byte = Math.floor(to / byteLength);

    let values = [];

    for(let i = 0; i < ints.length; i++) {
        if(i < start_byte) {
            continue;
        }
        if(i > end_byte) {
            break;
        }
        let start_bit = (i == start_byte) ? from % byteLength : 0;
        let end_bit = (i == end_byte) ? to % byteLength : byteLength - 1;
        let value = this.byteValue(ints[i], start_bit, end_bit);
        values.push(value);
    }

    let value = this.evaluate(values, to);
    return value;

}


const Runner = {

    run(byteLength, ...ints) {
        byteLength = parseInt(byteLength);
        ints = ints.map(x => parseInt(x));
        let count = ints.pop();
        let from = ints.pop();
        // console.log(byteLength, ints, from, count);
        let is = new IntStorage(byteLength, ints);
        return is.read(from, count);
    },

}

module.exports = Runner
   
