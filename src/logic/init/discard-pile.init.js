import {PileEnum} from "../../app/api-models/enums/pile.enum";
import Pile from "../../app/api-models/pile.class";

// == Create Draw Pile ==

export default function initDiscardPile() {
    createDiscardPile();
}

function createDiscardPile() {
    GameState.discardPile = new Pile(PileEnum.DiscardPile);
}
