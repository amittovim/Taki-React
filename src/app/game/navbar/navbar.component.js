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
// abortGameCallback: Function

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.handleAbortGame = this.handleAbortGame.bind(this);
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
                       turnNumber={this.props.turnNumber} />

                <Button label="Abort Game"
                        onClick={this.handleAbortGame} />

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
        this.props.abortGameCallback(ModalTypeEnum.AbortGame);
    }
}

export default Navbar;




