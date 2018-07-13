import React, {Component} from 'react';
import ModalFrame from "../../shared/components/modal/modal.component";
import Button from "../../shared/components/button/button.component";
import LoginModal from './login-modal.component';
import ChatContainer from './chat-container.component';

export default class ServerGame extends Component {

    render(){
        if (this.state.showLogin) {
            return (
                <LoginModal loginSuccessHandler={this.handleSuccessfulLogin}
                            loginErrorHandler={this.handleErrorLogin} />
            )
        }
        return this.renderLobbyRoom();

    }

    constructor(args) {
        super(...args);
        this.state = {
            showLogin: true,
            currentUser: {
                name: ''
            }
        };

        this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);
        this.handleErrorLogin = this.handleErrorLogin.bind(this);
        this.fetchUserInfo = this.fetchUserInfo.bind(this);
        this.handleLogout = this.handleLogout.bind(this);

        this.getUserName();
    }

    handleSuccessfulLogin() {
        this.setState( ()=> ({showLogin:false}),this.getUserName() );
    }

    handleErrorLogin(){
        console.error('login failed');
        this.setState( ()=> ({showLogin:true}));
    }

    renderLobbyRoom() {
        return (
            <div className='lobby-room-component'>
                <div className="user-info-area">
                    Hello {this.state.currentUser.name}
                    <Button className="logout btn" label={'Logout'} onClick={this.handleLogout} isDisabled={false} />
                </div>
                <ChatContainer/>
            </div>
        )
    }

    getUserName(){
    this.fetchUserInfo()
        .then(userInfo => {
            this.setState( ()=> ( {currentUser: userInfo, showLogin: false}));
        })
        .catch(err => {
            if (err.status === 401) { // in case we're getting 'unAuthorized' as response
                this.setState(()=>({showLogin: true}));
            } else {
                throw err; // in case we're getting an error
            }
        });
    }

    fetchUserInfo() {
        return fetch('/users',{method:'GET', credentials: 'include'})
            .then(response => {
                if (!response.ok) {
                    throw response;
                }
                return response.json();
            });
    }

    handleLogout() {
        fetch('/users/logout', {method:'GET', credentials:'include'})
            .then(response => {
                if (!response.ok) {
                    console.log(`'Failed to logout user ${this.state.currentUser.name} `, response)
                }
                this.setState(()=>({currentUser: {name:''}, showLogin: true}));
            })
    }


}

