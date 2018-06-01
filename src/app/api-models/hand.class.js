import PileModel from "./pile.class";

export class HandModel {
    constructor(name) {
        this.name = name; // TODO: this is not necessarily needed
        this.pile = new PileModel(`${name}'s hand`);
    }
}

export default HandModel;
