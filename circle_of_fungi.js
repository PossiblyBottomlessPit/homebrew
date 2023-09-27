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
				"I learn the Spare the Dying cantrip with range 30ft and gain the ability to cast certain spells",
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
					description : "You touch a living creature that has 0 hit points. The creature gains 1 hit point. This spell has no effect on undead or constructs.",
					range : "30 ft"
				}
			},
			spellcastingExtra : ["aid", "gentle repose", "animate dead", "revivify", "death ward", "freedom of movement", "cloudkill", "reincarnate"]
		},
		"subclassfeature2.1" : {
			name : "Culture of Spores",
			source : ["P:NS",0],
			minlevel : 2,
 			description : desc([
				"As a reaction when someone I can see in 10 ft starts its turn or moves, I can have it save",
				"It must succeed on a Constitution save or take necrotic damage from my cloud of spores and be slowed by 5ft",
                "On a success, it chooses one effect"
			]),
			additional : levels.map(function (n) { return n < 2 ? "" : 'Con save or 1d' + (n < 6 ? 4 : n < 10 ? 6 : n < 14 ? 8 : n < 17 ? 10 : 12) + " necrotic damage"; }),
			action : ["reaction", ""]
		},
		"subclassfeature2.2" : {
			name : "Symbiotic Entity",
			source : ["P:NS", 0],
			minlevel : 2,
			description : desc([
				"As an action, I can expend a Wild Shape use to boost my spores instead of transforming",
				"I gain 4 temporary hit points per druid level, my Culture of Spores damage increases, and the speed decrease doubles",
				"This lasts for 10 min, until these temporary HP run out, or until I use Wild Shape again",
                "At 10th and 14th level, I gain a new feature for my symbiotic entity. Use \"choose feature\" above"
			]),
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
				"As a reaction, at the end of a turn in which an ally deals damage to a hostile creature, I can reallocate the same value of HP as damage dealt in that ally's turn to the creature any creatures.",
                "All of the Attacker, Target, and those being healed must be in my Culture of Spores.",
			]),
			action : ["reaction", ""]
		},
		"subclassfeature10" : {
			name : "Fungal Network",
			source : ["P:NS",0],
			minlevel : 10,
			description : desc([
				"I can drop my concentration on a spell while its effects continue for their full duration.",
                "If I concentrate on another effect during this time, I roll concentration saves with disadvantage and a penalty equal to the level of the spell managed by the Fungal Network",
                "I can end the spell at any time, no action required",
				"I can do this Wisdom modifier times per Long Rest"
			]),
			usages : "Wisdom modifier per ",
			usagescalc : "event.value = Math.max(1, What('Wis Mod'));",
			recovery : "long rest"
		},
		"subclassfeature10.1" : {
			name : "Symbiotic Entity Improvement",
			source : ["P:NS",0],
			minlevel : 10,
			description : desc([
				"I choose an option that improves Symbiotic Entity, at 10th and 14th level"
			]),
			additional : levels.map(function (n) {
				if (n < 10) return "";
				return (n < 14 ? 1 : 2) + "options known"
			}),
			extraname : "Symbiote Improvement",
			extrachoices : ["Clinging Spores", "Enriching Spores", "Fungal Infestation"],
			extraTimes : levels.map(function (n) {
				return n < 10 ? 0 : n < 14 ? 1 : 2;
			}),
            "clinging spores" : {
                name : "Clinging Spores",
				source : ["P:NS", 0],
                description : desc([
                    "A creature which fails its saving throw against my Culture of Spores cannot use its reaction until the end of my next turn",
                    "Any creature counts as being withing my Culture of Spores for 1 turn after they leave it"
                ])
            },
            "enriching spores" : {
                name : "Enriching Spores",
				source : ["P:NS", 0],
                description : desc([
                    "When an ally within my Culture of Spores forces a save or rolls an attack roll, they can add 1 to their save dc or attack roll.",
					"Alternatively, they can add 1 poison damamge to every damage die they roll, instead of the initial bonus",
					"An ally can choose to add 1d4 instead of 1, but in doing so reduce their maximum health by the same amount."
                ])
            },
			"fungal infestation" : {
				name : "Fungal Infestation",
				source : ["P:NS", 0],
				description : desc([
					"If a creature dies within my Culture of Spores, I can use a reaction to raise them as a zombie if they are humanoid",
					"If they aren't humanoid, they are raised as before, but solely with melee attacks and necrotic immunity. They lose all other attacks and immunities",
					"The raised creature shares my initiative, and acts as I command (no action required). If I do not command it, it takes the Dodge action.",
					"If they fall to 0 again, I lose control. The time frames for resurrection are changed as if by the Gentle Repose spell",
					"I can control a number of creatures up to my Wisdom modifier."
				]),
				action : ["reaction", ""]
			}
		},
		"subclassfeature14" : {
			name : "Fungal Body",
			source : ["P:NS",0],
			minlevel : 14,
			description : desc([
				"I'm immune to critical hits"
			]),
			savetxt : { immune : ["critical hits (unless incapacitated)"] }
		}
	}
});
