import React, {Component} from 'react';
import './discard-pile.component.css'
import Card from "../../../../shared/components/card/card.component";

class DiscardPile extends Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    render() {
        return (
            <div className="discard-pile-component">
                {this.props.cards.map(
                    (cardItem) => {
                        return (
                            <Card key={cardItem.id}
                                  card={cardItem}

                            />
                        );
                    }
                )}
            </div>
        );
    }
}

export default DiscardPile;
