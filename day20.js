'use strict'

const solve = (isPart2, input) => {
	const presents = []
	for (let elf = 1; elf < input / 10; elf++) {
		let visits = 0
		for (let house = elf; house < input / 10; house = house + elf) {
			if (isPart2) {
				if (visits < 50) {
					if (!presents[house]) presents[house] = 11
					presents[house] = presents[house] + elf * 11
					visits++
				}
			} else {
				if (!presents[house]) presents[house] = 10
				presents[house] = presents[house] + elf * 10
			}
		}
	}
	return presents.reduce((acc, cur, i) => (acc == 0 && cur >= input) ? i : acc, 0)
}

const part1 = input => solve(false, input)

const part2 = input => solve(true, input)

module.exports = { part1, part2 }
