import React, {Component} from 'react';
import './draw-pile.component.css';
import Card from "../../../../shared/components/card/card.component"
import CardModel from "../../../../api-models/card.class";
import {CardColorEnum} from "../../../../enums/card-color.enum";
import {CardNumberEnum} from "../../../../enums/card-number.enum";

class DrawPile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cards : [
                new CardModel(10,CardColorEnum.Blue,CardNumberEnum.Nine,null,true),
                new CardModel(11,CardColorEnum.Blue,CardNumberEnum.Eight,null,true),
                new CardModel(12,CardColorEnum.Blue,CardNumberEnum.Five,null,true),
                new CardModel(13,CardColorEnum.Blue,CardNumberEnum.One,null,true),
                new CardModel(14,CardColorEnum.Blue,CardNumberEnum.Three,null,true)
                ]
        }


    }

    render() {
        return (
            <div className="draw-pile-component">
                <span>draw pile</span>
                {this.state.cards.map(
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
