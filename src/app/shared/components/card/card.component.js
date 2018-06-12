import React, {Component} from 'react';
import './card.component.css'
import backImage from '../../../../assets/images/card-backside.jpeg';
import * as css from './card.style';
import {CardActionEnum} from "../../../enums/card-action-enum";

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleClick = this.handleClick.bind(this);

    }

    componentWillMount() {
    }

    render() {
        return (
            <div className="card-component"
                 id={`card-${this.props.card.id}`}
                 onClick={this.handleClick}>
                {this.showCard()}

            </div>
        );
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

    handleClick() {
        this.props.moveCardDriver2(this.props.card);
        // this.props.onCardClick(this.props.card);
        // this.setState(prevState => ({
        //     isOnBackSide: !this.state.isOnBackSide
        // }));
    };

    showCard() {
        if (this.props.card.isHidden) {
            return (<img className="back-card-img"
                         src={backImage}
                         alt={this.display} />);
        } else {
            return (<img className="front-card-img"
                         src={require(`../../../../assets/images/${this.source}`)} // TODO: ask Offer if this is ok?
                         alt={this.display} />);
        }
    }

}

export default Card;
