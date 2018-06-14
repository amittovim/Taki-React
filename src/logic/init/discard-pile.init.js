import {PileTypeEnum} from "../../app/enums/pile-type.enum";
import PileModel from "../../app/api-models/pile.class";
import {GameState} from "../state";

// == Create Draw Pile ==

export default function initDiscardPile() {
    createDiscardPile();
}

function createDiscardPile() {
    GameState.DiscardPile = new PileModel(PileTypeEnum.DiscardPile);
}
