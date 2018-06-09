import React from 'react';
import ReactDOM from 'react-dom';
import "./style.css";
import Game from "./app/game/game.component";
import * as gameService from './app/game/game.service';

const App = () => {
    return (<Game service={gameService} />);
};

ReactDOM.render(
    <App />,
    document.getElementById("root")
);
