import React, {Component} from 'react';
import './navbar.component.css';
import TakiLogo from '../../../assets/images/logo.png';
import InfoDisplay from '../../../app/shared/components/info-display/info-display.component';
import Clock from '../../../app/shared/components/clock/clock.component';
import Timer from '../../../app/shared/components/timer/timer.component';

//<PROPS>
// currentPlayer: PlayerEnum
// turnNumber: number

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {}
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

                <Timer className="game-time" type="game-time-clock" start={Date.now()} />
                <Clock className="turn-time" type="turn-time-clock" />
            </div>
        );
    }
}

export default Navbar;
