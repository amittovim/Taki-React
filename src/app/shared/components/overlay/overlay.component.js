import React, {Component} from 'react';
import './overlay.component.css';

// <PROPS>
// isVisible: boolean;

class Overlay extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="overlay-component">
                {this.props.isVisible
                    ? (<div className="overlay"></div>)
                    : null
                }
            </div>
        );
    }
}

export default Overlay;
