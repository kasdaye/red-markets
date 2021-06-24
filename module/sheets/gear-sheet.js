export default class GearSheet extends ItemSheet {
    get template() {
        return `systems/red-markets/templates/sheets/gear-sheet.html`;
    }

    getData() {
        const data = super.getData();
        data.config = CONFIG.redmarkets;
        return data;
    }
}