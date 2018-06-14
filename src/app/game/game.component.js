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
                       moveCardDriver={this.handlePlayMove}
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

        // this.handleMoveCard = this.handleMoveCard.bind(this);
        // this.playMove = this.playMove.bind(this);
        this.handlePlayMove = this.handlePlayMove.bind(this);
        this.requestPlayMove = this.requestPlayMove.bind(this);
    }

    componentWillMount() {
        this.setState(GameService.getInitialState());
    }

    componentDidMount() {
        debugger;
/*
        if (this.state.currentPlayer === PlayerEnum.Bot) {
            let botGameStep;
            botGameStep.leadingCard = this.state.leadingCard;
            botGameStep.activeAction = this.state.activeAction;
            botGameStep.currentPlayer = this.state.currentPlayer;
            botGameStep.turnNumber = this.state.turnNumber;

            botGameStep = GameService.playNextBotMove(botGameStep);
            this.requestPlayMove(botGameStep);

        }
*/
    }

    handlePlayMove(card, sourcePile) {
        let myGameStep; //of type GameStepObject
        debugger;
        myGameStep.srcPile = sourcePile;
        myGameStep.activeCard = card;

        //   if ( (/*card belongs to humanPile*/) || (/*card belongs to top card of drawpile*/) ) {
        if ((myGameStep.srcPile.type === PileTypeEnum.HumanPile) ||
            ((myGameStep.srcPile.type === PileTypeEnum.DrawPile) && (myGameStep.srcPile))) {   //todo finish this "if"
            myGameStep.currentPlayer = this.state.currentPlayer;
            myGameStep.activeAction = this.state.activeAction;

            requestPlayMove(myGameStep);
        }
    }

    requestPlayMove(myGameStep) {
        let nextMove = GameService.playMove(myGameStep);
        GameService.requestMove(nextMove)
            .then((successMessage) => {
                debugger;
                console.log("Yay! " + successMessage);
                this.setState((prevState) => ({
                    ...nextMove
                }))
            });
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

// what i wrote on thursday night :
// 1. went over all files and added  the "props" lines and refactored the structure of all
// react components.
// 2. build a flow of data from the beginning of the game.


// 1. if the current player isn't me : request an array (or just one object) of gameStepsRequests (each index is a move of one card)
// 2. else (current player is me ) {
// when a card is clicked run the function handlePlayMove:
//      this function build a GameStepRequestObject. fills it up while checking if a move is legit.
//      if so, finish filling the GameStepRequestObject and send it to server.
// waiting for server ok response than apply setState with the approved GameStepRequestObject
//      -