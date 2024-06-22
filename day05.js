'use strict'

const parseInput = input => input.split('\n')

const part1 = input => parseInput(input).reduce((acc, cur) => (!/ab|cd|pq|xy/.test(cur) && /(.)\1/.test(cur) && cur.replace(/[^aeiou]/g, '').length >= 3) ? acc + 1 : acc, 0)

const part2 = input => parseInput(input).reduce((acc, cur) => (/(.).\1/.test(cur) && /(..).*\1/.test(cur)) ? acc + 1 : acc, 0)

module.exports = { part1, part2 }
