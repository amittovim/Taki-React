import PlayerModel from '../../app/api-models/player.class';
import {PlayerEnum} from "../../app/enums/player.enum";
import {GameState} from "../state";
import * as utils from '../utils/model.utils';

// === Init players ===

export default function initPlayers() {
    createPlayers();
    pickFirstPlayer();
}

function createPlayers() {
    GameState.players.list = {
        bot: new PlayerModel(PlayerEnum.Bot),
        human: new PlayerModel(PlayerEnum.Human)
    };
}

function pickFirstPlayer() {
    const randomNumber = utils.getRandomInt(0, 1);
    GameState.players.currentPlayer = randomNumber === 0 ? GameState.players.list.bot : GameState.players.list.human;

}
