import React, {Component} from 'react';
import './console.component.css';

//<PROPS>
// message: string

class Console extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="console-component">
                <span>CONSOLE: {this.props.message}</span>
            </div>
        );
    }
}

export default Console;
