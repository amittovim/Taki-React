export const GameState = {
    DrawPile: null,
    DiscardPile: null,
    HumanPile: null,
    BotPile: null,
    leadingCard: null,
    currentPlayer: null,
    selectedCard: null,
    actionState: null,
    turnNumber: 0,
    status: null,
    twoPlusCounter:0
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
