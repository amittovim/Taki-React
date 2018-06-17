import React, {Component} from 'react';
import './game.component.css';
import * as GameService from './game.service';
import * as GameApiService from './game-api.service';
import Board from "./board/board.component";
import {PlayerEnum} from "../enums/player.enum";
import {GameStatus} from "../../logic/game-status.enum";
import {CardActionEnum} from "../enums/card-action-enum";
import {CardColorEnum} from "../enums/card-color.enum";
import Modal from "../shared/components/modal/modal.component";
import {ModalTypeEnum} from "../shared/components/modal/modal-type.enum";

class Game extends Component {
    render() {
        return (
            <div className="game-component">
                <Modal isOpen={this.state.isModalOpen}
                       type={this.state.modalType}
                       callback={this.toggleModal} />
                <Board drawPile={this.state.DrawPile}
                       discardPile={this.state.DiscardPile}
                       humanPile={this.state.HumanPile}
                       botPile={this.state.BotPile}
                       moveCardDriver={this.updateSelectedCard} // TODO: replace to context
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
            human: null,
            bot: null,
            currentPlayer: null,
            actionState: null,
            leadingCard: null,
            selectedCard: null,
            turnNumber: 0,
            isModalOpen: null,
            modalType: '',
            modalCallback: this.toggleModal
        };
        this.updateSelectedCard = this.updateSelectedCard.bind(this);
        this.handlePlayMove = this.handlePlayMove.bind(this);
        // this.openColorPicker = this.openColorPicker.bind(this);
        // this.handleChangeColor = this.handleChangeColor.bind(this);
        this.handleRequestMoveCard = this.handleRequestMoveCard.bind(this);
        this.handleIllegalMove = this.handleIllegalMove.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }

    componentWillMount() {
        this.setState(GameApiService.getInitialState());
    }

    openColorPicker() {
        this.setState((prevState) => {
            return {
                modalType: ModalTypeEnum.ColorPicker,
                modalCallback: this.handleChangeColor,
                isModalOpen: true
            };
        });
    }

    handleChangeColor(selectedColor) {
        this.setState((prevState) => {
            return {
                isModalOpen: false
            };
        });
        this.state.selectedCard.color = selectedColor;
        this.requestMoveCard();
    }

    handleIllegalMove() {
        console.log('illeagal move');
    }

    updateSelectedCard(card) {
        // this.setState({selectedCard: card}, this.handlePlayMove);
        this.setState({selectedCard: card}, () => {
            console.log(this.state.selectedCard);
            this.handlePlayMove();
        });
    }

    handlePlayMove() {
        const isMoveLegal = GameService.isHumanMoveLegal(this.state.selectedCard, this.state.DrawPile, this.state.actionState, this.state.leadingCard, this.state.HumanPile);
        if (!isMoveLegal) {
            return this.handleIllegalMove();
        } else if (this.state.selectedCard.action === CardActionEnum.ChangeColor || this.state.selectedCard.action === CardActionEnum.SuperTaki) {
            this.openColorPicker();
        } else {
            this.handleRequestMoveCard();
        }
    }

    handleRequestMoveCard() {
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
    }

    toggleModal() {
        let card = this.state.selectedCard;
        card.color = CardColorEnum.Red;
        this.setState({
            isModalOpen: !this.state.isModalOpen,
            selectedCard: card

        });
        this.handleRequestMoveCard();
    }
}

export default Game;
