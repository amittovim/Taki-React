import React, {Component} from 'react';
import ColorPickerModal from "./color-picker/color-picker.component";
import {ModalTypeEnum} from "./modal-type.enum";
import ModalFrame from "../../shared/components/modal/modal.component";

// isOpen: boolean
// type: ModalTypeEnum
// callback: Function

class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            subtitle: ''
        };
        this.renderSwitch = this.renderSwitch.bind(this);
        this.handleClick = this.handleClick.bind(this);

    }

    render() {
        return (
            <ModalFrame isOpen={this.props.isOpen}
                        title={this.state.title}
                        subtitle={this.state.subtitle}>
                <div className="modal-component">
                    {this.renderSwitch(this.props.type)}
                </div>
            </ModalFrame>
        )
    }

    componentDidMount() {
        let title;
        let subtitle;
        switch (this.props.type) {
            case ModalTypeEnum.Welcome: {
                title = 'Welcome to the TAKI game!';
                subtitle = 'Let\'s start playin!';
                break;
            }
            case ModalTypeEnum.ColorPicker: {
                title = 'Color Picker';
                subtitle = 'Please select one of the following colors:';
                break;
            }
            default: {
                break;
            }
        }
        this.setState({
            title, subtitle
        })
    }

    renderSwitch(type) {
        debugger;
        switch (type) {
            case ModalTypeEnum.Welcome: {
                return (<WelcomeModal />);
            }
            case ModalTypeEnum.ColorPicker: {
                return (<ColorPickerModal onColorSelect={this.props.callback} />);
            }
            default: {
                break;
            }
        }
    }

    handleClick(value) {
        debugger;
        this.props.callback(value);
    }
}

export default Modal;
