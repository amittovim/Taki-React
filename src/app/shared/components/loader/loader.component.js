import React, {Component} from 'react';
import './loader.component.css';

// <PROPS>
// isLoading: boolean

class Loader extends Component {

    render() {
        return (
            <div className="loader-component">
                {this.props.isLoading
                    ? (<div className="loader">
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                    </div>)
                    : (<div className="separator"></div>)
                }
            </div>
        );
    }

    constructor(props) {
        super(props);
    }
}

export default Loader;
