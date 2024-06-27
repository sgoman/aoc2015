'use strict'

const permutator = (inputArr) => {
    const result = [];

    const permute = (arr, m = []) => {
        if (arr.length === 0) {
            result.push(m)
        } else {
            for (let i = 0; i < arr.length; i++) {
                const curr = arr.slice();
                const next = curr.splice(i, 1);
                permute(curr.slice(), m.concat(next))
            }
        }
    }

    permute(inputArr)

    return result;
}

const hash = (a, b) => `${a},${b}`

const distance = (stops, distances) => stops.reduce((acc, cur, i, arr) => i == 0 ? acc : acc + distances.get(hash(cur, arr[i - 1])), 0)

const parseInput = input => input.split('\n')
    .map(l => /^(?<from>[^ ]+) to (?<to>[^ ]+) = (?<dist>\d+)$/.exec(l).groups)
    .reduce((acc, {from, to, dist}) => {
        dist = ~~dist
        acc.distances.set(hash(from, to), dist)
        acc.distances.set(hash(to, from), dist)
        acc.locations.add(from)
        acc.locations.add(to)
        return acc
    }, {distances: new Map(), locations: new Set()})

const solve = (isPart2, input) => {
    const {distances, locations} = parseInput(input)
    const method = isPart2 ? Math.max : Math.min
    let start = isPart2 ? 0 : Infinity
    return permutator([...locations]).reduce((dist, stops) => method(dist, distance(stops, distances)), start)
}

const part1 = input => solve(false, input)

const part2 = input => solve(true, input)

module.exports = { part1, part2, permutator, hash }
