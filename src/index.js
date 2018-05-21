import React from 'react';
import ReactDOM from 'react-dom';
import "./style.css";
import CardContainer from './Components/cardContainer';


/*
/!* Directly adding react element *!/
ReactDOM.render(
    React.createElement('div',null, 'hello world'), 
    document.getElementById("root")
);
*/

const App = () => {
    return ( <CardContainer /> );
};

ReactDOM.render(
    <App />,
    document.getElementById("root")
);