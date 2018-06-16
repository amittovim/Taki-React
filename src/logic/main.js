import initPlayers from './init/players.init';
import initDrawPile from './init/draw-pile.init';
import initDiscardPile from './init/discard-pile.init';
import * as dealer from './dealer/dealer';
import {GameState} from "./state";
import {getDestinationPile} from "./dealer/dealer";
import * as utils from "./utils/model.utils";
import {getDestinationPileType} from "./dealer/dealer";

// ===== Game init functions =====

export function initGame() {
    initPlayers();
    initDrawPile();
    initDiscardPile();
    dealer.dealCards();
    console.log(GameState);
    return GameState;
}

export function requestMoveCard(cardId) {

    return new Promise((resolve, reject) => {
        updateSelectedCard(cardId);
        if (isMoveLegal()) {
            let newState = moveCard();
            resolve(newState);
        } else {
            reject('illegal move!');
        }
    });
}

function isMoveLegal() {
    let card = GameState.selectedCard;
    let isDrawPileEmpty = !(GameState.DrawPile.cards.length > 0);
    let isRequestingCardFromDrawPile = card.parentPileType === PileTypeEnum.DrawPile;
    let drawCardFromDrawPile = ((!isDrawPileEmpty) &&
        ((isRequestingCardFromDrawPile) || (card === GameState.DrawPile.cards[GameState.DrawPile.cards.length - 1])) );

    // check if player want to Put a card on discard pile (only the card owner can do it) and if so check if the active card is owned by the current player
    if ( (!drawCardFromDrawPile) && ('hand ' + GameState.currentPlayer.name + '-hand player cards-container' === card.element.parentElement.className) ) {
        return isPutCardMoveLegal(card);
    } else {
        // check if player want to Get a card from draw pile
        return isGetCardMoveLegal();
    }
}

function isPutCardMoveLegal() {
    let isSameColor;
    let card = GameState.selectedCard;

    // if twoPlus is invoked only other twoPlus card is legal
    if ( GameState.actionState  GameState.selectedCard === )
    // if taki is invoked only cards with the same color are legal
    if (GameState.activeAction === CardActionEnum.Taki) {
        isSameColor = !!(card.color && GameState.leadingCard.color === card.color);
        if (!isSameColor) {
            return false;
        }
    }else {
        isSameColor      = !!(card.color  && GameState.leadingCard.color === card.color);
        let isSameNumber = !!(card.number && GameState.leadingCard.number === card.number);
        let isSameAction = !!(card.action && GameState.leadingCard.action === card.action);
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
    GameState[GameState.currentPlayer].pile.cards.forEach(function (card, index) {
        if (isMoveLegal(card)) {
            legalCards.push(index);
        }
    });
    return (legalCards.length > 0);
}

function updateSelectedCard(cardId) {
    const gameCards = GameState.HumanPile.cards
        .concat(GameState.BotPile.cards)
        .concat(GameState.DiscardPile.cards)
        .concat(GameState.DrawPile.cards);
    GameState.selectedCard = gameCards.filter((card) => card.id === cardId)[0];
}

function moveCard() {
    const sourcePileType = GameState.selectedCard.parentPileType;
    const destinationPileType = getDestinationPileType(sourcePileType);
    GameState.selectedCard.parentPileType = destinationPileType;
    utils.pullItemFromArray(GameState.selectedCard, GameState[sourcePileType].cards);
    utils.insertToEndOfArray(GameState.selectedCard, GameState[destinationPileType].cards);
    return {
        [sourcePileType]: {
            ...GameState[sourcePileType]
        },
        [destinationPileType]: {
            ...GameState[destinationPileType]
        }
    };
}
