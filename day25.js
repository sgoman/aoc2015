'use strict'

const part1 = input => {
    const [row, col] = input.match(/\d+/g).map(Number)
    // just brute force...
    let val = 20151125, r = 1, c = 1
    while(true) {
        if (r == 1) {
            r = c + 1
            c = 1
        } else {
            r--
            c++
        }
        val = (val * 252533) % 33554393
        if (c == col && r == row) return val
    }
}

const part2 = input => 'Nothing to do for part 2, just solve every other challenge!'

module.exports = { part1, part2 }
