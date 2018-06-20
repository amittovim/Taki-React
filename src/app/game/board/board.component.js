import React, {Component} from 'react';
import Hand from "./hand/hand.component";
import Deck from "./deck/deck.component";
import {PlayerEnum} from "../../enums/player.enum";

// DrawPile: Pile
// DiscardPile: Pile
// humanPile: Pile
// botPile: Pile
// moveCardDriver: function
// isGameOver: boolean

class Board extends Component {

    render() {
        return (
            <div className="board-component">
                <Hand owner={PlayerEnum.Bot}
                      pile={this.props.botPile}
                      moveCardDriver1={this.moveCardDriver_1}
                />
                <Deck drawPile={this.props.drawPile}
                      discardPile={this.props.discardPile}
                      moveCardDriver0={this.moveCardDriver_1}

                />
                <Hand owner={PlayerEnum.Human}
                      pile={this.props.humanPile}
                      moveCardDriver1={this.moveCardDriver_1}
                />
            </div>
        );
    }

    constructor(props) {
        super(props);
        this.moveCardDriver_1 = this.moveCardDriver_1.bind(this);
    }

    moveCardDriver_1(card, sourcePile) {
        this.props.moveCardDriver(card, sourcePile);
    }
}

export default Board;

