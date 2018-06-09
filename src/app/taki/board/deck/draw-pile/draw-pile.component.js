import React, {Component} from 'react';
import './draw-pile.component.css';
import Card from "../../../../shared/components/card/card.component";

class DrawPile extends Component {
    constructor(props) {
        super(props);

        this.state = {}

        this.onCardClick = this.onCardClick.bind(this);

    }

    render() {
        return (
            <div className="draw-pile-component">
                {
                    this.props.cards.map(card => {
                        return <Card key={card.id}
                                     card={card}
                                     onCardClick={this.onCardClick} />
                    })
                }
            </div>
        );
    }

    onCardClick(clickedCard) {
        this.props.onCardClick(clickedCard, this.props.name);
    };
}

export default DrawPile;
