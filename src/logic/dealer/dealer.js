import {GameState} from "../state";
import * as consts from "../consts";
import * as utils from '../utils/model.utils';
import * as takiUtils from "../utils/taki.utils";
import {CardActionEnum} from "../../app/enums/card-action-enum";
import {PileTypeEnum} from "../../app/enums/pile-type.enum";
import Game from "../../app/game/game.component";
import {PlayerEnum} from "../../app/enums/player.enum";
import {pullItemFromArray} from "../utils/model.utils";

// == Deal Hands ==

export function dealCards() {
    dealHands();
    drawStartingCard();
}

function dealHands() {
    for (let i = 1; i <= consts.NUMBER_OF_STARTING_CARDS_IN_PLAYERS_HAND; i++) {
        let topCard = GameState.DrawPile.cards[GameState.DrawPile.cards.length-1];
        handleMoveCard(card, GameState.DrawPile, GameState.HumanPile);
        topCard = GameState.DrawPile.cards[GameState.DrawPile.cards.length-1];
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
        topCard = GameState.DrawPile.cards[GameState.DrawPile.cards.length-1];
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
    card.isHidden = isCardHidden(sourcePile, destinationPile);
    moveCard(card, sourcePile, destinationPile);
    setLeadingCard(card, destinationPile);
    console.log(GameState);
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

function isCardHidden(sourcePile, destinationPile) {
    return ((sourcePile.type === PileTypeEnum.DrawPile && destinationPile.type === PileTypeEnum.BotPile)
        || sourcePile.type === PileTypeEnum.DiscardPile);
}

function moveCard(card, sourcePile, destinationPile) {
    utils.pullItemFromArray(card, sourcePile.cards);
    utils.insertToEndOfArray(card, destinationPile.cards);
    card.parentPileType = destinationPile.type;
}

function setLeadingCard(card, destinationPile) {
    if (destinationPile.type === PileTypeEnum.DiscardPile) {
        GameState.leadingCard = card;
    }
    return GameState.leadingCard;
}

