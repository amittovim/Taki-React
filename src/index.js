import React from 'react';
import ReactDOM from 'react-dom';
import "./style.css";
import Taki from "./app/taki.component";

const App = () => {
    return (<Taki />);
};

ReactDOM.render(
    <App />,
    document.getElementById("root")
);
