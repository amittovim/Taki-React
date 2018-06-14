import * as dealer from '../../../logic/dealer/dealer';
import {GameState} from "../../../logic/state";

export default class BoardService {

    static moveCard(card, sourcePile) {
        dealer.handleMoveCard(card, sourcePile);

        // TODO: remove this from here. its temporary just to see that the moves are working
        if (GameState.players.currentPlayer.name === GameState.players.list.BotPile.name) {
            GameState.players.currentPlayer = GameState.players.list.HumanPile
        }else {
            GameState.players.currentPlayer = GameState.players.list.BotPile;
        }
        console.log(GameState);
    }
}
