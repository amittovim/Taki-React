import React, {Component} from 'react';
import './game.component.css';
import * as GameService from './game.service';
import * as GameApiService from './game-api.service';
import Board from "./board/board.component";
import * as utils from "../../logic/utils/model.utils";
import {PlayerEnum} from "../enums/player.enum";
import {handleMoveCard} from "../../logic/dealer/dealer";
import {GameStatus} from "../../logic/game-status.enum";
import Loader from "../shared/components/loader/loader.component";

class Game extends Component {

    render() {
        return (
            <div className="game-component">
                <Loader isLoading={this.state.isLoading} />
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
            turnNumber: 0,
            isLoading: false
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
        this.setState({isLoading: true});
        GameApiService.requestMoveCard(card.id)
            .then(response => {
                this.setState({...response.payload});
                return GameApiService.requestGameStateUpdate();
            })
            .then(response => {
                this.setState({isLoading: false});
                if (response.message === GameStatus.ProceedPlayersTurn) {
                    console.log('Turn still not ended, go on');
                }
                else if (response.message === GameStatus.UpdatedGameState) {
                    this.setState({...response.payload});
                }
            })
            .catch(error => {
                console.error('Error', error);
            });
    }
}

export default Game;
