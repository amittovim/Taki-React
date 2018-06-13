export class PileModel {
    constructor(type, isHand = false) {
        this.type = type;
        this.cards = [];
        this.isHand = isHand;
        this.singleCardCounter = 0;
    }
}

export default PileModel;

