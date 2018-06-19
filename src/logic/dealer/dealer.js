import {GameState} from "../state";
import * as consts from "../consts";
import * as utils from '../utils/model.utils';
import * as GameUtils from '../utils/game.utils';
import {CardActionEnum} from "../../app/enums/card-action-enum";
import {PileTypeEnum} from "../../app/enums/pile-type.enum";
import {PlayerEnum} from "../../app/enums/player.enum";
import {GameStatusEnum} from "../game-status.enum";
import {switchPlayers} from "../main";

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

// export function isCardHidden(sourcePile, destinationPile) {
//     return ((sourcePile.type === PileTypeEnum.DrawPile && destinationPile.type === PileTypeEnum.BotPile)
//         || sourcePile.type === PileTypeEnum.DiscardPile);
// }

export function handleCardMove() {

    if (GameState.gameStatus === GameStatusEnum.GameInit || GameState.gameStatus === GameStatusEnum.SettingStartingCard) {
        GameState.selectedCard = GameState.DrawPile.cards[GameState.DrawPile.cards.length - 1];
    }
    const sourcePileType = GameState.selectedCard.parentPileType;
    const destinationPileType = getDestinationPileType(sourcePileType);
    GameState.selectedCard.parentPileType = destinationPileType;
    GameState.selectedCard.isHidden = false;
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

    if (!(  GameState.gameStatus === GameStatusEnum.GameInit ||
            GameState.gameStatus === GameStatusEnum.SettingStartingCard) ) {
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



