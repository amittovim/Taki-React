import React, {Component} from 'react';
import './draw-pile.component.css';
import Card from "../../../../shared/components/card/card.component";

class DrawPile extends Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    render() {
        return (
            <div className="draw-pile-component">
                {
                    this.props.cards.map(card => {
                        return <Card key={card.id}
                                     {...card} />
                    })
                }
            </div>
        );
    }
}

export default DrawPile;
