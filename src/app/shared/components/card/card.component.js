import React, {Component} from 'react';
import backImage from '../../../../assets/images/card-backside.jpeg';
import * as css from './card.style';
import {CardActionEnum} from "../../../enums/card-action-enum";

class Card extends Component {
    constructor(props) {
        debugger;
        super(props);
        this.state = {
            isOnBackSide: true,
        };
    }

    get action() {
        return this.props.card.action;
    }

    get display() {
        return this.props.card.action ? this.props.card.action : this.props.card.number;
    };

    get source() {
        if (this.action === CardActionEnum.ChangeColor || this.action === CardActionEnum.SuperTaki) {
            return `${this.display}.jpg`;
        } else {
            return `${this.display}-${this.props.card.color}.jpg`;
        }
    }

    render() {
        return (
            <div className="card-component"
                 id={`card-${this.props.card.id}`}>
                {this.state.isOnBackSide
                    ? (<img className="back-card-img"
                         src={backImage}
                         alt={this.display} />
                    : (<img className="front-card-img"
                            src={require(`../../../../assets/images/${this.source}`)} // TODO: ask Offer if this is ok?
                            alt={this.display} />)
                }
            </div>
        );
    }
}

export default Card;
