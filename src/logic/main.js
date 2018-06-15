import initPlayers from './init/players.init';
import initDrawPile from './init/draw-pile.init';
import initDiscardPile from './init/discard-pile.init';
import * as dealer from './dealer/dealer';
import {GameState} from "./state";
import {getDestinationPile} from "./dealer/dealer";
import * as utils from "./utils/model.utils";
import {getDestinationPileType} from "./dealer/dealer";
import {GameStatusMessageEnum} from "../app/game/game.component";
import {PlayerEnum} from "../app/enums/player.enum";

// ===== Game init functions =====

export function initGame() {
    initPlayers();
    initDrawPile();
    initDiscardPile();
    dealer.dealCards();
    if (GameState.currentPlayer === PlayerEnum.Bot) {
        playBotMove();
    }
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
    return true;
}

function playBotMove() {
    GameState.currentPlayer = PlayerEnum.Bot;
    console.log(GameState.currentPlayer);
    return playGameMove(GameState.BotPile.cards[0].id);
}

function playHumanMove(cardId) {
    GameState.currentPlayer = PlayerEnum.Human;
    console.log(GameState.currentPlayer);
    return playGameMove(cardId);
}

function playGameMove(cardId) {
    updateSelectedCard(cardId);
    return new Promise((resolve, reject) => {
        if (isMoveLegal()) {
            const newState = moveCard();
            const message = GameState.currentPlayer === PlayerEnum.Human ? GameStatusMessageEnum.CardUpdated : GameStatusMessageEnum.UpdatedGameState;
            setTimeout(() => {
                resolve({
                    message: message,
                    payload: newState
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
