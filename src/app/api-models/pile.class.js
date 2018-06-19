export class PileModel {
    constructor(type, isHand = false) {
        this.type = type;
        this.cards = [];
        this.isHand = isHand;
        this.singleCardCounter = 0;
    }

    getTop() {
        return this.cards[this.cards.length - 1];
    }

    getSecondCardFromTop() {
        return (this.cards[this.cards.length - 2]);
    }

    get isPileEmpty() {
        return (this.cards.length === 0);
    }
}

export default PileModel;

