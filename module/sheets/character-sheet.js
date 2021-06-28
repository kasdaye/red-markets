export default class CharacterSheet extends ActorSheet {
    get template() {
        return `systems/red-markets/templates/sheets/character-sheet.html`;
    }

    getData() {
        const data = super.getData();
        data.config = CONFIG.redmarkets;
        console.log(data);
        return data;
    }

    activateListeners(html) {
        if (this.actor.isOwner) {
            html.find(".skill-roll").click(this._onSkillRoll.bind(this));
        }

        super.activateListeners(html);
    }

    static get defaultOptions() {
        let options = mergeObject(super.defaultOptions, {
            scrollY: [".outer-content"],
            tabs: [{ navSelector: '.tabs', contentSelector: '.content', initial: 'taker' }]
        });
        return options;
    }

    _onSkillRoll(event) {
        let rollFormula = "1d10 + @actionValue - 1d10";
        let rollData = {
            actionValue: event.currentTarget.dataset.actionValue
        };
        let roll = new Roll(rollFormula, rollData).roll();
        let success = roll.total > 0;

        console.log(roll);

        let actionName = event.currentTarget.dataset.actionName;
        const promises = [roll.toMessage({
            flavor: success ? "Success on " + actionName + "!" : "Failure on " + actionName + "!",
            user: game.user.data._id,
            speaker: ChatMessage.getSpeaker()
        })];

        return Promise.all(promises).then(() => roll);
    }
}