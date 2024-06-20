'use strict'

const part1 = input => input.trim().split('').map(c => c == '(' ? 1 : -1).reduce((acc, cur) => acc + cur, 0)

const part2 = input => {
	const {pos, floor} = input.trim().split('')
		.map(c => c == '(' ? 1 : -1)
		.reduce((acc, cur, i) => {acc.floor += cur; if (acc.floor == -1 && acc.pos == null) acc.pos = i;return acc}, {pos: null, floor: 0})
	return pos + 1
}

module.exports = { part1, part2 }
