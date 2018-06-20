// API

import * as api from '../../logic/api';

export function getInitialState() {
    return api.initGame();
}

export function requestMoveCard(cardId) {
    return api.requestCardMove(cardId)
}

export function requestGameStateUpdate() {
    return api.requestGameStateUpdate()
}

export function getGameStateHistory(getNext) {
    return api.getGameStateHistory(getNext);
}
