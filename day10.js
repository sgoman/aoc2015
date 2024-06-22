'use strict'

const lookAndSay = input => {
    const l = input.length
    let output = '', i = 0
    while (i < l) {
        let j = i + 1
        while (j < l && input[i] == input[j]) j++
        output += (j - i) + input[i]
        i = j
    }
    return output
}

const part1 = input => [...new Array(40)].reduce(acc => lookAndSay(acc), input).length

const part2 = input => [...new Array(50)].reduce(acc => lookAndSay(acc), input).length

module.exports = { part1, part2 }
