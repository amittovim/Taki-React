import React,{Component} from 'react';

export default class ChatInput extends Component {
    render() {
        return(
            <form className="chat-input-component" onSubmit={this.sendText}>
                <input disabled={this.state.sendInProgress} placeholder="enter text here" ref={input => this.inputElement = input} />
                <input type="submit" className="btn" disabled={this.state.sendInProgress} value="Send" />
            </form>
        )
    }
    constructor(props) {
        super(...props);
        this.state = {
            sendInProgress:false
        };

        this.sendText = this.sendText.bind(this);
    }

    sendText(e) {
        e.preventDefault();
        this.setState(()=>({sendInProgress: true}));
        const text = this.inputElement.value;
        fetch('/lobby', { method: 'POST', body: text, credentials: 'include' })
            .then(response => {
                if (!response.ok) {
                    throw response;
                }
                this.setState(()=>({sendInProgress: false}));
                this.inputElement.value = '';
            });
        return false;
    }
}