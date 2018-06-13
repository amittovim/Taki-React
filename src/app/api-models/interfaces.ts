interface Player {
    playerType: PlayerEnum;
    pile: Pile;
}

enum PlayerEnum {
    Bot = 'Bot',
    Human = 'Human'
}

interface Pile {
    type: PileEnum;
    cards: Card[];
    isHand: boolean;
    singleCardCounter: number;
}

interface State {
    discardPile: Pile;
    drawPile: Pile;
    human: Player;
    bot: Player;
    leadingCard: Card;
    currentPlayer: PlayerEnum;
    selectedCard: Card;
    activeAction: ActionEnum;
    turnNumber: number;
}

interface Card {
    id: number;
    color: ColorEnum;
    number: NumberEnum;
    action: ActionEnum;
    isHidden: boolean;
}



