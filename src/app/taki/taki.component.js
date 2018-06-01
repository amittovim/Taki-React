import React, {Component} from 'react';
import Console from "./console/console.component";
import Navbar from "./navbar/navbar.component";
import Board from "./board/board.component";

class Taki extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={style}>
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

