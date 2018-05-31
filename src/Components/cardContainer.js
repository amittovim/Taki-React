import React, {Component} from 'react' ;
import backImage from './back.jpg';
import frontImage from './1-blue.jpg';
/*
const CardContainer = () => {
    return (<p>this is a template</p>);
;}
*/

class CardContainer extends Component {
    constructor (props) {
        super(props);
        this.state = {
            cardShown: true,
            onBackSide: true,
            isClicked: false
        };
        this.flipCard = this.flipCard.bind(this);
    }

    flipCard() {
        this.setState( prevState => ({
            onBackSide: !prevState.onBackSide,
            // isClicked: true
        }) ) ;
//        this.setState( () => ({ isClicked: true }) ) ;
}
    render() {
        let flippedCss = this.state.onBackSide ? " flip-card-2-back" : " flip-card-2-front";
        if (this.state.isClicked) {
            flippedCss = "";

        }
        return (
            <div title="TAKI card" className="card-container">
                <div id="card-61" onClick={this.flipCard} className="card shadow rounded" >
                    <div className={`front-card ${flippedCss}`}>
                        <img className="front-card-img" src={frontImage} />
                    </div>
                    <div className={`back-card ${flippedCss}`}>
                        <img className="back-card-img" src={backImage} />
                    </div>
                </div>
            </div>
        );
    }
}

export default CardContainer;