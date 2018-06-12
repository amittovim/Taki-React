import React, {Component} from 'react';
import './board.component.css';
import Hand from "./hand/hand.component";
import Deck from "./deck/deck.component";
import DeckService from "./deck/deck.service";


class Board extends Component {
    constructor(props) {
        super(props);
        this.state={
            discardPile: this.props.discardPile,
            drawPile: this.props.drawPile,
            humanHandPile: this.props.humanHand,
            botHandPile: this.props.botHand
        }
        // this.moveCard = this.moveCard.bind(this);
        this.moveCardDriver_1=this.moveCardDriver_1.bind(this);
    }

    moveCardDriver_1(card, sourcePile) {
        this.props.moveCardDriver(card, sourcePile);
    }

    render() {
        return (
            <div className="board-component">
                <Hand hand={this.props.botHand}
                      moveCardDriver1={this.moveCardDriver_1}
                />

                <Deck service={DeckService}
                      drawPile={this.props.drawPile}
                      discardPile={this.props.discardPile}
                      moveCardDriver0={this.moveCardDriver_1}

                />
                <Hand hand={this.props.humanHand}
                      moveCardDriver1={this.moveCardDriver_1}
                />
            </div>
        );
    }
}

export default Board;

