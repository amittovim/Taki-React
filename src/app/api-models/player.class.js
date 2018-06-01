import HandModel from "./hand.class";

class PlayerModel {
    constructor(name) {
        this.name = name;
        this.hand = new HandModel(name);
        this.singleCardCounter = 0;
    }
}

export default PlayerModel;
