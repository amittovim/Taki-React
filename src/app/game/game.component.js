import React, {Component} from 'react';
import './game.component.css';
import * as GameService from './game.service';
import Board from "./board/board.component";
import * as utils from "../../logic/utils/model.utils";
import {PlayerEnum} from "../enums/player.enum";
import {handleMoveCard} from "../../logic/dealer/dealer";
import {PileTypeEnum} from "../enums/pile-type.enum";

// Props:
//

class Game extends Component {
    render() {
        return (
            <div className="game-component">
                <Board drawPile={this.state.DrawPile}
                       discardPile={this.state.DiscardPile}
                       humanPile={this.state.HumanPile}
                       botPile={this.state.BotPile}
                       // moveCardDriver={this.playMove} // TODO: replace to context
                       moveCardDriver={this.handlePlayMove()}
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

    handlePlayMove(card, sourcePile) {
        let myGameStep; //of type GameStepObject
        //   if ( (/*card belongs to humanPile*/) || (/*card belongs to top card of drawpile*/) ) {
        if ( (myGameStep.srcPile.type === PileTypeEnum.HumanPile) ||
            ( (myGameStep.srcPile.type === PileTypeEnum.DrawPile)&& (myGameStep.srcPile) ) ) {   //todo finish this "if"
            myGameStep.currentPlayer = this.state.currentPlayer;
            myGameStep.activeAction = this.state.activeAction;
            myGameStep.activeCard = card;
            myGameStep.srcPile =  sourcePile;
            nextMove = GameService.playMove(myGameStep);
        }

    }

/*
    handleMoveCard(card, sourcePile) {
        let GameStepObject myGameStep ;
        myGameStep.srcPile = sourcePile;
        myGameStep.dstPile = GameService.getDestinationPile(sourcePile);
        const updatedPiles = GameService.moveCard(card, sourcePile, destinationPile);
        GameService.requestMove(updatedPiles)
            .then((successMessage) => {
                debugger;
                console.log("Yay! " + successMessage);
                this.setState((prevState) => ({
                    ...updatedPiles
                }))
            });
    }
*/
}

export default Game;

