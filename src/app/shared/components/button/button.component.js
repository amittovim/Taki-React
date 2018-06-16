import React, {Component} from 'react';
import './button.component.css';

// <PROPS>
// label: string
// onClick: Function
// isDisabled: boolean

class Button extends Component {
    render() {
        return (
            <div className="button-component">
                <button className={`${this.props.isDisabled ? ' disabled' : ''}`}
                        onClick={this.props.onClick}>
                    {this.props.label}
                </button>
            </div>
        );
    }

    constructor(props) {
        super(props);
    }
}

export default Button;
