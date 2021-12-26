
addLayer("s", {
    name: "Cash", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "$", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
		best: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "dollars", // Name of prestige currency
    baseResource: "cookies", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
		if(hasUpgrade("s", 21)) mult = mult.times(tmp.s.upgrades[21].effect)
		if(hasUpgrade("s", 23)) mult = mult.times(tmp.s.upgrades[23].effect)
		if(hasUpgrade("s", 24)) mult = mult.times(tmp.s.upgrades[24].effect)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "s", description: "S: Reset for money", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
	upgrades: {
		rows: 2,
		columns: 4,
		11: {
			title: "Buy an oven",
			description: "Let the baking commence.",
			effectDisplay() { return "+1.00 base" },
			cost() { return 1 },
		},
		12: {
			title: "Overcharge",
			description: "Increase the voltage on your oven(s) based on your money. This is a good idea.",
			effect() { return player.s.points.plus(1).pow(1/2) },
			effectDisplay() { return format(tmp.s.upgrades[12].effect)+"x" },
			cost() { return 2 },
			unlocked() {return hasUpgrade("s", 11) },
		},
		13: {
			title: "Amped",
			description: "Increase the amperage on your oven(s), also based on your money.",
			effect() { return player.s.points.plus(1).log(10).plus(1) },
			effectDisplay() { return format(tmp.s.upgrades[13].effect)+"x" },
			cost() { return 5 },
			unlocked() {return hasUpgrade("s", 12) },
		},
		14: {
			title: "Hyped",
			description: "Get hyped, based on the quantity of cookies in your vicinity.",
			effect() { return player.points.plus(1).log(19).plus(1) },
			effectDisplay() { return format(tmp.s.upgrades[14].effect)+"x" },
			cost() { return 10 },
			unlocked() {return hasUpgrade("s", 13) },
		},
		21: {
			title: "Marketing",
			description: "The more money you have, the more you can advertise, the more money you make!",
			effect() { return player.s.points.plus(1).log(4).plus(1) },
			effectDisplay() { return format(tmp.s.upgrades[21].effect)+"x cash" },
			cost() { return 100 },
			unlocked() {return hasUpgrade("s", 14) },
		},
		22: {
			title: "More ovens!",
			description: "Don't ask about the ever increasing oven prices, it's an incremental thing.",
			effect() { return player.s.best.plus(1).log(1.15).floor() },
			effectDisplay() { return "+" + format(tmp.s.upgrades[22].effect) + " base" },
			cost() { return 2500 },
			unlocked() {return hasUpgrade("s", 21) },
		},
		23: {
			title: "Professionalism",
			description: "Don't type your posters in comic sans.",
			effect() { return 2 },
			effectDisplay() { return format(tmp.s.upgrades[23].effect) + "x cash" },
			cost() { return 75000 },
			unlocked() {return hasUpgrade("s", 22) },
		},
		24: {
			title: "Become Boring",
			description: "Times New Roman, 12 pt font, double spaced. Yuck.",
			effect() { return 3 },
			effectDisplay() { return format(tmp.s.upgrades[24].effect) + "x cash" },
			cost() { return 2e5 },
			unlocked() {return hasUpgrade("s", 23) },
		},
	},
    layerShown(){return true}
})


addLayer("sh", {
	row: 1,
    name: "Shares", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "%", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
	branches: ["s"],
    color: "#999999",
    requires: new Decimal(1e6), // Can be a function that takes requirement increases into account
    resource: "shares", // Name of prestige currency
    baseResource: "money", // Name of resource prestige is based on
    baseAmount() {return player.s.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
	base: 5,
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "S", description: "", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
	upgrades: {
	},
    layerShown(){return hasUpgrade("s", 24) && false }
})
