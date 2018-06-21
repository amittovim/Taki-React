import React, {Component} from 'react';
import './color-picker.component.css';
import {CardColorEnum} from "../../../enums/card-color.enum";
import {getKeys} from "../../../../logic/utils/model.utils";
import ColorButton from "../../../shared/components/color-button/color-button.component";

// <PROPS>
// onColorSelect: Function

class ColorPickerModal extends Component {

    render() {
        return (
            <div className="color-picker-modal-component">
                <h1>Color Picker</h1>
                <h2>Please select one of the following colors:</h2>
                <div className="button-area">
                    {
                        this.state.colors.map(color => (
                            <ColorButton key={color}
                                         color={color}
                                         callback={this.handleClick} />
                        ))
                    }
                </div>
            </div>
        );
    }

    constructor(props) {
        super(props);
        this.state = {
            colors: Object.values(CardColorEnum)
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(color) {
        this.props.onColorSelect(color);
    }
}

export default ColorPickerModal;
