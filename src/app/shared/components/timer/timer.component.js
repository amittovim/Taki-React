import React, {Component} from 'react';
import './timer.component.css';

class Timer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            elapsed: 0
        };

        this.tick = this.tick.bind(this);
    }

    componentDidMount() {
        this.timer = setInterval(this.tick,50);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    tick() {
        this.setState({
            elapsed : (new Date() - this.props.start)
        });
    }

    render() {

        // Calculate elapsed to tenth of a second:
        let elapsed = Math.round(this.state.elapsed / 100);

        // This will give a number with one digit after the decimal dot (xx.x):
        let seconds = (elapsed / 10).toFixed(1);

        return (

            <div className="timer-component">
                <div>{this.props.start}</div><p>This example was started <b>{seconds} seconds</b> ago.</p>
            </div>
        );
    }
}

export default Timer;