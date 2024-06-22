'use strict'

const dirs = { '<': [-1, 0], '^': [0, 1], '>': [1, 0], 'v': [0, -1] }

const solve = (isPart2, input) => {
	const puzzle = input.split('').reduce((acc, d, i) => {
		const offset = isPart2 ? i % 2 : 0
		const [dx, dy] = dirs[d]
		acc.pos[offset][0] += dx
		acc.pos[offset][1] += dy
		acc.houses.add(`${acc.pos[offset][0]},${acc.pos[offset][1]}`)
		return acc
	}, {houses: new Set(), pos: [[0, 0], [0, 0]]})

	puzzle.houses.add('0,0')
	return puzzle.houses.size
}

const part1 = input => solve(false, input)

const part2 = input => solve(true, input)

module.exports = { part1, part2 }
