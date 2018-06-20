import React, {Component} from 'react';
import './loader.component.css';

class Loader extends Component {
    constructor(props) {
        super(props);
    }

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
}

export default Loader;
