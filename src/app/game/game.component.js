import React, {Component} from 'react';
import './game.component.css';
import Navbar from "./navbar/navbar.component";
import Separator from "../shared/components/loader/loader.component";
import Board from "./board/board.component";
import Console from "./console/console.component";
import BoardService from './board/board.service';
import * as GameService from './game.service';

// TODO: schema
// Inputs
// render
// Constructor
// Life Cycle Hooks
// Gettes & Setters
// methods

// public
// private

// Inputs:
// service

class Game extends Component {
    // TODO: convention add inputs (props)

    render() {
        return (
            <div className="game-component">
                <Navbar turnNumber={this.state.turnNumber} />
                <Separator isLoading={this.state.isLoading} />
                <Board boardService={BoardService}
                       drawPile={this.state.drawPile}
                       discardPile={this.state.discardPile}
                       humanHand={this.humanHand}
                       botHand={this.botHand}
                       moveCardDriver={this.handleMoveCard}
                />
                <Console message={"test"} />
            </div>
        );
    }

    constructor(props) {
        super(props);

        // TODO: flatten
        this.state = {
            discardPile: {
                cards: [],
                leadingCard: null,
            },
            drawPile: {
                cards: [],
            },
            players: {
                list: null,
                currentPlayer: null,
            },
            selectedCard: null,
            activeAction: null,
            turnNumber: 0,
        };

        // TODO: find a way to remove this
        this.handleMoveCard = this.handleMoveCard.bind(this);
    }

    componentWillMount() {
        this.setState(GameService.getInitialState());
    }

    get humanHand() {
        return this.state.players.list.human.hand.pile
    }

    get botHand() {
        return this.state.players.list.bot.hand.pile
    }

    handleMoveCard(card, sourcePile) {
        BoardService.moveCard(card, sourcePile);
        this.setState((prevState) => ({
            ...this.props.service.getGameState()
        }));
        console.log(this.state);
    }
}


export default Game;

