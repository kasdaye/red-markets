export default class NegotiationSheet extends ActorSheet {
    get template() {
        return `systems/red-markets/templates/sheets/negotiation-sheet.html`;
    }

    getData() {
        const data = super.getData();
        data.config = CONFIG.redmarkets;
        return data;
    }
}