import React, {Component} from 'react';
import './board.component.css';
import Hand from "./hand/hand.component";
import Deck from "./deck/deck.component";


class Board extends Component {
    constructor(props) {
        super(props)
        {

        }
    }

    render() {
        return (
            <div className="board-component">
                <Hand {...this.props.botHand} />

                <Deck drawPile={this.props.drawPile}
                      discardPile={this.props.discardPile} />
                <Hand {...this.props.humanHand} />
            </div>
        );
    }
}

export default Board;

