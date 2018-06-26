import {PileTypeEnum} from "../../app/enums/pile-type.enum";
import {CardNumberEnum} from "../../app/enums/card-number.enum";
import {CardColorEnum} from "../../app/enums/card-color.enum";
import {CardActionEnum} from "../../app/enums/card-action-enum";
import * as utils from '../utils/model.utils';
import {GameState} from "../state";
import PileModel from "../../app/api-models/pile.class";
import {CardModel} from "../../app/api-models/card.class";
import {VISIBLE_CARDS} from "../consts";

// == Create Draw Pile ==

export default function initDrawPile() {
    createDrawPile();
}

let cardId = 0;

function createDrawPile() {
    GameState.DrawPile = new PileModel(PileTypeEnum.DrawPile);
    createNumberCards();
    createActionCards();

    utils.shuffleArray(GameState.DrawPile.cards);
}

function createNumberCards() {
    for (const number in CardNumberEnum) {
        for (let i = 1; i <= 2; i++) {
            for (let color in CardColorEnum) {
                let card = new CardModel(cardId++, CardColorEnum[color], CardNumberEnum[number]);
                if (VISIBLE_CARDS ) {
                    card.isHidden = false;
                }
                GameState.DrawPile.cards.push(card);
            }
        }
    }
}

function createActionCards() {
    for (const action in CardActionEnum) {
        if ((CardActionEnum[action] !== CardActionEnum.ChangeColor) &&
            (CardActionEnum[action] !== CardActionEnum.SuperTaki)) {
            for (let i = 1; i <= 2; i++) {
                for (let color in CardColorEnum) {
                    if (!VISIBLE_CARDS ) {
                        GameState.DrawPile.cards.push(new CardModel(cardId++, CardColorEnum[color], null, CardActionEnum[action]));
                    } else{
                        GameState.DrawPile.cards.push(new CardModel(cardId++, CardColorEnum[color], null, CardActionEnum[action], false));
                    }


                }
            }
        } else if (CardActionEnum[action] === CardActionEnum.ChangeColor) {
            for (let j = 1; j <= 4; j++) {
                if (!VISIBLE_CARDS ) {
                    GameState.DrawPile.cards.push(new CardModel(cardId++, null, null, CardActionEnum.ChangeColor));
                } else{
                    GameState.DrawPile.cards.push(new CardModel(cardId++, null, null, CardActionEnum.ChangeColor, false));
                }
            }
        } else if (CardActionEnum[action] === CardActionEnum.SuperTaki) {
            for (let i = 1; i <= 2; i++) {
                if (!VISIBLE_CARDS ) {
                    GameState.DrawPile.cards.push(new CardModel(cardId++, null, null, CardActionEnum.SuperTaki));
                } else{
                    GameState.DrawPile.cards.push(new CardModel(cardId++, null, null, CardActionEnum.SuperTaki, false));
                }
            }
        }
    }
}
