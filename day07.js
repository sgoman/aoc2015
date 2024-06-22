'use strict'

const solve = (code, results) => {
    const calc = code.split('\n').reduce((acc, cur) => {
        const [ops, res] = cur.split(' -> ')
        acc[res.trim()] = ops.trim().split(' ')
        return acc
    }, {})

    const calculate = name => {
        if (name.match(/^\d+$/)) return parseInt(name, 10)
        if (results.has(name)) return results.get(name)

        let res
        const ops = calc[name]

        if (ops.length == 1) {
            res = calculate(ops[0])
        } else {
            const op = ops[ops.length - 2]
            if (op == 'AND') {
                res = calculate(ops[0]) & calculate(ops[2])
            } else if(op == 'OR') {
                res = calculate(ops[0]) | calculate(ops[2])
            } else if(op == 'RSHIFT') {
                res = calculate(ops[0]) >> calculate(ops[2])
            } else if(op == 'LSHIFT') {
                res = calculate(ops[0]) << calculate(ops[2])
            } else if(op == 'NOT') {
                res = ~calculate(ops[1]) & 65535
            } else {
                console.log({msg: 'BOOM!', name, ops, op})
            }
            results.set(name, res)
        }

        return res
    }

    return calculate('a')
}

const part1 = input => solve(input, new Map())

const part2 = input => solve(input, new Map([['b', part1(input)]]))

module.exports = { part1, part2 }
