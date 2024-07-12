'use strict'

const solve = (isPart2, input) => input.trim().split('\n')
    .reduce((acc, cur) => isPart2
        ? (acc + JSON.stringify(cur).length - cur.length)
        : (acc + cur.length - eval(cur).length)
        , 0)

const part1 = input => solve(false, input)

const part2 = input => solve(true, input)

module.exports = { part1, part2 }
