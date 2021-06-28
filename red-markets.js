import { redmarkets } from "./module/config.js";
import CharacterSheet from "./module/sheets/character-sheet.js";
import GearSheet from "./module/sheets/gear-sheet.js";
import PersonSheet from "./module/sheets/person-sheet.js";

Hooks.once("init", function () {
    console.log("red-markets | Initializing Red Markets System");

    CONFIG.redmarkets = redmarkets;

    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet("red-markets", GearSheet, { makeDefault: true });
    Items.registerSheet("red-markets", PersonSheet, { makeDefault: false });

    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("red-markets", CharacterSheet, { makeDefault: true });

    preloadHandlebarsTemplates()

    Handlebars.registerHelper('ifeq', function (a, b, options) {
        if (a == b) { return options.fn(this); }
        return options.inverse(this);
    });
});

async function preloadHandlebarsTemplates() {
    const templatePaths = [
        "systems/red-markets/templates/sheets/gear-sheet.hbs"
    ];

    return loadTemplates(templatePaths);
}