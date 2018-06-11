import * as dealer from '../../../logic/dealer/dealer';
import {GameState} from "../../../logic/state";

export default class BoardService {

    static moveCard(card, sourcePile) {
        dealer.handleMoveCard(card, sourcePile);
        debugger;
        if (GameState.players.currentPlayer.name === GameState.players.list.bot.name) {
            GameState.players.currentPlayer = GameState.players.list.human
        }else {
            GameState.players.currentPlayer = GameState.players.list.bot;
        }
        console.log(GameState);
    }
}
