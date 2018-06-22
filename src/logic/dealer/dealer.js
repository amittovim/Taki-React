import {GameState} from "../state";
import * as consts from "../consts";
import * as utils from '../utils/model.utils';
import * as GameUtils from '../utils/game.utils';
import {CardActionEnum} from "../../app/enums/card-action-enum";
import {PileTypeEnum} from "../../app/enums/pile-type.enum";
import {PlayerEnum} from "../../app/enums/player.enum";
import {GameStatusEnum} from "../game-status.enum";
import {switchPlayers} from "../main";
import {getPlayerPile} from "../utils/game.utils";
import {VISIBLE_CARDS} from "../consts";

// == Dealing Hands ==

export function dealCards() {
    dealHands();
    drawStartingCard();
}

function dealHands() {
    for (let i = 1; i <= consts.NUMBER_OF_STARTING_CARDS_IN_PLAYERS_HAND; i++) {
        handleCardMove();
        switchPlayers();
        handleCardMove();
        switchPlayers();
    }
}

function drawStartingCard() {
    GameState.gameStatus = GameStatusEnum.SettingStartingCard;
    do {
        // It draws another card if the card drawn is change-color because you cannot start a taki with this card
        handleCardMove();
    } while (GameState.selectedCard.action &&
    (GameState.selectedCard.action === CardActionEnum.ChangeColor ||
        GameState.selectedCard.action === CardActionEnum.SuperTaki));
}

// == Moving Cards ==

export function getDestinationPileType(sourcePileType) {
    switch (sourcePileType) {
        case PileTypeEnum.DrawPile: {
            if (GameState.gameStatus === GameStatusEnum.SettingStartingCard) {
                return PileTypeEnum.DiscardPile;
            } else {
                return GameState.currentPlayer === PlayerEnum.Human ? PileTypeEnum.HumanPile : PileTypeEnum.BotPile;
            }
        }
        case PileTypeEnum.DiscardPile:
            return PileTypeEnum.DrawPile;
        case PileTypeEnum.HumanPile:
        case PileTypeEnum.BotPile:
            return PileTypeEnum.DiscardPile;
        default:
            break;
    }
}

export function isCardHidden(sourcePile, destinationPile) {
    if (!VISIBLE_CARDS) {
        return ((sourcePile === PileTypeEnum.DrawPile && destinationPile === PileTypeEnum.BotPile) || sourcePile === PileTypeEnum.DiscardPile);
    } else return false;
}

export function handleCardMove() {
    // in case we are in "GameInit" or "SettingStartingCard" gameStatus our source pile is the drawpile top card
    if (GameState.gameStatus === GameStatusEnum.GameInit || GameState.gameStatus === GameStatusEnum.SettingStartingCard) {
        GameState.selectedCard = GameState.DrawPile.getTop();
    }

    // in case twoPlus action state is enabled and we don't have a two plus card
    if ((GameState.actionState === CardActionEnum.TwoPlus) &&
        (GameState.selectedCard === GameState.DrawPile.getTop())) {
        let lastMoveCard;
        for (GameState.twoPlusCounter; GameState.twoPlusCounter > 0; GameState.twoPlusCounter--) {
            GameState.selectedCard.parentPileType = getPlayerPile(GameState.currentPlayer).type;
            GameState.selectedCard.isHidden = isCardHidden(PileTypeEnum.DrawPile, getPlayerPile(GameState.currentPlayer).type);
            lastMoveCard = moveCard(PileTypeEnum.DrawPile, getPlayerPile(GameState.currentPlayer).type);
            GameState.selectedCard = GameState.DrawPile.getTop();
        }
        GameState.selectedCard = null;
        return lastMoveCard;
    }

    // all other cases
    const sourcePileType = GameState.selectedCard.parentPileType;
    const destinationPileType = getDestinationPileType(sourcePileType);
    GameState.selectedCard.parentPileType = destinationPileType;
    GameState.selectedCard.isHidden = isCardHidden(sourcePileType, destinationPileType);
    updateLeadingCard(destinationPileType);
    return moveCard(sourcePileType, destinationPileType);
}

function updateLeadingCard(destinationPileType) {
    if (destinationPileType === PileTypeEnum.DiscardPile) {
        GameState.leadingCard = GameState.selectedCard;
    }
}

export function moveCard(sourcePileType, destinationPileType) {
    utils.pullItemFromArray(GameState.selectedCard, GameState[sourcePileType].cards);
    utils.insertToEndOfArray(GameState.selectedCard, GameState[destinationPileType].cards);

    if (GameState.gameStatus === GameStatusEnum.GameStateChanged) {
        GameUtils.incrementGameMovesCounter();
    }
    GameState.consoleMessage = `${GameState.selectedCard.display} was moved from ${sourcePileType} to ${destinationPileType}`;

    return {
        [sourcePileType]: {
            ...GameState[sourcePileType]
        },
        [destinationPileType]: {
            ...GameState[destinationPileType]
        }
    };
}



