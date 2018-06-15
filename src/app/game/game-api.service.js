// API

import * as logic from "../../logic/main";

export function getInitialState() {
    return logic.initGame();
}

export function requestMoveCard(cardId) {
    return logic.requestMoveCard(cardId)
}

export function requestGameStateUpdate() {
    return logic.requestGameStateUpdate()
}