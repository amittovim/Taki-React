import {PlayerEnum} from "../../app/enums/player.enum";
import {GameState} from "../state";
import * as utils from '../utils/model.utils';
import {PlayerModel} from "../../app/api-models/player.class";

// === Init players ===

export default function initPlayers() {
    createPlayers();
    pickFirstPlayer();
}

function createPlayers() {
    GameState.Human = new PlayerModel(PlayerEnum.Human);
    GameState.Bot = new PlayerModel(PlayerEnum.Bot);
    GameState.HumanPile = GameState.Human.pile;
    GameState.BotPile = GameState.Bot.pile;
}

function pickFirstPlayer() {
    const randomNumber = utils.getRandomInt(0, 1);
    GameState.currentPlayer = randomNumber === 0 ? PlayerEnum.Human : PlayerEnum.Bot;
}
