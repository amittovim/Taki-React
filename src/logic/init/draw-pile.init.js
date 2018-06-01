import {PileEnum} from "../../app/enums/pile.enum";
import {CardNumberEnum} from "../../app/enums/card-number.enum";
import {CardColorEnum} from "../../app/enums/card-color.enum";
import {CardActionEnum} from "../../app/enums/card-action-enum";
import * as utils from '../utils/model.utils';
import {GameState} from "../state";
import PileModel from "../../app/api-models/pile.class";
import {CardModel} from "../../app/api-models/card.class";

// == Create Draw Pile ==

export default function initDrawPile() {
    createDrawPile();
}

let cardId = 0;

function createDrawPile() {
    GameState.drawPile = new PileModel(PileEnum.DrawPile);
    createNumberCards();
    createActionCards();
    utils.shuffleArray(GameState.drawPile.cards);
}

function createNumberCards() {
    for (const number in CardNumberEnum) {
        if (number === CardNumberEnum.Two) {
            continue;
        }
        for (let i = 1; i <= 2; i++) {

            for (let color in ColorEnum) {
                const card = new CardModel(cardId++, ColorEnum[color], CardNumberEnum[number]);
                GameState.drawPile.cards.push(card);
            }
        }
    }
}

function createActionCards() {
    for (const action in CardActionEnum) {
        if (CardActionEnum[action] !== CardActionEnum.ChangeColor) {
            for (let i = 1; i <= 2; i++) {
                for (let color in ColorEnum) {
                    GameState.drawPile.cards.push(new CardModel(cardId++, ColorEnum[color], null, CardActionEnum[action]));
                }
            }
        } else {
            for (let j = 1; j <= 4; j++) {
                GameState.drawPile.cards.push(new CardModel(cardId++, null, null, CardActionEnum.ChangeColor));
            }
        }
    }
}

// TODO: @Amit: consider converting this in to a static class
