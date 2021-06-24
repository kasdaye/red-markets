import { redmarkets } from "./module/config.js";
import CharacterSheet from "./module/sheets/character-sheet.js";
import GearSheet from "./module/sheets/gear-sheet.js";

Hooks.once("init", function () {
    console.log("red-markets | Initializing Red Markets System");

    CONFIG.redmarkets = redmarkets;

    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet("red-markets", GearSheet, { makeDefault: true });

    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("red-markets", CharacterSheet, { makeDefault: true });
});