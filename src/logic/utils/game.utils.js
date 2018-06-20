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
        }
    };
    return newGameStateInfo;
}

export function handleActionState(newGameStateInfo) {
    // if the game is in either states: GameInit or SettingStartingCard
    // do NOT raise actionState
    if (!(GameState.gameStatus === GameStatusEnum.GameInit ||
        GameState.gameStatus === GameStatusEnum.SettingStartingCard)) {
        newGameStateInfo = raiseActionState(newGameStateInfo);
    }
    return newGameStateInfo;
}

export function incrementSingleCardCounter(newGameStateInfo) {
    const CurrentPlayerPile = GameState[`${GameState.currentPlayer}Pile`];
    const CurrentPlayerPileName = getPlayerPile(GameState.currentPlayer);
    CurrentPlayerPile.singleCardCounter++;
    newGameStateInfo = {
        ...newGameStateInfo,
        [`${CurrentPlayerPileName}.singleCardCounter`]:
        CurrentPlayerPile.singleCardCounter
    };
    return newGameStateInfo;
}

export function handleInvokedTwoPlusState(newGameStateInfo) {
    // only if the current card is 2+ we increment the counter by 2 and switch players
    if (GameState.leadingCard.action === CardActionEnum.TwoPlus) {
        GameState.twoPlusCounter += 2;
        GameState.shouldSwitchPlayer = true;

        newGameStateInfo = {
            ...newGameStateInfo,
            twoPlusCounter: GameState.twoPlusCounter,
            shouldSwitchPlayer: GameState.shouldSwitchPlayer
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
        newGameStateInfo = {
            ...newGameStateInfo,
            actionState: GameState.actionState
        };
    }
    return newGameStateInfo;
}

export function handleExistingTwoPlusState(newGameStateInfo) {
    GameState.twoPlusCounter--;
    GameState.twoPlusCounter === 0 ? GameState.shouldSwitchPlayer = true : GameState.shouldSwitchPlayer = false;
    newGameStateInfo = {
        ...newGameStateInfo,
        twoPlusCounter: GameState.twoPlusCounter,
        shouldSwitchPlayer: GameState.shouldSwitchPlayer
    };
    return newGameStateInfo;
}

export function handleInvokedCCStateByBot(newGameStateInfo) {
    GameState.leadingCard.color = pickRandomColor();
    GameState.shouldSwitchPlayer = true;
    GameState.actionState = null;

    newGameStateInfo = {
        ...newGameStateInfo,
        leadingCard: GameState.leadingCard,
        shouldSwitchPlayer: GameState.shouldSwitchPlayer,
        actionState: GameState.actionState
    };
    return newGameStateInfo;
}

export function handleInvokedStopState(newGameStateInfo) {
    GameState.shouldSwitchPlayer = false;
    GameState.actionState = null;
    incrementGameTurnNumber();

    newGameStateInfo = {
        ...newGameStateInfo,
        shouldSwitchPlayer: GameState.shouldSwitchPlayer,
        turnNumber: GameState.turnNumber,
        actionState: null
    };
    return newGameStateInfo;
}

export function handleInvokedPlusState(newGameStateInfo) {
    GameState.shouldSwitchPlayer = false;
    GameState.actionState = null;
    newGameStateInfo = {
        ...newGameStateInfo,
        shouldSwitchPlayer: GameState.shouldSwitchPlayer,
        actionState: null

    };
    return newGameStateInfo;
}

export function handleInvokedSuperTakiState(newGameStateInfo) {
    let currentPlayerPile = getPlayerPile(GameState.currentPlayer);
    GameState.leadingCard.color = GameState.DiscardPile.getSecondCardFromTop().color;
    GameState.actionState = CardActionEnum.Taki;

    // if current player has no more cards of the same color as the taki to put on the taki
    // cancel\replace  actionState value to null
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
    let currentPlayerPile = getPlayerPile(GameState.currentPlayer);
    let shouldSwitchPlayer = !doesPileHaveSameColorCards(currentPlayerPile);
    if (shouldSwitchPlayer) {
        GameState.actionState = null;
    }
    newGameStateInfo = {
        ...newGameStateInfo,
        actionState: GameState.actionState,
        shouldSwitchPlayer: shouldSwitchPlayer
    };
    return newGameStateInfo;

}

function raiseActionState(newGameStateInfo) {
    // if current card isn't an action card there's nothing to raise so we leave
    // the function.
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
                actionState: GameState.selectedCard.action
            };

            // if current activeState IS taki and player has no more cards with same color to put on it
            // update the activeState value to the action of the card of our current card
        } else {
            let matchedCard = getCardInHand(getPlayerPile(GameState.currentPlayer), [{color: GameState.leadingCard.color}]);
            if (matchedCard === undefined) {  //if (!availableMoveExist()) {
                GameState.actionState = GameState.selectedCard.action;
                newGameStateInfo = {
                    ...newGameStateInfo,
                    actionState: GameState.selectedCard.action
                };
            }
        }
    }
    return newGameStateInfo;
}

function doesPileHaveSameColorCards(currentPlayerPile) {
    let foundSameColorCards = false;
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

export function incrementGameMovesCounter() {
    GameState.movesCounter++;
}

export function incrementGameTurnNumber() {
    GameState.turnNumber++;
}
