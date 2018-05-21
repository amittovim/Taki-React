import React from 'react';
import ReactDOM from 'React-dom';
import frontImage from './1-blue.jpg';
import backImage from './backTaki.jpg';


class FlippingCard extends React.Component {
    render() {
        return (
            <div title="flipping Taki card" className="flipping-card-wrapper">
                <img className="front-card" src={frontImage} />
                <img className="back-card" src={backImage} />
            </div>
        )
    }

}




export default FlippingCard;

