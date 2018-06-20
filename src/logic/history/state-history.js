import {GameState} from "../state";
import {deepCopy} from "../utils/model.utils";

export let GameStateHistory = [];
let currentStateIdx = 0;

export function getPrevGameState() {
    currentStateIdx = currentStateIdx - 1;
    if (currentStateIdx < 0) {
        currentStateIdx = GameStateHistory.length - 1;
    }
    return GameStateHistory[currentStateIdx];
}

export function getNextGameState() {
    currentStateIdx = currentStateIdx + 1;
    if (GameStateHistory.length <= currentStateIdx) {
        currentStateIdx = 0;
    }
    return GameStateHistory[currentStateIdx];
}

export function saveGameState() {
    GameStateHistory.push(deepCopy(GameState));
}
