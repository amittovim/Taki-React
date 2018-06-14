import * as game from '../../logic/main';
import * as dealer from '../../logic/dealer/dealer';
import * as utils from "../../logic/utils/model.utils";
import {PileTypeEnum} from "../enums/pile-type.enum";


// API

export function getInitialState() {
    return game.initGame();
}


export function playMove(myGameStep) {
    let card = myGameStep.activeCard;
    let source = myGameStep.srcPile;
    let destination = getDestinationPile(source);
    myGameStep.shouldSwitchPlayers = false;
    switch (myGameStep.currentPlayer) {
        case PlayerEnum.Bot: {
            // moveCard(card, source, destination);
            // shouldSwitchPlayers = playMoveManager();
            break;
        }
        case PlayerEnum.Human: {
            if (!isMoveLegal(card)) {
                // printLogOnDom('Invalid move!');
                return;
            } else {
                let myUpdatedGameStep = moveCard(card, source, destination);
                myGameStep.shouldSwitchPlayers = playMoveManager();
            }
            break;
        }
        default: {
            break;
        }
    }
}


export function moveCard(card, sourcePile, destinationPile) {
    return {
        ['sourcePile.type']: utils.pullItemFromArray(card, sourcePile.cards),
        ['destinationPile.type']: utils.insertToEndOfArray(card, destinationPile.cards)
    }
}

export function playMoveManager(myGameStep) {
    let card = myGameStep.activeCard;
    let player = myGameStep.currentPlayer;
    myGameStep.shouldSwitchPlayer = true;

    if ( myGameStep.srcPile === PileTypeEnum.DiscardPile ) {
        //myGameStep=raiseActionFlag(myGameStep);  todo: unremark this line once i remmember what action flag is
    }

    if ( player.pile.length === 1) {
        player.singleCardCounter++;
    }

    if (myGameStep.activeAction === CardActionEnum.ChangeColor) {
        if (player === PlayerEnum.Bot) {
            let ccNewColor = pickRandomColor();
//            change2Color(ccNewColor);     TODO: show indication of changed color (maybee give it a background)
        } else {
            myGameStep.shouldSwitchPlayer = false;
            // TODO: need to show a popup to choose color
            // loadPopUp('.choose-color-popup');
        }
    } else if ( (card.action === CardActionEnum.Stop) && (myGameStep.activeAction === CardActionEnum.Stop) ) {
        myGameStep.shouldSwitchPlayer = false;
        myGameStep.turnNumber++;
//        $('.turn-number').textContent = GameState.turnNumber;
        if (player === PlayerEnum.Bot) {
        }
    } else if (myGameStep.activeAction === CardActionEnum.Taki) {
        myGameStep.shouldSwitchPlayer = !doesPileHaveSameColorCards();
    }

//    return shouldSwitchPlayer;
    return myGameStep;
}

export function doesPileHaveSameColorCards(myGameStep) {
    let handHaveSameColor = false;
    myGameStep.currentPlayer.pile.cards.forEach(function (Card) {
        if (Card.color === myGameStep.activeCard.color)
            handHaveSameColor = true;
    });
    return handHaveSameColor;
}

export function pickRandomColor() {
    let randomInt = utils.getRandomInt(0, 3);
    let color = utils.getKey(CardColorEnum, randomInt);
    return CardColorEnum[color];
}

/*function raiseActionFlag(myGameStep) {
    // if current card isn't an action there's nothing to raise so we leave the function
    if (!myGameStep.activeCard.isActionCard()) {
        return myGameStep;
        // if current card is an action card
    } else {
        // if current action-flag is DIFFERENT than TAKI then update action-flag
        // value to be the action on our current card, in memory and on screen.
        if ( myGameStep.activeAction !== CardActionEnum.Taki) {
            myGameStep.activeAction = myGameStep.activeCard.action;
            //  $('.active-action').textContent = GameState.activeAction;

            // if current action-flag IS taki and player has no more cards with same color to put on it
            // update the action-flag value to the action of the card we just used
        } else {
            let matchedCard = getCardInHand(myGameStep.currentPlayer, [{color: myGameStep.leadingCard.color}]);
            if (matchedCard === undefined ) {  //if (!availableMoveExist()) {
                myGameStep.activeAction = myGameStep.activeCard.action;
                // $('.active-action').textContent = GameState.activeAction;
            }
        }
    }
    return myGameStep;
}*/

/*
function playNextBotMove(myGameStep) {
    // delay();
    let leadingCard = myGameStep.leadingCard;
    let activeAction = myGameStep.activeAction;
    let bot = PlayerEnum.Bot;
    let matchedCard;

    // if you have CC card and you're allowed to put it - mark it as the active card.
    if (matchedCard = getCardInHand(bot, [{action: CardActionEnum.ChangeColor}])) {
        myGameStep.activeCard = matchedCard;
    }
    // if you have a Stop card and its the same color as the leading card - mark it as the active card.
    else if (matchedCard = getCardInHand(bot, [{action: CardActionEnum.Stop}, {color: leadingCard.color}])) {
        myGameStep.activeCard = matchedCard;
    }
    // else if (matchedCard = getCardInHand(bot, [{action: CardActionEnum.Plus}, {color: leadingCard.color}])) {
    //     GameState.activeCard = matchedCard;
    // }
    // if you have a taki card and it has the same color as the leading card - mark it as the active card.
    else if (matchedCard = getCardInHand(bot, [{action: CardActionEnum.Taki}, {color: leadingCard.color}])) {
        myGameStep.activeCard = matchedCard;
    }
    // if you have a card with the same color as the leading card - mark it as the active card.
    else if (matchedCard = getCardInHand(bot, [{color: leadingCard.color}])) {
        myGameStep.activeCard = matchedCard;
    }
    // if you have a card with the same number as the leading card - mark it as the active card.
    else if ( ( leadingCard.number !== null) && (matchedCard = getCardInHand(bot, [{number: leadingCard.number}])) ) {
        myGameStep.activeCard = matchedCard;
    }
    // if none of the conditions above happen - mark the top card of the draw pile as the active card.
    else {
        myGameStep.activeCard = GameState.drawPile.getTop();
    }
    playMove();
}
*/








export function requestMove(updatedPiles) {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            resolve("Success!"); // Yay! Everything went well!
        }, 250);
    });
}

// Client


export function getDestinationPile(sourcePile) {
    return dealer.getDestinationPile(sourcePile);
}

export function isMoveLegal() {
    return true;
}
