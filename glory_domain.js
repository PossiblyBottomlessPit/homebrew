/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*	-INFORMATION-
	Subject:	Subclass
	Effect:		This script adds:
					"Glory Domain" subclass for Cleric.
				These subclasses are made by PossiblyBottomlessPit
	Code by:	PossiblyBottomlessPit, based on code by MorePurpleMoreBetter
	Date:		2023-05-09
*/

var iFileName = "Circle of Fungi.js";
RequiredSheetVersion(12.999);

SourceList["P:NS"] = {
	name : "PossiblyBottomlessPit - New Subclasses",
	abbreviation : "P:NS",
	date : "2023-05-09"
};

AddSubClass("cleric", "glory domain", {
	regExpSearch : /^(?=.*(cleric|priest|clergy|acolyte))(?=.*(glory|homer|poet)).*$/i,
	subname : "Glory Domain",
	source : [["P:NS", 4]],
	spellcastingExtra : ["absorb elements", "thunderous smite", "enlarge/reduce", "find steed", "haste", "fear", "find greater steed", "staggering smite", "circle of power", "wall of light"],
	spellcastingList : {
        "class" : ["cleric", "bard"]
    },
    features : {
		"subclassfeature1" : {
			name : "Bonus Proficiency",
			source : [["P", 62]],
			minlevel : 1,
			description : "\n   " + "I gain proficiency with martial weapons, and can use a weapon as my spellcasting focus for my Cleric spells",
            weaponProfs : [true, true]
        },
		"subclassfeature1.1" : {
			name : "Homeric Spirit",
			source : [["P:NS", 4]],
			minlevel : 1,
			description : desc([
				"When I prepare spells or learn cantrips, I can also pick from the bard spell list",
                "These bard spells count as cleric spells for me",
                "Additionally, I can choose a destiny, which grants me a bonus spell.",
			]),
            choices : ["Leader", "Protector", "Victor"],
			"leader" : {
				name : "Leader Destiny",
				source : ["P:NS", 4],
				description : desc([
					"I prepare the gift of alacrity spell, but it doesn't count against my number of cleric spells prepared",
					"I gain its benefits at the end of a rest, and its duration lasts until my next rest if I gain its benefits in this way"
				]),
				spellcastingBonus : {
					name : "Leader Destiny Spell",
					spells : ["gift of alacrity"],
					selection : ["gift of alacrity"]
				}
			},
			"protector" : {
				name : "Protector Destiny",
				source : ["P:NS", 1],
				description : desc([
					"I prepare the armor of agathys spell, but it doesn't count against my number of cleric spells prepared",
					"I gain its benefits at the end of a rest, and its duration lasts until my next rest if I gain its benefits in this way"
				]),
				spellcastingBonus : {
					name : "Protector Destiny Spell",
					spells : ["armor of agathys"],
					selection : ["armor of agathys"]
				}
			},
			"victor" : {
				name : "Victor Destiny",
				source : ["P:NS", 1],
				description : desc([
					"I prepare the divine favor spell, but it doesn't count against my number of cleric spells prepared",
					"I gain its benefits at the end of a rest, and its duration lasts until my next rest if I gain its benefits in this way"
				]),
				spellcastingBonus : {
					name : "Victor Destiny Spell",
					spells : ["divine favor"],
					selection : ["divine favor"]
				}
			}
		},
		"subclassfeature2" : {
			name : "Channel Divinity: Poet's Encouragement",
			source : [["P:NS", 4]],
			minlevel : 2,
			description : desc([
				"Using my reaction, an ally that can hear or see me within 15ft can reroll any ability check or attack roll, choose the higher result, and add my Wisdom modifier",
				"This reaction can be taken after seeing the roll, but before any of the effects take place"
			]),
            action : ["reaction", ""]
		},
		"subclassfeature6" : {
			name : "Shared Destiny",
			source : [["P:NS", 4]],
			minlevel : 6,
			description : desc([
                "At the end of each rest, I can extend the benefits of my destiny spell to a number of allies equal to my Wisdom modifier (minimum of 1), as long as they remain within 30ft of me",
                "Additionally, each Destiny spell has a greater effect. Leader's Gift of Alacrity also adds my Proficiency bonus to initiative; Protector's Armor of Agathys is upcast to the highest level of spell slots I have available, up to 5th level; Victor's Divine Favor adds an additional 1d4"
            ]),
            additional : Math.max(1, What('Wis Mod')) + " additional creatures affected"
		},
		"subclassfeature8" : {
			name : "Divine Strike",
			source : [["P:NS", 4]],
			minlevel : 8,
			description : "\n  Once per turn, when I hit a creature with a weapon attack, I can do extra damage",
			additional : levels.map(function (n) {
				if (n < 8) return "";
				return "+" + (n < 14 ? 1 : 2) + "d8 radiant damage";
			}),
			calcChanges : {
				atkAdd : [
					function (fields, v) {
						if (classes.known.cleric && classes.known.cleric.level > 7 && !v.isSpell) {
							fields.Description += (fields.Description ? '; ' : '') + 'Once per turn +' + (classes.known.cleric.level < 14 ? 1 : 2) + 'd8 radiant damage';
						}
					},
					"Once per turn, I can have one of my weapon attacks that hit do extra radiant damage."
				]
			}
		},
		"subclassfeature17" : {
			name : "Divine Fate",
			source : [["P:NS", 4]],
			minlevel : 17,
			description : desc([
                "I have divine control over fate. Once on my turn between each long rest, I can change my Destiny. I immediately gain the benefits of my new Destiny, and lose the benefits of my previous Destiny.",
                "Additionally, my Poet's Encouragement Channel Divinity now works with saving throws as well as ability checks and attack rolls"
			]),
		}
	}
});