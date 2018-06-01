import React from 'react';
import ReactDOM from 'react-dom';
import "./style.css";
import Taki from "./app/taki/taki.component";
import * as takiService from './app/taki/taki.service';

const App = () => {
    return (<Taki service={takiService} />);
};

ReactDOM.render(
    <App />,
    document.getElementById("root")
);
