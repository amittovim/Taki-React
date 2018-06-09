import React, {Component} from 'react';
import './navbar.component.css';
import TakiLogo from '../../../assets/images/logo.png';
import InfoDisplay from '../../../app/shared/components/info-display/info-display.component';
import Clock from '../../../app/shared/components/clock/clock.component';
import Timer from '../../../app/shared/components/timer/timer.component';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className="navbar-component">
                <img className="logo" src={TakiLogo} alt="taki logo"/>
                <InfoDisplay className="current-player " value="human" description=" current player"/>
                <InfoDisplay className="turn-counter " value="5" description=" Turn"/>
                <Timer className="game-time" type="game-time-clock" start={Date.now()} />
                <Clock className="turn-time" type="turn-time-clock"/>
            </div>
        );
    }
}

export default Navbar;




