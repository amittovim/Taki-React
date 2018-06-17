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
        this.handlePlayMove = this.handlePlayMove.bind(this);
        this.openColorPicker = this.openColorPicker.bind(this);
        this.handleChangeColor = this.handleChangeColor.bind(this);
        this.handleRequestMoveCard = this.handleRequestMoveCard.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }

    componentWillMount() {
        this.setState(GameApiService.getInitialState());
    }
    componentDidMount(){
        // client asks server for game status. if the current player is human he will get a "its your turn" answer.
        // if current player is bot it will receive the new state which will hold the move bot player did

/*
                GameApiService.requestGameStateUpdate()
                    .then(response => {
                        if (response.message === GameStatus.ProceedPlayersTurn) {
                            console.log('You can start Playing now...');
                        }
                        else if (response.message === GameStatus.UpdatedGameState) {
                            this.setState({...response.payload});
                        }
                    })
                    .catch(error => {
                        console.error('Error', error);
                    });
        */


        //___________old code ________________________________________
        // if (this.state.currentPlayer === PlayerEnum.Bot) {
        //     const nextState = GameService.playBotMove();
        //     this.setState((prevState) => ({...nextState}));
        // }
        //____________________________________________________________

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
        // todo: the state here doesnt change
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
        debugger;
        let card=this.state.selectedCard;
        card.color= CardColorEnum.Red;
        this.setState({
            isModalOpen: !this.state.isModalOpen,
            selectedCard : card

        });
        this.handleRequestMoveCard();
    }
}

export default Game;
