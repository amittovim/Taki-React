import React, {Component} from 'react';
import './draw-pile.component.css';
import Card from "../../../../shared/components/card/card.component";

// props

// name: string
// drawPile: Pile
// moveCardDriver1: function

class DrawPile extends Component {
    render() {
        return (
            <div className="draw-pile-component">
                {
                    this.props.drawPile.cards.map((card, index) => {
                        return <Card key={card.id}
                                     card={card}
                                     hoverEnabled={index === this.props.drawPile.cards.length - 1}
                                     moveCardDriver2={this.moveCardDriver2}
                        />
                    })
                }
            </div>
        );
    }

    constructor(props) {
        super(props);

        this.state = {}

        this.moveCardDriver2 = this.moveCardDriver2.bind(this);

    }

    moveCardDriver2(card) {
        this.props.moveCardDriver1(card, this.props.drawPile);
    };
}

export default DrawPile;