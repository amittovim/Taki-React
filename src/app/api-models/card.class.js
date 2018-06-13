export class CardModel {
    constructor(id, color, number = null, action = null, isHidden = false) {
        this.id = id;
        this.color = color;
        this.number = number;
        this.action = action;
        this.isHidden = isHidden;
    }
}

export default CardModel;

