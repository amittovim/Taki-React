import React, {Component} from 'react';
import './card.component.css'
import backImage from '../../../../assets/images/card-backside.jpeg';
import {CardActionEnum} from "../../../enums/card-action-enum";


// key: number
// card: card
// hoverEnabled: boolean
// Driver: function

class Card extends Component {

    render() {
        return (
            <div className={`card-component${this.props.hoverEnabled ? ' hover-enabled' : ''}`}
                 id={`card-${this.props.card.id}`}
                 onClick={this.handleClick}>
                <img className={`${this.props.card.isHidden ? 'back-card-img' : 'front-card-img'}`}
                     src={this.imageSrc}
                     alt={this.display} />
            </div>
        );
    }

    constructor(props) {
        super(props);
        this.state = {};
        this.handleClick = this.handleClick.bind(this);

    }

    get display() {
        return this.props.card.action ? this.props.card.action : this.props.card.number;
    };

    get imageSrc() {
        return this.props.card.isHidden ? backImage : require(`../../../../assets/images/${this.fileName}`);
    }

    get fileName() {
        if (this.props.card.action === CardActionEnum.ChangeColor ||
            this.props.card.action === CardActionEnum.SuperTaki) {
            if (this.props.card.color === null) {
                return `${this.display}.jpg`;
            } else {
                return `${this.display}-${this.props.card.color}.jpg`;
            }
        } else {
            return `${this.display}-${this.props.card.color}.jpg`;
        }
    }

    handleClick() {
        this.props.moveCardDriver2(this.props.card);
    };
}

export default Card;
