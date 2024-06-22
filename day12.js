'use strict'

const killRed = input => {
    if (typeof input === "object") {
        if (Array.isArray(input)) {
            return input.map(value => killRed(value))
        } else {
            if ((Object.values(input)).some(v => v == "red")) return null
            for (const [key, value] of Object.entries(input)) input[key] = killRed(value)
        }
    }
    return input
}

const sumNumbersInString = input => input.match(/-?\d+/g).reduce((acc, cur) => acc + ~~cur, 0)

const part1 = input => sumNumbersInString(input)

const part2 = input => sumNumbersInString(JSON.stringify(killRed(JSON.parse(input))))

module.exports = { part1, part2 }
