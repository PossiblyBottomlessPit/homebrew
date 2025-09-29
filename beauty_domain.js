/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*	-INFORMATION-
	Subject:	Subclass
	Effect:		This script adds:
                    "Beauty Domain", a subclass for Cleric
				This subclass is made by PossiblyBottomlessPit
	Code by:	PossiblyBottomlessPit, based on code by MorePurpleMoreBetter
	Date:		2025-09-29
*/

var iFileName = "beauty_domain.js";
RequiredSheetVersion(12.999);

SourceList["P:NS"] = {
	name : "PossiblyBottomlessPit - New Subclasses",
	abbreviation : "P:NS",
	date : "2023-05-09"
};

AddSubClass("cleric", "beauty domain", {
	regExpSearch : /^(?=.*(cleric|priest|clergy|acolyte))(?=.*(beauty|art|enchantment)).*$/i,
	subname : "Beauty Domain",
	source : [["P:NS", 2]],
	spellcastingExtra : ["disguise self", "sleep", "enthrall", "gift of gab", "catnap", "hypnotic pattern", "aura of purity", "shadow of moil", "dominate person", "dream"],
	features : {
		"subclassfeature1" : {
			name : "Bonus Proficiency",
			source : [["P:NS", 2]],
			minlevel : 1,
			description : "\n   " + "I gain proficiency with either painter's tools or a disguise kit, and heavy armor",
			armorProfs : [false, false, true, false],
			toolProfs : ["Painter's Tools OR Disguise Kit"]
		},
		"subclassfeature1.1" : {
			name : "Eye of the Beholder",
			source : [["P:NS", 2]],
			minlevel : 1,
			action : ["action", ""],
			usages : "Wisdom Modifier",
			usagescalc : "event.value = Math.max(1, What('Wis Mod'));",
			recovery : "long rest",
			description : desc([
				"As an action, I can appear as a creature's ideal of beauty or revulsion, and if that creature can see me, they must succeed a Wisdom saving throw or be charmed (ideal of beauty) or frightened (ideal of revulsion) by me",
				"A creature charmed in this way will follow as best as they can my instructions, unless it puts them in apparent physical harm",
				"A creature frightened in this way must use all its movement each turn to run away from me, unless it puts them in apparent physical harm",
				"The effect ends if I or one of my allies physically harm the creature, or after 1 minute",
				"I can do this a number of times per long rest equal to my Wisdom modifier, and regain one use at the end of a short rest"
			])
		},
		"subclassfeature2" : {
			name : "Channel Divinity: Distracting Beauty",
			source : [["P:NS", 2]],
			minlevel : 2,
			description : desc([
				"As an action, I can grant a number of creatures equal to my Wisdom Modifier advantage on all Charisma and Wisdom checks involving interpersonal interaction, and disadvantage on any checks of these types made against them for 1 minute"
			])
		},
		"subclassfeature6" : {
			name : "Disarming Charm",
			source : [["P:NS", 2]],
			minlevel : 6,
			description : "\n   " + "I am immune to the charmed condition, and can use my reaction when a creature makes an attack roll within 60ft of me to force that roll to be rerolled with disadvantage. I can make this decision after the number has been rolled. As normal, advantage & disadvantage cancel out",
			action : ["reaction", ""]
		},
		"subclassfeature8" : {
			name : "Potent Spellcasting",
			source : [["P:NS", 2]],
			minlevel : 8,
			description : "\n   " + "I add my Wisdom modifier to the damage I deal with my cleric cantrips",
			calcChanges : {
				atkCalc : [
					function (fields, v, output) {
						if (classes.known.cleric && classes.known.cleric.level > 7 && v.thisWeapon[3] && v.thisWeapon[4].indexOf('cleric') !== -1 && SpellsList[v.thisWeapon[3]].level === 0) {
							output.extraDmg += What('Wis Mod');
						};
					},
					"My cleric cantrips get my Wisdom modifier added to their damage."
				],
				spellAdd : [
					function (spellKey, spellObj, spName) {
						if (spName.indexOf("cleric") == -1 || !What("Wis Mod") || Number(What("Wis Mod")) <= 0 || spellObj.psionic || spellObj.level !== 0) return;
						return genericSpellDmgEdit(spellKey, spellObj, "\\w+\\.?", "Wis");
					},
					"My cleric cantrips get my Wisdom modifier added to their damage."
				]
			}
		},
		"subclassfeature17" : {
			name : "Compelling Beauty",
			source : [["P:NS", 2]],
			minlevel : 17,
			description : desc([
				"When I use my Eye of the Beholder feature, an affected creature isn't stopped by even obvious danger"
			]),
		}
	}
});
