import React, {Component} from 'react';
import './draw-pile.component.css';
import Card from "../../../../shared/components/card/card.component";
import * as ReactDom from "react-dom";

// drawPile: Pile

class DrawPile extends Component {
    constructor(props) {
        super(props);

        this.state = {}

        this.moveCardDriver2 = this.moveCardDriver2.bind(this);

    }

    render() {
        return (
            <div className="draw-pile-component">
                {
                    this.props.drawPile.cards.map((card, index) => {
                        return <Card key={card.id}
                                     card={card}
                                     hoverEnabled={index === this.props.drawPile.cards.length - 1}
                                     moveCardDriver2={this.moveCardDriver2}
                                     // parentPosition={{  x: this.drawPileDOM.offsetLeft,
                                     //                    y: this.drawPileDOM.offsetTop  }}
                                     position={{x:100,y:100}}
                        />
                    })
                }
            </div>
        );
    }

    componentDidMount() {
        this.drawPileDOM = ReactDom.findDOMNode(this);
    }
    moveCardDriver2(card) {
        this.props.moveCardDriver1(card, this.props.drawPile);
    };
}

export default DrawPile;
