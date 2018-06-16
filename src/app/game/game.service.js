import {CardActionEnum} from "../enums/card-action-enum";
import {PileTypeEnum} from "../enums/pile-type.enum";

export function isMoveLegal(card, drawPile, actionState, leadingCard, currentPlayerPile) {
    let isDrawPileEmpty = drawPile.cards.length === 0;
    let isRequestingCardFromDrawPile = card.parentPileType === PileTypeEnum.DrawPile; // TODO: change isRequestingCardFromDrawPile to a better name
    let drawCardFromDrawPile = ((!isDrawPileEmpty) && // TODO: You have to refactor this
        ((isRequestingCardFromDrawPile) || (card === drawPile.cards[drawPile.cards.length - 1])));

    // check if player want to Put a card on discard pile
    if (!drawCardFromDrawPile) {
        return isPutCardMoveLegal(card, actionState, leadingCard);
    } else {
        // check if player want to Get a card from draw pile
        return isGetCardMoveLegal(currentPlayerPile);
    }
}

// TODO: remove all !! and debuggers
function isPutCardMoveLegal(card, actionState, leadingCard) {
    let isSameColor;

    // if twoPlus is invoked only other twoPlus card is legal
    if (actionState === CardActionEnum.TwoPlus) {
        if (card.action !== CardActionEnum.TwoPlus) {
            return false;
        }
    } // if taki is invoked only cards with the same color are legal
    else if (actionState === CardActionEnum.Taki) {
        isSameColor = !!(card.color && leadingCard.color === card.color);
        if (!isSameColor) {
            return false;
        }
    } else {
        isSameColor = !!(card.color && leadingCard.color === card.color);
        let isSameNumber = !!(card.number && leadingCard.number === card.number);
        let isSameAction = !!(card.action && leadingCard.action === card.action);
        let isUnColoredActionCard = !!(card.action && !card.color);
        if (!(isSameColor || isSameNumber || isSameAction || isUnColoredActionCard)) {
            debugger;
            return false;
        }
    }
    return true;
}

// TODO: considering delete isGetCardMoveLegal and use just !availableMoveExist
function isGetCardMoveLegal(currentPlayerPile) {
    // checking if drawing Card From DrawPile is a legal move - only if no other move is available for player
    return !availableMoveExist(currentPlayerPile);
}

function availableMoveExist(currentPlayerPile) {
    let legalCards = [];
    debugger;
    currentPlayerPile.cards.forEach(function (card, index) {
        if (isPutCardMoveLegal(card)) {
            legalCards.push(index);
        }
    });
    return (legalCards.length > 0);
}
