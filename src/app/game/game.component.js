import React, {Component} from 'react';
import './game.component.css';
import * as GameService from './game.service';
import * as GameApiService from './game-api.service';
import Board from "./board/board.component";
import {PlayerEnum} from "../enums/player.enum";
import {GameStatus} from "../../logic/game-status.enum";

class Game extends Component {

    render() {
        return (
            <div className="game-component">
                <Board drawPile={this.state.DrawPile}
                       discardPile={this.state.DiscardPile}
                       humanPile={this.state.HumanPile}
                       botPile={this.state.BotPile}
                       moveCardDriver={this.handlePlayMove} // TODO: replace to context
                />
            </div>
        );
    }

    constructor(props) {
        super(props);
        this.state = {
            DrawPile: null,
            DiscardPile: null,
            HumanPile: null,
            BotPile: null,
            leadingCard: null,
            actionState: null,
            currentPlayer: null,
            selectedCard: null,
            turnNumber: 0
        };
        this.handlePlayMove = this.handlePlayMove.bind(this);
    }

    componentWillMount() {
        this.setState(GameApiService.getInitialState());
        if (this.state.currentPlayer === PlayerEnum.Bot) {
            const nextState = GameService.playBotMove();
            this.setState((prevState) => ({...nextState}));
        }
    }

    handlePlayMove(card) {
        debugger;
        if (GameService.isHumanMoveLegal(card, this.state.DrawPile, this.state.actionState, this.state.leadingCard, this.state.HumanPile)) {
            console.log('move is legal');
        } else {
            console.log('move is NOT legal');
            return;
        }
        debugger;
        GameApiService.requestMoveCard(card.id)
            .then(response => {
                this.setState({...response.payload});
                return GameApiService.requestGameStateUpdate();
            })
            .then(response => {
                if (response.message === GameStatus.ProceedPlayersTurn) {
                    console.log('Turn still not ended, go on');
                    console.log(this.state);
                    debugger;

                }
                else if (response.message === GameStatus.UpdatedGameState) {
                    this.setState({...response.payload});
                    console.log(this.state);
                    debugger;
                }
            })
            .catch(error => {
                console.error('Error', error);
            });
    }
}

export default Game;
