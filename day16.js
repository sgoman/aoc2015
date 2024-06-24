'use strict'

const mfcsam = new Map([['children', 3], ['cats', 7], ['samoyeds', 2], ['pomeranians', 3], ['akitas', 0], ['vizslas', 0], ['goldfish', 5], ['trees', 3], ['cars', 2], ['perfumes', 1]])

const solve = (isPart2, input) => {
    const aunts = input.trim().split('\n').map(line => {
        const m = /Sue (\d+): ([a-z]+): (\d+), ([a-z]+): (\d+), ([a-z]+): (\d+)/.exec(line)
        return new Map([['Sue', ~~m[1]], [m[2], ~~m[3]], [m[4], ~~m[5]], [m[6], ~~m[7]]])
    })
    return [...mfcsam.keys()].reduce((acc, cur) => acc.filter(f => {
        if (f.has(cur)) {
            if (isPart2) {
                if (cur == 'cats' || cur == 'trees') return f.get(cur) > mfcsam.get(cur)
                if (cur == 'pomeranians' || cur == 'goldfish') return f.get(cur) < mfcsam.get(cur)
            }
            return f.get(cur) == mfcsam.get(cur)
        } else {
            return true
        }
    }), aunts)[0].get('Sue')
}

const part1 = input => solve(false, input)

const part2 = input => solve(true, input)

module.exports = { part1, part2 }
