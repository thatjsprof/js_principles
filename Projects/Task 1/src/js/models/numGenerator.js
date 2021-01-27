export default class NumGenerator {
    constructor(range) {
        this.range = range
        this.arr = []
    }

    determinePrime(num) {
        for(var i = 2; i < num; i++)
            if(num % i === 0) return false
        return num > 1
    }

    calculateRange() {
        for(i = 0; i <= this.range; i++) {
            if(this.determinePrime(i)) this.arr.push(i)
        }
    }

    returnArray() {
        return this.arr
    }
}