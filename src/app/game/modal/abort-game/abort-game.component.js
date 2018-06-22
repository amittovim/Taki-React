import React, {Component} from 'react';
import './abort-game.component.css';
import Button from "../../../shared/components/button/button.component";

// onSubmit: Function
// onCancel: Function

class AbortGameModal extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="abort-game-modal-component">
                <h1>Abort Game</h1>
                <h2>What do you wanna do?</h2>
                <div className='buttons-area'>
                    <Button label="Exit"
                            onClick={this.props.onSubmit} />
                    <Button label="Restart"
                            onClick={this.props.onRestart} />
                    <Button label="Cancel"
                            onClick={this.props.onCancel} />
                </div>
            </div>
        );
    }
}

export default AbortGameModal;
