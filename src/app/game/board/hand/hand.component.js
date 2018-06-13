import React, {Component} from 'react';
import './hand.component.css';
import Card from "../../../shared/components/card/card.component";
import {PlayerEnum} from "../../../enums/player.enum";

class Hand extends Component {

    // @Input
    // hand
    // moveCardDriver1

    constructor(props) {
        super(props);
        this.state = {}

        this.moveCardDriver2 = this.moveCardDriver2.bind(this);
    }

    moveCardDriver2(card, sourcePile) {
        this.props.moveCardDriver1(card, this.props.hand)
    }

    isHoverEnabled() {
        let test = this.props.hand.name === PlayerEnum.Human;
        debugger;
        return this.props.hand.name === PlayerEnum.Human;
    }

    render() {
        // TODO: Amit check it this is used:
        // const classes = `hand-component ${this.props.hand.name}`
        const classes = 'hand-component';
        return (
            <div className={classes}>
                {
                    this.props.hand.cards.map((card) => (<Card key={card.id}
                                                               hoverEnabled={this.isHoverEnabled()}
                                                               card={card}
                                                               moveCardDriver2={this.moveCardDriver2}
                    />))
                }
            </div>
        )
    }
}

export default Hand;
