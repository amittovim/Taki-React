import React from 'react';
import ReactDOM from 'react-dom';

import CardApp from './Components/cardApp';

import "./css/style.css";
// import "./css/card.css";

/*
/!* Directly adding react element *!/
ReactDOM.render(
    React.createElement('div',null, 'hello world'), 
    document.getElementById("root")
);
*/

const App = () => {
    return (
        <CardApp />
    );
};

ReactDOM.render(
    <App />,
    document.getElementById("root")
);