// These are just for documentation and are not used as part of the logic

interface User {
    name: string;

}

interface Game {
    name: string;

}

interface Player {
    playerType: PlayerEnum;
    pile: Pile;
}

interface Pile {
    type: PileTypeEnum;
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
    actionState: CardActionEnum;
    turnNumber: number;
    movesCounter: number;
    twoPlusCounter: number;
    gameStatus: GameStatusEnum;
}

interface Card {
    id: number;
    color: CardColorEnum;
    number: CardNumberEnum;
    action: CardActionEnum;
    isHidden: boolean;
    parentPileType: PileTypeEnum;
}

enum CardColorEnum {
    Green = 'green',
    Red = 'red',
    Yellow = 'yellow',
    Blue = 'blue'
}

enum CardNumberEnum {
    One = 1,
    Three = 3,
    Four = 4,
    Five = 5,
    Six = 6,
    Seven = 7,
    Eight = 8,
    Nine = 9
}

enum CardActionEnum {
    Taki = 'taki',
    SuperTaki = 'super-taki',
    Stop = 'stop',
    ChangeColor = 'change-color',
    Plus = 'plus',
    TwoPlus = 'two-plus'
}

enum PileTypeEnum {
    DrawPile = 'DrawPile',
    DiscardPile = 'DiscardPile',
    HumanPile = 'HumanPile',
    BotPile = 'BotPile'
}

enum PlayerEnum {
    Bot = 'Bot',
    Human = 'Human'
}

enum GameStatusEnum {
    GameInit = 'GameInit',
    SettingStartingCard = 'SettingStartingCard',
    RestockingDeckOfCard = 'RestockingDeckOfCard',
    GameStateChanged = 'GameStateChanged'
}

