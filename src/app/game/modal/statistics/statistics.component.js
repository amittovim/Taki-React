import React, {Component} from 'react';
import './statistics.component.css';
import Button from "../../../shared/components/button/button.component";
import InfoDisplay from "../../../shared/components/info-display/info-display.component";

// <PROPS>
// turnNumber: number
class StatisticsModal extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="statistics-component">
                <h1 className="stat-title">Statistics</h1>
                <div className="stat-info">
                    <InfoDisplay className="turn-number"
                                 label="Turn number"
                                 value={this.props.turnNumber} />

                    <InfoDisplay className="turn-number"
                                 label="Average minutes"
                                 value={this.props.averageMinutes} />

                    <InfoDisplay className="turn-number"
                                 label="Average seconds"
                                 value={this.props.averageSeconds} />

                    <InfoDisplay className="turn-number"
                                 label="Single card counter"
                                 value={this.props.singleCardCounter} />
                </div>
                <Button label="Close"
                        onClick={this.props.onCancel} />
            </div>
        );
    }
}

export default StatisticsModal;
