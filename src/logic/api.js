import {GameState, movesInArray} from "./state";
import {pickNextBotMove, playHumanMove} from "./main";
import {GameStatusEnum} from "./game-status.enum";
import {PlayerEnum} from "../app/enums/player.enum";
import * as init from './main';
import * as gameStateHistory from './history/state-history';
import {deepCopy} from "./utils/model.utils";

export function initGame() {
    init.initGame();
    return GameState;
}

export function requestCardMove(cardId) {
    const stateChange = playHumanMove(cardId);
    debugger;
    while (GameState.currentPlayer === PlayerEnum.Bot) {
        pickNextBotMove();
    }
    movesInArray.push(deepCopy(GameState));
    return new Promise((resolve) => {
        resolve({
            header: GameStatusEnum.GameStateChanged,
            body: movesInArray
        });
    });
}

export function requestGameStateUpdate() {
    while (GameState.currentPlayer === PlayerEnum.Bot) {
        pickNextBotMove();
    }
    debugger;
    movesInArray.push(deepCopy(GameState));
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                header: GameStatusEnum.GameStateChanged,
                body: movesInArray
            });
        }, 1000);
    });
}

export function getGameStateHistory(getNext = true) {
    return new Promise((resolve) => {
        resolve({
            body: getNext ? gameStateHistory.getNextGameState() : gameStateHistory.getPrevGameState()
        })
    });
}
