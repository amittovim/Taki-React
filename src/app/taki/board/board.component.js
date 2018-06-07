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
                <Hand />
                <Deck />
                <Hand />
            </div>
        );
    }
}

export default Board;

