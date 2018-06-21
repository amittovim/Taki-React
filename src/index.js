import React from 'react';
import ReactDOM from 'react-dom';
import "./style.css";
import Game from "./app/game/game.component";

const App = () => {
    return (<Game />);
};

ReactDOM.render(
    <App />,
    document.getElementById("root")
);
