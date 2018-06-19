import React, {Component} from 'react';
import './console.component.css';

//<PROPS>
// currentPlayer: PlayerEnum
// message: string

class Console extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="console-component">
                <span>{this.props.currentPlayer}</span>:
                <span>{this.props.message}</span>
            </div>
        );
    }
}

export default Console;
