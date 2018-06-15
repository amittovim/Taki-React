import {GameState} from "../state";
import * as consts from "../consts";
import * as utils from '../utils/model.utils';
import * as takiUtils from "../utils/taki.utils";
import {CardActionEnum} from "../../app/enums/card-action-enum";
import {PileTypeEnum} from "../../app/enums/pile-type.enum";
import Game from "../../app/game/game.component";
import {PlayerEnum} from "../../app/enums/player.enum";


// == Deal Hands ==

export function dealCards() {
    dealHands();
    drawStartingCard();
}

function dealHands() {
    for (let i = 1; i <= consts.NUMBER_OF_STARTING_CARDS_IN_PLAYERS_HAND; i++) {
        let card = takiUtils.getTopOfPile(GameState.DrawPile);
        handleMoveCard(card, GameState.DrawPile, GameState.HumanPile);
        card = takiUtils.getTopOfPile(GameState.DrawPile);
        handleMoveCard(card, GameState.DrawPile, GameState.BotPile);
    }
}


// TODO: FLIP CARD
// todo : unremark these lines to enable flipping cards
// ( currentPlayer.name === GameState.players.list.HumanPile.name )
//     ? card.isHidden=false
//     : card.isHidden=true;
//TODO: unremark this line to enable flipping cards
// topCard.isHidden=false;

function drawStartingCard() {
    let topCard;
    do {
        // It draws another card if the card drawn is CHANGE COLOR because you cannot start a taki with this card
        topCard = takiUtils.getTopOfPile(GameState.DrawPile);
        handleMoveCard(topCard, GameState.DrawPile, GameState.DiscardPile);
    } while (topCard.action && topCard.action === CardActionEnum.ChangeColor);

    // TODO: move this:
    // in case first card is STOP then move the turn to the next player
    // if (topCard.action === CardActionEnum.Stop) {
    //     var shouldSwitchPlayers = true;
    //     endTurn(shouldSwitchPlayers);
    // }
}

// == Move Card ==

export function handleMoveCard(card, sourcePile, destinationPile) {
    if (!destinationPile) {
        destinationPile = getDestinationPile(sourcePile);
    }
    // TODO: delete the following  line and un mark the following remark to enable cards flipping
    card.isHidden = false;
    // card.isHidden = isCardHidden(sourcePile, destinationPile);
    moveCard(destinationPile);
    setLeadingCard(card, destinationPile);
}

export function getDestinationPileType(sourcePileType) {
    switch (sourcePileType) {
        case PileTypeEnum.DrawPile:
            return GameState.currentPlayer === PlayerEnum.Human ? PileTypeEnum.HumanPile : PileTypeEnum.BotPile;
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
    return ((sourcePile.type === PileTypeEnum.DrawPile && destinationPile.type === PileTypeEnum.BotPile)
        || sourcePile.type === PileTypeEnum.DiscardPile);
}

function moveCard(destinationPile) {
    let resetSelectedCard;
    if (GameState.selectedCard===null) {
        resetSelectedCard=true;
        GameState.selectedCard=GameState.DrawPile.cards[GameState.DrawPile.cards.length-1];
    }
    const sourcePileType = GameState.selectedCard.parentPileType;
    let destinationPileType;
    if (!destinationPile) {
        destinationPileType = getDestinationPileType(sourcePileType);

    } else {
        destinationPileType = destinationPile.type;
    }

    GameState.selectedCard.parentPileType = destinationPileType;

    //TODO : delete line below and un mark the following remark to enable card flipping
    GameState.selectedCard.isHidden = false;

    // handle card flipping
    // GameState.selectedCard.isHidden = dealer.isCardHidden(GameState[sourcePileType], GameState[destinationPileType]);

    utils.pullItemFromArray(GameState.selectedCard, GameState[sourcePileType].cards);
    utils.insertToEndOfArray(GameState.selectedCard, GameState[destinationPileType].cards);
    if (resetSelectedCard) {
        GameState.selectedCard=null;
    }
    return {
        [sourcePileType]: {
            ...GameState[sourcePileType]
        },
        [destinationPileType]: {
            ...GameState[destinationPileType]
        }
    };
}


function setLeadingCard(card, destinationPile) {
    if (destinationPile.type === PileTypeEnum.DiscardPile) {
        GameState.leadingCard = card;
    }
    return GameState.leadingCard;
}

