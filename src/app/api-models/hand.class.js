import PileModel from "./pile.class";

class HandModel {
    constructor(name) {
        this.name = name; // TODO: check if this is needed
        this.pile = new PileModel(`${name}HandPile`);
    }
}

export default HandModel;
