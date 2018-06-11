import React, {Component} from 'react';
import './draw-pile.component.css';
import Card from "../../../../shared/components/card/card.component";

class DrawPile extends Component {
    constructor(props) {
        super(props);

        this.state = {}

        // this.onCardClick = this.onCardClick.bind(this);
        this.moveCardDriver2 = this.moveCardDriver2.bind(this);

    }

    render() {
        return (
            <div className="draw-pile-component">
                {
                    this.props.cards.map(card => {
                        return <Card key={card.id}
                                     card={card}
                                     // onCardClick={this.onCardClick}
                                     moveCardDriver2={this.moveCardDriver2}
                        />
                    })
                }
            </div>
        );
    }

    // onCardClick(clickedCard) {
    //     this.props.onCardClick(clickedCard, this.props.name);
    // };

    moveCardDriver2(card) {
        this.props.moveCardDriver1(card, this.props.drawPile);
    };
}

export default DrawPile;
