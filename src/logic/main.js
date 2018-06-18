import initPlayers from './init/players.init';
import initDrawPile from './init/draw-pile.init';
import initDiscardPile from './init/discard-pile.init';
import * as dealer from './dealer/dealer';
import {GameState} from "./state";
import {GameStatus as GameStatusMessageEnum, GameStatus} from "./game-status.enum";
import {PlayerEnum} from "../app/enums/player.enum";
import {CardActionEnum} from "../app/enums/card-action-enum";
import {PileTypeEnum} from "../app/enums/pile-type.enum";
import {handleMoveCard} from "./dealer/dealer";
import * as Utils from "./utils/model.utils";
import * as GameUtils from "./utils/game.utils";
import Game from "../app/game/game.component";


///// ===== Game init functions =====

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

///// API

export function requestMoveCard(cardId) {
    return playHumanMove(cardId);
}

export function requestGameStateUpdate() {
    return new Promise((resolve, reject) => {
        if ((true)) {   // TODO: change this condition
            resolve({
                message: GameStatusMessageEnum.PlayYourNextMove
            })
        } else {
            let stateChange = playBotMove();
            resolve(stateChange);
        }
    });
}

///// Inner

// Bot Player algorithm to choose next move
function playBotMove() {
    GameState.currentPlayer = PlayerEnum.Bot;
    let leadingCard = GameState.leadingCard;
    let selectedCard;
    let actionState = GameState.actionState;
    let botPile = GameState.BotPile;
    let matchedCard;
    // 4.1 if actionState is twoPlusInvoked and bot has twoPlus Card - mark it as selectedCard.
    if (actionState === `${CardActionEnum.TwoPlus}Invoked`) {
        if (matchedCard = GameUtils.getCardInHand(botPile, [{action: CardActionEnum.TwoPlus}])) {
            selectedCard = matchedCard;

        } // if twoPlusInvoked and bot doesn't have a two plus - mark the top card of the draw pile as the selectedCard.
        else {
            selectedCard = GameState.DrawPile.getTop();
        }
    } // if actionState is takiInvoked and bot has a card with the same color of the leadingCard - mark it as selectedCard.
    else if ((actionState === `${CardActionEnum.Taki}Invoked`) &&
        (matchedCard = GameUtils.getCardInHand(botPile, [{color: leadingCard.color}]))) {
        selectedCard = matchedCard;
    } // ( if we got here no actionState was invoked)
    else {
        // 4.2 if bot has a twoPlus card  with the same color as the leadingCard
        // or the leadingCard is a non-active twoPlus - mark it as selectedCard.
        if ((matchedCard = GameUtils.getCardInHand(botPile, [{action: CardActionEnum.TwoPlus}, {color: leadingCard.color}])) ||
            ((leadingCard.action === CardActionEnum.TwoPlus) && (matchedCard = GameUtils.getCardInHand(botPile, [{action: CardActionEnum.TwoPlus}])))) {
            selectedCard = matchedCard;
        }
        // 4.3 if bot has ChangeColor card and you're allowed to put it (actionState is none)- mark it as selectedCard.
        else if (matchedCard = GameUtils.getCardInHand(botPile, [{action: CardActionEnum.ChangeColor}])) {
            selectedCard = matchedCard;
        }
        // 4.4 if bot has  a Stop card with the same color as the leadingCard - mark it as selectedCard.
        else if (matchedCard = GameUtils.getCardInHand(botPile, [{action: CardActionEnum.Stop}, {color: leadingCard.color}])) {
            selectedCard = matchedCard;
        }
        // 4.5 if bot has a Plus card with the same color as the leadingCard - mark it as selectedCard.
        else if (matchedCard = GameUtils.getCardInHand(botPile, [{action: CardActionEnum.Plus}, {color: leadingCard.color}])) {
            selectedCard = matchedCard;
        }
        // 4.6 if bot has a superTaki card - mark it as selectedCard.
        else if (matchedCard = GameUtils.getCardInHand(botPile, [{action: CardActionEnum.SuperTaki}])) {
            selectedCard = matchedCard;
        }
        // 4.7 if bot has a taki card with the same color as the leadingCard - mark it as the selectedCard.
        else if (matchedCard = GameUtils.getCardInHand(botPile, [{action: CardActionEnum.Taki}, {color: leadingCard.color}])) {
            selectedCard = matchedCard;
        }
        // 4.8 if you have a card with the same color as the leading card - mark it as the selectedCard.
        else if (matchedCard = GameUtils.getCardInHand(botPile, [{color: leadingCard.color}])) {
            selectedCard = matchedCard;
        }
        // 4.9 if you have a card with the same number as the leading card - mark it as the selectedCard.
        else if ((leadingCard.number !== null) &&
            (matchedCard = GameUtils.getCardInHand(botPile, [{number: leadingCard.number}]))) {
            selectedCard = matchedCard;
        }
        // 4.10 if none of the conditions above happen - mark the top card of the draw pile as the selectedCard.
        else {
            selectedCard = GameState.DrawPile.getTop();
        }
    }
    return playGameMove(selectedCard.id);
}

function playHumanMove(cardId) {
    GameState.currentPlayer = PlayerEnum.Human;
    console.log(GameState);
    return playGameMove(cardId);
}

function playGameMove(cardId) {
    updateSelectedCardInDB(cardId);
    // we assume all move requests arriving from front-end are legal
    let stateChange = handleMoveCard();
    stateChange = playMoveManager(stateChange);

    stateChange = {
        ...stateChange,
        leadingCard: GameState.leadingCard,
        //actionState: GameState.actionState
    };
    debugger;
    const message = GameState.currentPlayer === PlayerEnum.Human ? GameStatus.CardUpdated : GameStatus.UpdatedGameState;

    return new Promise((resolve, reject) => {

        setTimeout(() => {
            resolve({
                message: message,
                payload: stateChange
            });
        }, 500);
    });
    // } else {
    //     console.log(isHumanMoveLegal());
    //     reject(new Error(`Invalid move for ${GameState.currentPlayer}`));
    // }
}


