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
                <h2>Are you sure you want to exit?</h2>
                <div className='buttons-area'>
                    <Button label="Yes"
                            onClick={this.props.onSubmit} />
                    <Button label="No"
                            onClick={this.props.onCancel} />
                </div>
            </div>
        );
    }
}

export default AbortGameModal;
