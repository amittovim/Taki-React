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

    //TODO : unremark the following line
    //utils.shuffleArray(GameState.drawPile.cards);
}

function createNumberCards() {
    for (const number in CardNumberEnum) {
        // if (number === CardNumberEnum.Two) {
        //     continue;
        // }
        for (let i = 1; i <= 2; i++) {
            for (let color in CardColorEnum) {
                const card = new CardModel(cardId++, CardColorEnum[color], CardNumberEnum[number]);
                GameState.drawPile.cards.push(card);
            }
        }
    }
}

function createActionCards() {
    for (const action in CardActionEnum) {
        if ( (CardActionEnum[action] !== CardActionEnum.ChangeColor) &&
             (CardActionEnum[action] !== CardActionEnum.SuperTaki) )
        {
            for (let i = 1; i <= 2; i++) {
                for (let color in CardColorEnum) {
                    GameState.drawPile.cards.push(new CardModel(cardId++, CardColorEnum[color], null, CardActionEnum[action]));
                }
            }
        } else if (CardActionEnum[action] === CardActionEnum.ChangeColor) {
            for (let j = 1; j <= 4; j++) {
                GameState.drawPile.cards.push(new CardModel(cardId++, null, null, CardActionEnum.ChangeColor));
            }
        } else if (CardActionEnum[action] === CardActionEnum.SuperTaki) {
            for (let i = 1; i <= 2; i++) {
                GameState.drawPile.cards.push(new CardModel(cardId++, null, null, CardActionEnum.SuperTaki));
            }
        }
    }

}

// TODO: @Amit: consider converting this in to a static class
