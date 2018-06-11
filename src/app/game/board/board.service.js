import * as dealer from '../../../logic/dealer/dealer';
import {GameState} from "../../../logic/state";

export default class BoardService {

    static moveCard(card, sourcePile) {
        dealer.handleMoveCard(card, sourcePile);

        // TODO: remove this from here. its temporary just to see that the moves are working
        if (GameState.players.currentPlayer.name === GameState.players.list.bot.name) {
            GameState.players.currentPlayer = GameState.players.list.human
        }else {
            GameState.players.currentPlayer = GameState.players.list.bot;
        }
        console.log(GameState);
    }
}
