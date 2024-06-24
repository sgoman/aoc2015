'use strict'

const parseInput = input => input.replace(/[,+]/g, '').split('\n').map(l => l.split(' '))

const solve = (isPart2, input, regs) => {
	const l = input.length
	let ip = 0
	while (ip < l) {
		const cmd = input[ip]
		switch (cmd[0]) {
			case 'inc': regs[cmd[1]] += 1; ip++; break
			case 'hlf': regs[cmd[1]] = regs[cmd[1]] >> 1; ip++; break
			case 'tpl': regs[cmd[1]] *= 3; ip++; break
			case 'jmp': ip += ~~cmd[1]; break
			case 'jie': ip += regs[cmd[1]] % 2 == 0 ? ~~cmd[2] : 1; break
			case 'jio': ip += regs[cmd[1]] == 1 ? ~~cmd[2] : 1; break
		}
	}
	return regs
}

const part1 = input => solve(false, parseInput(input), {a: 0, b: 0}).b

const part2 = input => solve(false, parseInput(input), {a: 1, b: 0}).b

module.exports = { part1, part2 }
