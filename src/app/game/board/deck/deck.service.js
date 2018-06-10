import * as dealer from '../../../../logic/dealer/dealer';

export default class DeckService {

    static moveCard(card, sourcePile, destinationPile) {
        dealer.handleMoveCard(card, sourcePile, destinationPile);
    }
}

