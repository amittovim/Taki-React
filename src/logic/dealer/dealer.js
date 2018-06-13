import {GameState} from "../state";
import * as consts from "../consts";
import * as utils from '../utils/model.utils';
import * as takiUtils from "../utils/taki.utils";
import {CardActionEnum} from "../../app/enums/card-action-enum";
import {PileEnum} from "../../app/enums/pile.enum";
import Game from "../../app/game/game.component";
import {PlayerEnum} from "../../app/enums/player.enum";

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
            // todo : unremark these lines to enable flipping cards
            // ( currentPlayer.name === GameState.players.list.human.name )
            //     ? card.isHidden=false
            //     : card.isHidden=true;
            moveCard(card, GameState.drawPile, currentPlayer.hand.pile);
        }
    }
}

function drawStartingCard() {
    let topCard;
    do {
        // It draws another card if the card drawn is CHANGE COLOR because you cannot start a taki with this card
        topCard = takiUtils.getTopOfPile(GameState.drawPile);
        //TODO: unremark this line to enable flipping cards
        // topCard.isHidden=false;
        moveCard(topCard, GameState.drawPile, GameState.discardPile);

    } while (topCard.action && topCard.action === CardActionEnum.ChangeColor);

    // TODO: move this:
    // in case first card is STOP then move the turn to the next player
    // if (topCard.action === CardActionEnum.Stop) {
    //     var shouldSwitchPlayers = true;
    //     endTurn(shouldSwitchPlayers);
    // }
}

// == Move Card ==

export function handleMoveCard(card, sourcePile) {
    debugger;
    let destinationPile;
    switch (sourcePile.name) {
        case (PileEnum.DrawPile): {
            if (PlayerEnum.Human === GameState.players.currentPlayer.name) {
                destinationPile = GameState.players.list.human.hand.pile;     //PileEnum.HumanHand;
                card.isHidden=false;
            } else {
                destinationPile = GameState.players.list.bot.hand.pile;    //PileEnum.BotHand;
                // card.isHidden=true;   //TODO: unremark this line when enabling flipping cards
            }
            break;
        }
        case (PileEnum.DiscardPile): {
            destinationPile = GameState.drawPile;
            // card.isHidden=true;   //TODO: unremark this line when enabling flipping cards
            break;
        }
        case (PileEnum.HumanHand): {
            destinationPile = GameState.discardPile;
            card.isHidden=false;
            break;
        }
        case (PileEnum.BotHand): {
            destinationPile = GameState.discardPile;
            card.isHidden=false;
            break;
        }
        default: {
            break;
        }
    }
    moveCard(card, sourcePile, destinationPile);
    setLeadingCard(card, destinationPile);
}

function moveCard(card, sourcePile, destinationPile) {
    utils.pullItemFromArray(card, sourcePile.cards);
    utils.insertToEndOfArray(card, destinationPile.cards);
}

function setLeadingCard(card, destinationPile) {
    if (destinationPile === GameState.discardPile) {
        GameState.discardPile.leadingCard = card;
    }
}
