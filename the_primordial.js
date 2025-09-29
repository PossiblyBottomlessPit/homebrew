/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*	-INFORMATION-
	Subject:	Subclass
	Effect:		This script adds:
                    "The Primordial", a subclass for Warlock
				This subclass is made by PossiblyBottomlessPit
	Code by:	PossiblyBottomlessPit, based on code by MorePurpleMoreBetter
	Date:		2025-09-29
*/

var iFileName = "the_primordial.js";
RequiredSheetVersion(12.999);

SourceList["P:NS"] = {
	name : "PossiblyBottomlessPit - New Subclasses",
	abbreviation : "P:NS",
	date : "2023-05-09"
};



AddSubClass("warlock", "the Primordial", {
	regExpSearch : /^(?=.*warlock)(?=.*primordial).*$/i,
	subname : "the Primordial",
	source : [["P:NS", 5]],
	spellcastingExtra : ["absorb elements", "entangle", "spike growth", "pass without trace", "plant growth", "call lightning", "polymorph", "freedom of movement", "awaken", "transmute rock"],
	features : {
		"subclassfeature1" : {
			name : "Awakened Earth",
			source : [["P:NS", 5]],
			minlevel : 1,
			description : desc([
				"As an action, I can choose 6 5ft cubves, and fill them with any combination of earth, vines, or flowers. If an affected cube is not at ground level it must be connected to ground by another cube or solid structure",
				"I can only fill an occupied cube with earth if there is sufficient room directly above it, in which case the creature is forced upwards. I must either fill all of a huge or larger creature's space with earth, or none of it",
				"Earth provides total cover, vines provide half cover and are difficult terrain, and flowers heal any creature of my choice who enters them for a d8 + my warlock level, once per creature per round",
				"Each of these cubes can be cleared by hand, taking 1 minute for an earthen cube, half as much for vines, and 12 seconds (or two subsequent actions) for flowers"
			]),
			action : [["action", ""]],
			usages : "Proficiency bonus per ",
			usagescalc : "event.value = How('Proficiency Bonus');",
			recovery : "long rest",
			additional : levels.map(function (n) {
				return "1d8 + " + n;
			}),
		},
		"subclassfeature1.1" : {
			name : "Primal Drive",
			source : [["P:NS", 5]],
			minlevel : 1,
			description : "\n   My walking speed increases by 10ft and I am not affected by difficult terrain while walking on the ground or a floor",
			speed : { allModes : "+10" }
		},
		"subclassfeature6" : {
			name : "Grasp of the Earth",
			source : [["P:NS", 5]],
			minlevel : 6,
			description : desc([
				"I cannot be moved against my will if I am on the ground or floor. Creatures have disadvantage on any saving throws to resist being moved by me or one of my spells or magical effects",
				"I know the thorn whip cantrip (or learn a warlock cantrip of my choice if I already know it) which does not count against my number of cantrips known"
			]),
			spellcastingBonus : [{
				name : "Grasp of the Earth",
				spells : ["thorn whip"],
				selection : ["thorn whip"],
				firstCol : "atwill",
			}],
		},
		"subclassfeature10" : {
			name : "Primal Spirit",
			source : [["P:NS", 5]],
			minlevel : 10,
			description : desc([
				"For 1 minute, proficiency bonus times per long rest, I can become either a mighty tree or a reaching vine as a bonus action",
				"Tree: size becomes huge; I gain temp HP equal to my warlock level; I can make any area within 5ft of me difficult terrain that moves with me; my unarmed strikes have reach of 10ft, deal 3d8 magical bludgeoning damage and can push 10ft on a hit; I have advantage on perception checks and have tremorsense 120ft.",
				"Vine: size becomes tiny with +5ft reach; I can grapple any creature that enters my reach and add my charisma modifier to the DC, without needing a free hand; I gain a climbing speed equal to my walking speed."
			]),
			action : [["bonus action", ""]],
			usages : "Proficiency bonus per ",
			usagescalc : "event.value = How('Proficiency Bonus');",
			recovery : "long rest",
		},
		"subclassfeature14" : {
			name : "Power of Nature",
			source : [["P:NS", 5]],
			minlevel : 14,
			description : desc([
				"Whenever a creature within 60ft of me enters or begins their turn in difficult terrain or another effect which reduces their speed, I can cast eldritch blast as a reaction, which must target them with at least 1 beam",
				"If two beams hit the creature, they become restrained"
			]),
			action : [["reaction", ""]]
		}
	}
});
