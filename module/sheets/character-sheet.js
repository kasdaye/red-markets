export default class CharacterSheet extends ActorSheet {
    get template() {
        return `systems/red-markets/templates/sheets/character-sheet.html`;
    }

    getData() {
        const data = super.getData();
        data.config = CONFIG.redmarkets;
        return data;
    }

    activateListeners(html) {
        if (this.actor.isOwner) {
            html.find(".skill-roll").click(this._onSkillRoll.bind(this));
            html.find(".item-edit").click(this._onItemEdit.bind(this));
            html.find(".item-delete").click(this._onItemDelete.bind(this));

            html.find(".add-haul").click(this._onAddHaul.bind(this));
            html.find(".inline-edit").change(this._onInlineEdit.bind(this));
            html.find(".initiative-roll").click(this._onInitiativeRoll.bind(this));
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
                    roll.toMessage({
                        flavor: this.createRollFlavourString(actionName, roll),
                        user: game.user.id,
                        speaker: { actor: this.object.data._id, alias: this.object.data.name }
                    });
                }
            }
        }).render(true);
    }

    createRollFlavourString(actionName, roll) {
        let naturalBlackDieResult = roll.dice[0].results[0].result;
        let naturalRedDieResult = roll.dice[1].results[0].result;
        let actionStatus = "";
        if (naturalBlackDieResult == naturalRedDieResult) {
            if (naturalRedDieResult % 2 == 0) {
                actionStatus = "Critical Success";
            } else {
                actionStatus = "Critical Failure";
            }
        } else {
            let success = roll.total > 0;
            actionStatus = success ? "Success" : "Failure";
        }
        let rollFlavour = actionStatus + " on " + actionName + "!";
        return rollFlavour;
    }

    _onItemEdit(event) {
        event.preventDefault();
        let element = event.currentTarget;
        let itemId = element.closest(".actor-item").dataset.itemId;
        let item = this.actor.items.get(itemId);
        item.sheet.render(true);
    }

    _onItemDelete(event) {
        event.preventDefault();
        let element = event.currentTarget;
        let itemId = element.closest(".actor-item").dataset.itemId;
        let item = this.actor.items.get(itemId);
        item.delete();
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

    _onInitiativeRoll(event) {
        this.actor.rollInitiative({createCombatants: true});
    }
}