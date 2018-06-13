import React, {Component} from 'react';
import './draw-pile.component.css';
import Card from "../../../../shared/components/card/card.component";

class DrawPile extends Component {
    constructor(props) {
        super(props);

        this.state = {}

        this.moveCardDriver2 = this.moveCardDriver2.bind(this);

    }

    render() {
        return (
            <div className="draw-pile-component">
                {
                    this.props.cards.map(card => {
                        return <Card key={card.id}
                                     card={card}
                                     moveCardDriver2={this.moveCardDriver2}
                        />
                    })
                }
            </div>
        );
    }
    moveCardDriver2(card) {
        this.props.moveCardDriver1(card, this.props.drawPile);
    };
}

export default DrawPile;
