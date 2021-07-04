export const _getInitiativeFormula = function () {
    const actor = this.actor;
    const parts = [];

    if (!actor) {
        parts.push("1d10");
    } else {
        if (actor.type == "character") {
            let initiativeBonus = actor.data.data.potentials.speed.value;
            parts.push("1d10");
            parts.push(initiativeBonus);
        }
    }

    return parts.filter(p => p !== null).join(" + ");
};