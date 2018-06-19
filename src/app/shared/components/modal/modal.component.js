import React, {Component} from 'react';
import './modal.component.css';

// <PROPS>
// isOpen: boolean
// title: string
// subtitle: string

class ModalFrame extends Component {
    render() {
        return (
            this.props.isOpen ?
                (
                    <div className="modal-component">
                        <div className="modal">
                            <h1>{this.props.title}</h1>
                            <h2>{this.props.subtitle}</h2>
                            <div>
                                {this.props.children}
                            </div>
                        </div>
                    </div>
                ) : null
        );
    }

    constructor(props) {
        super(props);
    }
}

export default ModalFrame;
