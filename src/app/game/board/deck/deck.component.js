import React, {Component} from 'react';
import './deck.component.css';
import DiscardPile from "./discard-pile/discard-pile.component";
import DrawPile from "./draw-pile/draw-pile.component";

class Deck extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className="deck-component">
                <DiscardPile cards={this.props.discardPile.cards} />
                <DrawPile cards={this.props.drawPile.cards} />
            </div>
        );
    }
}

export default Deck;
