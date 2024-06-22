'use strict'
const crypto = require('crypto')

const solve = (input, len) => {
    let i = 0
    while(!/^0+$/.test(crypto.createHash('md5').update(`${input}${i}`).digest('hex').substring(0, len))) i++
    return i
}

const part1 = input => solve(input, 5)

const part2 = input => solve(input, 6)

module.exports = { part1, part2 }
