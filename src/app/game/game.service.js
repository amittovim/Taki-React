import * as game from '../../logic/main';
import * as dealer from '../../logic/dealer/dealer';

export function getInitialState() {
    return game.initGame();
}

export function getGameState() {
    return game.getGameState();
}

export function moveCard(card, sourcePile) {
    return dealer.handleMoveCard(card, sourcePile);
}
