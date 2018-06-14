import React, {Component} from 'react';
import './game.component.css';
import * as GameService from './game.service';
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
                       moveCardDriver={this.playMove} // TODO: replace to context
                />
            </div>
        );
    }

    constructor(props) {
        //
        // // client => server
        //
        // makeMove(body)
        // {
        //     body: {
        //         sourcePileEnum: Pile,
        //             destinationPileEnum
        //     :
        //         Pile
        //     }
        // }
        //
        // // server => client
        //
        // makeBotMove()
        // {

        // }

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

        this.handleMoveCard = this.handleMoveCard.bind(this);
        this.playMove = this.playMove.bind(this);
    }


    componentWillMount() {
        this.setState(GameService.getInitialState());
        if (this.state.currentPlayer === PlayerEnum.Bot) {
            const nextState = GameService.playBotMove();
            this.setState((prevState) => ({...nextState}));
        }
    }

    playMove(card, sourcePile) {
        debugger;
        if (GameService.isMoveLegal()) {
            this.handleMoveCard(card, sourcePile);
        } else {
            alert('Error!');
        }
    }

    handleMoveCard(card, sourcePile) {
        const destinationPile = GameService.getDestinationPile(sourcePile);
        const updatedPiles = this.moveCard(card, sourcePile, destinationPile);
        GameService.requestMove(updatedPiles)
            .then((successMessage) => {
                debugger;
                console.log("Yay! " + successMessage);
                this.setState((prevState) => ({
                    ...updatedPiles
                }))
            });
    }


    moveCard(card, sourcePile, destinationPile) {
        return {
            ['sourcePile.type']: utils.pullItemFromArray(card, sourcePile.cards),
            ['destinationPile.type']: utils.insertToEndOfArray(card, destinationPile.cards)
        }
    }
}

export default Game;

