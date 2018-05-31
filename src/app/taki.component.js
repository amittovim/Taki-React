import React, {Component} from 'react';
import Console from "./console/console.component";
import Navbar from "./navbar/navbar.component";
import Board from "./board/board.component";

class Taki extends Component {
    constructor(props) {
        super(props)
        {

        }
    }

    render() {
        return (
            <div>
                <Navbar />
                <Board />
                <Console message={"test"}/>
            </div>
        );
    }
}

export default Taki;

