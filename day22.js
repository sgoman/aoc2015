'use strict'

const worst = 1e10

const parseInput = input => input.replace('\n', '').match(/\d+/g).map(Number)

const solve = (bossHp, bossDmg, hp, mana, shield, poison, recharge, turn, depth, isPart2) => {
    if (poison > 0) bossHp -= 3
    if (bossHp <= 0) return 0
    if (isPart2 && turn) hp--
    hp = Math.min(hp, 50)
    if (depth-- == 0 || hp <= 0) return worst
    if (recharge > 0) mana += 101
    const nextShield = Math.max(0, shield - 1)
    const nextPoison = Math.max(0, poison - 1)
    const nextRecharge = Math.max(0, recharge - 1)

    if (!turn) {
        const armor = shield > 0 ? 7 : 0
        return solve(bossHp, bossDmg, hp - Math.max(1, bossDmg - armor), mana, nextShield, nextPoison, nextRecharge, !turn, depth, isPart2)
    } else {
        if (mana < 53) return worst
        let best = worst
        if (mana >= 53) best = Math.min(best, 53 + solve(bossHp - 4, bossDmg, hp, mana - 53, nextShield, nextPoison, nextRecharge, !turn, depth, isPart2))
        if (mana >= 73) best = Math.min(best, 73 + solve(bossHp - 2, bossDmg, hp + 2, mana - 73, nextShield, nextPoison, nextRecharge, !turn, depth, isPart2))
        if (mana >= 113 && nextShield == 0) best = Math.min(best, 113 + solve(bossHp, bossDmg, hp, mana - 113, 6, nextPoison, nextRecharge, !turn, depth, isPart2))
        if (mana >= 173 && nextPoison == 0) best = Math.min(best, 173 + solve(bossHp, bossDmg, hp, mana - 173, nextShield, 6, nextRecharge, !turn, depth, isPart2))
        if (mana >= 229 && nextRecharge == 0) best = Math.min(best, 229 + solve(bossHp, bossDmg, hp, mana - 229, nextShield, nextPoison, 5, !turn, depth, isPart2))
        return best
    }
}

const part1 = input => {
    const [bossHp, bossDmg] = parseInput(input)
    console.log({bossHp, bossDmg})
    return solve(bossHp, bossDmg, 50, 500, 0, 0, 0, true, 1e2, false)
}

const part2 = input => {
    const [bossHp, bossDmg] = parseInput(input)
    return solve(bossHp, bossDmg, 50, 500, 0, 0, 0, true, 1e2, true)
}

module.exports = { part1, part2 }
