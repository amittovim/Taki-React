import initPlayers from './init/players.init';
import initDrawPile from './init/draw-pile.init';
import initDiscardPile from './init/discard-pile.init';
import * as dealer from './dealer/dealer';
import {GameState} from "./state";
import {getDestinationPile} from "./dealer/dealer";
import * as utils from "./utils/model.utils";
import {getDestinationPileType} from "./dealer/dealer";
import {PileTypeEnum} from "../app/enums/pile-type.enum";
import {GameStatus} from "./game-status.enum";


// ===== Game init functions =====

export function initGame() {
    GameState.status = GameStatus.GameInit;
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
    return true;
}

function updateSelectedCard(cardId) {
    const gameCards = GameState.HumanPile.cards
        .concat(GameState.BotPile.cards)
        .concat(GameState.DiscardPile.cards)
        .concat(GameState.DrawPile.cards);
    GameState.selectedCard = gameCards.filter((card) => card.id === cardId)[0];
}
