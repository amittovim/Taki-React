import React, {Component} from 'react';
import './info-display.component.css';

class InfoDisplay extends Component {
    constructor(props) {
        super(props)
        {

        }
    }

    render() {
        return (
            <div className="info-display-component">
                {this.props.description === " current player"
                    ? (<span className="value current-player record">{this.props.value}</span>)
                    : (<span className="value record">{this.props.value}</span>)
                }
                <span className="label">{this.props.description}</span>
            </div>
        );
    }
}

export default InfoDisplay ;

