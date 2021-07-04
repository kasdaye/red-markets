import { redmarkets } from "./module/config.js";

import CharacterSheet from "./module/sheets/character-sheet.js";
import NegotiationSheet from "./module/sheets/negotiation-sheet.js";
import GearSheet from "./module/sheets/gear-sheet.js";
import PersonSheet from "./module/sheets/person-sheet.js";
import HaulSheet from "./module/sheets/haul-sheet.js";

import { _getInitiativeFormula } from "./module/combat.js";

Hooks.once("init", function () {
    console.log("red-markets | Initializing Red Markets System");

    CONFIG.redmarkets = redmarkets;
    CONFIG.Combat.initiative.formula = "1d10 + @potentials.speed.value";
    Combatant.prototype._getInitiativeFormula = _getInitiativeFormula;

    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet("red-markets", GearSheet, { makeDefault: true });
    Items.registerSheet("red-markets", PersonSheet, { makeDefault: false });
    Items.registerSheet("red-markets", HaulSheet, { makeDefault: false });

    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("red-markets", CharacterSheet, { makeDefault: true });
    Actors.registerSheet("red-markets", NegotiationSheet, { makeDefault: false });

    preloadHandlebarsTemplates()

    Handlebars.registerHelper('ifeq', function (a, b, options) {
        if (a == b) { return options.fn(this); }
        return options.inverse(this);
    });
});

async function preloadHandlebarsTemplates() {
    const templatePaths = [
        "systems/red-markets/templates/sheets/gear-sheet.hbs",
        "systems/red-markets/templates/partials/haul-sheet.hbs"
    ];

    return loadTemplates(templatePaths);
}