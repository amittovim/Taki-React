import React, { Component } from 'react';
import CardContainer from "./cardContainer";




class cardApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cardShown: false,
            isBackside: true
        };
        this.toggleCard = this.toggleCard.bind(this);
        this.flipCard = this.flipCard.bind(this);
        this.renderCard = this.renderCard.bind(this);
    }

    render() {
        return (
          <div className="card-app">
              <button onClick={ this.toggleCard } className="toggle-card-btn">
                  {this.state.cardShown ? 'hide card' : 'show card'}
              </button>
              <button onClick={this.flipCard} className="flip-card-btn" >
                  flip card
              </button>
              {this.renderCard()}

          </div>
        );
    }

    toggleCard() {
        this.setState( prevState => ({cardShown: !prevState.cardShown}) );
        // todo: ask why the following line doesnt work (without parenthesis after the arrow) :
        // this.setState( prevState => {cardShown: !prevState.cardShown} );
    }
    flipCard() {
        this.setState( prevState => ({ isBackside: !prevState.isBackside }) );
    }
    renderCard() {
        if (this.state.cardShown) {
            return (
            <CardContainer/>
            )
        }
        return null;
    }
}


export default cardApp;