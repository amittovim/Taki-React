import React, {Component} from 'react';
import './hand.component.css';
import Card from "../../../shared/components/card/card.component";

class Hand extends Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    render() {
        const message = 'Hand works';
        return (
            <div className="hand-component">
                {
                    this.props.cards.map((card) => (<Card key={card.id}
                                                          card={card} />))
                }
            </div>
        )
    }
}

export default Hand;
