import React, {Component} from 'react';
import './game.component.css';
import Navbar from "./navbar/navbar.component";
import Separator from "../shared/components/loader/loader.component";
import Board from "./board/board.component";
import Console from "./console/console.component";
import BoardService from './board/board.service';


class Game extends Component {
    constructor(props) {
        super(props);
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
        this.defineInitialState = this.defineInitialState.bind(this);
        this.moveCard = this.moveCard.bind(this);
    }

    get humanHand() {
        return this.state.players.list.human.hand.pile
    }

    get botHand() {
        return this.state.players.list.bot.hand.pile
    }

    componentWillMount() {
        this.defineInitialState();
    }

    defineInitialState() {
        const initialState = this.props.service.getInitialState();
        this.setState((prevState) => ({
            ...initialState
        }));
        console.log(initialState);
    }

    moveCard(card, sourcePile) {
        BoardService.moveCard(card, sourcePile);
        this.setState((prevState) => ({
            ...this.props.service.getGameState()
        }));
        console.log(this.state);
    }


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
                       moveCardDriver={this.moveCard}

                />
                <Console message={"test"} />
            </div>
        )
            ;
    }
}


export default Game;

