export default class CasualtiesSheet extends ActorSheet {
    get template() {
        return `systems/red-markets/templates/sheets/casualties-sheet.hbs`;
    }

    getData() {
        const data = super.getData();
        data.config = CONFIG.redmarkets;
        return data;
    }
}