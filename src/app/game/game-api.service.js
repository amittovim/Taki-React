// API

import * as game from "../../logic/main";
import Game from "./game.component";

export function getInitialState() {
    return game.initGame();
}

export function requestMoveCard(cardId) {
    return game.requestMoveCard(cardId)
}
