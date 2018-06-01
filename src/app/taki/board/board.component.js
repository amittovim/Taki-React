import React, {Component} from 'react';
import Hand from "./hand/hand.component";
import DrawPile from "./draw-pile/draw-pile.component";
import DiscardPile from "./discard-pile/discard-pile.component";

class Board extends Component {
    constructor(props) {
        super(props)
        {

        }
    }

    render() {
        return (
            <div>
                <Hand />
                <div>
                    <DiscardPile />
                    <DrawPile />
                </div>
                <Hand />
            </div>
        );
    }
}

export default Board;

