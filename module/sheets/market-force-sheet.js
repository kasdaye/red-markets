export default class MarketForceSheet extends ActorSheet {
    get template() {
        return `systems/red-markets/templates/sheets/market-force-sheet.hbs`;
    }

    getData() {
        const data = super.getData();
        data.config = CONFIG.redmarkets;
        return data;
    }

    activateListeners(html) {
        if (this.actor.isOwner) {
            html.find(".initiative-roll").click(this._onInitiativeRoll.bind(this));
        }

        super.activateListeners(html);
    }

    _onInitiativeRoll(event) {
        this.actor.rollInitiative({ createCombatants: true });
    }
}