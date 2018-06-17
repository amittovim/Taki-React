import {CardActionEnum} from "../enums/card-action-enum";
import {PileTypeEnum} from "../enums/pile-type.enum";

export function isHumanMoveLegal(card, drawPile, actionState, leadingCard, currentPlayerPile) {
    let isWithdrawingCard = ( card.parentPileType === PileTypeEnum.DrawPile );

    // check move legality if player want to PUT a card on discard pile
    if (!isWithdrawingCard ) {
        return isPutCardMoveLegal(card, actionState, leadingCard);
    } else {
        // // check move legality if player want to GET (withdrawal) a card from draw pile
        return isGetCardMoveLegal(currentPlayerPile,drawPile);
    }
}

function isPutCardMoveLegal(card, actionState, leadingCard) {
    let isSameColor;

    // if twoPlus is invoked only other twoPlus card is legal
    if (actionState === CardActionEnum.TwoPlus) {
        if (card.action !== CardActionEnum.TwoPlus) {
            return false;
        }
    } // if taki is invoked only cards with the same color are legal
    else if (actionState === CardActionEnum.Taki) {
        isSameColor = (card.color && leadingCard.color === card.color);
        if (!isSameColor) {
            return false;
        }
    } else {
        isSameColor = (card.color && leadingCard.color === card.color);
        let isSameNumber = (card.number && leadingCard.number === card.number);
        let isSameAction = (card.action && leadingCard.action === card.action);
        let isUnColoredActionCard = (card.action && !card.color);
        if (!(isSameColor || isSameNumber || isSameAction || isUnColoredActionCard)) {
            return false;
        }
    }
    return true;
}

function isPileEmpty(pile) {
    return (pile.cards.length >0)

}

function isGetCardMoveLegal(currentPlayerPile,drawPile) {
    // checking if withdrawing Card From DrawPile is a legal move - only if no other move is available
    // for player and drawPile is not empty
    return ( !isPileEmpty(drawPile) && !availableMoveExist(currentPlayerPile) );
}

function availableMoveExist(currentPlayerPile) {
    let legalCards = [];
    currentPlayerPile.cards.forEach(function (card, index) {
        if (isPutCardMoveLegal(card)) {
            legalCards.push(index);
        }
    });
    return (legalCards.length > 0);
}
