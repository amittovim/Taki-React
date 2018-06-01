import * as utils from "./model.utils";

export function getTopOfPile(pile) {
    return utils.pullItemFromEndOfArray(pile.cards);
}

