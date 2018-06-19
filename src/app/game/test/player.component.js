import React, {Component} from 'react';

class Player extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="player-component">
                <h1>{this.props.currentPlayer}</h1>
            </div>
        );
    }
}

export default Player;
