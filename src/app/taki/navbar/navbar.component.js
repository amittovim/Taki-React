import React, {Component} from 'react';
import './navbar.component.css';
import TakiLogo from '../../../assets/images/logo.png';
class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div className="navbar-component">
                <img className="logo" src={TakiLogo} alt="taki logo"/>

{/*
                <Logo />
                <InfoDisplay className="current-player" />
                <InfoDisplay className="turn-counter" />
                <TurnTimeWatch />
                <GameTimeWatch />
*/}

            </div>
        );
    }
}

export default Navbar;




