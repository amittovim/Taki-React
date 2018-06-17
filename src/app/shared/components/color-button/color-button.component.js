import React, {Component} from 'react';
import './color-button.component.css';

// <PROPS>
// color: CardColorEnum

class ColorButton extends Component {
    constructor(props) {
        super(props);
        this.handleButtonClick = this.handleButtonClick.bind(this);
    }

    render() {
        return (
            <div className="color-button-component">
                <button name={this.props.color}
                        className={this.props.color}
                        onClick={this.handleButtonClick}>
                </button>
            </div>
        );
    }

    handleButtonClick() {
        this.props.callback(this.props.color);
    }
}

export default ColorButton;
