import React, {Component} from 'react';
import './game.component.css';
import * as GameService from './game.service';
import * as GameApiService from './game-api.service';
import Board from "./board/board.component";
import {GameStatusEnum} from "../../logic/game-status.enum";
import Console from "./console/console.component";
import {GameStatusEnum} from "../../logic/game-status.enum";
import {CardActionEnum} from "../enums/card-action-enum";
import {ModalTypeEnum} from "./modal/modal-type.enum";
import Modal from "./modal/modal.component";
import {PlayerEnum} from "../enums/player.enum";
import {GameState} from "../../logic/state";
import Player from "./test/player.component";
import Console from "./console/console.component";

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
                <Console message={this.state.consoleMessage} />
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
            consoleMessage: '',
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
        this.requestMoveCard = this.requestMoveCard.bind(this);
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
        this.setState({
            consoleMessage: 'illegal move'
        });
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
        } else {
            this.requestMoveCard();
        }
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
        this.requestMoveCard();
    }


    // API
    requestMoveCard() {
        GameApiService.requestMoveCard(this.state.selectedCard.id)
            .then(response => {
                if (GameStatusEnum.GameStateChanged) {
                    this.setState({...response.body}, this.processNewState);
                }
            })
    }

    processNewState() {
        if (this.state.currentPlayer !== PlayerEnum.Human) {
            GameApiService.requestGameStateUpdate()
                .then(response => {
                    this.setState({...response.body}, this.processNewState);
                })
                .catch(error => {
                    console.error('Error', error);
                });
        }
    }
}

export default Game;
