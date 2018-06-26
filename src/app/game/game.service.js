import {PileTypeEnum} from "../enums/pile-type.enum";
import * as Server from './../../logic/main'
import {GameState} from "../../logic/state";
import {ALL_MOVES_LEGAL} from "../../logic/consts";

export function isHumanMoveLegal(card, drawPile, actionState, leadingCard, humanPile) {
    if (ALL_MOVES_LEGAL) {
        return true;
    }
    let isWithdrawingCard = (card.parentPileType === PileTypeEnum.DrawPile);

    // check move legality if player want to PUT a card on discard pile
    if (!isWithdrawingCard) {
        return Server.isPutCardMoveLegal(card, actionState, leadingCard);
    } else {
        // // check move legality if player want to GET (withdrawal) a card from draw pile
        return Server.isGetCardMoveLegal(humanPile, drawPile, actionState, leadingCard);
    }
}

