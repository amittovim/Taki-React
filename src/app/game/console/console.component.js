import React, {Component} from 'react';
import './console.component.css';

//PROPS
// text = string
class Console extends Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    render() {
        return (
            <div className="console-component">
            <div>{this.props.text}</div>
            </div>
        );
    }
}

export default Console;
