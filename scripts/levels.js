const levels = [{
    0: [melee(0.1)],
    [60 * 6]: [melee(0.1), melee(0.1), melee(0.1), melee(0.1)],
    [60 * 12]: [melee(0.1), ranged(0.3), ranged(0.3)],
    [60 * 18]: [melee(0.5), ranged(0.1), ranged(0.1)]
}, {
    0: [melee(0.3), melee(0.3)],
    [60 * 6]: [ranged(0.2), ranged(0.2), ranged(0.2)],
    [60 * 24]: [ranged(0.2), ranged(0.2), meleeHeavy(0.2), melee(0.3)],
    [60 * 36]: [meleeRanged(0.2), meleeRanged(0.2), ranged(0.1)],
}, {
    0: [meleeRanged(0.2), meleeRanged(0.2), meleeRanged(0.2), meleeRanged(0.2)],
    [60 * 6]: [ranged(0.2), ranged(0.2), ranged(0.2), ranged(0.2), ranged(0.2), ranged(0.2)],
    [60 * 12]: [melee(0.2), melee(0.2), melee(0.2), melee(0.2), melee(0.2), meleeRanged(0.4)],
    [60 * 30]: [melee(0.1), melee(0.1), melee(0.1), melee(0.1), melee(0.1)],
    [60 * 42]: [meleeRanged(0.6)]
}, {
    0: [ranged(0.2), ranged(0.2), ranged(0.2), ranged(0.2), ranged(0.2), ranged(0.2)],
    [60 * 6]: [melee(0.2), melee(0.2), melee(0.2), melee(0.2), melee(0.2)],
    [60 * 12]: [meleeRanged(0.2), meleeRanged(0.2), meleeRanged(0.2), meleeRanged(0.2), meleeRanged(0.2)],
    [60 * 18]: [meleeHeavy(0.2), meleeHeavy(0.2), meleeHeavy(0.2), meleeHeavy(0.2), meleeHeavy(0.2)],
    [60 * 36]: [rangedMelee(0.4), rangedMelee(0.4), melee(0.4), melee(0.4), melee(0.4), melee(0.4)]
}, {
    0: [meleeHeavy(1), meleeRanged(1), rangedMelee(1)],
    [60 * 6]: [melee(0.2), melee(0.2), melee(0.2), melee(0.2), melee(0.2)],
    [60 * 12]: [melee(0.2), melee(0.2), melee(0.2), melee(0.2), melee(0.2)],
    [60 * 18]: [melee(0.2), melee(0.2), melee(0.2), melee(0.2), melee(0.2)],
    [60 * 24]: [melee(0.2), melee(0.2), melee(0.2), melee(0.2), melee(0.2)]
}, {
    0: [meleeRanged(0.4), meleeRanged(0.4), meleeRanged(0.4)],
    [60 * 6]: [rangedMelee(0.4), rangedMelee(0.4)],
    [60 * 12]: [melee(0.4), melee(0.4), melee(0.4), melee(0.4), melee(0.4)],
    [60 * 18]: [rangedRapid(0.4), rangedRapid(0.4)],
}, {
    0: [ranged(1), ranged(1), ranged(1), ranged(1), ranged(1), ranged(1)],
    [60 * 12]: [melee(1), melee(1), melee(1), melee(1)],
    [60 * 18]: [meleeHeavy(0.5), meleeHeavy(0.5), meleeRanged(0.5), meleeRanged(0.5), rangedRapid(0.5)],
    [60 * 30]: [meleeRanged(0.4), meleeRanged(0.4), meleeRanged(0.4), melee(1), melee(1), melee(1)],
    [60 * 36]: [rangedRapid(0.5), rangedRapid(0.5)]
}, {
    0: [ranged(1), ranged(1), rangedMelee(0.5), rangedMelee(0.5)],
    [60 * 6]: [melee(1), melee(1), meleeRanged(1), meleeRanged(1)],
    [60 * 18]: [rangedRapid(0.5), rangedRapid(0.3)],
    [60 * 30]: [meleeHarpoon(0.3), ranged(0.5), rangedMelee(0.5)],
    [60 * 36]: [rangedRapid(0.5)],
    [60 * 40]: [meleeHarpoon(0.6)]
}, {
    0: [melee(0.75), melee(0.75), melee(0.75), melee(0.75)],
    [60 * 6]: [ranged(0.75), ranged(0.75), ranged(0.75), ranged(0.75)],
    [60 * 12]: [meleeRanged(0.5), meleeRanged(0.5)],
    [60 * 24]: [rangedMelee(0.5), rangedMelee(0.5), rangedRapid(0.5)],
    [60 * 36]: [meleeHarpoon(1)]
}, {
    0: [boss(0.7)]
}, {
    endless: true
}]