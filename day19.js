'use strict'

// Part 1
// ======

const part1 = input => {
    const [recstrings, calstring] = input.trim().split('\n\n')
    const l = calstring.length
    const recs = recstrings.split('\n').reduce((acc, cur) => {
        const [s, r] = cur.split(' => ')
        if (acc.has(s)) {
            acc.set(s, [r].concat(acc.get(s)))
        } else {
            acc.set(s, [r])
        }
        return acc
    }, new Map())
    const cal = [...recs.keys()].reduce((acc, cur) => {
        [...recs.get(cur)].forEach(rep => {
            let p = -1
            do {
                let tmp = ''
                p = calstring.indexOf(cur, p + 1)
                if (p >= 0) {
                    switch(p) {
                        case 0:
                            tmp = rep + calstring.substring(cur.length)
                            break
                        case l - 1:
                            tmp = calstring.substring(0, l - cur.length) + rep
                            break
                        default:
                            tmp = calstring.substring(0, p) + rep + calstring.substring(p + cur.length)
                    }
                    acc.add(tmp)
                }
            } while (p >= 0 && p < l);
        })
        return acc
    }, new Set())
    return cal.size
}

// Part 2
// ======

const part2 = input => {
    const [recstrings, calstring] = input.trim().split('\n\n')
    const molecules = recstrings.split('\n').map(line => line.split(' => '))
    let tmp = calstring
    let i = 0
    while(tmp !== 'e') {
        for (const [inp, out] of molecules) {
            if (tmp.includes(out)) {
                tmp = tmp.replace(out, inp)
                i++
            }
        }
    }
    return i
}

module.exports = { part1, part2 }
