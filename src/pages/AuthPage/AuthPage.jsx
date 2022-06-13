import React from 'react'
import './AuthPage.css';
import LoginForm from '../../components/api/LoginForm/LoginForm';
import SignUpForm from '../../components/api/SignUpForm/SignUpform';

export default class AuthPage extends React.Component {
    state = {
      showLogin: true,
    }
  
    render() {
      return (
        <main className="AuthPage page">
          <div>
            
            <h3 onClick={() => this.setState({ showLogin: !this.state.showLogin })}>
              {this.state.showLogin ? 'SIGN UP' : 'LOG IN'}
            </h3>
          </div>
          {/* Another ternary operator! */}
          {/* If showLogin is true, show the login form. If false, show the signup form */}
          {this.state.showLogin ? 
          <LoginForm setUserInState={this.props.setUserInState}/> : 
          <SignUpForm setUserInState={this.props.setUserInState} />}
        </main>
      );
    }
  }