import initPlayers from 'init/players.init';
import initDrawPile from 'init/draw-pile.init';
import initDiscardPile from 'init/discard-pile.init';
import * as dealer from 'dealer/dealer';

// ===== Game init functions =====

export function initGame() {
    initPlayers();
    initDrawPile();
    initDiscardPile();
    dealer.dealCards();
}


