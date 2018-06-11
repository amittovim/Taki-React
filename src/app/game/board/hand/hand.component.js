import React, {Component} from 'react';
import './hand.component.css';
import Card from "../../../shared/components/card/card.component";

class Hand extends Component {
    constructor(props) {
        super(props);
        this.state = {}

        this.moveCardDriver2= this.moveCardDriver2.bind(this);
    }

    moveCardDriver2(card, sourcePile) {
        this.props.moveCardDriver1(Card, this.props.hand)
    }


    render() {
        const message = 'Hand works';
        return (
            <div className="hand-component">
                {
                    this.props.hand.cards.map((card) => (<Card key={card.id}
                                                          card={card}
                                                          moveCardDriver2={this.moveCardDriver2}
                                                    />))
                }
            </div>
        )
    }
}

export default Hand;
