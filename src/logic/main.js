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
        debugger;
        console.log(GameState.currentPlayer);
        playBotMove();
    }
    return GameState;
}

// export function requestMoveCard(cardId) {
//     return new Promise((resolve, reject) => {
//         const newState = gameMove();
//         if (isMoveLegal()) {
//             let newState = moveCard();
//             resolve(newState);
//         } else {
//             reject('illegal move!');
//         }
//     });
// }

// API

export function requestMoveCard(cardId) {
    return makeGameMove(cardId);
}

export function requestGameStateUpdate() {
    return new Promise((resolve, reject) => {
        if (hasMovesAvailable()) {
            resolve({
                message: GameStatusMessageEnum.ProceedPlayersTurn
            })
        } else {
            GameState.currentPlayer = PlayerEnum.Bot;
            resolve(playBotMove());
        }
    });
}

// Inner

function hasMovesAvailable() {
    return false;
}

function isMoveLegal() {
    return true;
}


function playBotMove() {
    return makeGameMove(GameState.BotPile.cards[0].id);
}

function makeGameMove(cardId) {
    updateSelectedCard(cardId);
    return new Promise((resolve, reject) => {
        if (isMoveLegal()) {
            const newState = moveCard();
            const message = GameState.currentPlayer === PlayerEnum.Human ? GameStatusMessageEnum.CardUpdated : GameStatusMessageEnum.UpdatedGameState;
            resolve({
                message: message,
                payload: newState
            });
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
