import React, {Component} from 'react';
import './modal.component.css';

// <PROPS>
// title: string
// subtitle: string
// content: HTML

class Modal extends Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    render() {
        return (
            <div className="modal-component">
                <div className="overlay"></div>
                <div className="modal">
                    <h1>{this.props.title}</h1>
                    <h2>{this.props.subtitle}</h2>
                    <div>{this.props.children}</div>
                </div>
            </div>
        );
    }
}

export default Modal;
