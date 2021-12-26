let modInfo = {
	name: "The Cookie Tree",
	id: "apeirotopiccookietree",
	author: "Apeirotopic",
	pointsName: "cookies",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (10), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.1.0",
	name: "The Cash Money-en-ing",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.1.0 The Cash Money-en-ing</h3><br>
		- Fulfilled the sales layer's destiny<br>
		- Began conceptualizing future layers<br>
		<br>
	<h3>v0.0.1</h3><br>
		- Added the sales layer<br>
		<br>
	<h3>v0.0.0 Existion's Present</h3><br>
		- Yep, I'm pretty certain the game exists now`

let winText = `Congratulations! You've made it through a whole 8 upgrades! There will be more soon, but not now.`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return hasUpgrade("s", 11);
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)
	if(hasUpgrade("s", 22)) {
		gain = gain.plus( tmp["s"].upgrades["22"].effect );
	}
	if(hasUpgrade("s", 12)) {
		gain = gain.times( tmp["s"].upgrades["12"].effect );
	}
	if(hasUpgrade("s", 13)) {
		gain = gain.times( tmp["s"].upgrades["13"].effect );
	}
	if(hasUpgrade("s", 14)) {
		gain = gain.times( tmp["s"].upgrades["14"].effect );
	}
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return hasUpgrade("s", 24)
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}
