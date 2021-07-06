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
            html.find(".add-market-force-gear").click(this._onAddHaul.bind(this));
            html.find(".inline-edit").change(this._onInlineEdit.bind(this));
            html.find(".item-delete").click(this._onItemDelete.bind(this));
        }

        super.activateListeners(html);
    }

    _onInitiativeRoll(event) {
        this.actor.rollInitiative({ createCombatants: true });
    }

    _onAddHaul(event) {
        event.preventDefault();
        let element = event.currentTarget;

        let itemData = {
            name: element.dataset.defaultName,
            type: element.dataset.type
        }

        return this.actor.createEmbeddedDocuments("Item", [itemData]);
    }

    _onInlineEdit(event) {
        let element = event.currentTarget;
        let itemId = element.closest(".actor-item").dataset.itemId;
        let item = this.actor.items.get(itemId);
        let field = element.dataset.field;

        return item.update({ [field]: element.value });
    }

    _onItemDelete(event) {
        event.preventDefault();
        let element = event.currentTarget;
        let itemId = element.closest(".actor-item").dataset.itemId;
        let item = this.actor.items.get(itemId);
        item.delete();
    }
}