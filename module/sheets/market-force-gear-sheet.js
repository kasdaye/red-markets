export default class MarketForceGearSheet extends ItemSheet {
    get template() {
        return `systems/red-markets/templates/sheets/market-force-gear-sheet.hbs`;
    }

    getData() {
        const data = super.getData();
        data.config = CONFIG.redmarkets;
        return data;
    }
}