import React, {Component} from 'react';
import './clock.component.css';

class Clock extends Component {
    constructor(props) {
        super(props)
        this.updateDate = this.updateDate.bind(this);

        this.state = {
            date: new Date().toLocaleTimeString(),
        }
        this.interval = setInterval(this.updateDate, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    updateDate() {
        this.setState({
            date: new Date().toLocaleTimeString(),
        });
}

    render() {
        return (
            <div className="clock-component">
                {this.state.date}
            </div>
        );
    }
}

export default Clock;
