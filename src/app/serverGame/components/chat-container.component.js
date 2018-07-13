import React,{Component} from 'react';
import ConversationArea from './conversationArea.component';
import ChatInput from './chatInput.component';

export default class ChatContainer extends Component {
    render() {
        return (
            <div className="chat-container-component">
                <ConversationArea/>
                <ChatInput/>
            </div>
        )
    };

    constructor(props) {
        super(...props);
    };

}