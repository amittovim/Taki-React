import React, {Component} from 'react';
import './game.component.css';
import * as GameService from './game.service';
import * as GameApiService from './game-api.service';
import Board from "./board/board.component";
import {GameStatus} from "../../logic/game-status.enum";
import Console from "./console/console.component";
import {CardActionEnum} from "../enums/card-action-enum";
import {ModalTypeEnum} from "./modal/modal-type.enum";
import Modal from "./modal/modal.component";

class Game extends Component {
    render() {
        return (
            <div className="game-component">

                <Modal isOpen={this.state.modal.isOpen}
                       type={this.state.modal.type}
                       callback={this.state.modal.callback} />

                <Board drawPile={this.state.DrawPile}
                       discardPile={this.state.DiscardPile}
                       humanPile={this.state.HumanPile}
                       botPile={this.state.BotPile}
                       moveCardDriver={this.updateSelectedCard} // TODO: replace to context
                />
                <Console text="this is the console line" />
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
            modal: {
                isOpen: null,
                type: null,
                callback: null
            }
        };
        this.updateSelectedCard = this.updateSelectedCard.bind(this);
        this.handlePlayMove = this.handlePlayMove.bind(this);
        this.openColorPicker = this.openColorPicker.bind(this);
        this.handleChangeColor = this.handleChangeColor.bind(this);
        this.handleRequestMoveCard = this.handleRequestMoveCard.bind(this);
        this.handleIllegalMove = this.handleIllegalMove.bind(this);
    }

    componentWillMount() {
        this.setState(GameApiService.getInitialState());
    }

    openColorPicker() {
        this.setState((prevState) => {
            return {
                modal: {
                    isOpen: true,
                    type: ModalTypeEnum.ColorPicker,
                    callback: this.handleChangeColor
                }
            };
        });
    }


    handleIllegalMove() {
        console.log('illegal move');
    }

    updateSelectedCard(card) {
        this.setState({selectedCard: card}, () => {
            this.handlePlayMove();
        });
    }

    handlePlayMove() {
        const isMoveLegal = GameService.isHumanMoveLegal(this.state.selectedCard, this.state.DrawPile, this.state.actionState, this.state.leadingCard, this.state.HumanPile);
        if (!isMoveLegal) {
            return this.handleIllegalMove();
        } else if (this.state.selectedCard.action === CardActionEnum.ChangeColor) {
            this.openColorPicker();
        } else if (this.state.selectedCard.action === CardActionEnum.SuperTaki) {
            this.handleChangeColor(this.state.DiscardPile.cards.getSecondCardFromTop.color);
            debugger;
        } else {
            this.handleRequestMoveCard();
        }
    }

    handleRequestMoveCard() {
        debugger;
        GameApiService.requestMoveCard(this.state.selectedCard.id)
            .then(response => {
                this.setState({...response.payload});
                return GameApiService.requestGameStateUpdate();
            })
            .then(response => {
                if (response.message === GameStatus.PlayYourNextMove) {
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

    handleChangeColor(selectedColor) {
        let card = this.state.selectedCard;
        card.color = selectedColor;
        this.setState({
            modal: {
                isOpen: false
            },
            selectedCard: card

        });
        this.handleRequestMoveCard();
    }
}

export default Game;
