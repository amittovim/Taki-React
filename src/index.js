import React from 'react';
import ReactDOM from 'react-dom';
import "./style.css";
import Game from "./app/taki/game.component";
import * as gameService from './app/taki/game.service';

const App = () => {
    return (<Game service={gameService} />);
};

ReactDOM.render(
    <App />,
    document.getElementById("root")
);
