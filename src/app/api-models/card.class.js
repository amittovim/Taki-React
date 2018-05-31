class Card {
    constructor(id, color, number = null, action = null, isHidden = true) {
        this.id = id;
        this.color = color;
        this.number = number;
        this.action = action;
        this.isHidden = isHidden;
    }
}
