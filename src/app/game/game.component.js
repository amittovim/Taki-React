import React, {Component} from 'react';
import './game.component.css';
import Navbar from "./navbar/navbar.component";
import Separator from "../shared/components/loader/loader.component";
import Board from "./board/board.component";
import Console from "./console/console.component";

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
            isLoading: false
        };
        debugger;
        console.log(this.props);
    }

    componentWillMount() {
        // debugger;
        // this.setInitialState();
        const initialState = this.props.service.initGame();
        this.setState((prevState) => ({
            ...initialState
        }))
    }

    render() {
        return (
            <div className="taki-component">
                <Navbar turnNumber={this.state.turnNumber} />
                <Separator isLoading={this.state.isLoading} />
                <Board drawPile={this.state.drawPile}
                       discardPile={this.state.discardPile} />
                <Console message={"test"} />
            </div>
        );
    }

    // setInitialState() {
    //     const initialState = this.props.service.initGame();
    //     this.setState((prevState) => ({
    //         ...initialState
    //     }))
    // }
}

export default Game;

