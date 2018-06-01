import Pile from "./pile.class";

class Hand {
    constructor(name) {
        this.name = name; // TODO: this is not necessarily needed
        this.pile = new Pile(`${name}'s hand`);
    }
}
