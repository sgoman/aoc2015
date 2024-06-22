'use strict'

const parseInput = input => {
    return input.replace(/turn /g, '').split('\n').map(l => [l.split(' ')[0], ...l.match(/\d+/g).map(Number)])
}

const process = (cmd, sr, sc, er, ec, arr, isPart2) => {
	for (let r = sr; r <= er; r++)
		for (let c = sc; c <= ec; c++)
			if (isPart2) {
				switch(cmd) {
					case 'on': arr[r][c] += 1; break
					case 'off': arr[r][c] = Math.max(0, arr[r][c] - 1); break
					case 'toggle': arr[r][c] += 2; break
				}
			} else {
				switch(cmd) {
					case 'on': arr[r][c] = 1; break
					case 'off': arr[r][c] = 0; break
					case 'toggle': arr[r][c] = arr[r][c] ? 0 : 1; break
				}
			}
	return arr
}

const solve = (isPart2, input) => parseInput(input).reduce((acc, cur) => process(...cur, acc, isPart2), Array.from({length: 1000}, _ => new Array(1000).fill(0)))

const part1 = input => solve(false, input).reduce((acc, cur) => acc + cur.filter(c => c == 1).length, 0)

const part2 = input => solve(true, input).reduce((acc, cur) => acc + cur.reduce((a, c) => a + c, 0), 0)

module.exports = { part1, part2 }
