import React, {Component} from 'react';
import './game.component.css';
import * as GameService from './game.service';
import * as GameApiService from './game-api.service';
import Board from "./board/board.component";
import {PlayerEnum} from "../enums/player.enum";
import {GameStatus} from "../../logic/game-status.enum";
import {CardActionEnum} from "../enums/card-action-enum";
import Modal from "../shared/components/modal/modal.component";
import {ModalTypeEnum} from "../shared/components/modal/modal-type.enum";

class Game extends Component {

    render() {
        return (
            <div className="game-component">
                <Modal isOpen={this.state.isModalOpen}
                       type={this.state.modalType}
                       callback={this.state.modalCallback} />
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
            turnNumber: 0,
            isModalOpen: null,
            modalType: '',
            modalCallback: null
        };
        this.handlePlayMove = this.handlePlayMove.bind(this);
        this.openColorPicker = this.openColorPicker.bind(this);
        this.handleChangeColor = this.handleChangeColor.bind(this);
        this.requestMoveCard = this.requestMoveCard.bind(this);
    }

    componentWillMount() {
        this.setState(GameApiService.getInitialState());
        if (this.state.currentPlayer === PlayerEnum.Bot) {
            const nextState = GameService.playBotMove();
            this.setState((prevState) => ({...nextState}));
        }
    }

    openColorPicker() {
        this.setState({
            modalType: ModalTypeEnum.ColorPicker,
            modalCallback: this.handleChangeColor,
            isModalOpen: true
        });
    }

    handleChangeColor(selectedColor) {
        debugger;
        this.setState({
            isModalOpen: false
        });
        this.state.selectedCard.color = selectedColor;
        this.requestMoveCard();
    }

    handleIllegalMove() {
        console.log('illeagal move');
        this.setState((prevState) => ({
            selectedCard: null
        }));

    }

    handlePlayMove(card) {
        debugger;
        this.setState((prevState) => ({
                selectedCard: card
        }));
        debugger;
        const isMoveLegal = GameService.isHumanMoveLegal(card, this.state.DrawPile, this.state.actionState,
            this.state.leadingCard, this.state.HumanPile );
        if (!isMoveLegal) {
            return this.handleIllegalMove();
        } else if (card.action === CardActionEnum.ChangeColor || card.action === CardActionEnum.SuperTaki) {
            this.openColorPicker();
        } else {
            this.requestMoveCard();
        }
    }

    requestMoveCard() {

        if (isMoveLegal) {
            GameApiService.requestMoveCard(this.state.selectedCard.id)
                .then(response => {
                    this.setState({...response.payload});
                    return GameApiService.requestGameStateUpdate();
                })
                .then(response => {
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
        } else {
            throw new Error('Illegal move');
        }
    }
}

export default Game;
