class Player {
    constructor(name) {
        this.name = name;
        this.hand = new Hand(name);
        this.singleCardCounter = 0;
    }
}

export default Player;
