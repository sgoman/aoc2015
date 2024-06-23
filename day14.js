'use strict'

const parseInput = input => input.split('\n').map(l => [...l.match(/\d+/g).map(Number), 0])

const race = (seconds, speed, fly, rest) => Math.floor(seconds / (fly + rest)) * fly * speed + Math.min(fly, seconds % (fly + rest)) * speed

const part1 = input => parseInput(input).reduce((acc, cur) => Math.max(acc, race(2503, ...cur)), 0)

const part2 = input => {
    const deers = parseInput(input)
    for (let i = 1; i <= 2503; i++) {
        const distances = deers.map(deer => race(i, ...deer))
        const best = Math.max(...distances)
        distances.forEach((distance, deer) => { deers[deer][3] += (distance == best) })
    }
    return Math.max(...deers.map(d => d[3]))
}

module.exports = { part1, part2 }
