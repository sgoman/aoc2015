'use strict'

const parseInput = input => input.split('\n').map(l => l.split('x').map(Number))

const part1 = input => parseInput(input)
	.map(([l, w, h]) => [l * w, w * h, h* l])
	.reduce((acc, sides) => acc + Math.min(...sides) + sides.map(s => 2*s).reduce((a, c) => a + c, 0), 0)

const part2 = input => parseInput(input).reduce((acc, edges) => {
	edges.sort((a, b) => a - b)
	return acc + edges.reduce((a, c) => a * c, 1) + (edges[0] * 2) + (edges[1] * 2) 
    }, 0)

module.exports = { part1, part2 }
