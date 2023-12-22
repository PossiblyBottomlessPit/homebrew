/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*	-INFORMATION-
	Subject:	Subclass
	Effect:		This script adds:
                    "Anarchist", a subclass for Wizard
				This subclass is made by PossiblyBottomlessPit/Fredrik Williamson
	Code by:	Fredrik Williamson, based on code by MorePurpleMoreBetter
	Date:		2023-12-22
*/

AddSubClass("wizard", "anarchy", {
	regExpSearch : /(anarchy|anarchist)/i,
	subname : "School of Anarchy",
	fullname : "Anarchist",
	source : [["P:NS", 4]],
	features : {
		"subclassfeature2" : {
			name : "Anarchy",
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
				"When I cast a spell of 1st level of higher using a spell slot, I can roll my Anarchy die. If the roll is less than or equal to my proficiency bonus, I can target an additional creature within 60ft with the spell",
				"A creature targeted by an area of effect in this way counts as being within the area until the end of your my turn",
			])
		},
		"subclassfeature2.2" : {
			name : "Anarchist's Blessing",
			source : [["P:NS", 4]],
			minlevel : 2,
			description : desc([
				"Proficiency Bonus times per Long Rest, when I roll initiative, I can roll my Anarchy die. If the roll is less than or equal to my proficiency bonus, I can choose which creature is at the top of the initiative order",
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