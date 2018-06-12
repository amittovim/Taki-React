import React, {Component} from 'react';
import './deck.component.css';
import DiscardPile from "./discard-pile/discard-pile.component";
import DrawPile from "./draw-pile/draw-pile.component";

class Deck extends Component {
    constructor(props) {
        super(props);
        this.state = {
            discardPile: this.props.discardPile,
            drawPile: this.props.drawPile
        };
        this.moveCardDriver1 = this.moveCardDriver1.bind(this);
    }
    
    render() {
        return (
            <div className="deck-component">
                <DiscardPile name="discardPile"
                             discardPile={this.props.discardPile}
                             cards={this.state.discardPile.cards}
                             moveCardDriver1={this.moveCardDriver1}
                />
                <DrawPile name="drawPile"
                          drawPile={this.props.drawPile}
                          cards={this.state.drawPile.cards}
                          // onCardClick={this.moveCard}
                          moveCardDriver1={this.moveCardDriver1}
                />
            </div>
        );
    }

    moveCardDriver1(card, sourcePile) {
        this.props.moveCardDriver0(card, sourcePile);
    }
}

export default Deck;
