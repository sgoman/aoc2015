'use strict'

const solve = (input, part2) => {
    const SIZE = 100
    const puzzle = input.trim().split('\n').reduce((acc, cur, r) => {
        cur.split('').forEach((el, c) => {
            if (el == '#') acc[r][c] = 1
        })
        return acc
    }, new Array(SIZE).fill(0).map(() => new Array(SIZE).fill(0)))
    if (part2) {
        puzzle[0][0] = 1
        puzzle[0][SIZE - 1] = 1
        puzzle[SIZE - 1][0] = 1
        puzzle[SIZE - 1][SIZE - 1] = 1
    }
    const trials = new Array(SIZE).fill(0)
    const dirs = [{x: -1, y: -1}, {x: 0, y: -1}, {x: 1, y: -1}, {x: -1, y: 0}, {x: 1, y: 0}, {x: -1, y: 1}, {x: 0, y: 1}, {x: 1, y: 1}]
    return trials.reduce(acc => {
        const grid = new Array(SIZE).fill(0).map(() => new Array(SIZE).fill(0))

        for(let r = 0; r < SIZE; r++) {
            for(let c = 0; c < SIZE; c++) {
                let neighbours = 0
                for(const dir of dirs) {
                    const nr = r + dir.y
                    const nc = c + dir.x
                    if (nr >= 0 && nr < SIZE && nc >= 0 && nc < SIZE)
                        neighbours += acc[nr][nc]
                }
                if (acc[r][c] && (neighbours == 2 || neighbours == 3)) {
                    grid[r][c] = 1
                } else if (!acc[r][c] && neighbours == 3) {
                    grid[r][c] = 1
                }
            }
        }
        if (part2) {
            grid[0][0] = 1
            grid[0][SIZE - 1] = 1
            grid[SIZE - 1][0] = 1
            grid[SIZE - 1][SIZE - 1] = 1
        }
        return grid
    }, puzzle).flat().reduce((acc, cur) => acc + cur, 0)
}

const part1 = input => solve(input, false)

const part2 = input => solve(input, true)

module.exports = { part1, part2 }
