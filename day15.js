'use strict'

const parseInput = input => input.split('\n').map(l => l.match(/-?\d+/g).map(Number))

const solve = (isPart2, input) => {
    const recipe = parseInput(input), m = 100
    let best = 0
    for (let i = 0; i < m; i++)
        for (let j = 0; j < 100; j++)
            for (let k = 0; k < 100; k++)
                for (let l = 0; l < 100; l++) {
                    if ((i + j + k + l) !== 100) continue
                    const factors = [i, j, k, l]
                    const base = recipe.map(([cap, dur, fla, tex, cal], z) => [cap * factors[z], dur * factors[z], fla * factors[z], tex * factors[z], isPart2 ? cal * factors[z] : 1])
                    const sum = base.reduce((acc, [cap, dur, fla, tex, cal]) => [acc[0] + cap, acc[1] + dur, acc[2] + fla, acc[3] + tex, acc[4] + cal], [0, 0, 0, 0, 0])
                    const score = sum.reduce((acc, cur, z) => acc * (z == 4 ? 1 : Math.max(0, cur)), 1)
                    if (!isPart2 || sum[4] == 500) best = Math.max(best, score)
                }
    return best
}

const part1 = input => solve(false, input)

const part2 = input => solve(true, input)

module.exports = { part1, part2 }
