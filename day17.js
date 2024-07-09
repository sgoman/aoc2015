'use strict'

const parseInput = input => input.split('\n').map(Number)

/**
 * Creates combinations of the input elements and checks acceptCombo to keep or discard a combination
 * and diveDeeper to decide if there could be acceptable combinations by continuing a depth search.
 *
 * Examples:
 *      const pairs = tmp => tmp.length == 2
 *   	const tooShort = tmp => tmp.length < 2
 *   	const onlyEven = tmp => tmp.every(val => val % 2 == 0)
 *   	const everything = tmp => true
 *
 *   	console.log(combineConditionally(['a', 'b', 'c'], pairs, tooShort))
 *      // prints [ [ 'a', 'b' ], [ 'a', 'c' ], [ 'b', 'c' ] ]
 *
 *   	console.log(combineConditionally([1, 2, 3, 4, 5, 6], onlyEven, everything))
 *      // prints [ [ 2 ], [ 2, 4 ], [ 2, 4, 6 ], [ 2, 6 ], [ 4 ], [ 4, 6 ], [ 6 ] ]
 *
 *   	console.log(combineConditionally(['a', 'b', 'c'], everything, everything))
 *   	// prints [ [ 'a' ], [ 'a', 'b' ], [ 'a', 'b', 'c' ], [ 'a', 'c' ], [ 'b' ], [ 'b', 'c' ], [ 'c' ] ]
 *
 * @param array arr the array to source combinations from
 * @param function acceptCombo takes the current combination, returns boolean to keep or discard
 * @param function diveDeeper takes the current combination, returns boolean to keep adding or stopping
 * @returns array of arrays of possible combinations
 */ 
const combineConditionally = (arr, acceptCombo, diveDeeper) => {
	const l = arr.length
	const combiner = (part, start) => {
		let result = [], p
		for (let i = start; i < l; i++) {
			p = part.slice(0)
			p.push(arr[i])
			if (acceptCombo(p)) result.push(p)
			if (diveDeeper(p)) result = result.concat(combiner(p, i + 1))
		}
		return result
	}
	return combiner([], 0)
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
