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
    newGameStateInfo.push(GameState.DrawPile);
}

export function handleActionState(newGameStateInfo) {
    newGameStateInfo = raiseActionState(newGameStateInfo);
    return newGameStateInfo;
}

export function incrementSingleCardCounter(newGameStateInfo) {
    const CurrentPlayerPile = GameState[`${GameState.currentPlayer}Pile`];
    const CurrentPlayerPileName = `${GameState.currentPlayer}Pile`;
    CurrentPlayerPile.singleCardCounter++;
    newGameStateInfo.push( (`${CurrentPlayerPileName}.singleCardCounter`),
                            CurrentPlayerPile.singleCardCounter );
    return newGameStateInfo;
}

export function handleInvokedTwoPlusState(newGameStateInfo) {
    if (GameState.leadingCard.action === CardActionEnum.TwoPlus) {
        GameState.twoPlusCounter = +2;
        GameState.shouldSwitchPlayer = true;

        newGameStateInfo.push('twoPlusCounter', GameState.twoPlusCounter);
        newGameStateInfo.push('shouldSwitchPlayer', true);
    } else {
        GameState.twoPlusCounter--;
        newGameStateInfo.push('twoPlusCounter', GameState.twoPlusCounter);
    }
    if (GameState.twoPlusCounter === 0) {
        GameState.actionState = null;
        newGameStateInfo.push('actionState', null);
    }
    return newGameStateInfo;
}

export function handleInvokedCCStateByBot(newGameStateInfo) {
    GameState.leadingCard.color = pickRandomColor();
    GameState.shouldSwitchPlayer = true;
    GameState.actionState = null;

    newGameStateInfo.push('leadingCard', GameState.leadingCard);
    newGameStateInfo.push('shouldSwitchPlayer', true);
    newGameStateInfo.push('actionState', null);

    return newGameStateInfo;
}

export function handleInvokedStopState(newGameStateInfo) {
    GameState.shouldSwitchPlayer = false;
    GameState.turnNumber++;

    newGameStateInfo.push('shouldSwitchPlayer', false);
    newGameStateInfo.push('turnNumber', GameState.turnNumber);

    return newGameStateInfo;
}

export function handleInvokedPlusState(newGameStateInfo) {
    GameState.shouldSwitchPlayer = false;

    newGameStateInfo.push('shouldSwitchPlayer', false);

    return newGameStateInfo;
}

export function handleInvokedSuperTakiState(newGameStateInfo) {
    let currentPlayerPile = GameState[`${GameState.currentPlayer}Pile`];
    GameState.leadingCard.color = GameState.DiscardPile.getSecondCardFromTop().color;
    let shouldSwitchPlayer = !doesPileHaveSameColorCards(currentPlayerPile);

    newGameStateInfo.push('leadingCard', GameState.leadingCard);
    newGameStateInfo.push('shouldSwitchPlayer', shouldSwitchPlayer);
    return newGameStateInfo;
}

export function handleInvokedTakiState(newGameStateInfo) {
    let currentPlayerPile = GameState[`${GameState.currentPlayer}Pile`];
    let shouldSwitchPlayer = !doesPileHaveSameColorCards(currentPlayerPile);

    newGameStateInfo.push('shouldSwitchPlayer', shouldSwitchPlayer);
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
            newGameStateInfo.push('actionState', GameState.selectedCard.action);

            // if current activeState IS taki and player has no more cards with same color to put on it
            // update the activeState value to the action of the card to our current card
        } else {
            let matchedCard = getCardInHand(GameState[`${GameState.currentPlayer}Pile`].cards, [{color: GameState.leadingCard.color}]);
            if (matchedCard === undefined) {  //if (!availableMoveExist()) {
                GameState.actionState = GameState.selectedCard.action;
                newGameStateInfo.push('actionState', GameState.selectedCard.action);
            }
        }
    }
    return newGameStateInfo;
}

function doesPileHaveSameColorCards(currentPlayerPile) {
    let foundSameColorCards = false;
    GameState.currentPlayer.pile.cards.forEach(function (handCard) {
        if (handCard.color === GameState.selectedCard.color)
            foundSameColorCards  = true;
    });
    return foundSameColorCards ;
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


