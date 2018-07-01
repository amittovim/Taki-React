import {GameState} from "./state";
import {pickNextBotMove, playGameMove, playHumanMove} from "./main";
import {GameStatusEnum} from "./game-status.enum";
import * as init from './main';
import * as gameStateHistory from './history/state-history';

export function initGame() {
    init.initGame();
    return GameState;
}

export function requestCardMove(cardId) {
    const stateChange = playHumanMove(cardId);

    return new Promise((resolve) => {
        resolve({
            header: GameStatusEnum.GameStateChanged,
            body: stateChange
        });
    });
}

export function requestGameStateUpdate() {
    playGameMove(pickNextBotMove());
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                header: GameStatusEnum.GameStateChanged,
                body: GameState
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
