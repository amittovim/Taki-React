import {GameState} from "../state";
import * as consts from "../consts";
import * as utils from '../utils/model.utils';
import * as takiUtils from "../utils/taki.utils";
import {CardActionEnum} from "../../app/api-models/enums/card-action-enum";

// == Deal Hands ==

export function dealCards() {
    dealHands();
    drawStartingCard();
}

function dealHands() {
    for (let i = 1; i <= consts.NUMBER_OF_STARTING_CARDS_IN_PLAYERS_HAND; i++) {
        for (let player in GameState.players.list) {
            const currentPlayer = GameState.players.list[player];
            const card = takiUtils.getTopOfPile(GameState.drawPile);
            debugger;
            handleMoveCard(card, GameState.drawPile, currentPlayer.hand.pile);
        }
    }
}

function drawStartingCard() {
    let topCard;
    do {
        // It draws another card if the card drawn is CHANGE COLOR because you cannot start a game with this card
        topCard = takiUtils.getTopOfPile(GameState.drawPile.cards);
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
    moveCard(card, sourcePile, destinationPile);
    setLeadingCard(card, destinationPile);
    // rollOverCard();
}

function moveCard(card, sourcePile, destinationPile) {
    utils.pullItemFromArray(card, sourcePile.cards);
    utils.insertToEndOfArray(card, destinationPile.cards);
}

function setLeadingCard(card, destinationPile) {
    if (destinationPile === GameState.discardPile) {
        GameState.leadingCard = card;
    }
}

// TODO: is this needed?
function rollOverCard() {
    // if (shouldFlipCard(sourcePile, destinationPile)) {
    //     rollOverCard(card);
    // }
}
