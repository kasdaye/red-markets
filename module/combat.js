export const _getInitiativeFormula = function () {
    const actor = this.actor;
    const parts = [];

    if (!actor) {
        parts.push("1d10");
    } else if (actor.type == "character") {
        let initiativeBonus = actor.data.data.potentials.speed.value;
        parts.push("1d10");
        parts.push(initiativeBonus);
    } else if (actor.type == "casualties") {
        parts.push("0");
    } else if (actor.type == "vector") {
        let initiativeBonus = actor.data.data.murderModifier;
        parts.push("1d10");
        parts.push(initiativeBonus);
    } else if (actor.type == "marketForce") {
        parts.push("1d10");
    }

    return parts.filter(p => p !== null).join(" + ");
};