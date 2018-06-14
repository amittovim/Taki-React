import React, {Component} from 'react';
import './discard-pile.component.css'
import Card from "../../../../shared/components/card/card.component";

// discardPile: Pile

class DiscardPile extends Component {
    constructor(props) {
        super(props);
        this.moveCardDriver2 = this.moveCardDriver2.bind(this);
    }

    moveCardDriver2(card) {
        this.props.moveCardDriver1(card, this.props.discardPile);
    };

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

export default DiscardPile;
