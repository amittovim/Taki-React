import {PileEnum} from "../../app/enums/pile.enum";
import PileModel from "../../app/api-models/pile.class";
import {GameState} from "../state";

// == Create Draw Pile ==

export default function initDiscardPile() {
    createDiscardPile();
}

function createDiscardPile() {
    GameState.discardPile = new PileModel(PileEnum.DiscardPile);
}
