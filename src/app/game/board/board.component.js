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
        this.moveCard = this.moveCard.bind(this);
    }

    render() {
        return (
            <div className="board-component">
                <Hand hand={this.props.botHand}
                      moveCardDriver1={this.moveCard}
                />

                <Deck service={DeckService}
                      drawPile={this.props.drawPile}
                      discardPile={this.props.discardPile}
                      moveCardDriver0={this.moveCard}

                />
                <Hand hand={this.props.humanHand}
                      moveCardDriver1={this.moveCard}
                />
            </div>
        );
    }

    moveCard(card, sourcePile) {
        this.props.boardService.moveCard(card, this.state[sourcePile.name]);
        console.log(this.state);
        this.forceUpdate(); // TODO: ask Offer how to avoid this?
    }

}

export default Board;

