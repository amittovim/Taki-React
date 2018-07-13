import React, {Component} from 'react';
import takiImage from '../../../assets/images/super-taki.jpg';
import './login-modal.component.css';
// <PROPS>
// loginSuccessHandler: function
// loginErrorHandler  : function
//

export default class LoginModal extends Component {
    render() {
        return (
            <div className="login-modal-component">
                <img className="taki-logo" src={takiImage} />
                <h1> Welcome to our game of TAKI </h1>
                <form onSubmit={this.handleLogin}>
                    <label className="username-label" htmlFor="userName"> name: </label>
                    <input className="username-input" name="userName"/>
                    <input className="submit-btn btn" type="submit" value="Login"/>
                </form>
                {this.renderErrorMessage()}
            </div>
        );
    }

    constructor(props) {
        super(props);
        this.state ={
            errMessage: ''
        }

        this.handleLogin = this.handleLogin.bind(this);
    }


    renderErrorMessage() {
        if (this.state.errMessage) {
            return (
                <div className="login-error-message">
                    {this.state.errMessage}
                </div>
            );
        }
        return null;
    }

    handleLogin(e) {
        debugger;
        e.preventDefault();
        const userName = e.target.elements.userName.value;
        fetch('/users/addUser', {method:'POST', body: userName, credentials: 'include'})
            .then(response=> {
                if (response.ok){
                    this.setState(()=> ({errMessage: ""}));
                    this.props.loginSuccessHandler();
                } else {
                    if (response.status === 403) {
                        this.setState(()=> ({errMessage: "User name already exist, please try another one"}));
                    }
                    this.props.loginErrorHandler();
                }
            });
        return false;
    }
}