import initPlayers from './init/players.init';
import initDrawPile from './init/draw-pile.init';
import initDiscardPile from './init/discard-pile.init';
import * as dealer from './dealer/dealer';
import {GameState} from "./state";
import {GameStatus} from "./game-status.enum";
import {PlayerEnum} from "../app/enums/player.enum";

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
    debugger;
}

export function switchPlayers() {
    GameState.currentPlayer = GameState.currentPlayer === PlayerEnum.Bot ? PlayerEnum.Human : PlayerEnum.Bot;
}
