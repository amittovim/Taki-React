import {CardActionEnum} from "../enums/card-action-enum";
import {GameState} from "../../logic/state";
import {PileTypeEnum} from "../enums/pile-type.enum";
import * as Game from './game.component'


export function isMoveLegal() {
    let card = Game.state.selectedCard;
    let isDrawPileEmpty = !(Game.state.DrawPile.cards.length > 0);
    let isRequestingCardFromDrawPile = card.parentPileType === PileTypeEnum.DrawPile;
    let drawCardFromDrawPile = ((!isDrawPileEmpty) &&
        ((isRequestingCardFromDrawPile) || (card === Game.state.DrawPile.cards[Game.state.DrawPile.cards.length - 1])) );

    // check if player want to Put a card on discard pile (only the card owner can do it) and if so check if the active card is owned by the current player
    if ( (!drawCardFromDrawPile) && ('hand ' + Game.state.currentPlayer.name + '-hand player cards-container' === card.element.parentElement.className) ) {
        return isPutCardMoveLegal(card);
    } else {
        // check if player want to Get a card from draw pile
        return isGetCardMoveLegal();
    }
}

function isPutCardMoveLegal(card) {
    let isSameColor, isTwoPlus;

    // if twoPlus is invoked only other twoPlus card is legal
    if (Game.state.actionState === CardActionEnum.TwoPlus) {
        isTwoPlus = !!(card.action === CardActionEnum.TwoPlus)
        if (!isTwoPlus) {
            return false;
        }
    }// if taki is invoked only cards with the same color are legal
    else if (Game.state.actionState === CardActionEnum.Taki) {
        isSameColor = !!(card.color && Game.state.leadingCard.color === card.color);
        if (!isSameColor) {
            return false;
        }
    }else {
        isSameColor      = !!(card.color  && Game.state.leadingCard.color === card.color);
        let isSameNumber = !!(card.number && Game.state.leadingCard.number === card.number);
        let isSameAction = !!(card.action && Game.state.leadingCard.action === card.action);
        let isUnColoredActionCard = !!(card.action && !card.color);
        if (!(isSameColor || isSameNumber || isSameAction || isUnColoredActionCard)) {
            return false;
        }
    }
    return true;
}

function isGetCardMoveLegal() {
    // checking if drawing Card From DrawPile is a legal move - only if no other move is available for player
    if (availableMoveExist()) {
        return false;
    }
    return true;
}

function availableMoveExist() {
    let legalCards = [];
    debugger;
    Game.state[Game.state.currentPlayer].pile.cards.forEach(function (card, index) {
        if (isPutCardMoveLegal(card)) {
            legalCards.push(index);
        }
    });
    return (legalCards.length > 0);
}
