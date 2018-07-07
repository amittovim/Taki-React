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
        this.state = {
            errMessage: ''
        }

        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin() {
        
    }
}

export default ModalFrame;
