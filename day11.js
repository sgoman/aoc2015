'use strict'

const allowed = 'abcdefghjkmnpqrstuvwxyz'

const clean = pw => {
	const blank = 'aaaaaaaaaa', rep = [['i', 'j'], ['l', 'm'], ['o', 'p']]
	for (const [s, r] of rep) {
		const i = pw.indexOf(s)
		if (i >= 0) pw = pw.substring(0, i) + r + blank.substr(0, pw.length - i - 1)
	}
	return pw
}

const hasSequence = pw => pw.split('').some((c, i, a) => i > 1 && allowed.indexOf(c) == (allowed.indexOf(a[i - 1]) + 1) && allowed.indexOf(c) == allowed.indexOf(a[i - 2]) + 2)

const isValid = pw => /(.)\1.*(?!\1)(.)\2/.test(pw) && !/i|l|o/.test(pw) && hasSequence(pw)

const increment = pw => {
	pw = pw.split('')
	const l = pw.length, a = allowed.length - 1
	let p = l - 1
	if (pw[p] == allowed[a]) {
		while (p >= 0 && pw[p] == allowed[a]) pw[p--] = allowed[0]
		pw[p] = allowed[allowed.indexOf(pw[p]) + 1]
	} else {
		pw[p] = allowed[allowed.indexOf(pw[p]) + 1]
	}
	return pw.join('')
}

const part1 = input => {
	input = increment(clean(input))
	while (!isValid(input)) input = increment(input)
	return input
}

const part2 = input => part1(part1(input))

module.exports = { part1, part2 }
