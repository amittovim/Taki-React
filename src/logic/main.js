import initPlayers from './init/players.init';
import initDrawPile from './init/draw-pile.init';
import initDiscardPile from './init/discard-pile.init';
import * as dealer from './dealer/dealer';
import {GameState} from "./state";
import {GameStatus} from "./game-status.enum";
import {PlayerEnum} from "../app/enums/player.enum";
import {handleMoveCard} from "./dealer/dealer";

// ===== Game init functions =====

export function initGame() {
    GameState.status = GameStatus.GameInit;
    initPlayers();
    initDrawPile();
    initDiscardPile();
    dealer.dealCards();
    if (GameState.currentPlayer === PlayerEnum.Bot) {
        playBotMove();
    }
    GameState.status = GameStatus.UpdatedGameState;
    return GameState;
}

// API

export function requestMoveCard(cardId) {
    return playHumanMove(cardId);
}

export function requestGameStateUpdate() {
    return new Promise((resolve, reject) => {
        if (humanPlayerHasAvailableMoves()) {
            resolve({
                message: GameStatusMessageEnum.ProceedPlayersTurn
            })
        } else {
            let stateChange = playBotMove();
            resolve(stateChange);
        }
    });
}

// Inner

function humanPlayerHasAvailableMoves() {
    return false;
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

function isPutCardMoveLegal(card) {
    let isSameColor, isTwoPlus;

    // if twoPlus is invoked only other twoPlus card is legal
    if (GameState.actionState === CardActionEnum.TwoPlus) {
        isTwoPlus = !!(card.action === CardActionEnum.TwoPlus)
        if (!isTwoPlus) {
            return false;
        }
    }// if taki is invoked only cards with the same color are legal
    else if (GameState.actionState === CardActionEnum.Taki) {
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
    debugger;
    GameState[GameState.currentPlayer].pile.cards.forEach(function (card, index) {
        if (isPutCardMoveLegal(card)) {
            legalCards.push(index);
        }
    });
    return (legalCards.length > 0);
}

function playBotMove() {
    GameState.currentPlayer = PlayerEnum.Bot;
    return playGameMove(GameState.BotPile.cards[0].id);
}

function playHumanMove(cardId) {
    GameState.currentPlayer = PlayerEnum.Human;
    return playGameMove(cardId);
}

function playGameMove(cardId) {
    updateSelectedCard(cardId);
    return new Promise((resolve, reject) => {
        if (isMoveLegal()) {
            const stateChange = handleMoveCard();
            const message = GameState.currentPlayer === PlayerEnum.Human ? GameStatus.CardUpdated : GameStatus.UpdatedGameState;
            setTimeout(() => {
                resolve({
                    message: message,
                    payload: stateChange
                });
            }, 500);
        } else {
            reject(new Error(`Invalid move for ${GameState.currentPlayer}`));
        }
    });
}


function updateSelectedCard(cardId) {
    const gameCards = GameState.HumanPile.cards
        .concat(GameState.BotPile.cards)
        .concat(GameState.DiscardPile.cards)
        .concat(GameState.DrawPile.cards);
    GameState.selectedCard = gameCards.filter((card) => card.id === cardId)[0];
}

export function switchPlayers() {
    GameState.currentPlayer = GameState.currentPlayer === PlayerEnum.Bot ? PlayerEnum.Human : PlayerEnum.Bot;
}
