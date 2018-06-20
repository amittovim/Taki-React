import React, {Component} from 'react';
import './game.component.css';
import * as GameService from './game.service';
import * as GameApiService from './game-api.service';
import Board from "./board/board.component";
import {GameStatusEnum} from "../../logic/game-status.enum";
import {CardActionEnum} from "../enums/card-action-enum";
import {ModalTypeEnum} from "./modal/modal-type.enum";
import Modal from "./modal/modal.component";
import {PlayerEnum} from "../enums/player.enum";
import Navbar from "./navbar/navbar.component";
import Loader from "../shared/components/loader/loader.component";
import Console from "./console/console.component";
import Overlay from "../shared/components/overlay/overlay.component";
import {getPlayerPile} from "../../logic/utils/game.utils";

class Game extends Component {
    render() {
        return (
            <div className="game-component">
                <Navbar currentPlayer={this.state.currentPlayer}
                        turnNumber={this.state.turnNumber}
                        openModalCallback={this.handleOpenModal}
                        emitAverageTime={this.updateAverageTime}
                />
                <Loader isLoading={this.state.isLoading} />
                <Overlay isVisible={this.state.isLoading || this.state.modal.isOpen} />
                <Modal isOpen={this.state.modal.isOpen}
                       type={this.state.modal.type}
                       callback={this.state.modal.callback}
                       data={this.getStats()}
                       closeModal={this.handleCloseModal}
                />

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
            },
            isLoading: false,
            averageMoveTime: {
                minutes: 0,
                seconds: 0
            }
        };
        this.updateSelectedCard = this.updateSelectedCard.bind(this);
        this.handlePlayMove = this.handlePlayMove.bind(this);
        this.openColorPicker = this.openColorPicker.bind(this);
        this.handleChangeColor = this.handleChangeColor.bind(this);
        this.requestMoveCard = this.requestMoveCard.bind(this);
        this.handleIllegalMove = this.handleIllegalMove.bind(this);
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.updateAverageTime = this.updateAverageTime.bind(this);
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

    // Stats:

    getStats() {
        const data = {
            turnNumber: this.state.turnNumber,
            averageMinutes: this.state.averageMoveTime.minutes,
            averageSeconds: this.state.averageMoveTime.seconds,
            singleCardCounter: getPlayerPile(this.state.currentPlayer).singleCardCounter // TODO,
        };
        console.log(data);
        return data;
    }

    updateAverageTime(averageMoveTime) {
        debugger;
        this.setState({
            averageMoveTime: {
                minutes: averageMoveTime.minutes,
                seconds: averageMoveTime.seconds
            }
        })
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

    exitToTakiWiki() {
        window.location.href = 'https://en.wikipedia.org/wiki/Taki_(card_game)';
    }


    // Modal

    handleOpenModal(modalType) {
        let callback = this.getModalCallback(modalType);
        this.setState((prevState) => {
            return {
                modal: {
                    isOpen: true,
                    type: modalType,
                    callback: callback
                }
            };
        });
    }

    handleCloseModal() {
        this.setState({
            modal: {
                isOpen: false
            },
        });
    }

    getModalCallback(modalType) {
        switch (modalType) {
            case ModalTypeEnum.AbortGame: {
                return this.exitToTakiWiki;
            }
            default: {
                return null;
            }
        }
    }


    // API
    requestMoveCard() {
        GameApiService.requestMoveCard(this.state.selectedCard.id)
            .then(response => {
                if (GameStatusEnum.GameStateChanged) {
                    this.setState({
                        ...response.body,
                    }, this.processStateChanges);
                }
            })
    }

    processStateChanges() {
        if (this.state.currentPlayer !== PlayerEnum.Human) {
            this.setState({
                isLoading: true
            }, this.requestStateUpdate);
        }
    }

    requestStateUpdate() {
        GameApiService.requestGameStateUpdate()
            .then(response => {
                this.setState({
                    ...response.body,
                    isLoading: false
                }, this.requsetStateUpdate);
            })
            .catch(error => {
                console.error('Error', error);
            });
    }
}

export default Game;
