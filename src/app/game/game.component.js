import React, {Component} from 'react';
import './game.component.css';
import * as GameService from './game.service';
import * as GameApiService from './game-api.service';
import Board from "./board/board.component";
import * as utils from "../../logic/utils/model.utils";
import {PlayerEnum} from "../enums/player.enum";
import {handleMoveCard} from "../../logic/dealer/dealer";

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
            activeAction: null,
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
        GameApiService.requestMoveCard(card.id)
            .then(newState => {
                this.setState((prevState) => ({
                    ...newState
                }))
            })
            .catch(error => {
                console.error('Error', error);
            });
    }


}

export default Game;

