import * as game from '../../logic/main';

export function getInitialState() {
    return game.initGame();
}

export function getGameState() {
    return game.getGameState();
}