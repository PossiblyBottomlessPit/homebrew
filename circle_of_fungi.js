/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*	-INFORMATION-
	Subject:	Subclass
	Effect:		This script adds:
					"Circle of Fungi" subclass for Druid, which is loosely a Spores rework. It therefore contains some feature names and features that are similar or identical to features published by D&D and WOTC/Hasbro, and Fredrik Williamson does not claim any rights to those names or feature ideas;
				These subclasses are made by PossiblyBottomlessPit/inky/Fredrik Williamson
	Code by:	Fredrik Williamson, based on code by MorePurpleMoreBetter
	Date:		2023-05-09
*/

var iFileName = "Circle of Fungi.js";
RequiredSheetVersion(12.999);

SourceList["P:NS"] = {
	name : "PossiblyBottomlessPit - New Subclasses",
	abbreviation : "P:NS",
	date : "2023-05-09"
};

AddSubClass("druid", "circle of fungi", {
	regExpSearch : /^(?=.*(druid|shaman))(?=.*fungi).*$/i,
	subname : "Circle of Fungi",
	source : ["P:NS",0],
	features : {
		"subclassfeature2" : {
			name : "Circle Spells",
			source : ["P:NS",0],
			minlevel : 2,
			description : desc([
				"I learn an improved Spare the Dying cantrip with range 15ft and gain the ability to cast certain spells",
				"These are always prepared, but don't count against the number of spells I can prepare"
			]),
			spellcastingBonus : {
				name : "Circle Spells",
				spells : ["spare the dying"],
				selection : ["spare the dying"]
			},
			spellChanges : {
				"spare the dying" : {
					time : "1 a",
					description : "A living creature that has 0 hit points that you can see within range gains 1 hit point. This spell has no effect on undead or constructs.",
					range : "15 ft"
				}
			},
			spellcastingExtra : ["aid", "gentle repose", "animate dead", "revivify", "death ward", "freedom of movement", "cloudkill", "reincarnate"]
		},
		"subclassfeature2.1" : {
			name : "Culture of Spores",
			source : ["P:NS",0],
			minlevel : 2,
 			description : desc([
				"I am surrounded by a 10ft sphere of my Culture of Spores",
				"All creatures of my choice within my Spores have their speed reduced by 5ft.",
				"Once on each of my turns, I can choose one creature within my Culture of Spores, and deal necrotic damage to it"
			]),
			additional : levels.map(function (n) { return n < 2 ? "" : '1d' + (n < 6 ? 4 : n < 10 ? 6 : n < 14 ? 8 : n < 17 ? 10 : 12) + " necrotic damage"; }),
			action : ["bonus action", "Spores: Free Action"]
		},
		"subclassfeature2.2" : {
			name : "Symbiote",
			source : ["P:NS", 0],
			minlevel : 2,
			description : desc([
				"As an action, I can expend a Wild Shape use to boost my spores instead of transforming",
				"I gain 4 temporary hit points per druid level, I can deal my Culture of Spores damage twice each turn, and the speed decrease doubles",
				"This lasts for 10 min, until these temporary HP run out, or until I use Wild Shape again",			]),
			additional : levels.map(function (n) {
				return n < 2 ? "" : Math.floor(n*4) + " temp HP; Halo of Spores: 2d" + (n < 6 ? 4 : n < 10 ? 6 : n < 14 ? 8 : n < 17 ? 10 : 12);
			}),
			action : ["action", ""]
		},
		"subclassfeature6" : {
			name : "Saprotroph",
			source : ["P:NS",0],
			minlevel : 6,
			description : desc([
	    		"Each time a hostile creature dies in my Culture of Spores, I can increase my Culture of Spores damage by +1 until my next rest, and I can regain one expended first level spell slot.",
				"If I do this, that creature cannot be brought to life for a day."
			]),
		},
		"subclassfeature10" : {
			name : "Enriching Spores",
			source : ["P:NS",0],
			minlevel : 10,
			description : desc([
				"My Culture of Spores radius is now 15ft.",
				"Once per turn, when an ally in my Symbiote-boosted Culture of Spores forces a saving thow or makes an attack roll, I can increase that DC by 1 or attack roll by 2.",
				"If that ally successfully caused damage to a creature also within my culture of spores, I can inflict the poisoned condition on that creature until the end of my next turn, if they fail a Consitution saving through against my Spell Save DC."
			]),
		},
		"subclassfeature14" : {
			name : "Fungal Body",
			source : ["P:NS",0],
			minlevel : 14,
			description : desc([
				"I'm immune to the blinded, deafened, paralyzed, and poisoned conditions, and critical hits unless incapacitated"
			]),
			savetxt : { immune : ["blinded", "deafened", "paralyzed", "poisoned", "critical hits (unless incapacitated)"] }
		}
	}
});
