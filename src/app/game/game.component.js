import React, {Component} from 'react';
import './game.component.css';
import Navbar from "./navbar/navbar.component";
import Separator from "../shared/components/loader/loader.component";
import Board from "./board/board.component";
import Console from "./console/console.component";

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        debugger;
        console.log(this.props);
    }

    componentWillMount() {
        this.defineInitialState();
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

    defineInitialState() {
        const initialState = this.props.service.getInitialState();
        this.setState((prevState) => ({
            ...initialState
        }));
        console.log(initialState);
    }
}

export default Game;
