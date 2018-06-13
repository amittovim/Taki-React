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
        let card = takiUtils.getTopOfPile(GameState.drawPile);
        moveCard(card, GameState.drawPile, GameState.human.pile);
        card = takiUtils.getTopOfPile(GameState.drawPile);
        moveCard(card, GameState.drawPile, GameState.bot.pile);
    }
}


// TODO: FLIP CARD
// todo : unremark these lines to enable flipping cards
// ( currentPlayer.name === GameState.players.list.human.name )
//     ? card.isHidden=false
//     : card.isHidden=true;
//TODO: unremark this line to enable flipping cards
// topCard.isHidden=false;

function drawStartingCard() {
    let topCard;
    do {
        // It draws another card if the card drawn is CHANGE COLOR because you cannot start a taki with this card
        topCard = takiUtils.getTopOfPile(GameState.drawPile);
        handleMoveCard(topCard, GameState.drawPile, GameState.discardPile);
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
    card.isHidden = isCardHidden();
    moveCard(card, sourcePile, destinationPile);
    setLeadingCard(card, destinationPile);
}

function getDestinationPile(sourcePile) {
    switch (sourcePile.type) {
        case PileTypeEnum.DrawPile:
            return GameState.currentPlayer === PlayerEnum.Human ? GameState.human.pile : GameState.bot.pile;
        case PileTypeEnum.DiscardPile:
            return GameState.drawPile;
        case PileTypeEnum.HumanHand:
        case PileTypeEnum.BotHand:
            return GameState.discardPile;
        default:
            break;
    }
}

function isCardHidden(sourcePile) {
    return ((sourcePile === PileTypeEnum.DrawPile && GameState.currentPlayer === PlayerEnum.Bot)
        || sourcePile === PileTypeEnum.DiscardPile);
}

function moveCard(card, sourcePile, destinationPile) {
    utils.pullItemFromArray(card, sourcePile.cards);
    utils.insertToEndOfArray(card, destinationPile.cards);
}

function setLeadingCard(card, destinationPile) {
    if (destinationPile.type === PileTypeEnum.DiscardPile) {
        GameState.leadingCard = card;
    }
}

