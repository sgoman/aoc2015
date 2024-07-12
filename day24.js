'use strict'

const { combineConditionally, arraySum } = require('./day17.js')

const arrayProduct = arr => arr.reduce((acc, cur) => acc * cur, 1)

const solve = (isPart2, input) => {
    const nums = input.split('\n').map(Number)
    const target = arraySum(nums) / (isPart2 ? 4 : 3)
    const onTarget = tmp => arraySum(tmp) == target
    const notTooMuch = tmp => arraySum(tmp) < target
    const combos = combineConditionally(nums, onTarget, notTooMuch)
    const shortestLength = combos.reduce((acc, cur) => Math.min(acc, cur.length), 100)
    return combos.filter(c => c.length == shortestLength).reduce((acc, cur) => Math.min(acc, arrayProduct(cur)), Infinity)
}

const part1 = input => solve(false, input)

const part2 = input => solve(true, input)

module.exports = { part1, part2, arrayProduct }
