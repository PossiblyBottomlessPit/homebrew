/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*	-INFORMATION-
	Subject:	Subclass
	Effect:		This script adds:
					"Circle of Fungi" subclass for Druid, which is loosely a Spores rework. It therefore contains some feature names and features that are similar or identical to features published by D&D and WOTC, and I does not claim any rights to those names or feature ideas;
                	"Homeric Soul" subclass for Sorcerer;
					"Homeric Soul" subclass for Bard;
					"Beauty Domain" subclass for Cleric;
					"Opportunist" subclass for Rogue;
					"Anarchist" subclass for Wizard;
					"the Primordial" subclass for Warlock;
					"Path of the Conduit" subclass for Barbarian.
				These subclasses are made by PossiblyBottomlessPit
	Code by:	PossiblyBottomlessPit, based on code by MorePurpleMoreBetter
	Date:		2023-05-09
*/

var iFileName = "New Subclasses.js";
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
				"The effect ends if I or one of my allies physically harm the creature, or after 10 minutes",
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


AddSubClass("wizard", "anarchy", {
	regExpSearch : /(anarchy|anarchist)/i,
	subname : "School of Anarchy",
	fullname : "Anarchist",
	source : [["P:NS", 4]],
	features : {
		"subclassfeature2" : {
			name : "Anarchy Die",
			source : [["P:NS", 4]],
			minlevel : 2,
			description : desc([
				"I use my Anarchy die in some of my features. This is a d12",
				"This die scales to a d10 at 6th level, a d8 at 10th level, and a d6 at 14th level"
			]),
			additional : levels.map( function( n) {
				return n < 2 ? "" : "d" + (n < 6 ? "12" : n < 10 ? "10" : n < 14 ? "8" : "6")
			})
		},
		"subclassfeature2.1" : {
			name : "Scatter Spells",
			source : [["P:NS", 4]],
			minlevel : 2,
			description : desc([
				"When I cast a spell of 1st level of higher using a spell slot, I can roll my Anarchy die. If the roll is less than my Intelligence modifier, I can target an additional creature within 60ft with the spell",
				"A creature targeted by an area of effect in this way counts as being within the area until the end of their next turn",
			])
		},
		"subclassfeature2.2" : {
			name : "Anarchist's Blessing",
			source : [["P:NS", 4]],
			minlevel : 2,
			description : desc([
				"Proficiency Bonus times per Long Rest, when I roll initiative, I can roll my Anarchy die. If the roll is less than my proficiency bonus, I can choose which creature is at the top of the initiative order",
			]), 
			usages : "Proficiency Bonus per",
			usagescalc : "event.value = How('Proficiency Bonus');", 
			recovery : "long rest"
		},
		"subclassfeature6" : {
			name : "Common Glory",
			source : [["P:NS", 4]],
			minlevel : 6,
			description : "\n   " + "As a bonus action, I can urge an ally who can hear or see me to rise up. They can then use their reaction to cast a spell, use a healing kit, or feed someone a potion, as long as it only affects my allies",
			action : ["bonus action", ""]
		},
		"subclassfeature10" : {
			name : "Targeted Spread",
			source : [["P:NS", 4]],
			minlevel : 10,
			description : desc([
				"Instead of targeting an additional creature with Scatter Spells when using a damaging spell, I can instead double the damage done to one target of the spell"
			])
		},
		"subclassfeature14" : {
			name : "Chaotic Unity",
			source : [["P", 116]],
			minlevel : 14,
			description : desc([
				"At the end of each long rest, I can choose a number of allies up to or equal to my Intelligence Modifier",
				"While within 30ft of another one of these creatures, each cannot suffer from disadvantage on any rolls, and gains a +1 to armour class and all saves",
				"Disadvantage may still cancel out advantage, even if a creature cannot suffer from disadvantage"
			]),
			addMod : [{ type : "save", field : "All", mod : 1, text : "+1 to all saves while within 30ft of an ally from Chaotic Unity"}],
			extraAC : {
				mod : 1,
				text : "I gain a +1 to AC while within 30ft of a creature bonded with Chaotic Unity"
			}
		}
	}
});


