import React, {Component} from 'react';
import './info-display.component.css';

class InfoDisplay extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="info-display-component">
                <span className="value">{this.props.value}</span>
                <span className="key">{this.props.label}</span>
            </div>
        );
    }
}

export default InfoDisplay;

