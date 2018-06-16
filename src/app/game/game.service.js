import {CardActionEnum} from "../enums/card-action-enum";
import {GameState} from "../../logic/state";
import {PileTypeEnum} from "../enums/pile-type.enum";
import * as Game from './game.component'


export function isMoveLegal(card, drawPile, actionState,leadingCard, currentPlayerPile) {
    let isDrawPileEmpty = !(drawPile.cards.length > 0);
    let isRequestingCardFromDrawPile = card.parentPileType === PileTypeEnum.DrawPile;
    let drawCardFromDrawPile = ((!isDrawPileEmpty) &&
        ((isRequestingCardFromDrawPile) || (card === drawPile.cards[drawPile.cards.length - 1])) );

    // check if player want to Put a card on discard pile
    if (!drawCardFromDrawPile)  {
        return isPutCardMoveLegal(card,actionState,leadingCard);
    } else {
        // check if player want to Get a card from draw pile
        return isGetCardMoveLegal(currentPlayerPile);
    }
}

function isPutCardMoveLegal(card,actionState, leadingCard) {
    let isSameColor, isTwoPlus;

    // if twoPlus is invoked only other twoPlus card is legal
    if (actionState === CardActionEnum.TwoPlus) {
        isTwoPlus = !!(card.action === CardActionEnum.TwoPlus)
        if (!isTwoPlus) {
            return false;
        }
    }// if taki is invoked only cards with the same color are legal
    else if (actionState === CardActionEnum.Taki) {
        isSameColor = !!(card.color && leadingCard.color === card.color);
        if (!isSameColor) {
            return false;
        }
    }else {
        isSameColor      = !!(card.color  && leadingCard.color === card.color);
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

function isGetCardMoveLegal(currentPlayerPile) {
    debugger;
    // checking if drawing Card From DrawPile is a legal move - only if no other move is available for player
    if (availableMoveExist(currentPlayerPile)) {
        return false;
    }
    return true;
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
