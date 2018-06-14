import React, {Component} from 'react';
import './hand.component.css';
import Card from "../../../shared/components/card/card.component";
import {PlayerEnum} from "../../../enums/player.enum";

// owner: PlayerEnum
// pile: Pile
// moveCardDriver1

class Hand extends Component {

    render() {
        return (
            <div className="hand-component">
                {
                    this.props.pile.cards.map((card) => {
                        return (<Card key={card.id}
                                      card={card}
                                      hoverEnabled={this.props.owner === PlayerEnum.Human}
                                      moveCardDriver2={this.moveCardDriver2}
                        />)
                    })
                }
            </div>
        )
    }

    constructor(props) {
        super(props);
        this.state = {}
        this.moveCardDriver2 = this.moveCardDriver2.bind(this);
    }

    moveCardDriver2(card) {
        this.props.moveCardDriver1(card, this.props.pile)
    }
}

export default Hand;
