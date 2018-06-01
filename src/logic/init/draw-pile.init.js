import {PileEnum} from "../../app/api-models/enums/pile.enum";
import {CardNumberEnum} from "../../app/api-models/enums/card-number.enum";
import {ColorEnum} from "../../app/api-models/enums/color.enum";
import {CardActionEnum} from "../../app/api-models/enums/card-action-enum";
import * as utils from '../utils/model.utils';
import {GameState} from "../state";
import Pile from "../../app/api-models/pile.class";

// == Create Draw Pile ==

export default function initDrawPile() {
    createDrawPile();
}

let cardId = 0;

function createDrawPile() {
    GameState.drawPile = new Pile(PileEnum.DrawPile);
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
                GameState.drawPile.cards.push(new Card(cardId++, ColorEnum[color], CardNumberEnum[number]));
            }
        }
    }
}

function createActionCards() {
    for (const action in CardActionEnum) {
        if (CardActionEnum[action] !== CardActionEnum.ChangeColor) {
            for (let i = 1; i <= 2; i++) {
                for (let color in ColorEnum) {
                    GameState.drawPile.cards.push(new Card(cardId++, ColorEnum[color], null, CardActionEnum[action]));
                }
            }
        } else {
            for (let j = 1; j <= 4; j++) {
                GameState.drawPile.cards.push(new Card(cardId++, null, null, CardActionEnum.ChangeColor));
            }
        }
    }
}

// TODO: @Amit: consider converting this in to a static class