AddSubClass("barbarian", "conduit", {
	regExpSearch : /(conduit)/i,
	subname : "Path of the Conduit",
	fullname : "Conduit",
	source : [["P:NS", 6]],
	abilitySave : 3,
	spellcastingFactor : 3,
	spellcastingKnown : {
		cantrips : [0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3],
		spells : [0, 0, 3, 4, 4, 4, 5, 6, 6, 7, 8, 8, 9, 10, 10, 11, 11, 11, 12, 13]
	},
	features : {
		"subclassfeature3" : {
			name : "Spellcasting",
			source : [["P:NS", 6]],
			minlevel : 3,
			description : desc([
				"I can cast known cantrips/spells from either the warlock, cleric, or druid spell lists, using Constitution as my spellcasting ability",
				"I can choose to cast a spell without using a spell slot by taking 1d6 force damage per level of the spell and reducing my maximum HP by the same amount",
				"I cannot cast spells that heal me or increase my maximum HP in this way",
				"At this level I also learn the Sword Burst cantrip"
			]),
			additional : ["", "", "3 cantrips \u0026 3 spells known", "3 cantrips \u0026 4 spells known", "3 cantrips \u0026 4 spells known", "3 cantrips \u0026 4 spells known", "3 cantrips \u0026 5 spells known", "3 cantrips \u0026 6 spells known", "3 cantrips \u0026 6 spells known", "4 cantrips \u0026 7 spells known", "4 cantrips \u0026 8 spells known", "4 cantrips \u0026 8 spells known", "4 cantrips \u0026 9 spells known", "4 cantrips \u0026 10 spells known", "4 cantrips \u0026 10 spells known", "4 cantrips \u0026 11 spells known", "4 cantrips \u0026 11 spells known", "4 cantrips \u0026 11 spells known", "4 cantrips \u0026 12 spells known", "4 cantrips \u0026 13 spells known"],
			choices : ["Cleric", "Druid", "Warlock"],
			"cleric" : {
				name : "Cleric Spell List",
				source : ["P:NS", 6],
				description : desc([
					"I can learn spells from the cleric spell list"
				]),
				spellcastingList : {
					"class" : "cleric",
					level : [0, 4]
				}
			},
			"druid" : {
				name : "Druid Spell List",
				source : ["P:NS", 6],
				description : desc([
					"I can learn spells from the druid spell list"
				]),
				spellcastingList : {
					"class" : "druid",
					level : [0, 4]
				}
			},
			"warlock" : {
				name : "Warlock Spell List",
				source : ["P:NS", 6],
				description : desc([
					"I can learn spells from the warlock spell list"
				]),
				spellcastingList : {
					"class" : "warlock",
					level : [0, 4]
				}
			}
		},
		"subclassfeature6" : {
			name : "Empowered Strike",
			source : [["P:NS", 6]],
			minlevel : 6,
			description : desc([
			"When I hit with a weapon attack, I can cast a spell that has a casting time of one action, bonus action, or reaction, that targets only the one creature hit. The spell automatically succeeds.",
			"When I do this, I take force damage equal to the spell's level (minimum of 1)"
			]),
		},
		"subclassfeature10.1" : {
			name : "Apparitional Lure",
			source : [["P:NS", 6]],
			minlevel : 10,
			description : desc([
				"Once a turn while raging, if I hit a creature with an attack I can prevent them from using their movement to move away from me, and give them disadvantage on attack rolls against other creatures until the start of my next turn",
				"This effect ends if my rage ends early",
				"I am also resistant to force damage and radiant damage while raging. I can change this every long rest"
			]),
			dmgres : [["Force", "Force (rage)"]],
			eval : function() {
				processResistance(false, 'Barbarian: Rage', ClassList.barbarian.features.rage.dmgres);
			},
			removeeval : function() {
				processResistance(true, 'Barbarian: Rage', ClassList.barbarian.features.rage.dmgres);
			}
		},
		"subclassfeature17" : {
			name : "Spell Thief",
			source : [["P", 98]],
			minlevel : 17,
			description : "\n   " + "As a reaction, after a spell is cast at me, I can try to negate and steal it" + "\n   " + "The caster makes a save against my spell DC with his/her spellcasting ability" + "\n   " + "On failure, the caster forgets how to cast that spell for eight hours" + "\n   " + "If I have a spell slot of a high enough level for it, I learn how to cast it during this time",
			action : ["reaction", ""],
			recovery : "long rest",
			usages : 1
		}
	}

});

