import * as utils from "./model.utils";
import {GameState} from "../state";
import {PileTypeEnum} from "../../app/enums/pile-type.enum";
import {CardActionEnum} from "../../app/enums/card-action-enum";
import * as dealer from "../dealer/dealer";

export function pullTopOfPile(pile) {
    return utils.pullItemFromEndOfArray(pile.cards);
}

export function pickRandomColor() {
    let randomInt = utils.getRandomInt(0, 3);
    let color = Utils.getKey(CardColorEnum, randomInt);
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
        }
    };
    return newGameStateInfo;
}

export function handleActionState(newGameStateInfo) {
    newGameStateInfo = raiseActionState(newGameStateInfo);
    return newGameStateInfo;
}

export function incrementSingleCardCounter(newGameStateInfo) {
    const CurrentPlayerPile = GameState[`${GameState.currentPlayer}Pile`];
    const CurrentPlayerPileName = `${GameState.currentPlayer}Pile`;
    CurrentPlayerPile.singleCardCounter++;
    newGameStateInfo = {
        ...newGameStateInfo,
        [`${CurrentPlayerPileName}.singleCardCounter`]:
        CurrentPlayerPile.singleCardCounter
    };
    return newGameStateInfo;
}

export function handleInvokedTwoPlusState(newGameStateInfo) {
    if (GameState.leadingCard.action === CardActionEnum.TwoPlus) {
        GameState.twoPlusCounter = +2;
        GameState.shouldSwitchPlayer = true;

        newGameStateInfo = {
            ...newGameStateInfo,
            twoPlusCounter: GameState.twoPlusCounter,
            shouldSwitchPlayer: true
        };
    } else {
        GameState.twoPlusCounter--;
        newGameStateInfo = {
            ...newGameStateInfo,
            twoPlusCounter: GameState.twoPlusCounter
        };
    }
    if (GameState.twoPlusCounter === 0) {
        GameState.actionState = null;
        newGameStateInfo.push('actionState', null);
        newGameStateInfo = {
            ...newGameStateInfo,
            actionState: null
        };
    }
    return newGameStateInfo;
}

export function handleInvokedCCStateByBot(newGameStateInfo) {
    GameState.leadingCard.color = pickRandomColor();
    GameState.shouldSwitchPlayer = true;
    GameState.actionState = null;

    newGameStateInfo = {
        ...newGameStateInfo,
        leadingCard: GameState.leadingCard,
        shouldSwitchPlayer: true,
        actionState: null
    };
    return newGameStateInfo;
}

export function handleInvokedStopState(newGameStateInfo) {
    GameState.shouldSwitchPlayer = false;
    GameState.turnNumber++;

    newGameStateInfo = {
        ...newGameStateInfo,
        shouldSwitchPlayer: false,
        turnNumber: GameState.turnNumber
    };
    return newGameStateInfo;
}

export function handleInvokedPlusState(newGameStateInfo) {
    GameState.shouldSwitchPlayer = false;
    newGameStateInfo = {
        ...newGameStateInfo,
        shouldSwitchPlayer: false
    };
    return newGameStateInfo;
}

export function handleInvokedSuperTakiState(newGameStateInfo) {
    let currentPlayerPile = getPlayerPile(GameState.currentPlayer);
    debugger;
    GameState.leadingCard.color = GameState.DiscardPile.getSecondCardFromTop().color;
    GameState.actionState = CardActionEnum.Taki;
    let shouldSwitchPlayer = !doesPileHaveSameColorCards(currentPlayerPile);
    if (shouldSwitchPlayer) {
        GameState.actionState = null;
    }

    newGameStateInfo = {
        ...newGameStateInfo,
        leadingCard: GameState.leadingCard,
        actionState: GameState.actionState,
        shouldSwitchPlayer: shouldSwitchPlayer
    };
    return newGameStateInfo;
}

export function handleInvokedTakiState(newGameStateInfo) {
    let currentPlayerPile = GameState[`${GameState.currentPlayer}Pile`];
    let shouldSwitchPlayer = !doesPileHaveSameColorCards(currentPlayerPile);
    if (shouldSwitchPlayer) {
        GameState.actionState = null;
    }
    newGameStateInfo = {
        ...newGameStateInfo,
        actionState: null,
        'shouldSwitchPlayer' : shouldSwitchPlayer
    };
    return newGameStateInfo;

}

function raiseActionState(newGameStateInfo) {
    // if current card isn't an action there's nothing to raise so we leave the function
    if (!GameState.selectedCard.isActionCard) {
        return newGameStateInfo;
        // if current card is an action card
    } else {

        // if current activeState is DIFFERENT than TAKI then update activeState
        // value to be the action on our current card, in memory and in newGameStateInfo.
        if (GameState.actionState !== CardActionEnum.Taki) {
            GameState.actionState = GameState.selectedCard.action;
            newGameStateInfo = {
                ...newGameStateInfo,
                ['actionState']: GameState.selectedCard.action
            };
            // newGameStateInfo.push('actionState', GameState.selectedCard.action);

            // if current activeState IS taki and player has no more cards with same color to put on it
            // update the activeState value to the action of the card to our current card
        } else {
            let matchedCard = getCardInHand(GameState[`${GameState.currentPlayer}Pile`].cards, [{color: GameState.leadingCard.color}]);
            if (matchedCard === undefined) {  //if (!availableMoveExist()) {
                GameState.actionState = GameState.selectedCard.action;
                newGameStateInfo = {
                    ...newGameStateInfo,
                    ['actionState']: GameState.selectedCard.action
                };
                //newGameStateInfo.push('actionState', GameState.selectedCard.action);
            }
        }
    }
    return newGameStateInfo;
}

function doesPileHaveSameColorCards(currentPlayerPile) {
    let foundSameColorCards = false;
    debugger;
    currentPlayerPile.cards.forEach(function (handCard) {
        if (handCard.color === GameState.selectedCard.color)
            foundSameColorCards = true;
    });
    return foundSameColorCards;
}

function restockDrawPile() {
    let wasRestocked;

    while (GameState.DiscardPile.cards.length > 1) {
        dealer.moveCard(GameState.discardPile.cards[0], GameState.discardPile, GameState.drawPile);
        wasRestocked = true;
    }
    if (wasRestocked) {
        shuffleArray(GameState.drawPile.cards);
    }
}

export function getPlayerPile(playerType) {
    return GameState[`${playerType}Pile`];
}

