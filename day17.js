'use strict'

const parseInput = input => input.split('\n').map(Number)

/**
 * Creates combinations of the input elements and checks acceptCombo to keep a combiination
 * and diveDeeper to decide if there could be acceptable combinations by continuing a depth search.
 *
 * Examples:
 *      const pairs = tmp => tmp.length == 2
 *   	const shorts = tmp => tmp.length < 2
 *   	const everything = tmp => true
 *
 *   	console.log(combineConditionally(['a', 'b', 'c'], pairs, shorts))
 *      // prints [ [ 'a', 'b' ], [ 'a', 'c' ], [ 'b', 'c' ] ]
 *
 *   	console.log(combineConditionally(['a', 'b', 'c'], everything, everything))
 *   	// prints [ [ 'a' ], [ 'a', 'b' ], [ 'a', 'b', 'c' ], [ 'a', 'c' ], [ 'b' ], [ 'b', 'c' ], [ 'c' ] ]
 *
 */ 
const combineConditionally = (arr, acceptCombo, diveDeeper) => {
	const l = arr.length
	const c = (part, start) => {
		let result = [], p
		for (let i = start; i < l; i++) {
			p = part.slice(0)
			p.push(arr[i])
			if (acceptCombo(p)) result.push(p)
			if (diveDeeper(p)) result = result.concat(c(p, i + 1))
		}
		return result
	}
	return c([], 0)
}

const arraySum = arr => arr.reduce((acc, cur) => acc + cur, 0)

const solve = input => {
	const validCombo = tmp => arraySum(tmp) == 150
	const goOn = tmp => arraySum(tmp) < 150
	return combineConditionally(parseInput(input), validCombo, goOn )
}

const part1 = input => solve(input).length

const part2 = input => {
	const combos = solve(input)
	const mini = combos.reduce((acc, cur) => Math.min(acc, cur.length), 20)
	return combos.filter(c => c.length == mini).length
}

module.exports = { part1, part2, combineConditionally, arraySum }
