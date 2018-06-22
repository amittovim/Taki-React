import * as utils from "./model.utils";
import {GameState} from "../state";
import {PileTypeEnum} from "../../app/enums/pile-type.enum";
import {CardActionEnum} from "../../app/enums/card-action-enum";
import * as dealer from "../dealer/dealer";
import {CardColorEnum} from "../../app/enums/card-color.enum";
import {GameStatusEnum} from "../game-status.enum";

export function pullTopOfPile(pile) {
    return utils.pullItemFromEndOfArray(pile.cards);
}

export function pickRandomColor() {
    let randomInt = utils.getRandomInt(0, 3);
    let color = utils.getKey(CardColorEnum, randomInt);
    return CardColorEnum[color];
}

export function getCardInHand(pile, conditionList) {
    return utils.getFirstItemByMatchConditions(pile.cards, conditionList);
}

export function handleDrawpileRestocking(newGameStateInfo) {
    restockDrawPile();
    newGameStateInfo = {
        ...newGameStateInfo,
        [PileTypeEnum.DrawPile]: {
            ...GameState.DrawPile
        },
        [PileTypeEnum.DiscardPile]: {
            ...GameState.DiscardPile
        }
    };
    return newGameStateInfo;
}

export function handleActivatingActionState(newGameStateInfo) {
    const currentPlayerPile = getPlayerPile(GameState.currentPlayer);

    // if current activeState is DIFFERENT than TAKI then update activeState
    // value to be the action on our current card
    if (GameState.actionState !== CardActionEnum.Taki) {
        GameState.actionState = GameState.leadingCard.action;
        newGameStateInfo = {
            ...newGameStateInfo,
            actionState: GameState.selectedCard.action
        };
        // if current activeState IS taki and player has no more cards with same color to put on it
        // update the activeState value to the action of the card of our current card
    } else {
        let matchedCard = getCardInHand(currentPlayerPile, [{color: GameState.leadingCard.color}]);
        if (matchedCard === undefined) {  //if (!availableMoveExist()) {
            GameState.actionState = GameState.selectedCard.action;
            newGameStateInfo = {
                ...newGameStateInfo,
                actionState: GameState.selectedCard.action
            };
        }
    }
    return newGameStateInfo;
}

export function handleDisablingActionState(newGameStateInfo) {
    // disable actionState if need be
    if ((GameState.actionState === CardActionEnum.Plus) ||
        (GameState.actionState === CardActionEnum.Stop) ||
        (GameState.actionState === CardActionEnum.ChangeColor) ||
        (GameState.actionState === CardActionEnum.TwoPlus && GameState.twoPlusCounter === 0)) {
        GameState.actionState = null;
    }
    newGameStateInfo = {
        ...newGameStateInfo,
        actionState: [GameState.actionState]
    };
    return newGameStateInfo;
}

export function handleGameStatistics(newGameStateInfo) {
    const currentPlayerPile = getPlayerPile(GameState.currentPlayer);
    // if player has only 1 card left we are updating his singleCardCounter
    if (currentPlayerPile.cards.length === 1) {
        incrementSingleCardCounter(newGameStateInfo);
    }
    return newGameStateInfo;
}

function incrementSingleCardCounter(newGameStateInfo) {
    const currentPlayerPile = getPlayerPile(GameState.currentPlayer);
    const currentPlayerPileName = getPlayerPile(GameState.currentPlayer).name;
    currentPlayerPile.singleCardCounter++;
    newGameStateInfo = {
        ...newGameStateInfo,
        [`${currentPlayerPileName}.singleCardCounter`]:
        currentPlayerPile.singleCardCounter
    };
    return newGameStateInfo;
}

export function handleInvokedTwoPlusState(newGameStateInfo) {
    GameState.twoPlusCounter += 2;
    newGameStateInfo = {
        ...newGameStateInfo,
        twoPlusCounter: GameState.twoPlusCounter
    };
    return newGameStateInfo;
}

export function handleExistingTwoPlusState(newGameStateInfo) {
    if (GameState.leadingCard.id !== GameState.selectedCard.id &&
        GameState.twoPlusCounter > 0) {
        GameState.twoPlusCounter--;
    }
    newGameStateInfo = {
        ...newGameStateInfo,
        twoPlusCounter: GameState.twoPlusCounter,
    };
    return newGameStateInfo;
}

export function handleInvokedCCStateByBot(newGameStateInfo) {
    if (GameState.leadingCard.id === GameState.selectedCard.id) {
        GameState.leadingCard.color = pickRandomColor();
    }
    newGameStateInfo = {
        ...newGameStateInfo,
        leadingCard: GameState.leadingCard,
    };
    return newGameStateInfo;
}

export function handleInvokedStopState(newGameStateInfo) {
    incrementGameTurnNumber();

    newGameStateInfo = {
        ...newGameStateInfo,
        turnNumber: GameState.turnNumber,
    };
    return newGameStateInfo;
}

export function handleInvokedSuperTakiState(newGameStateInfo) {
    GameState.leadingCard.color = GameState.DiscardPile.getSecondCardFromTop().color;
    GameState.actionState = CardActionEnum.Taki;

    newGameStateInfo = {
        ...newGameStateInfo,
        leadingCard: GameState.leadingCard,
        actionState: GameState.actionState,
    };

    return newGameStateInfo;
}

export function handleInvokedTakiState(newGameStateInfo) {
    let currentPlayerPile = getPlayerPile(GameState.currentPlayer);

    if (!doesPileHaveSameColorCards(currentPlayerPile)) {
        GameState.actionState = null;
    }
    newGameStateInfo = {
        ...newGameStateInfo,
        actionState: GameState.actionState,
    };
    return newGameStateInfo;

}

export function doesPileHaveSameColorCards(currentPlayerPile) {
    let foundSameColorCards = false;
    currentPlayerPile.cards.forEach(function (handCard) {
        if (handCard.color === GameState.selectedCard.color)
            foundSameColorCards = true;
    });
    return foundSameColorCards;
}

function restockDrawPile() {
    let wasRestocked;
    let oldSelectedCard = GameState.selectedCard;
    GameState.gameStatus = GameStatusEnum.RestockingDeckOfCard;
    while (GameState.DiscardPile.cards.length > 1) {
        cleaningCards();
        dealer.moveCard(PileTypeEnum.DiscardPile, PileTypeEnum.DrawPile);
        wasRestocked = true;
    }
    if (wasRestocked) {
        utils.shuffleArray(GameState.DrawPile.cards);
        GameState.selectedCard = oldSelectedCard;
    }
    GameState.gameStatus = GameStatusEnum.GameStateChanged;
}

function cleaningCards() {

    GameState.selectedCard = GameState.DiscardPile.cards[0];
    GameState.selectedCard.parentPileType = PileTypeEnum.DrawPile;

    if ((GameState.selectedCard.action === CardActionEnum.ChangeColor) ||
        (GameState.selectedCard.action === CardActionEnum.SuperTaki)) {
        GameState.selectedCard.color = null;
    }
}

export function getPlayerPile(playerType) {
    return GameState[`${playerType}Pile`];
}

export function incrementGameMovesCounter() {
    GameState.movesCounter++;
}

export function incrementGameTurnNumber() {
    GameState.turnNumber++;
}
