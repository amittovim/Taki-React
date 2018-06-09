import React, {Component} from 'react';
import './draw-pile.component.css';
import Card from "../../../../shared/components/card/card.component"
import CardModel from "../../../../api-models/card.class";
import {CardColorEnum} from "../../../../enums/card-color.enum";
import {CardNumberEnum} from "../../../../enums/card-number.enum";

class DrawPile extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className="draw-pile-component">
                <span>draw pile</span>
                {this.props.cards.map(
                    (cardItem) => {
                        return (
                            <Card key={cardItem.id}
                                  card={cardItem}

                            />
                        );
                    }
                )}
            </div>
        );
    }
}

export default DrawPile;
