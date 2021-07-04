export default class HaulSheet extends ItemSheet {
    get template() {
        return `systems/red-markets/templates/sheets/haul-sheet.hbs`;
    }

    getData() {
        const data = super.getData();
        data.config = CONFIG.redmarkets;
        return data;
    }
}