function updateSelectedCardInDB(cardId) {
    const gameCards = GameState.HumanPile.cards
        .concat(GameState.BotPile.cards)
        .concat(GameState.DiscardPile.cards)
        .concat(GameState.DrawPile.cards);
    GameState.selectedCard = gameCards.filter((card) => card.id === cardId)[0];
}

export function switchPlayers() {
    GameState.currentPlayer = GameState.currentPlayer === PlayerEnum.Bot ? PlayerEnum.Human : PlayerEnum.Bot;
}

//this function should run after every card movement we make
function playMoveManager(stateChange) {
    let leadingCard = GameState.leadingCard;
    let currentPlayerType = GameState.currentPlayer;
    let currentPlayerPile = GameState[`${GameState.currentPlayer}Pile`];
    let shouldSwitchPlayer = GameState.shouldSwitchPlayer = true;
    let newGameStateInfo=[];
    debugger;
    // if drawPile is empty restock it with cards from discardPile
    if (GameState.DrawPile.isEmpty) {
        newGameStateInfo = GameUtils.handleDrawpileRestocking(newGameStateInfo);
    }
    // needed for game statistics... if player has only 1 card left we are updating
    // it in his singleCardCounter at relevant area
    if (currentPlayerPile.cards.length === 1) {
        newGameStateInfo = GameUtils.incrementSingleCardCounter(newGameStateInfo);
    }


    // if needed, raise game actionState
    if (leadingCard.parentPileType === PileTypeEnum.DiscardPile) {
        newGameStateInfo = GameUtils.handleActionState(newGameStateInfo);
    }



    // if TWOPLUS card was invoked increment twoPlusCounter by 2 and switch player
    if (GameState.actionState === CardActionEnum.TwoPlus) {
        newGameStateInfo = GameUtils.handleInvokedTwoPlusState(newGameStateInfo);
    }
    // if CC card was invoked and current player is BOT, pick a random color and
    // give it to the leadingCard and switch players
    else if (GameState.actionState === CardActionEnum.ChangeColor && currentPlayerType === GameState.Bot) {
        newGameStateInfo = GameUtils.handleInvokedCCStateByBot(newGameStateInfo);
    }
    // if STOP card was invoked switch player twice or none at all and increment turnCounter by 1
    else if ((leadingCard.action === CardActionEnum.Stop) && (GameState.activeAction === CardActionEnum.Stop)) {
        newGameStateInfo = GameUtils.handleInvokedStopState(newGameStateInfo);
    }
    // if PLUS card was invoked do not switch players ( give current player another move )
    else if (GameState.activeAction === CardActionEnum.Plus) {
        newGameStateInfo = GameUtils.handleInvokedPlusState(newGameStateInfo);
    }
    // if SuperTaki was invoked change its color to the same color
    // of the card before it and invoke Taki .
    else if (GameState.actionState === CardActionEnum.SuperTaki) {
        newGameStateInfo = GameUtils.handleInvokedSuperTakiState(newGameStateInfo);
    }
    // if Taki card was invoked do not switch players until player has no cards from the
    // same color as the taki
    if (GameState.actionState === CardActionEnum.Taki) {
        newGameStateInfo = GameUtils.handleInvokedTakiState(newGameStateInfo);
    }

    //newGameStateInfo.push({'shouldSwitchPlayer':[shouldSwitchPlayer]});
    newGameStateInfo = {
        ...newGameStateInfo,
        ['shouldSwitchPlayer'] : shouldSwitchPlayer
    };

    GameState.shouldSwitchPlayer ? switchPlayers(): null;
    stateChange = {
        ...stateChange,
        ...newGameStateInfo
    };
    debugger;
    return stateChange;
}

export function isPutCardMoveLegal(card, actionState, leadingCard) {
    let isSameColor;

    // if twoPlus is invoked only other twoPlus card is legal
    if (actionState === CardActionEnum.TwoPlus) {
        if (card.action !== CardActionEnum.TwoPlus) {
            return false;
        }
    } // if taki is invoked only cards with the same color are legal
    else if (actionState === CardActionEnum.Taki) {
        isSameColor = (card.color && leadingCard.color === card.color);
        if (!isSameColor) {
            return false;
        }
    } else {
        isSameColor = (card.color && leadingCard.color === card.color);
        let isSameNumber = (card.number && leadingCard.number === card.number);
        let isSameAction = (card.action && leadingCard.action === card.action);
        let isUnColoredActionCard = (card.action && !card.color);
        if (!(isSameColor || isSameNumber || isSameAction || isUnColoredActionCard)) {
            return false;
        }
    }
    return true;
}

export function isGetCardMoveLegal(currentPlayerPile, drawPile, actionState, leadingCard) {
    // checking if withdrawing Card From DrawPile is a legal move - only if drawPile is not empty and no
    // other move is available for player
    return (!drawPile.isPileEmpty &&
        !availableMoveExist(currentPlayerPile, actionState, leadingCard));
}

export function availableMoveExist(currentPlayerPile, actionState, leadingCard) {
    let legalCards = [];
    currentPlayerPile.cards.forEach(function (card, index) {
        if (isPutCardMoveLegal(card, actionState, leadingCard)) {
            legalCards.push(index);
        }
    });
    return (legalCards.length > 0);
}
