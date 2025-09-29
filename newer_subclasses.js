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
				"As a reaction when a creature I can see within 10 ft of me starts its turn or moves, I can have it save",
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
				"As a reaction, at the end of a turn in which an ally deals damage to a hostile creature, I can reallocate the same value of HP as damage dealt in that ally's turn to any creatures.",
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
				"I'm immune to critical hits unless incapacitated"
			]),
			savetxt : { immune : ["critical hits (unless incapacitated)"] }
		}
	}
});


AddSubClass("sorcerer", "homeric soul", {
	regExpSearch : /^(?=.*homeric)(?=.*soul).*S/i,
	subname : "Homeric Soul",
	source : ["P:NS", 1],
	fullname : "Homeric Soul",
	spellcastingList : {
		"class" : ["bard", "sorcerer"]
	},
	attacks : [1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
	features : {
		"subclassfeature1" : {
			name : "Poetic Magic",
			source : ["P:NS", 1],
			minlevel : 1,
			description : desc([
				"When I learn spells/cantrips or replace known, I can also pick from the bard spell list",
				"These bard spells count as sorcerer spells for me",
				"I also learn a spell based on my destiny, use the \"choose feature\" button above"
			]),
			choices : ["Leader", "Peacemaker", "Protector", "Victor"],
			"leader" : {
				name : "Leader Destiny",
				source : ["P:NS", 1],
				description : desc([
					"I learn the gift of alacrity spell, but it doesn't count against my number of sorcerer spells known",
					"I gain its benefits at the end of a rest, and ignore its duration if I gain its benefits in this way"
				]),
				spellcastingBonus : {
					name : "Leader Destiny Spell",
					spells : ["gift of alacrity"],
					selection : ["gift of alacrity"]
				}
			},
			"peacemaker" : {
				name : "Peacemaker Destiny", 
				source : ["P:NS", 1],
				description : desc([
					"I learn the sanctuary spell, but it doesn't count against my number of sorcerer spells known",
					"I gain its benefits at the end of a rest, and ignore its duration if I gain its benefits in this way"
				]),
				spellcastingBonus : {
					name : "Peacemaker Destiny Spell",
					spells : ["sanctuary"],
					selection : ["sanctuary"]
				},
			},
			"protector" : {
				name : "Protector Destiny",
				source : ["P:NS", 1],
				description : desc([
					"I learn the armor of agathys spell, but it doesn't count against my number of sorcerer spells known",
					"I gain its benefits at the end of a rest, and ignore its duration if I gain its benefits in this way"
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
					"I learn the divine favor spell, but it doesn't count against my number of sorcerer spells known",
					"I gain its benefits at the end of a rest, and ignore its duration if I gain its benefits in this way"
				]),
				spellcastingBonus : {
					name : "Victor Destiny Spell",
					spells : ["divine favor"],
					selection : ["divine favor"]
				}
			}
		},
		"subclassfeature1.1" : {
			name : "Memories of Heroism",
			source : ["P:NS", 1],
			minlevel : 1,
			description : desc([
				"I am proficieny with simple & martial weapons, light armor, and shields"
			]),
			armorProfs : [true, false, false, false],
			weaponProfs : [true, true]
		},
		"subclassfeature6" : {
			name : "Extra Attack", 
			source : ["P:NS", 1],
			minlevel : 6,
			description : desc([
				"I can attack twice whenever I take the attack action on my turn",
				"I can use one weapon of my choice to use as an arcane focus, and change it each long rest"
			])
		},
		"subclassfeature6.1" : {
			name : "Shaped Destiny", 
			source : ["P:NS", 1],
			minlevel : 6,
			description : desc([
				"I can choose from improved destiny options at 6th, 10th, 14th, and 18th levels"
			]),
			extraname : "Destiny Options",
			extrachoices : ["Finest of Orators", "Heroic Consistency", "Inevitable Fate", "Multitasking", "Undisputed Leader", "Unending Peace", "Unfailing Victory", "Unyielding Protection", "Miraculous Escape", "Poet's Encouragement", "Shared Destiny", "Warrior's Soul", "Annihilating Victor", "Sacrificial Protector", "Tactical Leader", "Ultimate Peace"],
			extraTimes : levels.map(function(n) {
				return n < 6 ? 0 : n < 10 ? 1 : n < 14 ? 2 : n < 17 ? 3 : 4
			}),
			"finest of orators" : {
				name : "Finest of Orators",
				source : ["P:NS", 1],
				submenu : "[sorcerer level 6]",
				description : desc([
					"I have advantage on Charisma checks involving speaking to another creature, and become proficient in one Charisma based skill, and gain expertise in a Charisma based skill"
				]),
				skillstxt : "Choose a Charisma based skill, with which I gain proficiency; choose a charisma based skill, with which I gain expertise",
				savetxt : "Advantage on Charisma checks involving verbal communication",
				prereqeval : function(v) { return classes.known.sorcerer.level >= 6; }
			},
			"heroic consistency" : {
				name: "Heroic Consistency",
				source : ["P:NS", 1],
				submenu : "[sorcerer level 6]",
				description : desc([
					"When I roll for damage, I can re-roll any dice with values less than or equal to half their maximum once, and must use the new rolls"
				]),
				prereqeval : function(v) { return classes.known.sorcerer.level >= 6; }
			},
			"inevitable fate" : {
				name : "Inevitable Fate", 
				source : ["P:NS", 1],
				submenu : "[sorcerer level 6]",
				description : desc([
					"When a creature within 30ft drops to 0HP, I can use a reaction to stabilise them or kill them outright such that they can't be raised by any means short of a Wish or True resurrection spell"
				]),
				action : ["reaction", ""],
				prereqeval : function(v) { return classes.known.sorcerer.level >= 6; }
			},
			"multitasking" : {
				name : "Multitasking",
				source : ["P:NS", 1],
				submenu : "[sorcerer level 6]",
				description : desc([
					"I have advantage on Concentration saving throws to maintain concentration",
					"I can spend between 1 and 3 sorcery points to add that number to my concentration saves if I fail, once per turn"
				]),
				savetxt : { text : "Adv. on Con (Concentration) saves" }, 
				prereqeval : function(v) { return classes.known.sorcerer.level >= 6; }
			},
			"undisputed leader" : {
				name : "Undisputed Leader",
				source : ["P:NS", 1],
				submenu : "[requires leader destiny]",
				description : desc([
					"Gift of alacrity as a Destiny spell also adds my Charisma modifier to initiative."
				]),
				addMod : { type : "skill", field : "Init", mod : "max(Cha|0)", text : "gift of alacrity also adds my Charisma modifier to initiative" }, 
				prereqeval : function(v) { return classes.known.sorcerer.level >= 10 && GetFeatureChoice('class', 'sorcerer', 'subclassfeature1') == 'leader'; }
			},
			"unending peace" : {
				name : "Unending Peace",
				source : ["P:NS", 1],
				submenu : "[requires peacemaker destiny]",
				description : desc([
					"The sanctuary Destiny spell only ends on me against the creature I target or affect and its allies within 15ft of me or it"
				]),
				prereqeval : function(v) { return classes.known.sorcerer.level >= 10 && GetFeatureChoice('class', 'sorcerer', 'subclassfeature1') == 'peacemaker'; }
			},
			"unfailing victory" : {
				name : "Unfailing Victory",
				source : ["P:NS", 1],
				submenu : "[requires victor destiny]",
				description : desc([
					"The divine favor Destiny spell now adds my Proficiency bonus to weapon damage rolls, instead of 1d4"
				]),
				calcChanges : {
					atkAdd : [
						function (fields, v) {
							if (v.isMeleeWeapon || v.isRangedWeapon || v.isThrownWeapon) {
								fields.Description += (fields.Description ? '; ' : '') + 'Prof bonus added to damage';
							}
						},
						"I add my proficiency bonus to my weapon damage."
					],
					atkCalc : [
						function (fields, v, output) {
							if (v.isMeleeWeapon || v.isRangedWeapon || v.isThrownWeapon) {
								output.extraDmg += output.prof;
							};
						}
					]
				},
				prereqeval : function(v) { return classes.known.sorcerer.level >= 10 && GetFeatureChoice('class', 'sorcerer', 'subclassfeature1') == 'victor'; }
			},
			"unyielding protection" : {
				name : "Unyielding Protection",
				source : ["P:NS", 1],
				submenu : "[requires protector destiny]",
				description : desc([
					"The armor of agathys Destiny spell gives me temporary HP and deals damage equal to 5 * my proficiency bonus"
				]),
				additional : ProficiencyBonusList.map(function (n) {
					return n * 5 + ' temp HP'; 
				}),
				prereqeval : function(v) { return classes.known.sorcerer.level >= 10 && GetFeatureChoice('class', 'sorcerer', 'subclassfeature1') == 'protector'; }
			},
			"miraculous escape" : {
				name : "Miraculous Escape",
				source : ["P:NS", 1],
				submenu : "[sorcerer level 14]",
				description : desc([
					"When I fall to 0HP, if I succeed on a Charisma saving throw of DC half the damage I took I can instead be healed by the damage"
				]),
				usages : "Proficiency bonus per ",
				usagescalc : "event.value = How('Proficiency Bonus');", 
				recovery : "long rest",
				prereqeval : function(v) { return classes.known.sorcerer.level >= 14; }
			},
			"poet's encouragement" : {
				name : "Poet's Encouragement",
				source : ["P:NS", 1],
				submenu : "[sorcerer level 14]",
				description : desc([
					"Once per turn, an ally that can hear or see me within 15ft can reroll any skill check that they failed, and add my Charisma modifier"
				]),
				prereqeval : function(v) { return classes.known.sorcerer.level >= 14; }
			},
			"shared destiny" : {
				name : "Shared Destiny",
				source : ["P:NS", 1],
				submenu : "[sorcerer level 14]",
				description : desc([
					"I can share the effects of my Destiny spell(s) at the end of a rest with up to my Charisma mod creatures I touch"
				]),
				prereqeval : function(v) { return classes.known.sorcerer.level >= 14; },
				additional : Math.max(1, What('Cha Mod')) + " additional creatures affected" 
			},
			"warrior's soul" : {
				name : "Warrior's Soul",
				source : ["P:NS", 1],
				submenu : "[sorcerer level 14]",
				prereqeval : function(v) { return classes.known.sorcerer.level >= 14; },
				description : desc([
					"I gain half-proficiency in Dexterity, Constitution, and Strength saving throws, if I do not already have proficiency in them"
				]),
				savetxt : "Half-proficiency in Con, Dex, & Str saving throws (not calculated above)"
			},
			"annihilating victor" : {
				name : "Annihilating Victor",
				source : ["P:NS", 0],
				submenu : "[requires victor destiny]",
				prereqeval : function(v) { return classes.known.sorcerer.level >= 18 && GetFeatureChoice('class', 'sorcerer', 'subclassfeature1') == 'victor'; },
				description : desc([
					"A weapon attack improved by my divine favor Destiny spell that brings an enemy to 0HP or deals over half their health at once instantly kills them",
					"This creature cannot be raised by any means",
					"When this happens, I regain 4d8 HP"
				])
			},
			"sacrificial protector" : {
				name : "Sacrificial Protector",
				source : ["P:NS", 1],
				submenu : "[requires protector destiny]",
				prereqeval : function(v) { return classes.known.sorcerer.level >= 18 && GetFeatureChoice('class', 'sorcerer', 'subclassfeature1') == 'protector'; },
				description : desc([
					"When an ally takes damage within 15ft of me, I can all take the damage instead as a reaction",
					"I gain resistance to any damage types I receive in this way until the end of my next turn"
				]),
				action : ["reaction", ""] 
			},
			"tactical leader" : {
				name : "Tactical Leader", 
				source : ["P:NS", 1],
				submenu : "[requires leader destiny]",
				prereqeval : function(v) { return classes.known.sorcerer.level >= 18 && GetFeatureChoice('class', 'sorcerer', 'subclassfeature1') == 'leader'; },
				description : desc([
					"As a bonus action, I can command up to my Charisma modifier allies to move up to their speed without opportunity attacks",
					"They could alternatively break free from any restrained or grappled conditions, and move half their speed"
				]),
				action : ["bonus action", ""] 
			},
			"ultimate peace" : {
				name : "Ultimate Peace",
				source : ["P:NS", 1],
				submenu : "[requires peacemaker destiny]",
				prereqeval : function(v) { return classes.known.sorcerer.level >= 18 && GetFeatureChoice('class', 'sorcerer', 'subclassfeature1') == 'peacemaker'; }, 
				description : desc([
					"While under the effects of the sanctuary Destiny spell, I am immune to all damage inflicted by others before taking a turn in combat", 
					"Before dealing damamge in combat, I am resistant to all damage inflicted by other creatures if under the effects of the sanctuary Destiny spell"
				])
			}
		},
		"subclassfeature14" : {
			name : "Mythical Accuracy",
			source : ["P:NS", 1], 
			minlevel : 14,
			description : desc([
				"I can add my Charisma modifier to my weapon attack rolls",
				"If I miss an attack roll, I can spend 2 sorcery points to roll another d20, and choose which roll to use"
			]),
			calcChanges : {
				atkAdd : [
					function (fields, v) {
						if (v.isMeleeWeapon || v.isRangedWeapon || v.isThrownWeapon) {
							fields.Description += (fields.Description ? '; ' : '') + 'Cha Mod added to Hit';
						}
					},
					"I add my Charisma Modifier to my weapon attack."
				],
				atkCalc : [
					function (fields, v, output) {
						if (v.isMeleeWeapon || v.isRangedWeapon || v.isThrownWeapon) {
							output.extraHit += Math.max(0,What('Cha Mod'))
						}
					}
			]}
		},
		"subclassfeature18" : {
			name : "Epic Tales",
			source : ["P:NS", 1],
			minlevel : 18,
			description : desc([
				"As a bonus action, choose whether to motivate or enrapture",
				"To motivate: as this bonus action and subsequently for a minute, an ally who can hear me can take an action as a reaction",
				"To Enrapture: an enemy who can hear my tales must make a Wisdom save or be charmed by me, and only take one of their action, bonus action, reaction, and move (maximum 1 attack per turn & no damaging spells). They can spend their turn remaking the save.",
				"If I tell these stories for a minute, this lasts for 10 mins, otherwise 1 min, and it can affect up to Charisma modifier creatures",
				"I can do this Charisma modifier (minimum of 1) times per long rest"
			]),
			action : ["bonus action", "Epic Motivation"],
			action : ["bonus action", "Enrapturing Tales"],
			usages : "Charisma Modifier per ",
			usagescalc : "event.value = Math.max(1, What('Cha Mod'));",
			recovery : "long rest"
		}
	}
})

AddSubClass("bard", "college of epics", { 
	regExpSearch : /^(?=.*(college|bard|minstrel|troubadour|jongleur))(?=.*(epic|homer|homeric|warrior|poet)).*$/i,
	subname : "College of Epics",
	source : ["P:NS", 7],
	features : {
		"subclassfeature3" : {
			name : "Poetic Destiny",
			source : ["P:NS", 7],
			minlevel : 3,
			description : desc([
				"I learn a spell based on my destiny, use the \"choose feature\" button above"
			]),
			extraname : "Destiny Options",
			extrachoices : ["Leader", "Peacemaker", "Protector", "Victor", "Finest of Orators", "Heroic Consistency", "Inevitable Fate", "Multitasking", "Undisputed Leader", "Unending Peace", "Unfailing Victory", "Unyielding Protection", "Miraculous Escape", "Poet's Encouragement", "Shared Destiny", "Warrior's Soul", "Annihilating Victor", "Sacrificial Protector", "Tactical Leader", "Ultimate Peace"],
			extraTimes : levels.map(function(n) {
				return n < 6 ? 0 : n < 10 ? 1 : n < 14 ? 2 : n < 17 ? 3 : 4
			}),
			
			
			"leader" : {
				name : "Leader Destiny",
				source : ["P:NS", 7],
				description : desc([
					"I learn the gift of alacrity spell, but it doesn't count against my number of sorcerer spells known",
					"I gain its benefits at the end of a rest, and ignore its duration if I gain its benefits in this way"
				]),
				spellcastingBonus : {
					name : "Leader Destiny Spell",
					spells : ["gift of alacrity"],
					selection : ["gift of alacrity"]
				}
			},
			"peacemaker" : {
				name : "Peacemaker Destiny", 
				source : ["P:NS", 7],
				description : desc([
					"I learn the sanctuary spell, but it doesn't count against my number of sorcerer spells known",
					"I gain its benefits at the end of a rest, and ignore its duration if I gain its benefits in this way"
				]),
				spellcastingBonus : {
					name : "Peacemaker Destiny Spell",
					spells : ["sanctuary"],
					selection : ["sanctuary"]
				},
			},
			"protector" : {
				name : "Protector Destiny",
				source : ["P:NS", 7],
				description : desc([
					"I learn the armor of agathys spell, but it doesn't count against my number of sorcerer spells known",
					"I gain its benefits at the end of a rest, and ignore its duration if I gain its benefits in this way"
				]),
				spellcastingBonus : {
					name : "Protector Destiny Spell",
					spells : ["armor of agathys"],
					selection : ["armor of agathys"]
				}
			},
			"victor" : {
				name : "Victor Destiny",
				source : ["P:NS", 7],
				description : desc([
					"I learn the bless spell, but it doesn't count against my number of bard spells known",
					"I gain its benefits at the end of a rest, and ignore its duration if I gain its benefits in this way"
				]),
				spellcastingBonus : {
					name : "Victor Destiny Spell",
					spells : ["bless"],
					selection : ["bless"]
				}
			},
			"finest of orators" : {
				name : "Finest of Orators",
				source : ["P:NS", 1],
				submenu : "[bard level 6]",
				description : desc([
					"I have advantage on Charisma checks involving speaking to another creature, and become proficient in one Charisma based skill, and gain expertise in a Charisma based skill"
				]),
				skillstxt : "Choose a Charisma based skill, with which I gain proficiency; choose a charisma based skill, with which I gain expertise",
				savetxt : "Advantage on Charisma checks involving verbal communication",
				prereqeval : function(v) { return classes.known.bard.level >= 6; }
			},
			"heroic consistency" : {
				name: "Heroic Consistency",
				source : ["P:NS", 1],
				submenu : "[bard level 6]",
				description : desc([
					"When I roll for damage, I can re-roll any dice with values less than or equal to half their maximum once, and must use the new rolls"
				]),
				prereqeval : function(v) { return classes.known.bard.level >= 6; }
			},
			"inevitable fate" : {
				name : "Inevitable Fate", 
				source : ["P:NS", 1],
				submenu : "[bard level 6]",
				description : desc([
					"When a creature within 30ft drops to 0HP, I can use a reaction to stabilise them or kill them outright such that they can't be raised by any means short of a Wish or True resurrection spell"
				]),
				action : ["reaction", ""],
				prereqeval : function(v) { return classes.known.bard.level >= 6; }
			},
			"multitasking" : {
				name : "Multitasking",
				source : ["P:NS", 1],
				submenu : "[bard level 6]",
				description : desc([
					"I have advantage on Concentration saving throws to maintain concentration",
					"I can spend between 1 and 3 sorcery points to add that number to my concentration saves if I fail, once per turn"
				]),
				savetxt : { text : "Adv. on Con (Concentration) saves" }, 
				prereqeval : function(v) { return classes.known.bard.level >= 6; }
			},
			"undisputed leader" : {
				name : "Undisputed Leader",
				source : ["P:NS", 1],
				submenu : "[requires leader destiny]",
				description : desc([
					"Gift of alacrity as a Destiny spell also adds my Charisma modifier to initiative."
				]),
				addMod : { type : "skill", field : "Init", mod : "max(Cha|0)", text : "gift of alacrity also adds my Charisma modifier to initiative" }, 
				prereqeval : function(v) { return classes.known.bard.level >= 10  ; }
			},
			"unending peace" : {
				name : "Unending Peace",
				source : ["P:NS", 1],
				submenu : "[requires peacemaker destiny]",
				description : desc([
					"The sanctuary Destiny spell only ends on me against the creature I target or affect and its allies within 15ft of me or it"
				]),
				prereqeval : function(v) { return classes.known.bard.level >= 10  ; }
			},
			"unfailing victory" : {
				name : "Unfailing Victory",
				source : ["P:NS", 1],
				submenu : "[requires victor destiny]",
				description : desc([
					"The bless Destiny spell now adds my Charisma mod, instead of 1d4"
				]),
				prereqeval : function(v) { return classes.known.bard.level >= 10  ; }
			},
			"unyielding protection" : {
				name : "Unyielding Protection",
				source : ["P:NS", 1],
				submenu : "[requires protector destiny]",
				description : desc([
					"The armor of agathys Destiny spell gives me temporary HP and deals damage equal to 5 * my proficiency bonus"
				]),
				additional : ProficiencyBonusList.map(function (n) {
					return n * 5 + ' temp HP'; 
				}),
				prereqeval : function(v) { return classes.known.bard.level >= 10  ; }
			},
			"miraculous escape" : {
				name : "Miraculous Escape",
				source : ["P:NS", 1],
				submenu : "[bard level 14]",
				description : desc([
					"When I fall to 0HP, if I succeed on a Charisma saving throw of DC half the damage I took I can instead be healed by the damage"
				]),
				usages : "Proficiency bonus per ",
				usagescalc : "event.value = How('Proficiency Bonus');", 
				recovery : "long rest",
				prereqeval : function(v) { return classes.known.bard.level >= 14; }
			},
			"poet's encouragement" : {
				name : "Poet's Encouragement",
				source : ["P:NS", 1],
				submenu : "[bard level 14]",
				description : desc([
					"Once per turn, an ally that can hear or see me within 15ft can reroll any skill check that they failed, and add my Charisma modifier"
				]),
				prereqeval : function(v) { return classes.known.bard.level >= 14; }
			},
			"warrior's soul" : {
				name : "Warrior's Soul",
				source : ["P:NS", 1],
				submenu : "[bard level 14]",
				prereqeval : function(v) { return classes.known.bard.level >= 14; },
				description : desc([
					"I gain half-proficiency in Dexterity, Constitution, and Strength saving throws"
				]),
				savetxt : "Half-proficiency in Con, Dex, & Str saving throws (not calculated above)"
			},
			"annihilating victor" : {
				name : "Annihilating Victor",
				source : ["P:NS", 0],
				submenu : "[requires victor destiny]",
				prereqeval : function(v) { return classes.known.bard.level >= 18  ; },
				description : desc([
					"If an attack empowered by my bless Destiny spell brings an enemy to 0HP, that enemy is dead and cannot be raised by any means",
					"When this happens, I gain 3d8 HP"
				])
			},
			"sacrificial protector" : {
				name : "Sacrificial Protector",
				source : ["P:NS", 1],
				submenu : "[requires protector destiny]",
				prereqeval : function(v) { return classes.known.bard.level >= 18  ; },
				description : desc([
					"When an ally takes damage within 15ft of me, I can all take the damage instead as a reaction",
					"I gain resistance to any damage types I receive in this way until the end of my next turn"
				]),
				action : ["reaction", ""] 
			},
			"tactical leader" : {
				name : "Tactical Leader", 
				source : ["P:NS", 1],
				submenu : "[requires leader destiny]",
				prereqeval : function(v) { return classes.known.bard.level >= 18  ; },
				description : desc([
					"As a bonus action, I can command up to my Charisma modifier allies to move up to their speed without opportunity attacks",
					"They could alternatively break free from any restrained or grappled conditions, and move half their speed"
				]),
				action : ["bonus action", ""] 
			},
			"ultimate peace" : {
				name : "Ultimate Peace",
				source : ["P:NS", 1],
				submenu : "[requires peacemaker destiny]",
				prereqeval : function(v) { return classes.known.bard.level >= 18  ; }, 
				description : desc([
					"While under the effects of my sanctuary Destiny spell, I am immune to all damage inflicted by others before taking a turn in combat", 
					"Before dealing damamge in combat, I am resistant to all damage inflicted by other creatures if under the effects of the sanctuary Destiny spell"
				])
			}
		},
		"subclassfeature3.1" : {
			name : "Memories of Heroism",
			source : ["P:NS", 7],
			minlevel : 1,
			description : desc([
				"I am proficieny with simple & martial weapons, light armor, and shields"
			]),
			armorProfs : [true, false, false, false],
			weaponProfs : [true, true]
		},
		"subclassfeature6" : {
			name : "Shaped Destiny", 
			source : ["P:NS", 1],
			minlevel : 6,
			description : desc([
				"I can choose from improved destiny options at 6th, 10th, 14th, and 18th levels"
			]),
			extraname : "Destiny Options",
			extrachoices : ["Finest of Orators", "Heroic Consistency", "Inevitable Fate", "Multitasking", "Undisputed Leader", "Unending Peace", "Unfailing Victory", "Unyielding Protection", "Miraculous Escape", "Poet's Encouragement", "Shared Destiny", "Warrior's Soul", "Annihilating Victor", "Sacrificial Protector", "Tactical Leader", "Ultimate Peace"],
			extraTimes : levels.map(function(n) {
				return n < 6 ? 0 : n < 10 ? 1 : n < 14 ? 2 : n < 17 ? 3 : 4
			}),
			"finest of orators" : {
				name : "Finest of Orators",
				source : ["P:NS", 1],
				submenu : "[bard level 6]",
				description : desc([
					"I have advantage on Charisma checks involving speaking to another creature, and become proficient in one Charisma based skill, and gain expertise in a Charisma based skill"
				]),
				skillstxt : "Choose a Charisma based skill, with which I gain proficiency; choose a charisma based skill, with which I gain expertise",
				savetxt : "Advantage on Charisma checks involving verbal communication",
				prereqeval : function(v) { return classes.known.bard.level >= 6; }
			},
			"heroic consistency" : {
				name: "Heroic Consistency",
				source : ["P:NS", 1],
				submenu : "[bard level 6]",
				description : desc([
					"When I roll for damage, I can re-roll any dice with values less than or equal to half their maximum once, and must use the new rolls"
				]),
				prereqeval : function(v) { return classes.known.bard.level >= 6; }
			},
			"inevitable fate" : {
				name : "Inevitable Fate", 
				source : ["P:NS", 1],
				submenu : "[bard level 6]",
				description : desc([
					"When a creature within 30ft drops to 0HP, I can use a reaction to stabilise them or kill them outright such that they can't be raised by any means short of a Wish or True resurrection spell"
				]),
				action : ["reaction", ""],
				prereqeval : function(v) { return classes.known.bard.level >= 6; }
			},
			"multitasking" : {
				name : "Multitasking",
				source : ["P:NS", 1],
				submenu : "[bard level 6]",
				description : desc([
					"I have advantage on Concentration saving throws to maintain concentration",
					"I can spend between 1 and 3 sorcery points to add that number to my concentration saves if I fail, once per turn"
				]),
				savetxt : { text : "Adv. on Con (Concentration) saves" }, 
				prereqeval : function(v) { return classes.known.bard.level >= 6; }
			},
			"undisputed leader" : {
				name : "Undisputed Leader",
				source : ["P:NS", 1],
				submenu : "[requires leader destiny]",
				description : desc([
					"Gift of alacrity as a Destiny spell also adds my Charisma modifier to initiative."
				]),
				addMod : { type : "skill", field : "Init", mod : "max(Cha|0)", text : "gift of alacrity also adds my Charisma modifier to initiative" }, 
				prereqeval : function(v) { return classes.known.bard.level >= 10  ; }
			},
			"unending peace" : {
				name : "Unending Peace",
				source : ["P:NS", 1],
				submenu : "[requires peacemaker destiny]",
				description : desc([
					"The sanctuary Destiny spell only ends on me against the creature I target or affect and its allies within 15ft of me or it"
				]),
				prereqeval : function(v) { return classes.known.bard.level >= 10  ; }
			},
			"unfailing victory" : {
				name : "Unfailing Victory",
				source : ["P:NS", 1],
				submenu : "[requires victor destiny]",
				description : desc([
					"The bless Destiny spell now adds my Charisma mod, instead of 1d4"
				]),
				prereqeval : function(v) { return classes.known.bard.level >= 10  ; }
			},
			"unyielding protection" : {
				name : "Unyielding Protection",
				source : ["P:NS", 1],
				submenu : "[requires protector destiny]",
				description : desc([
					"The armor of agathys Destiny spell gives me temporary HP and deals damage equal to 5 * my proficiency bonus"
				]),
				additional : ProficiencyBonusList.map(function (n) {
					return n * 5 + ' temp HP'; 
				}),
				prereqeval : function(v) { return classes.known.bard.level >= 10  ; }
			},
			"miraculous escape" : {
				name : "Miraculous Escape",
				source : ["P:NS", 1],
				submenu : "[bard level 14]",
				description : desc([
					"When I fall to 0HP, if I succeed on a Charisma saving throw of DC half the damage I took I can instead be healed by the damage"
				]),
				usages : "Proficiency bonus per ",
				usagescalc : "event.value = How('Proficiency Bonus');", 
				recovery : "long rest",
				prereqeval : function(v) { return classes.known.bard.level >= 14; }
			},
			"poet's encouragement" : {
				name : "Poet's Encouragement",
				source : ["P:NS", 1],
				submenu : "[bard level 14]",
				description : desc([
					"Once per turn, an ally that can hear or see me within 15ft can reroll any skill check that they failed, and add my Charisma modifier"
				]),
				prereqeval : function(v) { return classes.known.bard.level >= 14; }
			},
			"warrior's soul" : {
				name : "Warrior's Soul",
				source : ["P:NS", 1],
				submenu : "[bard level 14]",
				prereqeval : function(v) { return classes.known.bard.level >= 14; },
				description : desc([
					"I gain half-proficiency in Dexterity, Constitution, and Strength saving throws"
				]),
				savetxt : "Half-proficiency in Con, Dex, & Str saving throws (not calculated above)"
			},
			"annihilating victor" : {
				name : "Annihilating Victor",
				source : ["P:NS", 0],
				submenu : "[requires victor destiny]",
				prereqeval : function(v) { return classes.known.bard.level >= 18  ; },
				description : desc([
					"If an attack empowered by my bless Destiny spell brings an enemy to 0HP, that enemy is dead and cannot be raised by any means",
					"When this happens, I gain 3d8 HP"
				])
			},
			"sacrificial protector" : {
				name : "Sacrificial Protector",
				source : ["P:NS", 1],
				submenu : "[requires protector destiny]",
				prereqeval : function(v) { return classes.known.bard.level >= 18  ; },
				description : desc([
					"When an ally takes damage within 15ft of me, I can all take the damage instead as a reaction",
					"I gain resistance to any damage types I receive in this way until the end of my next turn"
				]),
				action : ["reaction", ""] 
			},
			"tactical leader" : {
				name : "Tactical Leader", 
				source : ["P:NS", 1],
				submenu : "[requires leader destiny]",
				prereqeval : function(v) { return classes.known.bard.level >= 18  ; },
				description : desc([
					"As a bonus action, I can command up to my Charisma modifier allies to move up to their speed without opportunity attacks",
					"They could alternatively break free from any restrained or grappled conditions, and move half their speed"
				]),
				action : ["bonus action", ""] 
			},
			"ultimate peace" : {
				name : "Ultimate Peace",
				source : ["P:NS", 1],
				submenu : "[requires peacemaker destiny]",
				prereqeval : function(v) { return classes.known.bard.level >= 18  ; }, 
				description : desc([
					"While under the effects of my sanctuary Destiny spell, I am immune to all damage inflicted by others before taking a turn in combat", 
					"Before dealing damamge in combat, I am resistant to all damage inflicted by other creatures if under the effects of the sanctuary Destiny spell"
				])
			}
		},
		"subclassfeature6.1" : {
			name : "Shared Destiny",
			source : ["P:NS", 7],
			minlevel : 6,
			description : desc([
				"I can share the effects of my Destiny spell(s) at the end of a rest with up to my Charisma mod creatures I touch"
			]),
			additional : Math.max(1, What('Cha Mod')) + " additional creatures affected" 
		},
		"subclassfeature14" : {
			name : "Mythical Accuracy",
			source : ["P:NS", 1], 
			minlevel : 14,
			description : desc([
				"If I miss an attack roll or a creature succeeds a save against one of my bard spells, I can spend roll another d20, and choose which roll is used",
				"I can do this once per long rest, and additional times if I expend a use of my Bardic Inspiration"
			]),
			recovery : "long rest",
			usages : 1,
			altResource : "Bardic Inspiration",
			action : [["", ""]]

		},
		
	}
});

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
			description : "\n   " + "I can take 2 reaction each round, which scales to 3 at 17th level in this class",
			additional : levels.map(function (n) {
				return n < 9 ? 1 : (n < 17 ? 2 : 3) + " reactions";
			}),
		},
		"subclassfeature13" : {
			name : "Opportunist",
			source : [["P:NS", 3]],
			minlevel : 13,
			description : desc([
				"My opportunity attacks can always add my sneak attack damage, as long as I do not have disadvantage on the attack. I can still only do one sneak attack each turn."
			])
		},
		"subclassfeature17" : {
			name : "Exploit Weakness",
			source : [["P:NS", 3]],
			minlevel : 17,
			description : desc([
				"When a creature that I can see within my weapon's range fails an attack roll or saving throw, I can make an opportunity attack against them as a reaction"
			]),
			action : ["reaction", " as an opportunity attack"]
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
			description : "\n   My walking speed increases by 10ft and I am not affected by difficult terrain",
			speed : { allModes : "+10" }
		},
		"subclassfeature6" : {
			name : "Grasp of the Earth",
			source : [["P:NS", 5]],
			minlevel : 6,
			description : desc([
				"I cannot be moved against my will if I am on the ground. Creatures have disadvantage on any saving throws to resist being moved by me or one of my spells or magical effects",
				"I know the thorn whip cantrip (or learn a warlock cantrip of my choicce if I already knoe it) which does not count against my number of cantrips known, and can cast the grasping vine spell once per long rest without using a spell slot, or with any spell slots I have. I do not need to concentrate on this spell and it lasts its full duration"
			]),
			spellcastingBonus : [{
				name : "Grasp of the Earth",
				spells : ["thorn whip"],
				selection : ["thorn whip"],
				firstCol : "atwill",
			}, {
				name : "Grasp of the Earth",
				spells : ["grasping vine"],
				selection : ["grasping vine"],
				firstCol : "oncelr",
			}],
			extraLimitedFeatures : [{
				name : "Grasping Vine (No SS)",
				usages : 1,
				recovery : "long rest"
			}],
			calcChanges : {
				spellAdd : [
					function (spellKey, spellObj, spName) {
						if (spellKey === "grasping vine") {
							spellObj.duration = "1 min";
						}
					}
				]
			},
		},
		"subclassfeature10" : {
			name : "Primal Spirit",
			source : [["P:NS", 5]],
			minlevel : 10,
			description : desc([
				"For 1 minute, proficiency bonus times per long rest, I can become either a mighty tree or a reaching vine as abonus action",
				"Tree: size becomes huge; I gain temp HP equal to my warlock level; I can make any area within 5ft of me difficult terrain that moves with me; my unarmed strikes have reach of 10ft, deal 3d8 magical bludgeoning damage and can push 10ft on a hit; I have advantage on perception checks and have tremorsense 120ft.",
				"Vine: size becomes tiny with 10ft reach; I can grapple any creature that enters my reach and add my charisma modifier to the DC, without needing a free hand; I gain a climbing speed equal to my walking speed."
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
				"If it hits the creature, they become restrained"
			]),
			action : [["reaction", ""]]
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

