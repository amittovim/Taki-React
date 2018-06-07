import React, {Component} from 'react';
import './taki.component.css';
import Console from "./console/console.component";
import Navbar from "./navbar/navbar.component";
import Board from "./board/board.component";
import CardModel from "../api-models/card.class";
import {CardColorEnum} from "../enums/card-color.enum";
import {CardActionEnum} from "../enums/card-action-enum";

class Taki extends Component {
    constructor(props) {
        super(props);
        this.state = {
            testCard: new CardModel(24, CardColorEnum.Blue, null, CardActionEnum.ChangeColor, false)
        }
    }

    componentWillMount() {
        this.props.service.initGame();
    }

    render() {
        return (
            <div className="taki-component">
                <Navbar />
                <Board />
                <Console message={"test"} />
            </div>
        );
    }
}

const style = {
    background: 'red'
};

export default Taki;

