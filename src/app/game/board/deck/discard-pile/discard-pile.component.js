import React, {Component} from 'react';
import './discard-pile.component.css'
import Card from "../../../../shared/components/card/card.component";

// props

// name: string
// discardPile: pile
// moveCardDriver1: function

class DiscardPile extends Component {
    render() {
        return (
            <div className="discard-pile-component">
                {
                    this.props.discardPile.cards.map(card => {
                        return <Card key={card.id}
                                     card={card}
                                     moveCardDriver2={this.moveCardDriver2}

                        />
                    })
                }
            </div>
        );
    }
}

    constructor(props) {
        super(props);
        this.moveCardDriver2 = this.moveCardDriver2.bind(this);
    }

    moveCardDriver2(card) {
        this.props.moveCardDriver1(card, this.props.discardPile);
    };

export default DiscardPile;
