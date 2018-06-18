import {PileTypeEnum} from "../enums/pile-type.enum";

export class CardModel {
    constructor(id, color, number = null, action = null, isHidden = false, parentPileType = PileTypeEnum.DrawPile) {
        this.id = id;
        this.color = color;
        this.number = number;
        this.action = action;
        this.isHidden = isHidden;
        this.parentPileType = parentPileType;
    }

    get isActionCard() {
        return !!this.action;
    }
}

export default CardModel;

