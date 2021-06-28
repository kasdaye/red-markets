export default class PersonSheet extends ItemSheet {
    get template() {
        return `systems/red-markets/templates/sheets/person-sheet.html`;
    }

    getData() {
        const data = super.getData();
        data.config = CONFIG.redmarkets;
        return data;
    }
}