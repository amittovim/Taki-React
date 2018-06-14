import * as game from '../../logic/main';
import * as dealer from '../../logic/dealer/dealer';


// API

export function getInitialState() {
    return game.initGame();
}

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
