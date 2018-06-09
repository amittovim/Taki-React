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

        this.moveCard = this.moveCard.bind(this);
    }
    
    render() {
        return (
            <div className="deck-component">
                <DiscardPile name="discardPile"
                             cards={this.state.discardPile.cards} />
                <DrawPile name="drawPile"
                          cards={this.state.drawPile.cards}
                          onCardClick={this.moveCard} />
            </div>
        );
    }

    moveCard(card, sourcePile) {
        this.props.service.moveCard(card, this.state[sourcePile], this.state['discardPile']);
        console.log(this.state);
        this.forceUpdate(); // TODO: ask Offer how to avoid this?
    }
}

export default Deck;
