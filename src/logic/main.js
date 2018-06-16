import initPlayers from './init/players.init';
import initDrawPile from './init/draw-pile.init';
import initDiscardPile from './init/discard-pile.init';
import * as dealer from './dealer/dealer';
import {GameState} from "./state";
import {GameStatus} from "./game-status.enum";
import {PlayerEnum} from "../app/enums/player.enum";
import {CardActionEnum} from "../app/enums/card-action-enum";
import {PileTypeEnum} from "../app/enums/pile-type.enum";
import {handleMoveCard} from "./dealer/dealer";
import {getKey} from "./utils/model.utils";


// ===== Game init functions =====

export function initGame() {
    GameState.status = GameStatus.GameInit;
    initPlayers();
    initDrawPile();
    initDiscardPile();
    dealer.dealCards();
    if (GameState.currentPlayer === PlayerEnum.Bot) {
        playBotMove();
    }
    GameState.status = GameStatus.UpdatedGameState;
    return GameState;
}

// API

export function requestMoveCard(cardId) {
    return playHumanMove(cardId);
}

export function requestGameStateUpdate() {
    return new Promise((resolve, reject) => {
        if (humanPlayerHasAvailableMoves()) {
            resolve({
                message: GameStatusMessageEnum.ProceedPlayersTurn
            })
        } else {
            let stateChange = playBotMove();
            resolve(stateChange);
        }
    });
}

// Inner

function humanPlayerHasAvailableMoves() {
    return false;
}

function isMoveLegal() {
    return true;
}

function playBotMove() {
    GameState.currentPlayer = PlayerEnum.Bot;
    let leadingCard = GameState.leadingCard;
    let selectedCard;
    let actionState = GameState.actionState;
    let botPile = GameState.BotPile;
    let matchedCard;
    // 4.1 if actionState is twoPlusInvoked and bot has twoPlus Card - mark it as selectedCard.
    if (actionState === `${CardActionEnum.TwoPlus}Invoked`) {
        if (matchedCard = getCardInHand(botPile, [{action: CardActionEnum.TwoPlus}])) {
            selectedCard = matchedCard;

        } // if twoPlusInvoked and bot doesn't have a two plus - mark the top card of the draw pile as the selectedCard.
        else {
            selectedCard = GameState.DrawPile.getTop();
        }
    } // if actionState is takiInvoked and bot has a card with the same color of the leadingCard - mark it as selectedCard.
    else if ((actionState === `${CardActionEnum.Taki}Invoked`) &&
        (matchedCard = getCardInHand(botPile, [{color: leadingCard.color}]))) {
        selectedCard = matchedCard;
    } // ( if we got here no actionState was invoked)
    else {
        // 4.2 if bot has a twoPlus card  with the same color as the leadingCard
        // or the leadingCard is a non-active twoPlus - mark it as selectedCard.
        if ((matchedCard = getCardInHand(botPile, [{action: CardActionEnum.TwoPlus}, {color: leadingCard.color}])) ||
            ((leadingCard.action === CardActionEnum.TwoPlus) && (matchedCard = getCardInHand(botPile, [{action: CardActionEnum.TwoPlus}])))) {
            selectedCard = matchedCard;
        }
        // 4.3 if bot has ChangeColor card and you're allowed to put it (actionState is none)- mark it as selectedCard.
        else if (matchedCard = getCardInHand(botPile, [{action: CardActionEnum.ChangeColor}])) {
            selectedCard = matchedCard;
        }
        // 4.4 if bot has  a Stop card with the same color as the leadingCard - mark it as selectedCard.
        else if (matchedCard = getCardInHand(botPile, [{action: CardActionEnum.Stop}, {color: leadingCard.color}])) {
            selectedCard = matchedCard;
        }
        // 4.5 if bot has a Plus card with the same color as the leadingCard - mark it as selectedCard.
        else if (matchedCard = getCardInHand(botPile, [{action: CardActionEnum.Plus}, {color: leadingCard.color}])) {
            selectedCard = matchedCard;
        }
        // 4.6 if bot has a superTaki card - mark it as selectedCard.
        else if (matchedCard = getCardInHand(botPile, [{action: CardActionEnum.SuperTaki}])) {
            selectedCard = matchedCard;
        }
        // 4.7 if bot has a taki card with the same color as the leadingCard - mark it as the selectedCard.
        else if (matchedCard = getCardInHand(botPile, [{action: CardActionEnum.Taki}, {color: leadingCard.color}])) {
            selectedCard = matchedCard;
        }
        // 4.8 if you have a card with the same color as the leading card - mark it as the selectedCard.
        else if (matchedCard = getCardInHand(botPile, [{color: leadingCard.color}])) {
            selectedCard = matchedCard;
        }
        // 4.9 if you have a card with the same number as the leading card - mark it as the selectedCard.
        else if ((leadingCard.number !== null) &&
            (matchedCard = getCardInHand(botPile, [{number: leadingCard.number}]))) {
            selectedCard = matchedCard;
        }
        // 4.10 if none of the conditions above happen - mark the top card of the draw pile as the selectedCard.
        else {
            selectedCard = GameState.DrawPile.getTop();
        }
    }
    return playGameMove(selectedCard.id);
}

function getCardInHand(pile, conditionList) {
    return getFirstItemByMatchConditions(pile.cards, conditionList);
}

function getFirstItemByMatchConditions(arr, conditionList) {
    return arr.find(function (item) {       //TODO: change this to arrow function
        return conditionList.reduce(function (accumulator, condition) {
            let key = getKey(condition, 0);
            let value = condition[key];
            return accumulator && item[key] === value;
        }, true);
    });
}

function playHumanMove(cardId) {
    GameState.currentPlayer = PlayerEnum.Human;
    return playGameMove(cardId);
}

function playGameMove(cardId) {
    updateSelectedCard(cardId);
    return new Promise((resolve, reject) => {
        if (isMoveLegal()) {
            const stateChange = handleMoveCard();
            const message = GameState.currentPlayer === PlayerEnum.Human ? GameStatus.CardUpdated : GameStatus.UpdatedGameState;
            setTimeout(() => {
                resolve({
                    message: message,
                    payload: stateChange
                });
            }, 500);
        } else {
            reject(new Error(`Invalid move for ${GameState.currentPlayer}`));
        }
    });
}

function updateSelectedCard(cardId) {
    const gameCards = GameState.HumanPile.cards
        .concat(GameState.BotPile.cards)
        .concat(GameState.DiscardPile.cards)
        .concat(GameState.DrawPile.cards);
    GameState.selectedCard = gameCards.filter((card) => card.id === cardId)[0];
}

export function switchPlayers() {
    GameState.currentPlayer = GameState.currentPlayer === PlayerEnum.Bot ? PlayerEnum.Human : PlayerEnum.Bot;
}
