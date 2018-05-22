import React from 'react' ;
import ReactDOM from 'react-dom';



const CardContainer = () => {
    return (<p>this is a template</p>);
;}

/*

class CardContainer extends React.Component {
    constructor(args) {
     super(...args);
     this.state = {
         cardShown: false
     }
     // this.toggleCard = this.toggleCard.bind(this);
     // this.renderCard = this.renderCard.bind(this);

    }

    render() {

        return (
            <div className="card-container">
                <button onclick={this.toggleCard} className="toggle-card-btn" >
                    {this.state.cardShown ? 'cover card' : 'show card'}
                </button>
                {this.renderCard()}
            </div>
        );
    }
    toggleCard() {
        this.setState( (prevState) => ({ cardShown: !prevState.cardShown }));
    }

    renderCard() {
        return (<FlippingCard />);
    }
}
*/

export default CardContainer;