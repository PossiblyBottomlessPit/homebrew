/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*	-INFORMATION-
	Subject:	Subclass
	Effect:		This script adds:
                    "Opportunist", a subclass for Rogue
				This subclass is made by PossiblyBottomlessPit/inky/Fredrik Williamson
	Code by:	Fredrik Williamson, based on code by MorePurpleMoreBetter
	Date:		2023-11-21
*/

SourceList["P:NS"] = {
	name : "PossiblyBottomlessPit - New Subclasses",
	abbreviation : "P:NS",
	date : "2023-05-09"
};

AddSubClass("rogue", "opportunist", {
	regExpSearch : /opportunist/i,
	subname : "Opportunist",
	source : [["P:NS", 3]],
	features : {
		"subclassfeature3" : {
			name : "Wait For It",
			source : [["P:NS", 3]],
			minlevel : 3,
			description : desc([
				"As a bonus action, I can ready an action",
				"I can do one readied action each round without using a reaction"
			]),
			action : [["bonus action", ""]]
		},
		"subclassfeature3.1" : {
			name : "Escapist",
			source : [["P:NS", 3]],
			minlevel : 3,
			description : "\n   " + "I gain advantage on initiative rolls, and on checks to escape from anything keeping me trapped, confined, or restrained",
			advantages : [["initiative", true]],
			savetxt : {
				adv_vs : ["being confined, trapped, or restrained"]
			},
		},
		"subclassfeature9" : {
			name : "Quick Reflexes",
			source : [["P:NS", 3]],
			minlevel : 9,
			description : "\n   " + "I can take 2 reaction each round, which scales to 3 at 13th level in this class and 4 at 17th level",
			additional : levels.map(function (n) {
				return n < 9 ? 1 : (n < 13 ? 2 : n < 17 ? 3 : 4) + " reactions";
			}),
		},
		"subclassfeature13" : {
			name : "Opportunist",
			source : [["P:NS", 3]],
			minlevel : 13,
			description : desc([
				"My opportunity attacks can always add my sneak attack damage, as long as I do not have disadvantage on the attack"
			])
		},
		"subclassfeature17" : {
			name : "Exploit Weakness",
			source : [["P:NS", 3]],
			minlevel : 17,
			description : desc([
				"When a creature that I can see within my range fails an attack roll or saving throw, I can make an opportunity attack against them as a reaction"
			]),
			action : ["reaction", " as an opportunity attack"]
		}
	}
});
