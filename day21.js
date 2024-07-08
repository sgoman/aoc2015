'use strict'

const weps = [
	[8, 4, 0],
	[10, 5, 0],
	[25, 6, 0],
	[40, 7, 0],
	[74, 8, 0]
]

const arms = [
	[13, 0, 1],
	[31, 0, 2],
	[53, 0, 3],
	[75, 0, 4],
	[102, 0, 5],
	[0, 0, 0]
]

const rings = [
	[25, 1, 0],
	[50, 2, 0],
	[100, 3, 0],
	[20, 0, 1],
	[40, 0, 2],
	[80, 0, 3],
	[0, 0, 0],
	[0, 0, 0]
]

const combinations = function* (arr) {
	for (let i = 0; i < arr.length - 1; i++) 
		for (let j = i + 1; j < arr.length; j++) 
			yield [arr[i], arr[j]]
}

const parseInput = input => input.split('\n').map(l => l.match(/\d+/g).map(Number)[0])

const battle = (playerHp, playerDmg, playerArm, bossHp, bossDmg, bossArm) => {
	while (true) {
		bossHp -= Math.max(1, playerDmg - bossArm)
		if (bossHp <= 0) return true
		playerHp -= Math.max(1, bossDmg - playerArm)
		if (playerHp <= 0) return false
	}
}

const solve = (isPart2, input) => {
	let [bossHp, bossDmg, bossArm] = parseInput(input)
	let m = isPart2 ? -1e100 : 1e100
	for (const wep of weps) {
		for (const arm of arms) {
			for (const [l, r] of combinations(rings)) {
				const cost = wep[0] + arm[0] + l[0] + r[0]
				const pDmg = wep[1] + l[1] + r[1]
				const pArm = arm[2] + l[2] + r[2]
				const won = battle(100, pDmg, pArm, bossHp, bossDmg, bossArm)
				if (isPart2) {
					m = won ? m : Math.max(m, cost)
				} else  {
					m = won ? Math.min(m, cost) : m
				}
			}
		}
	}
	return m
}

const part1 = input => solve(false, input)

const part2 = input => solve(true, input)

module.exports = { part1, part2 }
