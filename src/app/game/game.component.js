import React, {Component} from 'react';
import './game.component.css';
import * as GameService from './game.service';
import Board from "./board/board.component";

class Game extends Component {

    render() {
        return (
            <div className="game-component">
                <Board drawPile={this.state.drawPile}
                       discardPile={this.state.discardPile}
                       humanPile={this.state.human.pile}
                       botPile={this.state.bot.pile}
                       moveCardDriver={this.handleMoveCard} // TODO: replace to context
                />
            </div>
        );
    }

    constructor(props) {
        super(props);

        this.state = {
            drawPile: null,
            discardPile: null,
            human: null,
            bot: null,
            leadingCard: null,
            currentPlayer: null,
            selectedCard: null,
            activeAction: null,
            turnNumber: 0,
        };

        this.handleMoveCard = this.handleMoveCard.bind(this);
    }

    componentWillMount() {
        this.setState(GameService.getInitialState());
    }

    handleMoveCard(card, sourcePile) {
        debugger;
        GameService.moveCard(card, sourcePile);
        this.setState((prevState) => ({
            ...prevState
        }));
    }
}

export default Game;

