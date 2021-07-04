export default class CasualtiesSheet extends ActorSheet {
    get template() {
        return `systems/red-markets/templates/sheets/casualties-sheet.hbs`;
    }

    getData() {
        const data = super.getData();
        data.config = CONFIG.redmarkets;
        return data;
    }

    activateListeners(html) {
        if (this.actor.isOwner) {
            html.find(".generate-casualties").click(this._onGenerateCasualties.bind(this));
            html.find(".initiative-roll").click(this._onInitiativeRoll.bind(this));
        }

        super.activateListeners(html);
    }

    _onGenerateCasualties(event) {
        var roll = new Roll("1d10", {});
        let mass = roll.roll().total;
        let shamble = roll.reroll().total;

        this.actor.update({
            "data.mass.value": mass,
            "data.mass.max": mass,
            "data.shamble.value": shamble,
            "data.shamble.max": shamble
        })
    }

    _onInitiativeRoll(event) {
        this.actor.rollInitiative({ createCombatants: true });
    }
}