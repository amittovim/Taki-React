import {GameState} from "./state";
import {PlayerEnum} from "../app/enums/player.enum";
import {CardActionEnum} from "../app/enums/card-action-enum";
import {handleCardMove} from "./dealer/dealer";
import * as GameUtils from "./utils/game.utils";
import {GameStatusEnum} from "./game-status.enum";
import * as dealer from "./dealer/dealer";
import initDrawPile from "./init/draw-pile.init";
import initDiscardPile from "./init/discard-pile.init";
import initPlayers from "./init/players.init";
import {saveGameState} from "./history/state-history";
import {getPlayerPile} from "./utils/game.utils";
import {deepCopy} from "./utils/model.utils";

///// Inner
export function initGame() {
    clearGameState();
    GameState.gameStatus = GameStatusEnum.GameInit;
    initPlayers();
    initDrawPile();
    initDiscardPile();
    dealer.dealCards();
    saveGameState();
    GameState.gameStatus = GameStatusEnum.GameStateChanged;

    return GameState;
}

export function clearGameState() {
    for (let key in GameState) {
        GameState[key] = null;
    }
}

// Bot Player algorithm to choose next move
export function pickNextBotMove() {
    GameState.currentPlayer = PlayerEnum.Bot;
    let leadingCard = GameState.leadingCard;
    let selectedCard;
    let actionState = GameState.actionState;
    let botPile = GameState.BotPile;
    let matchedCard;
    // 4.1 if actionState is twoPlusInvoked and bot has twoPlus Card - mark it as selectedCard.
    if (actionState === CardActionEnum.TwoPlus) {
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
        // 4.7.1 if bot has a card with the same action as the leading card - mark it as the selectedCard.
        else if ((leadingCard.action !== null) &&
            (matchedCard = GameUtils.getCardInHand(botPile, [{action: leadingCard.action}]))) {
            selectedCard = matchedCard;
        }
        // 4.8 if you have a card with the same color as the leading card - mark it as the selectedCard.
        else if ((leadingCard.color !== null) &&
            (matchedCard = GameUtils.getCardInHand(botPile, [{color: leadingCard.color}]))) {
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
    playGameMove(selectedCard.id);
}

export function playHumanMove(cardId) {
    GameState.currentPlayer = PlayerEnum.Human;
    return playGameMove(cardId);
}

function playGameMove(cardId) {
    GameState.selectedCard = getCardById(cardId);

    // Moving the card
    let stateChange = handleCardMove();

    // side effects
    if (GameState.gameStatus === GameStatusEnum.GameStateChanged) {
        stateChange = processGameStep(stateChange);
    }

    // Checking if game ended
    GameState.isGameOver = isGameOver();

    // Save current state in history
    saveGameState();

    return stateChange;
}

function isGameOver() {
    const currentPlayersPile = getPlayerPile(GameState.currentPlayer);
    return currentPlayersPile.cards.length === 0;
}

function getCardById(cardId) {
    const gameCards = GameState.HumanPile.cards
        .concat(GameState.BotPile.cards)
        .concat(GameState.DiscardPile.cards)
        .concat(GameState.DrawPile.cards);
    return gameCards.filter((card) => card.id === cardId)[0];
}

export function switchPlayers() {
    GameState.currentPlayer = GameState.currentPlayer === PlayerEnum.Bot ? PlayerEnum.Human : PlayerEnum.Bot;
}

//this function should run after every card movement we make
function processGameStep(stateChange) {
    let currentPlayerType = GameState.currentPlayer;
    let newGameStateInfo = {};

    // if drawPile is empty restock it with cards from discardPile
    if (GameState.DrawPile.isPileEmpty) {

        newGameStateInfo = GameUtils.handleDrawpileRestocking(newGameStateInfo);
    }

    // updating statistics
    newGameStateInfo = GameUtils.handleGameStatistics(newGameStateInfo);

    // check occasions when we need to activate game activeState (if we PUT an action card on discard-pile)
    if ((GameState.leadingCard.action !== null) &&
        (GameState.leadingCard === GameState.selectedCard)) {
        newGameStateInfo = GameUtils.handleActivatingActionState(newGameStateInfo);
    }
    // if TWOPLUS card was invoked in the current play-move, increment twoPlusCounter by 2
    if (GameState.actionState === CardActionEnum.TwoPlus &&
        GameState.leadingCard === GameState.selectedCard &&                  // means that player PUT card on discardPile
        GameState.selectedCard.action === CardActionEnum.TwoPlus) {   // and didn't GET card from Drawpile
        newGameStateInfo = GameUtils.handleInvokedTwoPlusState(newGameStateInfo);
    }

    // if CHANGE COLOR card was invoked and the current player is BOT, pick a random color for it
    else if (GameState.actionState === CardActionEnum.ChangeColor && currentPlayerType === PlayerEnum.Bot) {
        newGameStateInfo = GameUtils.handleInvokedCCStateByBot(newGameStateInfo);
    }

    // if STOP card was invoked switch player twice or none at all and increment turnCounter by 1
    else if ((GameState.leadingCard.action === CardActionEnum.Stop) && (GameState.actionState === CardActionEnum.Stop)) {
        newGameStateInfo = GameUtils.handleInvokedStopState(newGameStateInfo);
    }
    // if SuperTaki was invoked change its color to the same color
    // of the card before it and invoke Taki .
    else if (GameState.actionState === CardActionEnum.SuperTaki) {
        newGameStateInfo = GameUtils.handleInvokedSuperTakiState(newGameStateInfo);
    }
    // Taki card was invoked
    if (GameState.actionState === CardActionEnum.Taki) {
        newGameStateInfo = GameUtils.handleInvokedTakiState(newGameStateInfo);
    }

    handleSwitchPlayers(newGameStateInfo);

    newGameStateInfo = GameUtils.handleDisablingActionState(newGameStateInfo);

    return {
        ...stateChange,
        ...newGameStateInfo,
        leadingCard: GameState.leadingCard,
        currentPlayer: GameState.currentPlayer
    };
}


function handleSwitchPlayers() {
    let shouldSwitchPlayers = true;
    let currentPlayerPile = getPlayerPile(GameState.currentPlayer);

    // we check all cases when we shouldn't switch player
    if (((GameState.actionState === GameState.leadingCard.action) && (GameState.leadingCard.action === CardActionEnum.Plus))
        || ((GameState.actionState === GameState.leadingCard.action) && (GameState.leadingCard.action === CardActionEnum.Stop))
        || ((GameState.twoPlusCounter !== 0) && (GameState.leadingCard.id !== GameState.selectedCard.id))
        || (((GameState.actionState === CardActionEnum.Taki) || (GameState.actionState === CardActionEnum.SuperTaki))
            && (GameUtils.doesPileHaveSameColorCards(currentPlayerPile)))) {
        shouldSwitchPlayers = false;
    }

    if (shouldSwitchPlayers) {
        switchPlayers();
        GameUtils.incrementGameTurnNumber();
    }
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
    if ((!drawPile.isPileEmpty) &&
        (GameState.actionState === CardActionEnum.TwoPlus ||
            !availableMoveExist(currentPlayerPile, actionState, leadingCard))) {
        return true;
    } else
        return false;
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
