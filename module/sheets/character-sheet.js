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
            html.find(".item-edit").click(this._onItemEdit.bind(this));
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
        let actionName = event.currentTarget.dataset.actionName;
        let confirmed = false;

        new Dialog({
            title: "Roll " + actionName,
            content: `
             <form>
              <div class="form-group">
               <label>Roll Modifier:</label>
               <input id="modifier-value" name="modifier-value" value="0"></input>
              </div>
             </form>
             `,
            buttons: {
                one: {
                    icon: '<i class="fas fa-check"></i>',
                    label: "Roll!",
                    callback: () => confirmed = true
                },
                two: {
                    icon: '<i class="fas fa-times"></i>',
                    label: "Cancel",
                    callback: () => confirmed = false
                }
            },
            default: "Cancel",
            close: html => {
                if (confirmed) {
                    let rollFormula = "1d10 + @skillModifier + @chargeModifier - 1d10";
                    let rollData = {
                        skillModifier: event.currentTarget.dataset.actionValue,
                        chargeModifier: parseInt(html.find('[name=modifier-value]')[0].value)
                    };
                    var roll = new Roll(rollFormula, rollData).roll();
                    let success = roll.total > 0;
                    roll.toMessage({
                        flavor: success ? "Success on " + actionName + "!" : "Failure on " + actionName + "!",
                        user: game.user.data._id,
                        speaker: ChatMessage.getSpeaker()
                    });
                }
            }
        }).render(true);
    }

    _onItemEdit(event) {
        event.preventDefault();
        let element = event.currentTarget;
        let itemId = element.closest(".actor-item").dataset.itemId;
        let item = this.actor.items.get(itemId);
        item.sheet.render(true);
    }
}