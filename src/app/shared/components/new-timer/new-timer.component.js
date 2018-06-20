import React, {Component} from 'react';
import './new-timer.component.css';

//<PROPS>

// isGameClock: boolean
// turnNumber: number
// label: string
// isGameOver: boolean
// emitAverageTime: Function

class Timer extends Component {

    render() {
        return (
            <div className="new-clock-component">
                <span className="value">
                    <span className="game-minutes">{Timer.getTimeDisplay(this.state.minutes)}</span>:
                    <span className="game-seconds">{Timer.getTimeDisplay(this.state.seconds)}</span>
                </span>
                <span className="label">{this.props.label}</span>
            </div>
        );
    }

    constructor(props) {
        super(props);
        this.state = {
            intervalId: 0,
            minutes: 0,
            seconds: 0,
            totalMinutes: 0,
            totalSeconds: 0,
            averageMinutes: 0,
            averageSeconds: 0,
        };

        this.startClock = this.startClock.bind(this);
        this.resetClock = this.resetClock.bind(this);
        this.moveTime = this.moveTime.bind(this);
    }

    componentWillMount() {
        if (this.props.isGameClock || this.props.turnNumber === 0) {
            this.startClock();
        }
    }

    componentWillReceiveProps() {
        if (!this.props.isGameClock) {
            this.startClock();
        }
        if (this.props.isGameOver) {
            this.resetClock();
        }
    }

    startClock() {
        this.resetClock();
        const intervalId = setInterval(this.moveTime, 1000);
        this.setState({
            intervalId
        })
    }

    resetClock() {
        this.setState({
            seconds: 0,
            minute: 0,
        });
        clearInterval(this.state.intervalId);
    }

    moveTime() {
        this.setState((prevState) => {
            const newSeconds = prevState.seconds + 1;
            return {
                seconds: newSeconds,
                totalSeconds: prevState + newSeconds
            };
        });
        if (this.state.seconds > 60) {
            this.setState((prevState) => {
                const newMinutes = prevState.minutes + 1;
                return {
                    minutes: prevState.minutes + 1,
                    seconds: 0,
                    totalMinutes: prevState.minutes + newMinutes,
                }
            });
        }
        if (!this.props.isGameClock && this.is) {
            this.updateAverageMoveTime();
        }
    }

    static getTimeDisplay(value) {
        value = parseInt(value);
        let display = '';
        if (value < 10) {
            display += '0';
        }
        display += value;
        return display;
    }

    updateAverageMoveTime() {
        this.setState((prevState) => {
            return {
                averageMinutes: prevState.totalMinutes / this.props.turnNumber,
                averageSeconds: prevState.totalSeconds / this.props.turnNumber,
            }
        });
        const result = {
            minutes: this.state.averageMinutes,
            seconds: this.state.averageSeconds
        };
        this.props.emitAverageTime(result);
    }
}

export default Timer;
