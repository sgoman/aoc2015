'use strict'

const {permutator, hash} = require('./day09.js')

const parseInput = input => input.replace(/lose /g, '-').replace(/\.|would (gain )?|happiness units by sitting next to /g, '').split('\n').map(l => l.split(' '))
        .reduce((acc, [middle, happy, side]) => {acc.people.add(middle); acc.relations.push({middle, happy: ~~happy, side}); return acc}, {people: new Set(), relations: []})

const solve = (isPart2, input) => {
    const {people, relations} = parseInput(input)
    if (isPart2) {
        people.add('Yourself')
        for (const peer of [...people]) {
            if (peer == 'Yourself') {
                for (const other of [...people].filter(p => p !== 'Yourself')) {
                    relations.push({middle: 'Yourself', happy: 0, side: other})
                }
            } else {
                relations.push({middle: peer, happy: 0, side: 'Yourself'})
            }
        }
    }
    return permutator([...people]).reduce((acc, table) => Math.max(acc, score(table, relations)), 0)
}

const score = (table, relations) => table.reduce((acc, cur, i, arr) => {
    const left = arr[(i - 1 + arr.length) % arr.length], right = arr[(i + 1) % arr.length]
    acc += relations.filter(r => r.middle == cur && r.side == left)[0].happy
    acc += relations.filter(r => r.middle == cur && r.side == right)[0].happy
    return acc
}, 0)

const part1 = input => solve(false, input)

const part2 = input => solve(true, input)

module.exports = { part1, part2 }
