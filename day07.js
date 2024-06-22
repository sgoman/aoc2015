'use strict'

const parseInput = input => input.split('\n')
	.map(l => l.split(' -> '))
	.reduce((acc, [src, dest]) => {
		const parts = src.split(' ')
		if (parts.length == 1) {
			if (/^\d+$/.test(src)) {
				acc.regs.set(dest, new Uint16Array([~~src]))
			} else {
				if (!acc.regs.has(src)) acc.regs.set(src, null)
				acc.components.push({inputs: [src], type: 'NOP', operator: null, dest})
			}
		} else if (parts.length == 2) {
			if (!acc.regs.has(parts[1])) acc.regs.set(parts[1], null)
			acc.components.push({inputs: [parts[1]], type: parts[0], operator: null, dest})
		} else {
			if (['AND', 'OR'].includes(parts[1])) {
				if (!acc.regs.has(parts[0])) acc.regs.set(parts[0], null)
				if (!acc.regs.has(parts[2])) acc.regs.set(parts[2], null)
				acc.components.push({inputs: [parts[0], parts[2]], type: parts[1], operator: null, dest})
			} else if (['LSHIFT', 'RSHIFT'].includes(parts[1])) {
				if (!acc.regs.has(parts[0])) acc.regs.set(parts[0], null)
				acc.components.push({inputs: [parts[0]], type: parts[1], operator: ~~parts[2], dest})
			}
		}
		return acc
	}, {regs: new Map(), components: []})

const solve = (isPart2, input) => {
	let {regs, components} = parseInput(input)
	while (regs.get('a') == null) {
		const comps = components.filter(c => c.inputs.every(v => regs.get(v) !== null))
		console.log('############################################################################################')
		console.log({comps})
		if (comps.length < 1) break
		for (const {inputs, type, operator, dest} of comps) {
			switch(type) {
				case 'NOP': regs.set(dest, new Uint16Array([regs.get(inputs[0])[0]])); break
				case 'NOT': regs.set(dest, new Uint16Array([~regs.get(inputs[0])[0]])); break
				case 'AND': regs.set(dest, new Uint16Array([regs.get(inputs[0])[0] & regs.get(inputs[1])[0]])); break
				case 'OR': regs.set(dest, new Uint16Array([regs.get(inputs[0])[0] | regs.get(inputs[1])[0]])); break
				case 'LSHIFT': regs.set(dest, new Uint16Array([(regs.get(inputs[0])[0] << operator) % 65536])); break
				case 'RSHIFT': regs.set(dest, new Uint16Array([(regs.get(inputs[0])[0] >> operator) % 65536])); break
			}
		}
	}
	console.log({regs})
	return regs.get('a')[0]
}

const part1 = input => {
    return solve(false, input)
}

const part2 = input => {
    return solve(true, parseInput(input))
}

module.exports = { part1, part2 }
