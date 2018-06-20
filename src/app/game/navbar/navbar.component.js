import React, {Component} from 'react';
import './navbar.component.css';
import TakiLogo from '../../../assets/images/logo.png';
import InfoDisplay from '../../../app/shared/components/info-display/info-display.component';
import Timer from "../../shared/components/new-timer/new-timer.component";
import Button from "../../shared/components/button/button.component";
import {ModalTypeEnum} from "../modal/modal-type.enum";

//<PROPS>
// currentPlayer: PlayerEnum
// turnNumber: number
// openModalCallback: Function
// emitAverageTime: Function

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.handleAbortGame = this.handleAbortGame.bind(this);
        this.handleShowStats = this.handleShowStats.bind(this);
    }

    render() {
        return (
            <div className="navbar-component">
                <img className="logo"
                     src={TakiLogo}
                     alt="Taki" />

                <InfoDisplay className="current-player"
                             label="Current Player"
                             value={this.props.currentPlayer} />

                <InfoDisplay className="turn-number"
                             label="Turn Number"
                             value={this.props.turnNumber} />

                <Timer label="Game Timer"
                       isGameClock={true} />

                <Timer label="Turn Timer"
                       turnNumber={this.props.turnNumber}
                       emitAverageTime={this.props.emitAverageTime} />

                <Button label="Abort"
                        onClick={this.handleAbortGame} />

                <Button label="Stats"
                        onClick={this.handleShowStats} />

                <div className="gameStepsCarousel">

                    <Button label="<="
                            isDisabled={true}
                            onClick={this.handleAbortGame} />

                    <Button label="=>"
                            isDisabled={true}
                            onClick={this.handleAbortGame} />

                </div>
            </div>
        )
    }

    handleAbortGame() {
        this.props.openModalCallback(ModalTypeEnum.AbortGame);
    }

    handleShowStats() {
        this.props.openModalCallback(ModalTypeEnum.Statistics);
    }
}

export default Navbar;




