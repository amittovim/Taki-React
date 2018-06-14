import React, {Component} from 'react';
import './deck.component.css';
import DiscardPile from "./discard-pile/discard-pile.component";
import DrawPile from "./draw-pile/draw-pile.component";

// Props:

// DrawPile: pile
// DiscardPile : pile
// moveCardDriver0: function

class Deck extends Component {
    render() {
        return (
            <div className="deck-component">
                <DiscardPile name="discardPile"
                             discardPile={this.props.discardPile}
                             moveCardDriver1={this.moveCardDriver1}
                />
                <DrawPile name="drawPile"
                          drawPile={this.props.drawPile}
                          moveCardDriver1={this.moveCardDriver1}
                />
            </div>
        );
    }

    constructor(props) {
        super(props);
        this.moveCardDriver1 = this.moveCardDriver1.bind(this);
    }

    moveCardDriver1(card, sourcePile) {
        this.props.moveCardDriver0(card, sourcePile);
    }
}

export default Deck;
