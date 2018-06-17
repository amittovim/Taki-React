import React, {Component} from 'react';
import './modal.component.css';
import {ModalTypeEnum} from "./modal-type.enum";
import ColorButtons from "../color-buttons/color-buttons.component";
import Button from "../button/button.component";

// <PROPS>
// isOpen: boolean
// type: ModalTypeEnum
// callback: Function

class Modal extends Component {
    render() {
        return (
            this.props.isOpen ?
                (
                    <div className="modal-component">
                        <div className="overlay"></div>
                        <div className="modal">
                            <h1>{this.state.title}</h1>
                            <h2>{this.state.subtitle}</h2>
                            <div>
                                {this.state.content}
                            </div>
                        </div>
                    </div>
                ) : null
        );
    }
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            subtitle: '',
            content: (<Button label="Close"
                              onClick={this.props.callback}
                              isDisabled={false}
            >Close</Button>)
        };
    }

    componentWillMount() {
        this.getModalData();
    }

    // componentWillReceiveProps() {
    //     console.log(this.props);
    //     this.getModalData();
    // }

    getModalData() {
        debugger;
        switch (this.props.type) {
            case ModalTypeEnum.ColorPicker: {
                this.setState({
                    title: 'Please pick a color',
                    content: (<ColorButtons onColorSelect={this.props.callback} />)
                });
                break;
            }
            case ModalTypeEnum.Welcome: {
                this.setState({
                    title: 'Welcome to our TAKI game',
                    content: (<Welcome-Buttons onStartGame={this.props.callback} />)
                });
                break;
            }
        }
    }
}

export default Modal;
