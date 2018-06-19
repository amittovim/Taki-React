import {Component} from "react";


class GameFlowPlayer extends Component {
    render() {
        return (
            <div className="gameflow-player-modal-component">
                <div className="button-area">
                    {
                        <Button label={this.props.onClick}
                                onClick={this.props.onClick}
                                isDisabled={this.props.onClick}
                        />
                    }
                </div>
            </div>);
    }
}