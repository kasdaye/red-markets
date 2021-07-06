import { redmarkets } from "./module/config.js";

import CharacterSheet from "./module/sheets/character-sheet.js";
import NegotiationSheet from "./module/sheets/negotiation-sheet.js";
import CasualtiesSheet from "./module/sheets/casualties-sheet.js";
import VectorSheet from "./module/sheets/vector-sheet.js";
import MarketForceSheet from "./module/sheets/market-force-sheet.js";

import GearSheet from "./module/sheets/gear-sheet.js";
import PersonSheet from "./module/sheets/person-sheet.js";
import HaulSheet from "./module/sheets/haul-sheet.js";
import MarketForceGearSheet from "./module/sheets/market-force-gear-sheet.js";

import { _getInitiativeFormula } from "./module/combat.js";

Hooks.once("init", function () {
    console.log("red-markets | Initializing Red Markets System");

    CONFIG.redmarkets = redmarkets;
    CONFIG.Combat.initiative.formula = "1d10 + @potentials.speed.value";
    Combatant.prototype._getInitiativeFormula = _getInitiativeFormula;

    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet("red-markets", GearSheet, { types: ["gear"], makeDefault: true });
    Items.registerSheet("red-markets", PersonSheet, { types: ["person"], makeDefault: true });
    Items.registerSheet("red-markets", HaulSheet, { types: ["haul"], makeDefault: true });
    Items.registerSheet("red-markets", MarketForceGearSheet, { types: ["marketForceGear"], makeDefault: true });

    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("red-markets", CharacterSheet, { types: ["character"], makeDefault: true });
    Actors.registerSheet("red-markets", NegotiationSheet, { types: ["negotiation"], makeDefault: true });
    Actors.registerSheet("red-markets", CasualtiesSheet, { types: ["casualties"], makeDefault: true });
    Actors.registerSheet("red-markets", VectorSheet, { types: ["vector"], makeDefault: true });
    Actors.registerSheet("red-markets", MarketForceSheet, { types: ["marketForce"], makeDefault: true });

    preloadHandlebarsTemplates()

    Handlebars.registerHelper('ifeq', function (a, b, options) {
        if (a == b) { return options.fn(this); }
        return options.inverse(this);
    });
});

async function preloadHandlebarsTemplates() {
    const templatePaths = [
        "systems/red-markets/templates/sheets/gear-sheet.hbs",
        "systems/red-markets/templates/sheets/market-force-gear-sheet.hbs",
        "systems/red-markets/templates/partials/haul-sheet.hbs",
        "systems/red-markets/templates/partials/damage.hbs"
    ];

    return loadTemplates(templatePaths);
}