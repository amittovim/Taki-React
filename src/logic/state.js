export const GameState = {
    discardPile: {
        cards: [],
        leadingCard: null,
    },
    drawPile: {
        cards: [],
    },
    players: {
        list: null,
        currentPlayer: null,
    },
    selectedCard: null,
    activeAction: null,
    turnNumber: 0,
};

// let validator = {
//     set: function (obj, prop, value) {
//         if (!obj.hasOwnProperty(prop)) {
//             throw new TypeError(`Object does not have a ${prop} property`);
//         }
//         obj[prop] = value;
//         console.log(obj);
//         return true;
//     }
// };

// export const GameState = new Proxy(innerGameState, validator);
